<?php
// what this file does: get data, send to R renderer, return files (?) and messages

// reporting
error_reporting(E_ALL & ~E_NOTICE);
$errorMsg = "";
$sysMsg = "";
$testingLevel = 2 ; // 0 = not testing, 1 = some test output, 2 = more text output
$runR = false;
if ( $testingLevel > 1 ) {
    $time = date('Y-m-d H:i:s');
    $sysMsg .= "<p>Timestamp: $time</p>\n";
}

// connections
include("../inc/dbinfo.inc");
$pdo = new PDO("mysql:host=" . DB_SERVER . ";dbname=" . DB_DATABASE, DB_USERNAME, DB_PASSWORD);

$haveData = false;
if ( isset($_POST['rmd_name']) && ! empty($_POST['rmd_name']) && isset($_POST['rmd_text']) && ! empty($_POST['rmd_text']) && isset($_POST['formats']) && ! empty($_POST['formats']) ) {
    $haveData = true;
}

if ( $haveData ) {
    // gather info and save to sql (return id of that row)
    $name = $_POST['rmd_name'];
    $text = $_POST['rmd_text'];
    $formats = $_POST['formats'];
    $ip = $_SERVER['REMOTE_ADDR']; // because we don't really care about spoofing

    $sql = "CALL StoreNewRMD(:name,:text,:formats,:ip_address,@id)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':text', $text, PDO::PARAM_STR);
    $stmt->bindParam(':formats', $formats, PDO::PARAM_STR);
    $stmt->bindParam(':ip_address', $ip, PDO::PARAM_STR);

    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    if ( $row && $testingLevel > 1 ) {
        $sysMsg .= "row data 0 [" . $row[0]['id'] . "]";
    }

    // wipe out the old files
    $fileName = $_POST['rmd_name'];
    $fileName = str_replace(" ", "", $fileName);
    $fileFormatsInput = trim($_POST['formats']);
    $fileFormats = explode(" ", $fileFormatsInput);
    foreach ( $fileFormats as $thisFormat) {
        $fullFileName = "./output/" . $fileName . "." . $thisFormat;
        if ( file_exists($fullFileName)) {
            unlink($fullFileName);
        } else {
        }
    }

    // write input data to file
    $fileContents = $_POST['rmd_text'];
    $file = "./output/" . $fileName . '.rmd'; // todo: put this in a proper folder, maybe by user or something
    file_put_contents($file, $fileContents);

    if ( $testingLevel > 1 ) {
        $sysMsg .= "<p>RMD file location: " . dirname(__FILE__) . "</p>\n";
    }

    // run renderer to generate files
    if ( $runR ) {

        // args for R file
        $N = "";
        $N .= "\"" . dirname(__FILE__) . "\\output\\" . $fileName . ".rmd\""; // the file path + name
        // format types
        if ( strlen($fileFormatsInput) > 0 ) {
            $N .= " formats=\"" . $fileFormatsInput . "\"";
        }


        $rScript = "C:\\Program Files\\R\\R-3.5.0\\bin\\Rscript.exe";
        $rFile = "C:\\xampp\\htdocs\\RMDWebRenderer\\R\\RMDrender.R";

        $execCommand = "\"$rScript\" \"$rFile\" $N";

        if ( $testingLevel > 1 ) {
            $sysMsg .= "<p>Exec'ing: $execCommand</p>\n";
        }

        exec($execCommand, $output, $return);

        if ( $return !== 0 ) {
            $sysMsg .= "<p>R failed to run.</p>\n";
        } 
    }
}

// check if the files were created (or later, return errors from R)
$createdFileNames = "";
foreach ( $fileFormats as $thisFormat) {
    $fullFileName = "./output/" . $fileName . "." . $thisFormat;
    if ( file_exists($fullFileName)) {
        $createdFileNames .= " " . $fullFileName;
    } else {
        if ( $testingLevel > 1 ) {
            $sysMsg .= "<p>File [$fullFileName] DNE</p>\n";
        }
    }
}
$createdFileNames = trim($createdFileNames);

$outputData = array("error" => $errorMsg, "created_filenames" => $createdFileNames, "message" => $sysMsg);
echo json_encode($outputData);

$pdo = null; // close con

// bookmark. got stored proc working
// next, modify the R file to connect to sql as well and pull the data. 
// I'll need to send the p key id as a param
// also note: the proc fails, it always updates never inserts. not sure why. deal with later

?>

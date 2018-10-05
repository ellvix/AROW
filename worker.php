<?php

// what this file does: get data, saves a copy to sql, saves an rmd file, send to R renderer, return rendered files and messages

// control vars
$sysMsg = "";
$testingLevel = 2 ; // 0 = not testing, 1 = some test output, 2 = more text output
$runR = true;
$platform = "aws"; // aws, xampp (local)

// reporting
error_reporting(E_ALL & ~E_NOTICE);
$errorMsg = "";
function exception_error_handler($errno, $errstr, $errfile, $errline ) {
    //throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
    $errorMsg .= "<p>Error ($errline) $errstr</p>\n";
}
set_error_handler("exception_error_handler");
if ( $testingLevel > 1 ) {
    $time = date('Y-m-d H:i:s');
    $sysMsg .= "<p>Timestamp: $time</p>\n";
}

// connections
$sqlIsWorking = false;
try {
    include("../inc/dbinfo.inc");
    $pdo = new PDO("mysql:host=" . DB_SERVER . ";port=3306;dbname=" . DB_DATABASE, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

    $sqlIsWorking = true;

    if ( defined('DB_PLATFORM') ) {
        $platform = "localhost";
    }
} catch (Exception $e) {
    $sysMsg .= "<p>sql err: " . $e->getMessage() . "</p>\n";
}

$haveData = false;
if ( isset($_POST['rmd_name']) && ! empty($_POST['rmd_name']) && isset($_POST['rmd_text']) && ! empty($_POST['rmd_text']) && isset($_POST['formats']) && ! empty($_POST['formats']) ) {
    $haveData = true;
}

if ( $haveData && $sqlIsWorking ) {
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
    $id = 0; // default val so we can detect failure
    if ( isset ( $row[0]['id'] ) ) {
        $id = (int)$row[0]['id'];
    }
    if ( $testingLevel > 1 ) {
        $sysMsg .= "<p>ID: $id</p>\n";
    }

    if ( $id > 0 ) 
    {

        $fileName = $_POST['rmd_name'];
        $fileName = str_replace(" ", "", $fileName);
        $fileFormatsInput = trim($_POST['formats']);
        $fileFormats = explode(" ", $fileFormatsInput);
        $dir = "./output/$id";

        // wipe out the old files
        if ( file_exists($dir) ) {
            foreach ( $fileFormats as $thisFormat) {
                $fullFileName = "$dir/$fileName.$thisFormat";
                if ( file_exists($fullFileName)) {
                    unlink($fullFileName);
                } 
            }
            rmdir($dir);
        }

        // write input data to file
        $fileContents = $_POST['rmd_text'];
        $file = "$dir/$fileName.rmd"; 
        mkdir($dir);
        file_put_contents($file, $fileContents);

        if ( $testingLevel > 1 ) {
            $sysMsg .= "<p>RMD file location: $dir</p>\n";
        }

        // run renderer to generate files
        if ( $runR ) {

            // args for R file
            $args = "";
            $argLocalPath = "\\output\\$id\\$fileName.rmd\"";
            if ( $platform == "aws" ) {
                $argLocalPath = "/output/$id/$fileName.rmd\"";
            }
            $args .= "\"" . dirname(__FILE__) . $argLocalPath; // the file path + name
            $args .= " id=\"$id\"";
            // format types
            if ( strlen($fileFormatsInput) > 0 ) {
                $args .= " formats=\"" . $fileFormatsInput . "\"";
            }

            $rScript = "C:\\Program Files\\R\\R-3.5.0\\bin\\Rscript.exe"; // xampp localhost default
            $rFile = "C:\\xampp\\htdocs\\RMDWebRenderer\\R\\RMDrender.R";
            if ( $platform == "aws" ) {
                $rScript = "/usr/lib/R/bin/Rscript"; // aws linux
                $rFile = "/var/www/html/R/RMDrender.R";
            }

            $execCommand = "\"$rScript\" \"$rFile\" $args";

            if ( $testingLevel > 1 ) {
                $sysMsg .= "<p>Exec'ing: $execCommand</p>\n";
            }

            exec($execCommand, $output, $return);

            if ( isset($output) ) {
                if ( $testingLevel > 1 ) {
                    $sysMsg .= "<h3>Output from R</h3>\n";
                    $sysMsg .= "<div>" . print_r($output, true) . "</div>\n";
                }
            } else {
                $sysMsg .= "<h3>R failed to run.</h3>\n";
                $sysMsg .= "<div>" . print_r($output, true) . "</div>\n";
            }
        }
    } else {
        $sysMsg .= "<p>Unable to process data</p>\n";
    }
}

// check if the files were created (or later, return errors from R)
$createdFileNames = "";
foreach ( $fileFormats as $thisFormat) {
    $fullFileName = "./output/$id/$fileName.$thisFormat";
    if ( file_exists($fullFileName)) {
        $createdFileNames .= " " . $fullFileName;
    } else {
        if ( $testingLevel > 1 ) {
            $sysMsg .= "<p>File [$fullFileName] DNE</p>\n";
        }
    }
}
$createdFileNames = trim($createdFileNames);

$outputData = array("error" => $errorMsg, "ID" => $id, "created_filenames" => $createdFileNames, "message" => $sysMsg);
echo json_encode($outputData);

$pdo = null; // close con

?>

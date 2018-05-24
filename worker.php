<?php
// what this file does: get data, send to R renderer, return files (?) and messages

error_reporting(E_ALL & ~E_NOTICE);
$testing = 0 ; // 0 = not testing, 1 = some test output, 2 = more text output
$runR = true;

// wipe out the old files
$fileName = $_POST['rmd_name'];
$fileName = str_replace(" ", "", $fileName);
$fileFormatsInput = trim($_POST['formats']);
$fileFormats = explode(" ", $fileFormatsInput);
foreach ( $fileFormats as $thisFormat) {
    $fullFileName = $fileName . "." . $thisFormat;
    if ( file_exists($fullFileName)) {
        unlink($fullFileName);
    } else {
    }
}


// write input data to file
$fileContents = $_POST['rmd_text'];
$errorMsg = "";
$sysMsg = "";
$file = $fileName . '.rmd'; // todo: put this in a proper folder, maybe by user or something
file_put_contents($file, $fileContents);

if ( $testing > 1 ) {
    $sysMsg .= "<p>RMD file location: " . dirname(__FILE__) . "</p>\n";
}

// run renderer to generate files
if ( $runR ) {

    // args for R file
    $N = "";
    $N .= "\"" . dirname(__FILE__) . "\\" . $fileName . ".rmd\""; // the file path + name
    // format types
    if ( strlen($fileFormatsInput) > 0 ) {
        $N .= " formats=\"" . $fileFormatsInput . "\"";
    }
    

    $rScript = "C:\\Program Files\\R\\R-3.5.0\\bin\\Rscript.exe";
    $rFile = "C:\\Users\\smm48\\Documents\\Projects\\Lab\\R\\RMDrender.R";

    $execCommand = "\"$rScript\" \"$rFile\" $N";

    if ( $testing > 1 ) {
        $sysMsg .= "<p>Exec'ing: $execCommand</p>\n";
    }

    exec($execCommand, $output, $return);

    if ( $return !== 0 ) {
        $sysMsg .= "<p>R failed to run.</p>\n";
    } 
}

// check if the files were created (or later, return errors from R)
$createdFileNames = "";
foreach ( $fileFormats as $thisFormat) {
    $fullFileName = $fileName . "." . $thisFormat;
    if ( file_exists($fullFileName)) {
        $createdFileNames .= " " . $fullFileName;
    } else {
        if ( $testing > 1 ) {
            $sysMsg .= "<p>File [$fullFileName] DNE</p>\n";
        }
    }
}
$createdFileNames = trim($createdFileNames);



$outputData = array("error" => $errorMsg, "created_filenames" => $createdFileNames, "message" => $sysMsg);
echo json_encode($outputData);

?>

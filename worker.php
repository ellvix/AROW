<?php
if ( session_status() == PHP_SESSION_NONE) {
    session_start();
}

// what this file does: get data, saves an rmd file, send to R renderer, return rendered files and messages

include "getnewid.php";

// control vars
$sysMsg = "";
$errorMsg = "";
$createdFileNames = "";
$testingLevel = 2 ; // 0 = not testing, 1 = some test output, 2 = more text output
$runR = true;
$platform = "xampp"; // aws, xampp (local)

// reporting
error_reporting(E_ALL & ~E_NOTICE);
function exception_error_handler($errno, $errstr, $errfile, $errline ) {
    //throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
    $errorMsg .= "<p>Error ($errline) $errstr</p>\n";
}
set_error_handler("exception_error_handler");
if ( $testingLevel > 1 ) {
    $time = date('Y-m-d H:i:s');
    $sysMsg .= "<p>Timestamp: $time</p>\n";
}

// get folder info
$isDirSet = false;
if ( ! isset ( $_SESSION_['folder_id'] ) ) {
    $idErr = GetNewId();
    if ( strlen($idErr) > 0 ) {
        $errorMsg .= $idErr;
    } else {
        $isDirSet = true;
    }
}
if ( ! $isDirSet ) {
    $errorMsg .= "<p>Error creating new id.</p>\n";
} else if ( $testingLevel > 1 ) {
    $sysMsg .= "<p>Folder ID: " . $_SESSION['folder_id'] . "</p>\n";
}

$haveData = false;
if ( isset($_POST['rmd_name']) && ! empty($_POST['rmd_name']) && isset($_POST['rmd_text']) && ! empty($_POST['rmd_text']) ) {
    $haveData = true;
}

if ( $testingLevel > 1 ) {
    $sysMsg .= "<p>Starting process. data: $haveData. dir: $isDirSet</p>\n";
}

if ( $haveData && $isDirSet ) {


    // gather info and save to the rmd file

    $name = $_POST['rmd_name'];
    $text = $_POST['rmd_text'];
    if ( isset($_POST['formats']) && ! empty($_POST['formats']) ) {
        $formats = $_POST['formats'];
    } else {
        $formats = "";
    }

    if ( $_SESSION['folder_id'] > 0 ) 
    {
        $id = $_SESSION['folder_id'];

        $fileName = $_POST['rmd_name'];
        $fileName = str_replace(" ", "", $fileName);
        $fileFormatsInput = trim($formats);
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
        //$fileContents = mb_convert($fileContents, 'UTF-8', 'auto');
        $fileContents = utf8_encode($fileContents);
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
            if ( strlen($fileFormatsInput) > 0 ) {
                $args .= " formats=\"$fileFormatsInput\"";
            }

            $rScript = "C:\\Program Files\\R\\R-3.5.0\\bin\\Rscript.exe"; // xampp localhost default
            $rFile = "C:\\xampp\\htdocs\\AROW\\R\\RMDrender.R";
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

                //$sysMsg .= "<div>" . serialize($output) . "</div>\n";


                // get all files that were created
                $pattern = '/\/output\/\d+\/([^"]+)"/';
                preg_match_all($pattern, serialize($output), $createdFileNames);
                //$sysMsg .= "<p>createdFileNames:  " . print_r(implode(',',$createdFileNames), true) . "</p>\n";
            } else {
                $sysMsg .= "<h3>R failed to run.</h3>\n";
                $sysMsg .= "<div>" . print_r($output, true) . "</div>\n";
            }
        }
    } else {
        $sysMsg .= "<p>Unable to process data. Folder id: " . $_SESSION['folder_id'] . "</p>\n";
    }
}

if ( $testingLevel > 1 ) {
    $sysMsg .= "<p>Processing complete. $fileFormats</p>\n";
}

$outputData = array("error" => $errorMsg, "ID" => $id, "created_filenames" => $createdFileNames, "message" => $sysMsg);
echo json_encode($outputData);

?>

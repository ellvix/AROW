<?php

// file upload handler for BibTex files

$errorMsg = "";
$sysMsg = "";
$uploadType = "file";
$filePath = "";
$testingLevel = 0;
$id = 0;
$fileContents = "";

// get folder info
$isDirSet = false;
if ( ! isset ( $_SESSION_['folder_id'] ) ) {
    $isDirSet = GetNewId();
}
if ( ! $isDirSet ) {
    $errorMsg .= "<p>Error creating new ID.</p>\n";
}

if ( $isDirSet ) {

    $id = $_SESSION['folder_id'];
    $path = 'output/' . $id;

    // actual file upload. Do we have an actual file, or text?
    if ( empty($_FILES) ) {
        // manual save from the textarea
        $uploadType = "textarea";
        if ( isset ( $_POST['fileName'] ) ) {
            $filePath = $path . '/' . $_POST['fileName'];
            $file = fopen($filePath , 'w');
            fwrite($file, $_POST['textarea']);
            fclose($file);

            $fileContents = $_POST['textarea'];
        } else {
            $errorMsg .= "<p>Failed to save manually entered text</p>\n";
        }
    } else {
        // actual file upload
        if ( 0 < $_FILES['file']['error'] || $id == 0 ) {
            $errorMsg .= "Error uploading this file. ";
            if ( $testingLevel > 0 ) {
                $errorMsg .= "<p>ID: $id</p>\n";
                $errorMsg .= $_FILES['file']['error'] . '<br>';
            }
        } else {
            if ( ! is_dir($path) ) {
                mkdir($path);
            }
            $filePath = $path . '/' . $_FILES['file']['name'];
            move_uploaded_file($_FILES['file']['tmp_name'], $filePath);

            $fileContents = file_get_contents($filePath);
        }
    }
}

$filePath = __DIR__ . "/" . $filePath;
$filePath = str_replace("\\", "/", $filePath);

$outputData = array("error" => $errorMsg, "ID" => $id, "message" => $sysMsg, "filePath" => $filePath, "uploadType" => $uploadType, "fileContents" => $fileContents);
echo json_encode($outputData);

?>

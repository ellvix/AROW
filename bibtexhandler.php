<?php

// file upload handler for BibTex files

$errorMsg = "";
$sysMsg = "";
$uploadType = "file";
$filePath = "";
$testingLevel = 2;
$id = 0;

// connections
$sqlIsWorking = false;
try {
    include("../inc/dbinfo.inc");
    $pdo = new PDO("mysql:host=" . DB_SERVER . ";port=3306;dbname=" . DB_DATABASE, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

    $sqlIsWorking = true;
} catch (Exception $e) {
    $sysMsg .= "<p>sql err: " . $e->getMessage() . "</p>\n";
}

if ( $sqlIsWorking ) {

    // where do we save this file? (what ID in sql?)
    $ip = $_SERVER['REMOTE_ADDR']; 

    $sql = "CALL StoreNewIPOnly(:ip_address,@id)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':ip_address', $ip, PDO::PARAM_STR);
    $stmt->execute();

    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    if ( isset ( $row[0]['id'] ) ) {
        $id = (int)$row[0]['id'];
    } else {
        $errorMsg .= "<p>Failed to save file, sql error.</p>";
    }
    if ( $testingLevel > 1 ) {
        $sysMsg .= "<p>Fetched or created non 0 ID: $id</p>\n";
    }
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
        }
    }

}

$filePath = __DIR__ . "/" . $filePath;
$filePath = str_replace("\\", "/", $filePath);

$outputData = array("error" => $errorMsg, "ID" => $id, "message" => $sysMsg, "filePath" => $filePath, "uploadType" => $uploadType);
echo json_encode($outputData);

$pdo = null; // close con

?>

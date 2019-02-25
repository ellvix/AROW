<?php

// what this file does: searches through the folder structure on /output, finds the next ID in the lot, creates that folder and returns that ID to be used elsewhere
// note: if 2 users hit this at the exact same time there will be a collision

function GetNewId() {
    $path = "./output";
    $errorMsg = "";

    // get a list of folders
    $folders = [];
    if ( is_dir($path) ) {
        if ( $dh = opendir($path) ) {
            while ( ($file = readdir($dh)) !== false ) {
                if ( filetype($path . "/" . $file) == "dir" ) {
                    if ( (int)$file > 0 ) {
                        $folders[] = (int)$file;
                    }

                }
            }
        }
    }

    if ( count($folders)> 0 ) {
        sort($folders);

        $lastDir = end($folders);
        $id = (int)$lastDir + 1; 

        //$errorMsg .= "<p>folders: " . implode(", ", $folders) . "</p>\n";
    }

    $haveId = false;
    if ( isset($id) ) {
        if ( is_int($id) ) {
            $haveId = true;
        } else {
            $errorMsg .= "<p>Last folder found can't be converted to int ($id).</p>\n";
        }
    } 
    if ( ! $haveId ) {
        $id = 1;
    }

    $isDirSet = false;
    if ( mkdir($path . "/" . $id) ) {
        $isDirSet = true;
    } else {
        // the rare instance there was a collision, try it again but skip up a bunch. This is hacky
        $id += rand(1, 20);
        if ( mkdir($path . "/" . $id) ) {
            $isDirSet = true;
        }
    }

    if ( $isDirSet ) {
        $_SESSION['folder_id'] = $id;
    }

    return $errorMsg;
}


?>

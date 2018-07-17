<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PHP Test</title>

        <link rel="stylesheet" href="src/bootstrap/css/bootstrap.min.css" >
        <link href="src/styles.css" rel="stylesheet"/>

        <script src="src/bootstrap/js/jquery-3.3.1.min.js"></script>
        <script src="src/bootstrap/js/popper.min.js"></script>
        <script src="src/bootstrap/js/bootstrap.min.js"></script>
        <script src="src/classes.js"></script>
        <script src="src/main.js"></script>

    </head>

    <body>
        <div id="header_wrapper">
            <a href="#main" class="sr-only">Skip to main content</a>
            <header class="wrapper clearfix" role="banner" aria-label="header" id="header">
                <div class="container relative">
                    <div id="psu_icon_wrapper">
                        <div id="psu_text_overlay">
                            <a href="http://psu.edu" title="The Pennsylvania State University" class="psu-link">Penn State</a>
                        </div>
                        <img alt="Penn State University" title="Penn State University" src="src/psu_logo.png">
                    </div>
                    <div id="title_wrapper" class="text-center">
                        <h1 class="title">RMD Renderer</h1>
                    </div>
                </div>
            </header>
            <nav id="topnav" role="navigation" aria-label="primary navigation">
                <ul id="topnavul" role="menubar">
                    <li><a href="/">Home</a></li>
                    <li><a href="about.html">About</a></li>
                </ul>
            </nav>
        </div>

        <main id="main">
<?php


echo "<p>writeable? </p>";

if ( is_writeable(__DIR__) ) {
    echo "<p>yeah</p>";
} else {
    echo "<p>no</p>";
}

?>
        </main>
    </body>
</html>



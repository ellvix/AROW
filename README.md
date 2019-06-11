# RMarkdown Web Renderer

This web app renders RMarkdown text in an html textarea via PHP and R, as various output types. 

## Setup

Dump all files into a php webserver area. I used a local xampp, and so dumped them all into c:/xampp/htdocs/RMDWebRenderer/.

Install R and python. Must have python 2.x and R 3.x (which is current R as of May 2018). Recommend using Anaconda to manage python installs. 

Install RMarkdown library (R command line: [install.packages("rmarkdown", repos = "https://cran.revolutionanalytics.com")])

Install tinytex(https://yihui.name/tinytex/)

Pandoc should be installed by default, but get that too if there are issues. (must have version 2.0.5 or higher)

In your worker.php file, point the $rScript to your Rscript.exe (default is c:/Program Files/R/R-3.5.0/bin/Rscript.exe). Point $rFile to your R renderer file (default is webserverLocation/R/RMDrenderer.R)

Current working demo available at arowtool.com

## Use

Should be self explanatory. Write some RMarkdown in the textarea, using the buttons or shortcuts for syntax. 

Choose the options that you'd like for your output files. Hit submit.

Your files should render and be available for download.

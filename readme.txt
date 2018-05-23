What this is and how it works.

This is a simple php install that exec's an R file that renders an rmarkdown file to pdf, docx, whatever. The long term idea of this is that we can build a web interface to create an rmd file (or just a code textarea if you know rmd), and will generate pdfs, docx, whatever. 

It works by calling this command:

exec("\"C:\\path\\to\\R\\bin\\Rscript.exe\" \"C:\\path\\to\\mainRfile.R\" \"path\\to\\RMDfile\", $output, $return);

It obvs requires R installed in the server, as well as PHP. 

mainRfile.R is basically this:
rmarkdown::render(myRMDFile)

The idea is that the mainRfile.R is unchanging, and we'll supply it an RMD file, or maybe even just a string dump. The string dump or file will be a fully created RMD text file that the user would like to render. 

Final steps will be to create a web interface (javascript mostly) to allow the user to create an RMD file without understanding RMD.

# this file takes a few strings as params. First param MUST be the path to the rmd file that we're using. Next params are the output types. html, docx, pdf, pptx are the current options on the html side

library(rmarkdown)
library(stringr)

args = commandArgs(trailingOnly=TRUE)

path = "C:\\xampp\\htdocs\\RMDWebRenderer\\R\\RMD_src\\untitled.rmd"# a default path in case our param fails
if ( length(args) > 0 ) {
    path = ""
    path = args[1]

    if ( length(args) == 1 ) {
        # render some html, as default
        outputType = "html_document"
    } else {
        outputType <- c()
        if ( 'html' %in% args ) {
            outputType <- c(outputType, 'html_document')
        }
        if ( 'docx' %in% args ) {
            outputType <- c(outputType, 'docx_document')
        }
        if ( 'pdf' %in% args ) {
            outputType <- c(outputType, 'pdf_document')
        }
        if ( 'pptx' %in% args ) {
            outputType <- c(outputType, 'html_document')
        }
    }
}

rmarkdown::render(path, output_format=outputType)


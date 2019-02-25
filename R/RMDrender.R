
# this file takes a few strings as params. First param MUST be the path to the rmd file that we're using. Next params are the output types. html, docx, pdf, pptx are the current options on the html side

Sys.setenv(HOME = "/usr/lib/R") # required for pandoc to work

library(rmarkdown)
library(stringr)

args <- commandArgs(trailingOnly=TRUE)

path <- ".\\RMD_src\\untitled.rmd" # a default path in case our param fails

outputType <- c()
outputType <- c(outputType, 'all')
if ( length(args) > 0 ) {
    path <- ""
    path <- args[1]
    print(path)

    outputType <- c()
    if ( grepl('html', args[3])) {
        outputType <- c(outputType, 'html_document')
    }
    if ( grepl('docx', args[3] )) {
        outputType <- c(outputType, 'word_document')
    }
    if ( grepl('pdf', args[3] )) {
        outputType <- c(outputType, 'pdf_document')
    }
    if ( grepl('pptx', args[3] )) {
        outputType <- c(outputType, 'powerpoint_presentation')
    }
    if ( length(outputType) == 0 ) {
        # default
        outputType <- c(outputType, 'all')
    }
}

result <- tryCatch({

    fileNames <- rmarkdown::render(path, output_format=outputType, encoding="UTF-8")
    print(fileNames)
    print("R worked :)")

}, error=function(cond){
    print("R Error")
    print(paste("[", cond, "]"))
}, warning=function(cond){
    print("R Warning")
}, finally={
    print("R proccess complete")
})


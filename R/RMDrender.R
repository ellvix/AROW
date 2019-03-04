
# this file takes a few strings as params. First param MUST be the path to the rmd file that we're using. Next params are the output types. html, docx, pdf, pptx are the current options on the html side

Sys.setenv(HOME = "/usr/lib/R") # required for pandoc to work

args <- commandArgs(trailingOnly=TRUE)

# set outputType to all types caught in the arguments passed in
outputType <- c()
outputType <- c(outputType, 'all')
if ( length(args) > 0 ) {
    path <- ""
    path <- args[1]
    #print(path)

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

# run pandoc render foreach outputType
arow_render <-
    function(outputType) {
        return(tryCatch(rmarkdown::render(path, output_format = outputType, encoding="UTF-8"), error=function(e) NULL))
    }
fileNames <- lapply(outputType, arow_render)

# we pass this back to php with the output string, and we wrap each file name in specific text so back in php we can regex through all the garbage output from R and find the fileNames (I'd rather use return, but I can't figure it out atm)
out <- paste(fileNames,collapse="|HERESAFILE|")
out <- paste("|HERESAFILE", out, "HERESAFILE|",sep="|")
print(out)
#fileNames <- unlist(fileNames)



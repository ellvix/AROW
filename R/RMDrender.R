#options(encoding="UTF-8")

# this file takes a few strings as params. First param MUST be the path to the rmd file that we're using. Next params are the output types. html, docx, pdf, pptx are the current options on the html side

Sys.setenv(HOME = "/usr/lib/R") # required for pandoc to work

args <- commandArgs(trailingOnly=TRUE)
print(paste(args, sep=", "))

# set outputType to all types caught in the arguments passed in
if ( length(args) > 0 ) {
    # Define path variables:
    file_path <- args[1]
    bib_path <- dirname(file_path)  # Exclude the last file name from the full path to obtain the current directory which user_bib_files are also uploaded.
    csl_path <- "/var/www/html/src/csl"
    #csl_path <- "/AROW/src/csl"
    csl_file <- args[4]

    # Checking whether any bib extention file exists, and save the bib_file_name as a string vector.
    bib_file <- list.files(path = bib_path, pattern = "(*.bib)$")

    # "bibliography" and "csl" fields will be forced to be rendered only when there was user-upload bib_files are detected:
    if(length(bib_file) > 0) {
        # bib and csl variable definitions
        bib_file <- paste0(bib_path, "/", bib_file)  # Resaving `bib_file` as path/to/file format for each bib file.
        csl_file <- paste0(csl_path, "/", csl_file)  # Resaving `csl_file` as path/to/file format.
        print(paste(csl_file, sep=", "))

        # Pandoc args definitions
        bib_arg <- paste0("--bibliography=", bib_file)
        csl_arg <- paste0("--csl=", csl_file)
        bib_csl_args <- list(pandoc_args = c(bib_arg, csl_arg))
    } else {
        # Use NULL when no bib file is detected, and it will not add any bibliography or csl field in user YAML:
        bib_csl_args <- NULL
    }


    outputType <- as.character()
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
    if ( grepl('epub', args[3] )) {
        outputType <- c(outputType, 'epub_book')
    }
    if ( length(outputType) == 0 ) {
        # default
        outputType <- 'all'
    }
}

# run pandoc render foreach outputType
arow_render <-
    function(outputType) {
        if ( outputType == "epub_book" ) {
            return(tryCatch(rmarkdown::render(file_path, output_format = bookdown::epub_book(epub_version = "epub3"), encoding="UTF-8", output_options = bib_csl_args), error=function(e) NULL))
        } else {
            return(tryCatch(rmarkdown::render(file_path, output_format = outputType, encoding="UTF-8", output_options = bib_csl_args), error=function(e) NULL))
        }
    }

sink('/var/www/html/debug/jy_debug.txt')
cat(readLines(file_path), sep="\n")
print(paste0("The default file format caught from the given rmd file is: ", rmarkdown::default_output_format(file_path)$name)) # returns HTML. THIS IS BAD
# The following line shows the default file type of another file that I have put in `/var/www/html/debug/constant_comparison.rmd` to see if this R script can parse any file output format correctly:
paste0("In comparison, the default output type caught from constant file YAML is: ", rmarkdown::default_output_format("/var/www/html/debug/constant_comparison.rmd")$name)

if(outputType == "all") {
    fileNames <- rmarkdown::render(file_path, output_format="all", encoding="UTF-8", output_options = bib_csl_args)
} else {
    fileNames <- lapply(outputType, arow_render)
}
sink()


# we pass this back to php with the output string, and we wrap each file name in specific text so back in php we can regex through all the garbage output from R and find the fileNames (I'd rather use return, but I can't figure it out atm)
out <- paste(fileNames,collapse="|HERESAFILE|")
out <- paste("|HERESAFILE", out, "HERESAFILE|",sep="|")
print(out)
#fileNames <- unlist(fileNames)





# this file takes a few strings as params. First param MUST be the path to the rmd file that we're using. Next params are the output types. html, docx, pdf, pptx are the current options on the html side

Sys.setenv(HOME = "/usr/lib/R") # required for pandoc to work

library(rmarkdown)
library(stringr)

args = commandArgs(trailingOnly=TRUE)

path = ".\\RMD_src\\untitled.rmd"# a default path in case our param fails

if ( length(args) > 0 ) {
    path = ""
    path = args[1]
    print(path)
}

result = tryCatch({

    rmarkdown::render(path, output_format="all", encoding="UTF-8")

}, error=function(cond){
    print("R Error")
    print(paste("[", cond, "]"))
}, warning=function(cond){
    print("R Warning")
}, finally={
    print("R proccess complete")
})


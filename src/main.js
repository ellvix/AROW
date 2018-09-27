
/*
 *
 * Scripts for the RMarkdown renderer webpage
 * Created Summer 2018 Sean McCurry
 *
 */


$(document).ready(function() {
    Init();
    SetEvents();
    TestingShit();
});

// global vars AHAHAHAHAHA TRY AND STOP ME
var bibFiles = {};

function Init() {
    // create edit menu based on stuff we have here
    CreateMenu();
    SetDefaults();

    // bibtex setup
    bibFiles = [];
}
function TestingShit() {

    // bibtext modal work
    //$('#bibtex_modal').modal('show');
}
function SetEvents() {
    // custom header triggers
    $(document).on('click', '#advanced_options_trigger', function() {
        if ( $(this).html() == "Show Advanced Options" ) {
            $(this).html('Hide Advanced Options');
            $('#advanced_options_wrapper').removeClass('hidden');
        } else {
            $(this).html('Show Advanced Options');
            $('#advanced_options_wrapper').addClass('hidden');
        }
    });
    $(document).on('click', '.cust_header_del_trigger', function() {
        $(this).parent().parent().remove();
    });
    $(document).on('click', '#cust_header_new_trigger', function() {
        MakeNewHeaderItem();
    });

    $(document).on('click', '#main_submit', function() {
        SubmitData();
    });

    // go to search box: alt + /
    $(document).on('keydown', 'body', function(e) {
        if ( ( e.keyCode == 191 && e.altKey ) ) {
            $('#menu_search').dropdown('toggle');
        }
    });
    $(document).on('shown.bs.dropdown', '#menu_search_wrapper', function() {
        $('#search_shortcuts_input').val('');
        FilterSearch();

        $('#search_shortcuts_input').focus();
    });
    $(document).on('keyup', '#search_shortcuts_input', function(e) {
        FilterSearch();
    });

    // arrow up and down to search box
    $(document).on('keyup', '#menu_search_ddl > div > button:not(.hidden), #menu_search_ddl > input#search_shortcuts_input', function(e) {
        if ( e.keyCode == 40 || e.keyCode == 38 ) {
            var currentSet = $('#menu_search_ddl > div > button:not(.hidden), #menu_search_ddl > input#search_shortcuts_input');
            var currentIndex = currentSet.index(this);

            if ( e.keyCode == 40 && currentIndex == 0 ) {
                $(currentSet[currentIndex+1]).focus();
            } else if ( e.keyCode == 38 && currentIndex == 1 ) {
                $(currentSet[currentIndex-1]).focus();
            }
        }

    });

    // go to edit menu
    $(document).on('keyup', 'body', function(e) {
        // triggers for menu all start with alt ctrl, so 
        // AND YES I KNOW IT WOULD BE BETTER TO WRITE THIS TO PULL FROM THE CLASS.
        if ( e.ctrlKey && e.altKey ) {
            var allMenus = GetFullMenuVar();
            for ( var i = 0 ; i < allMenus.length ; i++ ) {
                if ( allMenus[i].key == e.keyCode ) {
                    $('#menu_' + i).focus(); 
                    $('#menu_' + i).dropdown('toggle');
                }
            }

        }
    });

    // edit menu events
    // run from key binding
    $(document).on('keydown', '#rmd_text', function(e) {
        // all edit events MUST start with ctrl or alt, so, 
        // exceptions first
        if ( e.shiftKey && e.ctrlKey && ! e.altKey && e.keyCode == 70 ) {
            InitReferenceInsert();
        }
        else if ( e.ctrlKey || e.altKey ) {
            RunEditFromKey(e);
        }
    });

    // bibtex events
    $(document).on('change', '#bibtex_upload_file', function() {
        FileUploadHandler();
    });
    $(document).on('hide.bs.modal', '#bibtex_modal', function() {
        MaybeCreateFileFromTextarea();
    });
    $(document).on('click', '.bib_delete', function() {
        BibtexRemoveFile(this);
    });
    $(document).on('keydown', '#citation_filter', function() {
        FilterCitations();
    });
    $(document).on('click', '#citation_clear_filter', function() {
        $('#citation_filter').val('');
        FilterCitations();
        $('#citation_filter').focus();
    });
    $(document).on('click', '.citation_insert_button', function() {
        InsertInTextareaAtCursor($('#rmd_text')[0], '@' + $(this).attr('data-article'));
        $('#citation_modal').modal('hide');
    });

    // run from button
    $(document).on('click', '#edit_menu > div > div > button, #menu_search_ddl > #autocomplete_list > .dropdown-item', function(e) {
        // exceptions first
        if ( $(this).html().indexOf("Reference") != -1 ) {
            InitReferenceInsert();
        } else {
            RunEditFromButton(this);
        }
    });
}

function SetDefaults() {
    // date field in custom header area
    // todo
    
}

function RunEditFromKey(e) {
    // look through all current edit options for a key combo match
    var allMenus = GetFullMenuVar();
    for ( var k = 0 ; k < allMenus.length ; k++ ) {
        var numItems = allMenus[k].items.length;
        for ( var i = 0 ; i < numItems ; i++ ) {
            var thisItem = allMenus[k].items[i];
            if ( thisItem.isCtrl == e.ctrlKey && thisItem.isAlt == e.altKey && thisItem.isShift == e.shiftKey ) {
                if ( thisItem.key == e.keyCode) {
                    // got a match, run the edit
                    EditText(thisItem)
                } else if ( typeof(thisItem.key2) != "undefined" ) {
                    if ( thisItem.key2 == e.keyCode ) {
                        // this one has an alt key, and there's a match. Run the edit
                        EditText(thisItem)
                    }
                }
            }
        }
    }
}
function RunEditFromButton(sender) {
    var key = $(sender).attr('data-item');
    var menuIndex = Number(key.substr(13, 1)); // note: this will crash if we have more than 9 menus, and will need a regex lookup instead
    var itemIndex = Number(key.substr(15)); 
    var allMenus = GetFullMenuVar();
    var thisItem = allMenus[menuIndex].items[itemIndex];

    EditText(thisItem);
}

function FilterSearch() {
    var filterText = $('#search_shortcuts_input').val().toLowerCase();

    // we duplicate the potential list, filter it, and add it
    var list = $('#search_storage > div').clone();

    list.find('button.dropdown-item').each(function() {
        var thisText = $(this).html().toLowerCase();
        var show = thisText.indexOf(filterText) != -1 ;

        if (show && filterText.length > 0) {
        } else {
            $(this).remove();
        }
    });

    $('#menu_search_ddl > #autocomplete_list').remove();
    $('#menu_search_ddl').append(list);


    var numItems = list.find('button.dropdown-item').length;
    if ( numItems > 0 ) {
        $('#live_sr_search').html("<p>" + numItems + " available</p>\n");

        $('#search_shortcuts_input').attr('aria-owns', 'autocomplete_list');
        $('#search_shortcuts_input').attr('aria-activedescendant', 'autocomplete_list');
        $('#search_shortcuts_input').attr('aria-expanded', 'true');
    } else {
    }


}

function SubmitData() {

    // init
    $('#output').html('');
    $('#system_message').html('');

    // add header info (if any)
    var headerHtml = "";
    headerHtml += "---\n";
    if ( ! $('#advanced_options_wrapper').hasClass('.hidden') ) {
        $('.cust_header_row').each(function() {
            var thisKey = $(this).find('.header_key').val();
            var thisVal = $(this).find('.header_val').val();
            
            if ( thisKey.length > 0 && thisVal.length > 0 ) {
                headerHtml += thisKey + ': "' + thisVal + '"\n';
            }
        });
    }

    // add bibtex info (if any)
    if ( bibFiles.length > 0 ) {
        headerHtml += "bibliography: \n";
        for ( var i = 0 ; i < bibFiles.length ; i++ ) {
            headerHtml += "- " + bibFiles[i].fileName + "\n";
        }
    }

    headerHtml += "---\n";
    // end header info

    // compile data
    var data = {};
    data.rmd_name = $('#rmd_name').val();
    data.rmd_text = headerHtml + $('#rmd_text').val();
    data.formats = "";
    $('.format_choice').each(function() {
        if ( $(this).prop('checked') ) {
            data.formats += " " + $(this).attr('id').substr(7);
        }
        data.formats = data.formats.trim();
    });

    console.log(data.rmd_text);

    // send
    DisplayMessage("Processing...");
    $.ajax({
        url: "worker.php",
        type: "POST", 
        data: data,
        success: function(r) {
            //console.log(r);
            var response = JSON.parse(r);
            var err = response.error;
            if ( err.toString() == "" ) {
                // success
                DisplaySuccess(response);

            } else {
                // error string detected
                DisplayMessage("Processing error");
                DisplayMessage(response.error, "output");
            }
        }
    });
}

function DisplaySuccess(response) { 
    var msg = "";
    var downloadMessage = "";
    var sysMessage = "";

    msg += "<p>Completed successfully!</p>\n";

    // display all files that were created
    var allFileNames = GetAllFileNames();
    if ( allFileNames.length == 0 ) {
        downloadMessage += '<p>No files created</p>\n';
    } else {
        for ( var i = 0 ; i < allFileNames.length ; i++ ) {
            // make sure they exist before outputting a link
            if ( typeof(response.created_filenames) != "undefined" ) {
                if ( response.created_filenames.indexOf(allFileNames[i]) != -1 ) {
                    downloadMessage += '<p><a href="output/' + response.ID + "/" + allFileNames[i] + '" target="_blank">Download ' + allFileNames[i] + '</a></p>\n';
                }
            }
        }
    }

    if ( typeof(response.message) != "undefined" ) {
        sysMessage += "<div>" + response.message + "</div>\n";
    }


    msg = msg.replace(/\n/g, "<br>");
    msg = msg.replace(/\r/g, "<br>");
    sysMessage = sysMessage.replace(/\n/g, "<br>");
    sysMessage = sysMessage.replace(/\r/g, "<br>");

    DisplayMessage(downloadMessage, "output")
    DisplayMessage(msg, "live_sr")
    DisplayMessage(msg, "live_visual")
    DisplayMessage(sysMessage, "system_message")
}

function GetAllFileNames() {
    var baseName = $('#rmd_name').val();
    var fileNames = [];

    $('.format_choice').each(function() {
        if ( $(this).prop('checked') ) {
            fileNames.push(baseName + "." + $(this).attr('id').substr(7));
        }
    });

    return fileNames;
}

function CreateMenu() {
    var menuHtml = ""; // individual shortcut menus
    var searchHtmlFull = ""; // all in one searchable shortcut menu
    var searchHtml = "";
    var allMenus = GetFullMenuVar();

    searchHtmlFull += '<div class="inline btn-group" role="group" id="menu_search_wrapper">\n';
    searchHtmlFull += '<button class="btn btn-secondary dropdown-toggle" type="button" id="menu_search" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">Search (Alt + /)<i class="caret"></i></button>\n';
    searchHtmlFull += '<div class="dropdown-menu" aria-labelledby="menu_search" id="menu_search_ddl">\n';
    searchHtmlFull += '<input type="text" class="form-control" id="search_shortcuts_input" placeholder="Search Shortcuts" aria-label="Search Shortcuts" role="combobox" aria-autocomplete="list" aria-haspopup="false" aria-expanded="false">\n';
    searchHtml += '<div role="listbox" id="autocomplete_list" aria-expanded="true">\n';


    for ( var k = 0 ; k < allMenus.length ; k++ ) {
        var menu = allMenus[k];
        var menuId = "menu_" + k;
        var menuItems = menu.items;

        menuHtml += '<div class="inline btn-group" role="group">\n';
        menuHtml += '<button class="btn btn-secondary dropdown-toggle" type="button" id="' + menuId + '" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">' + menu.label + ' <i class="caret"></i>';
        if ( typeof(allMenus[k].key) != "undefined" ) {
            menuHtml += '<span class="sr-only"> (';
            if ( menu.isCtrl ) {
                menuHtml += "Ctrl + ";
            }
            if ( menu.isAlt ) {
                menuHtml += "Alt + ";
            }
            if ( menu.isShift ) {
                menuHtml += "Shift + ";
            }
            menuHtml += menu.keyName + ')</span>';
        }
        menuHtml += '</button>\n';
        menuHtml += '<div class="dropdown-menu" aria-labelledby="' + menuId + '">\n';

        var numItems = menuItems.length;
        for ( var i = 0 ; i < numItems ; i++ ) {
            var thisItem = menuItems[i];
            var buttonText = thisItem.label;
            buttonText += '<span class="key_binding_label">(';
            if ( thisItem.isCtrl ) {
                buttonText += "Ctrl + ";
            }
            if ( thisItem.isAlt ) {
                buttonText += "Alt + ";
            }
            if ( thisItem.isShift ) {
                buttonText += "Shift + ";
            }
            buttonText += thisItem.keyName + ')</span>';

            var buttonHtml = '<button class="invis_button dropdown-item" data-item="edit_trigger_' + k + '_' + i + '">' + buttonText + '</button>\n';
            var listHtml = '<button role="option" class="invis_button dropdown-item" data-item="edit_trigger_' + k + '_' + i + '">' + buttonText + '</button>\n';
            menuHtml += buttonHtml;
            searchHtml += listHtml;
        }
        
        menuHtml += "</div>\n";
        menuHtml += "</div>\n";
    }


    searchHtml += "</div>\n";
    searchHtmlFull += "</div>\n";
    searchHtmlFull += "</div>\n";

    // store the actual list somewhere else
    $('#search_storage').html(searchHtml);

    var html = menuHtml + searchHtmlFull;

    $('#edit_menu').html(html);
}

function MakeNewHeaderItem() {
    var newItem = $('#cust_header_template').clone();
    var thisItemNumber = Number($('.cust_header_row').length);
    if ( isNaN(thisItemNumber) ) {
        thisItemNumber = 0;
    }

    newItem.removeAttr('id');
    newItem.removeClass('hidden');
    newItem.addClass('cust_header_row');

    newItem.find('.header_key').attr('id', 'cust_header_key_' + thisItemNumber);
    newItem.find('.header_val').attr('id', 'cust_header_val_' + thisItemNumber);

    $('#cust_header_template').before(newItem);
    
}

function FileUploadHandler() {
    input = document.getElementById('bibtex_upload_file');

    var file = $('#bibtex_upload_file').prop('files')[0];
    var data = new FormData();
    data.append('file', file);
    $.ajax({
        url: 'bibtexhandler.php', 
        dataType: 'text', 
        cache: false, 
        contentType: false,
        processData: false, 
        data: data, 
        type: 'post', 
        success: function(r) {
            console.log(r);
            var response = JSON.parse(r);
            FileUploadFinisher(response);
        }
    });
}
function MaybeCreateFileFromTextarea() {
    // when we close the bibtex modal, if there's content in the textarea, save it

    var data = {};
    data.textarea = $('#bibtex_textarea').val().trim();
    data.fileName = "manual.bib";

    if ( data.textarea.length > 0 ) {
        var thisBib = {};

        console.log('sending jsondata');
        console.log(data);

        $.ajax({
            url: "bibtexhandler.php",
            data: data, 
            dataType: 'json',
            type: 'post', 
            success: function(r) {
                console.log(r);
                FileUploadFinisher(r);
            }
        });
    }

}

function FileUploadFinisher(response) {
    // on file input change, we add this file to the 'stack' (by which we mean storing its text internally), and update the interface to show the file was loaded (and can be deleted

    if ( typeof(response.error) != 'undefined' ) {
        if ( response.error.length > 0 ) {
            DisplayMessage(response.error, 'error');
            return;
        }
    } else {
        DisplayMessage('There was an issue saving the file', 'error');
        return;
    }


    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        console.log("Your browser lacks the capability to save and convert this file");
        return;
    }   

    input = document.getElementById('bibtex_upload_file');
    if (!input) {
        console.log("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        console.log("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        if ( response.uploadType == "textarea" ) {
            var thisBib = {};
            bibFiles.push(thisBib);

            // parse and save BibTex
            var b = new BibtexParser();
            b.setInput($('#bibtex_textarea').val());
            b.bibtex();
            var thisBib = {};
            thisBib.fileName = response.filePath;
            thisBib.data = b.getEntries();

            bibFiles.push(thisBib);
        } else {
            DisplayMessage("Try another file", "error");
        }
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = function() {
            DisplayMessage('file loaded', 'live');
            var txt = fr.result;

            // parse and save BibTex
            var b = new BibtexParser();
            b.setInput(txt);
            b.bibtex();
            var thisBib = {};
            thisBib.fileName = response.filePath;
            thisBib.data = b.getEntries();
            bibFiles.push(thisBib);

            var justTheFileName = thisBib.fileName.split('/').pop();

            // update UI to show this one
            var bibHtml = $('#bib_list_template').clone();
            bibHtml.find('.bib_filename').html(justTheFileName);
            bibHtml.find('.bib_file_length').html(Object.keys(thisBib.data).length + " articles");
            bibHtml.removeAttr('id');
            bibHtml.removeClass('hidden');
            $('#bib_list_template').before(bibHtml);

            $('#bibtex_upload_file').val('');
        };

        fr.readAsText(file);
        //fr.readAsDataURL(file); // doesn't work
    }
}

function BibtexRemoveFile(sender) {
    // remove data, and remove this li

    var fileName = $(sender).find('.bib_filename').html();
    var numItems = bibFiles.length;
    for ( var i = 0 ; i < numItems ; i++ ) {
        if ( bibFiles[i].fileName.indexOf(fileName) > -1 ) {
            bibFiles.splice(i, 1);
            break;
        }
    }

    $(sender).parent().remove(); 
}

function InitReferenceInsert() {
    // add all items to list to be filtered

    // first we'll add them to an array to sort
    var bibArr = [];
    var sortArr = [];
    var numFiles = bibFiles.length;
    for ( var i = 0 ; i < numFiles ; i++ ) {
        for ( var key in bibFiles[i].data ) {
            var thisBib = bibFiles[i].data[key];
            if ( ! bibArr.hasOwnProperty(key) ) { // avoid duplicates
                bibArr.push(thisBib); 
                sortArr.push(thisBib.TITLE); // we'll sort by title
            }
        }
    }

    // sort
    var data = [];
    for (var i = 0 ; i < sortArr.length ; i++) {
        data.push([sortArr[i], bibArr[i]]);
    }
    data.sort(function (a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    });

    // add to list
    $('#citation_list').html('');
    var numItems = data.length;
    for ( var i = 0 ; i < numItems ; i++ ) {
        var html = '';
        html += '<li class="list-group-item">\n';
        html += '<button class="invis_button citation_insert_button" data-article="' + data[i][1].BIBTEXKEY + '" role="button" title="' + data[i][1].TITLE + '">';
        html += data[i][1].TITLE;
        html += '</button>\n';
        html += '</li>\n';

        $('#citation_list').append(html);
    }


    $('#citation_modal').modal('show');
}

function FilterCitations() {
    var filterText = $('#citation_filter').val().toLowerCase();

    $('#citation_list > li').each(function() {
        var thisText = $(this).find('button').html().toLowerCase();

        if ( filterText.length == 0 || thisText.indexOf(filterText) != -1 ) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    });
}

function EditText(item) {
    // idea: we want to insert pre / post text from the item around our current selection 

    $('#rmd_text')[0].focus();

    var currentHighlight = window.getSelection().toString();
    var insertThis = item.contentPre + currentHighlight + item.contentPost;

    InsertInTextareaAtCursor($('#rmd_text')[0], insertThis);
}

function InsertInTextareaAtCursor(myField, myValue) {
    // stolen from https://stackoverflow.com/questions/11076975/insert-text-into-textarea-at-cursor-position-javascript

    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } 
    // otherwise, just append it
    else {
        myField.value += myValue;
    }

    $(myField).focus();
}

function DisplayMessage(msg, where) {
    if ( typeof(where) == "undefined" ) {
        var where = "live";
    }

    if ( where == "system_message" ) {
        msg = "<hr>\n<h3>System log: </h3>\n" + msg;
    }

    if ( where == "error" ) {
        $('#error_modal .modal-body').html(msg);
        $('#error_modal').modal('show');
    }

    msg = msg.replace(/\n/g, "<br>");
    msg = msg.replace(/\r/g, "<br>");

    $('#' + where).html(msg);
}


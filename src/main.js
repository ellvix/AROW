
$(document).ready(function() {
    Init();
    SetEvents();
});

function Init() {
    // create edit menu based on stuff we have here
    CreateMenu();

}
function SetEvents() {
    $(document).on('click', '#main_submit', function() {
        SubmitData();
    });

    // go to search box: alt + /
    $(document).on('keydown', 'body', function(e) {
        if ( e.keyCode == 191 && e.altKey ) {
            $('#menu_search_ddl').dropdown('toggle');
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

    // edit menu events
    // run from key binding
    $(document).on('keydown', '#rmd_text', function(e) {
        // all edit events MUST start with ctrl or alt, so, 
        // exceptions first
        if ( e.ctrlKey || e.altKey ) {
            RunEditFromKey(e);
        }
    });
    // run from button
    $(document).on('click', '#edit_menu > div > div > button', function() {
        RunEditFromButton(this);
    });
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
    var menuIndex = Number($(sender).attr('id').substr(13, 1)); // note: this will crash if we have more than 9 menus, and will need a regex lookup instead
    var itemIndex = Number($(sender).attr('id').substr(15)); 
    var allMenus = GetFullMenuVar();
    var thisItem = allMenus[menuIndex].items[itemIndex];

    EditText(thisItem);
}

function FilterSearch() {
    var filter = $('#search_shortcuts_input').val().toLowerCase();

    // we duplicate the potential list, filter it, and add it
    var list = $('#search_storage > div').clone();

    list.find('button.dropdown-item').each(function() {
        var thisText = $(this).html().toLowerCase();
        var show = thisText.indexOf(filter) != -1 ;

        if (show && filter.length > 0) {
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

    $('#output').html('');
    $('#system_message').html('');

    var data = {};
    data.rmd_name = $('#rmd_name').val();
    data.rmd_text = $('#rmd_text').val();
    data.formats = "";
    $('.format_choice').each(function() {
        if ( $(this).prop('checked') ) {
            data.formats += " " + $(this).attr('id').substr(7);
        }
        data.formats = data.formats.trim();
    });

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

    searchHtmlFull += '<div class="inline" id="menu_search_wrapper">\n';
    searchHtmlFull += '<button class="btn btn-default dropdown-toggle" type="button" id="menu_search" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">Search (Alt + /)<i class="caret"></i></button>\n';
    searchHtmlFull += '<div class="dropdown-menu" aria-labelledby="menu_search" id="menu_search_ddl">\n';
    searchHtmlFull += '<input type="text" class="form-control" id="search_shortcuts_input" placeholder="Search Shortcuts" aria-label="Search Shortcuts" role="combobox" aria-autocomplete="list" aria-haspopup="false" aria-expanded="false">\n';
    searchHtml += '<div role="listbox" id="autocomplete_list" aria-expanded="true">\n';


    for ( var k = 0 ; k < allMenus.length ; k++ ) {
        var menuName = allMenus[k].label;
        var menuId = "menu_" + k;
        var menuItems = allMenus[k].items;

        menuHtml += '<div class="inline">\n';
        menuHtml += '<button class="btn btn-default dropdown-toggle" type="button" id="' + menuId + '" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">' + menuName + ' <i class="caret"></i></button>\n';
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

            var buttonHtml = '<button class="invis_button dropdown-item" id="edit_trigger_' + k + '_' + i + '">' + buttonText + '</button>\n';
            var listHtml = '<button role="option" class="invis_button dropdown-item">' + buttonText + '</button>\n';
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
    } else {
        myField.value += myValue;
    }
}

function DisplayMessage(msg, where) {
    if ( typeof(where) == "undefined" ) {
        var where = "live";
    }

    if ( where == "system_message" ) {
        msg = "<hr>\n<h3>System log: </h3>\n" + msg;
    }

    msg = msg.replace(/\n/g, "<br>");
    msg = msg.replace(/\r/g, "<br>");

    $('#' + where).html(msg);
}

// todo: 
// add key combo to button

// wishlist:
// key binding thing

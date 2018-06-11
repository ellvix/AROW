
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

    // edit menu events
    // run from key binding
    $(document).on('keydown', '#rmd_text', function(e) {
        // all edit events MUST start with ctrl or alt, so, 
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

function SubmitData() {
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
            console.log(r);
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
                    downloadMessage += '<p><a href="output/' + allFileNames[i] + '" target="_blank">Download ' + allFileNames[i] + '</a></p>\n';
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
    DisplayMessage(msg, "live")
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
    var html = "";
    var allMenus = GetFullMenuVar();

    for ( var k = 0 ; k < allMenus.length ; k++ ) {
        var menuName = allMenus[k].label;
        var menuId = "menu_" + k;
        var menuItems = allMenus[k].items;

        html += '<div class="inline">\n';
        html += '<button class="btn btn-default dropdown-toggle" type="button" id="' + menuId + '" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">' + menuName + ' <i class="caret"></i></button>\n';
        html += '<div class="dropdown-menu" aria-labelledby="' + menuId + '">\n';

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

            html += '<button class="invis_button dropdown-item" id="edit_trigger_' + k + '_' + i + '">' + buttonText + '</button>\n';
        }
        
        html += "</div>\n";
        html += "</div>\n";
    }

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

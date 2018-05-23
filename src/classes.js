
function GetFullMenuVar() {
    var allMenus = [];

    var menuHeading = {};
    var menuItem = {}; 

    // define all menu items for each set

    menuHeading.label = "Insert";
    menuHeading.items = [];

    menuItem = {};
    menuItem.label = "Header / Preamble";
    menuItem.key = 72; 
    menuItem.keyName = "H";
    menuItem.isShift = true;
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.contentPre = "---\n";
    menuItem.contentPre += "title: \"\"\n";
    menuItem.contentPre += "author: \"\"\n";
    menuItem.contentPre += "date: \"\"\n";
    menuItem.contentPre += "output: html_document\n";
    menuItem.contentPre += "---\n";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "URL";
    menuItem.key = 85; 
    menuItem.keyName = "U";
    menuItem.isShift = true;
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.contentPre = " [alt text](http://) ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Email";
    menuItem.key = 69; 
    menuItem.keyName = "E";
    menuItem.isShift = true;
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.contentPre = " [alt text](mailto:) \n";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Reference";
    menuItem.key = 18; 
    menuItem.keyName = "R";
    menuItem.isShift = true;
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.contentPre = " ![alt tag](filename) ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Header 1";
    menuItem.key = 49; 
    menuItem.keyName = "1";
    menuItem.isShift = false;
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.contentPre = "\n# ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Header 2";
    menuItem.key = 50; 
    menuItem.keyName = "2";
    menuItem.isShift = false;
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.contentPre = "\n## ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Header 3";
    menuItem.key = 51; 
    menuItem.keyName = "3";
    menuItem.isShift = false;
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.contentPre = "\n### ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Header 4";
    menuItem.key = 52; 
    menuItem.keyName = "4";
    menuItem.isShift = false;
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.contentPre = "\n#### ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Header 5";
    menuItem.key = 53; 
    menuItem.keyName = "5";
    menuItem.isShift = false;
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.contentPre = "\n##### ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Header 6";
    menuItem.key = 54; 
    menuItem.keyName = "6";
    menuItem.isShift = false;
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.contentPre = "\n###### ";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);
    
    allMenus.push(menuHeading);

    // ----------------------------------------

    menuHeading = {};
    menuHeading.label = "Format";
    menuHeading.items = [];

    menuItem = {};
    menuItem.label = "Bold";
    menuItem.key = 66; 
    menuItem.keyName = "B";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = false;
    menuItem.contentPre = "**";
    menuItem.contentPost = "**";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Italic";
    menuItem.key = 73; 
    menuItem.keyName = "I";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = false;
    menuItem.contentPre = "*";
    menuItem.contentPost = "*";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Code";
    menuItem.key = 192; 
    menuItem.keyName = "`";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = false;
    menuItem.contentPre = "`";
    menuItem.contentPost = "`";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Maths Mode";
    menuItem.key = 192; 
    menuItem.keyName = "4";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = false;
    menuItem.contentPre = "$";
    menuItem.contentPost = "$";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Bold";
    menuItem.key = 66; 
    menuItem.keyName = "66";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = false;
    menuItem.contentPre = "**";
    menuItem.contentPost = "**";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Round Brackets";
    menuItem.key = 57; 
    menuItem.keyName = "(";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "(";
    menuItem.contentPost = ")";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Square Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "[";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = false;
    menuItem.contentPre = "[";
    menuItem.contentPost = "]";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Curly Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "{";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "{";
    menuItem.contentPost = "}";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Round Brackets (math)";
    menuItem.key = 48; 
    menuItem.keyName = ")";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\left(";
    menuItem.contentPost = "\\right)";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Square Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "]";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = false;
    menuItem.contentPre = "\\left[";
    menuItem.contentPost = "\\right]";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Curly Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "}";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\left{";
    menuItem.contentPost = "\\right}";
    menuHeading.items.push(menuItem);






    allMenus.push(menuHeading);

    return allMenus;
}


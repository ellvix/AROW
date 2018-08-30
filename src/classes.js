
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
    menuItem.keyName = "F";
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
    menuItem.keyName = "`<span class='sr-only'>tilde</span>";
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
    menuItem.label = "Round Brackets";
    menuItem.key = 57; 
    menuItem.keyName = "(<span class='sr-only'>open parenthesis</span>";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "(";
    menuItem.contentPost = ")";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Square Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "[<span class='sr-only'>open square bracket</span>";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = false;
    menuItem.contentPre = "[";
    menuItem.contentPost = "]";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Curly Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "{<span class='sr-only'>open curly bracket</span>";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "{";
    menuItem.contentPost = "}";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Round Brackets (math)";
    menuItem.key = 48; 
    menuItem.keyName = ")<span class='sr-only'>close parenthesis</span>";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\left(";
    menuItem.contentPost = "\\right)";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Square Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "]<span class='sr-only'>close square bracket</span>";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = false;
    menuItem.contentPre = "\\left[";
    menuItem.contentPost = "\\right]";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Curly Brackets";
    menuItem.key = 219; 
    menuItem.keyName = "}<span class='sr-only'>close curly bracket</span>";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\left{";
    menuItem.contentPost = "\\right}";
    menuHeading.items.push(menuItem);

    allMenus.push(menuHeading);

    // ----------------------------------------

    menuHeading = {};
    menuHeading.label = "Maths Symbols";
    menuHeading.items = [];

    menuItem = {};
    menuItem.label = "Infinity";
    menuItem.key = 68; 
    menuItem.keyName = "D";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\infty{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Times";
    menuItem.key = 56; 
    menuItem.key2 = 106; 
    menuItem.keyName = "*";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\times{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Partial Derivative";
    menuItem.key = 68; 
    menuItem.keyName = "D";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\partial{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Plus or Minus";
    menuItem.key = 187; 
    menuItem.keyName = "=";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\pm";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Minus or Plus";
    menuItem.key = 189; 
    menuItem.key2 = 109; 
    menuItem.keyName = "-<span class='sr-only'>minus</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\mp";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Less Than or Equal";
    menuItem.key = 188; 
    menuItem.keyName = "<";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\leq";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Greater Than or Equal";
    menuItem.key = 190; 
    menuItem.keyName = ">";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\geq";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Not Equal";
    menuItem.key = 49; 
    menuItem.keyName = "!<span class='sr-only'>exclamation point</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\ne";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Left Parenthesis";
    menuItem.key = 57; 
    menuItem.keyName = "(<span class='sr-only'>open parenthesis</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\left(";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Right Parenthesis";
    menuItem.key = 48; 
    menuItem.keyName = ")<span class='sr-only'>close parenthesis</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\right)";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Left Square Bracket";
    menuItem.key = 219; 
    menuItem.keyName = "[<span class='sr-only'>open square bracket</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = false;
    menuItem.contentPre = "\\left[";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Right Square Bracket";
    menuItem.key = 221; 
    menuItem.keyName = "]<span class='sr-only'>close square bracket</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = false;
    menuItem.contentPre = "\\right]";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Left Curly Bracket";
    menuItem.key = 219; 
    menuItem.keyName = "{<span class='sr-only'>open curly bracket</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\left{";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Right Curly Bracket";
    menuItem.key = 221; 
    menuItem.keyName = "}<span class='sr-only'>close curly bracket</span>";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\right}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    allMenus.push(menuHeading);

    // ----------------------------------------

    menuHeading = {};
    menuHeading.label = "Maths Structure";
    menuHeading.items = [];

    menuItem = {};
    menuItem.label = "Square Root";
    menuItem.key = 82; 
    menuItem.keyName = "R";
    menuItem.isCtrl = true;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\sqrt{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Bar";
    menuItem.key = 66; 
    menuItem.keyName = "B";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\bar{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Absolute Value";
    menuItem.key = 65; 
    menuItem.keyName = "A";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\left|\\right|";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Fraction";
    menuItem.key = 191; 
    menuItem.key2 = 111; 
    menuItem.keyName = "/";
    menuItem.isCtrl = true;
    menuItem.isAlt = false;
    menuItem.isShift = true;
    menuItem.contentPre = "\\frac{ num }{ den }";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Summation";
    menuItem.key = 83; 
    menuItem.keyName = "S";
    menuItem.isCtrl = true;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\sum_{ lower }^{ upper }{ what }";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Integral";
    menuItem.key = 73; 
    menuItem.keyName = "I";
    menuItem.isCtrl = true;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\int_{ lower }^{ upper }{ what }";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Product";
    menuItem.key = 80; 
    menuItem.keyName = "P";
    menuItem.isCtrl = true;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\prod_{ lower }^{ upper }{ what }";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Limit";
    menuItem.key = 76; 
    menuItem.keyName = "L";
    menuItem.isCtrl = true;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\lim_{ what \\to where }{is}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Double Summation";
    menuItem.key = 68; 
    menuItem.keyName = "D";
    menuItem.isCtrl = true;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\sum_{ lower }^{ upper }{\\sum_{ lower }^{ upper }{ what }}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Double Integral";
    menuItem.key = 78; 
    menuItem.keyName = "N";
    menuItem.isCtrl = true;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\int_{ lower }^{ upper }{\\int_{ lower }^{ upper }{ what }}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    allMenus.push(menuHeading);

    // ----------------------------------------

    menuHeading = {};
    menuHeading.label = "Greek Letters";
    menuHeading.items = [];

    menuItem = {};
    menuItem.label = "Alpha";
    menuItem.key = 65; 
    menuItem.keyName = "A";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\alpha{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Beta";
    menuItem.key = 66; 
    menuItem.keyName = "B";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\beta{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Gamma";
    menuItem.key = 71; 
    menuItem.keyName = "G";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\gamma{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Delta";
    menuItem.key = 68; 
    menuItem.keyName = "D";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\delta{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Epsilon";
    menuItem.key = 69; 
    menuItem.keyName = "E";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\epsilon{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Epsilon (variant)";
    menuItem.key = 86; 
    menuItem.keyName = "V";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\varepsilon{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Zeta";
    menuItem.key = 90; 
    menuItem.keyName = "Z";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\zeta{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Eta";
    menuItem.key = 87; 
    menuItem.keyName = "W";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\eta{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Theta";
    menuItem.key = 72; 
    menuItem.keyName = "H";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\theta{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Theta (variant)";
    menuItem.key = 191; 
    menuItem.keyName = "/";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\vartheta{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Iota";
    menuItem.key = 73; 
    menuItem.keyName = "I";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\iota{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Kappa";
    menuItem.key = 75; 
    menuItem.keyName = "K";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\kappa{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Lambda";
    menuItem.key = 76; 
    menuItem.keyName = "L";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\lambda{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Mu";
    menuItem.key = 77; 
    menuItem.keyName = "M";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\mu{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Nu";
    menuItem.key = 78; 
    menuItem.keyName = "N";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\nu{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Xi";
    menuItem.key = 88; 
    menuItem.keyName = "X";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\xi{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Omicron";
    menuItem.key = 79; 
    menuItem.keyName = "O";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\omicron{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Pi";
    menuItem.key = 80; 
    menuItem.keyName = "P";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\pi{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Rho";
    menuItem.key = 82; 
    menuItem.keyName = "R";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\rho{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Sigma";
    menuItem.key = 83; 
    menuItem.keyName = "S";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\sigma{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Tau";
    menuItem.key = 84; 
    menuItem.keyName = "T";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\tau{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Upsilon";
    menuItem.key = 85; 
    menuItem.keyName = "U";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\upsilon{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Phi";
    menuItem.key = 70; 
    menuItem.keyName = "F";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\phi{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Chi";
    menuItem.key = 67; 
    menuItem.keyName = "C";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\chi{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Psi";
    menuItem.key = 89; 
    menuItem.keyName = "Y";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\psi{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    menuItem = {};
    menuItem.label = "Omega";
    menuItem.key = 190; 
    menuItem.keyName = ".";
    menuItem.isCtrl = false;
    menuItem.isAlt = true;
    menuItem.isShift = true;
    menuItem.contentPre = "\\omega{}";
    menuItem.contentPost = "";
    menuHeading.items.push(menuItem);

    allMenus.push(menuHeading);

    return allMenus;
}


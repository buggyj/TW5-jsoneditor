/*\
title: $:/plugins/bj/jsoneditor/jsoneditor.js
type: application/javascript
module-type: startup

jsoneditor adaptor

\*/

var onClickTiddlerLink;


// ;v;nt handl;r for mous; over a tiddler
var onMouseOverTiddler;


// Event handler for mouse out of a tiddler
var onMouseOutTiddler;


// Event handler for double click on a tiddler
var onDblClickTiddler;


// Event handler for clicking on toolbar close
var onClickToolbarClose;


// Event handler for clicking on toolbar close
var onClickToolbarDelete;


// Event handler for clicking on toolbar link
var onClickToolbarLink;


// Event handler for clicking on toolbar close
var onClickToolbarEdit;


// Event handler for clicking on toolbar save
var onClickToolbarSave;


// Event handler for clicking on toolbar save
var onClickToolbarUndo;
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var MIN_TEXT_AREA_HEIGHT = 100; // Minimum height of textareas in pixels

// Export name and synchronous status
exports.name = "json-editor";
exports.platforms = ["browser"];
exports.synchronous = true;
if($tw.browser) {
	require("$:/plugins/bj/jsoneditor/JSONeditor.js");
}
var instance;

var newid =0;
$tw.wiki.getTiddlerText = function(title,defaultText) {
	var tiddler = this.getTiddler(title);
	// Return undefined if the tiddler isn't found
	if(!tiddler) {
		return defaultText;
	}
	if(tiddler.fields.text !== undefined) {
		// Just return the text if we've got it
		return tiddler.fields.text;
	} else {
		// Tell any listeners about the need to lazily load this tiddler
		this.dispatchEvent("lazyLoad",title);
		// Indicate that the text is being loaded
		return null;
	}
};
exports.startup  = function() {

	var domNode = document.createElement("div");
	var domNode2 =document.createElement("div");
	var domNodemy =document.createElement("div");
    		document.body.insertBefore(domNode,document.body.firstChild);
    		    		document.body.insertBefore(domNode2,document.body.firstChild);
    		    		    		    		document.body.insertBefore(domNodemy,document.body.firstChild);
    		    		  
	domNode.innerHTML = '<div style="font-size: 11px; font-family: Verdana,Arial,Helvetica,sans-serif;" id="jsoneditortree'+newid+'"></div>';
	domNode2.innerHTML 	=	formHTML;
	domNodemy.innerHTML 	=	myhtml;
	
//mysetup(domNodemy);
	var updater =function(x){
		alert("updater!");
	}
	var test ={testing:"val"};
	instance=JSONeditor.start('jsoneditortree'+newid,domNode2.firstChild.firstChild,$tw.wiki.allTitles(),
									'$:/plugins/bj/jsoneditor/','',updater);


	newid++;

	formsetup(domNode2.firstChild);main();
};

var formHTML=	
	'<div style="font-size: 11px; font-family: Verdana,Arial,Helvetica,sans-serif;" ">'+
	"<form name=\"jsoninput\" >"	+
	"\nLabel:<br>"+
	"<input name=\"jlabel\" type=\"text\" value=\"\" size=\"60\" style=\"width:400px\">"+
	"<br><br>\nValue: <br>"+
	"<textarea name=\"jvalue\" rows=\"10\" cols=\"50\" style=\"width:400px\"></textarea>"+
	"<br><br>\nData type: "+
	"<select  name=\"jtype\">"+
	"\n<option value=\"object\">object</option>\n<option value=\"array\">array</option>"+
	"\n<option value=\"string\">string</option>"+
	"\n<option value=\"number\">number</option>\n<option value=\"boolean\">boolean</option>"+
	"\n<option value=\"null\">null</option>\n<option value=\"undefined\">undefined</option>"+
	"\n</select>&nbsp;&nbsp;&nbsp;&nbsp;"+
	"\n<input name=\"orgjlabel\" type=\"hidden\" value=\"\" size=\"50\" style=\"width:300px\">"+
	"\n<input name=\"jsonUpdate\" onfocus=\"this.blur()\" type=\"submit\" value=\"Set value\">&nbsp;\n<br><br>"+
	"\n<input name=\"jsonAddChild\" onfocus=\"this.blur()\" type=\"button\"  value=\"Add child\">"+
	"\n<input name=\"jsonAddSibling\" onfocus=\"this.blur()\" type=\"button\"  value=\"Add sibling\">\n<br><br>"+
	"\n<input name=\"jsonRemove\" onfocus=\"this.blur()\" type=\"button\"  value=\"Delete\">&nbsp;"+
	"\n<input name=\"jsonRename\" onfocus=\"this.blur()\" type=\"button\"  value=\"Rename\">&nbsp;"+
	"\n<input name=\"jsonCut\" onfocus=\"this.blur()\" type=\"button\" value=\"Cut\">&nbsp;"+
	"\n<input name=\"jsonCopy\" onfocus=\"this.blur()\" type=\"button\"  value=\"Copy\">&nbsp;"+
	"\n<input name=\"jsonPaste\" onfocus=\"this.blur()\" type=\"button\" value=\"Paste\">&nbsp;\n<br><br>"+
	"\n<input type=\"checkbox\" name=\"jbefore\">Add children first/siblings before\n<br>"+
	"\n<input type=\"checkbox\" name=\"jPasteAsChild\">Paste as child on objects & arrays\n<br><br><div id=\"jformMessage\"></div>\n</form></div>";
				
var formsetup = function(f) {
	var fs=f.style
	fs.fontSize=fs.fontSize="11px"
	fs.fontFamily=fs.fontFamily="Verdana,Arial,Helvetica,sans-serif"
	var e=f.getElementsByTagName("*");
	for(var i=0;i<e.length;i++){
		var s=e[i].style
		if(!!s){
			s.fontSize="11px"
			s.fontFamily="Verdana,Arial,Helvetica,sans-serif"
		}
		var cb= e[i].name
		if (!!cb ) switch (cb) {
			case 'jsoninput': if (false) e[i].addEventListener("submit", function (e) {
				e.preventDefault();
				instance.jsonChange(e.target);
				return false;
			});

			break;
			case 'jlabel': if (false) e[i].addEventListener("input", function (e) {
				//e.preventDefault();
				
				instance.jsonChange(e.target.parentNode);
				return false;
			});
			break;
			case 'jvalue': if (false) e[i].addEventListener("input", function (e) {
				//e.preventDefault();
				instance.jsonChange(e.target.parentNode);
				return false;
			});
			break;
			case 'jsonUpdate': if (false) e[i].style.display = 'none';
			break;
			case 'jtype': e[i].addEventListener("change", function (e) {
				instance.changeJsonDataType(e.target.value,e.target.parentNode);
			});
			break;
			case 'jsonAddChild':e[i].addEventListener("click", function (e) {
				instance.jsonAddChild(e.target.parentNode);
			});
			break;
			case 'jsonAddSibling': e[i].addEventListener("click", function (e) {
				instance.jsonAddSibling(e.target.parentNode);
			});
			break;
			case 'jsonRemove': e[i].addEventListener("click", function (e) {
				instance.jsonRemove(e.target.parentNode);
			});
			break;
			case 'jsonRename': e[i].addEventListener("click", function (e) {
				instance.jsonRename(e.target.parentNode);
			});
			break;
			case 'jsonCut': e[i].addEventListener("click", function (e) {
				instance.jsonCut(e.target.parentNode);
			});
			break;
			case 'jsonCopy':e[i].addEventListener("click", function (e) {
				instance.jsonCopy(e.target.parentNode);
			});
			break;
			case 'jsonPaste': e[i].addEventListener("click", function (e) {
				instance.jsonPaste(e.target.parentNode);
			});
			break;
			default:
		}
	}
}
var onClickLogo =function(e)
{
	closeAllTiddlers();
	displayTiddler(document.getElementById("headerTitle"),"StartHere",1);
}
var mysetup = function(f) {

	var e=f.getElementsByTagName("*");
	for(var i=0;i<e.length;i++){

		var cb= e[i].id
		if (!!cb ) switch (cb) {
			case 'headerTitle':  e[i].addEventListener("click", function (e) {
				e.preventDefault();
				alert("boo");
				return false;
			});
alert("needs");
			break;

			case 'header1':e[i].addEventListener("click", function (e) {
				alert("gggrrr");
					//closeAllTiddlers();
	displayTiddler(document.getElementById("headerTitle"),"StartHere",1);
			});
			break;
			case 'jsonAddSibling': e[i].addEventListener("click", function (e) {
				instance.jsonAddSibling(e.target.parentNode);
			});
			break;
			case 'jsonRemove': e[i].addEventListener("click", function (e) {
				instance.jsonRemove(e.target.parentNode);
			});
			break;
			case 'jsonRename': e[i].addEventListener("click", function (e) {
				instance.jsonRename(e.target.parentNode);
			});
			break;
			case 'jsonCut': e[i].addEventListener("click", function (e) {
				instance.jsonCut(e.target.parentNode);
			});
			break;
			case 'jsonCopy':e[i].addEventListener("click", function (e) {main();
				instance.jsonCopy(e.target.parentNode);
			});
			break;
			case 'jsonPaste': e[i].addEventListener("click", function (e) {
				instance.jsonPaste(e.target.parentNode);
			});
			break;
			default:
		}
	}
}

var myhtml ="\n    <div id='copyright'>\n    Welcome to TiddlyWiki, Copyright &copy; 2004 Jeremy Ruston\n    </div>\n    <div id='header'>\n        <a id='headerTitle'  ></a> <span id='headerSubtitle'></span>\n    </div>\n    <div id='leftMenu'>\n        <span id='leftMenuMain'></span>\n    </div>\n    <div id='displayArea'>\n        <div id='tiddlerDisplay'></div>\n        &nbsp;\n    </div>\n        <div id='floater'>&nbsp;</div>\n    <div id='sidebar'>\n        <a href='javascript:ShowSource()'><strong>Save all</strong></a>\n        <br> <br>\n        <strong>Recent tiddlers:</strong> <br>\n        <span id='sidebarRecentTiddlers'></span>\n        <br> <br>\n        <strong>All tiddlers:</strong> <br>\n        <span id='sidebarAllTiddlers'></span>\n        <br> <br>\n        <strong>License:</strong> <br>\n        <a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/2.0/'>\n        <!-- <img alt='Creative Commons License' border='0' src='http://creativecommons.org/images/public/somerights20.gif' /></a><br /> -->\nThis work is licensed under a <br> Creative Commons License</a>\n    </div>\n    <div id='saveMessage'>\n        <span style='font-size: 10pt; font-family: tahoma,arial,helvetica;'>\n\n\n                \n        </span>\n    </div>\n    <div id='storeArea'>\n<!-- ********************************************************************* -->\n<!-- Paste your TiddlyWiki content between this marker and the one below   -->\n<!-- ********************************************************************* -->\n   <DIV id='storeWikiWord' modified='200409072350' modifier='JeremyRuston'>A WikiWord is a word composed of a bunch of other words slammed together with each of their first letters capitalised. WikiWord notation in a WikiWikiWeb is used to name individual pages. Furthermore, referring to a page automatically creates a link to it. Clicking on a link jumps to that page or, if it doesnt exist, to an editor to create it. TiddlyWiki uses WikiWord titles for smaller chunks of MicroContent.</DIV>\n    <DIV id='storeEmailMe' modified='200409072350' modifier='JeremyRuston'>My email address is jeremy (at) osmosoft (dot) com</DIV>\n    <DIV id='storeSiteTitle' modified='200409161548' modifier='JeremyRuston'>TiddlyWiki</DIV>\n    <DIV id='storeSiteSubtitle' modified='200409171651' modifier='JeremyRuston'>a reusable non-linear personal web notebook</DIV>\n    <DIV id='storeUsingThisSite' modified='200409201442' modifier='JeremyRuston'>Hopefully, reading a TiddlyWiki is fairly self explanatory. Within the main story column, click on bold links to read a linked tiddler. Click on italic links to create a new tiddler. When you hover the mouse over a tiddler its highlighted and some extra options appear by the title: close just closes the tiddler in question, link does the opposite by closing all other tiddlers. Finally, edit allows you to edit the text of any tiddler; changes are not reflected back to the server, though. See SavingStuff for more details.</DIV>\n    <DIV id='storeSelfContained' modified='200409201452' modifier='JeremyRuston'>One of the neatest features of TiddlyWiki is that it is entirely self-contained in a single HTML file. It contains the actual hypertext document, and the JavaScript, CascadingStyleSheets and HTML necessary to both view and edit the document. This means that it is trivial to host a TiddlyWiki on a website, or to distribute one by email. And anyone with a reasonably recent web browser will be able to read and edit it.</DIV>\n    <DIV id='storeSpecialTiddlers' modified='200409201501' modifier='JeremyRuston'>TiddlyWiki uses several special tiddlers to hold the text used for the MainMenu, the SiteTitle and the SiteSubtitle. Go ahead and edit them and see the results.</DIV>\n    <DIV id='storeMainMenu' modified='200409241925' modifier='JeremyRuston'>StartHere UsingThisSite ReusingThisSite AdaptingThisSite TiddlyWiki TiddlyWikiDevCopyright 2004 JeremyRuston</DIV>\n    <DIV id='storeTiddlyWiki' modified='200409251845' modifier='JeremyRuston'>A TiddlyWiki is like a blog because its divided up into neat little chunks, but it encourages you to read it by hyperlinking rather than sequentially: if you like, a non-linear blog analogue that binds the individual microcontent items into a cohesive whole. I think that TiddlyWiki represents a novel medium for writing, and will promote its own distinctive WritingStyle. This is the first version of TiddlyWiki and so, as discussed in TiddlyWikiDev, its bound to be FullOfBugs, have many MissingFeatures and fail to meet all of the DesignGoals. And of course theres NoWarranty, and it might be judged a StupidName.</DIV>\n    <DIV id='storeJeremyRuston' modified='200504131937' modifier='JeremyRuston'>Im Jeremy Ruston, a technologist based in London. I do consultancy work through my company Osmosoft at http://www.osmosoft.com, as well as pursuing some independent projects like TiddlyWiki. If youve got any comments or suggestions on this site, do please EmailMe.</DIV>\n\n <DIV id='storeStartHere' modified='200504131939' modifier='JeremyRuston'>\nThis is the FirstVersion of TiddlyWiki. It has been superseded by the ThirdVersion at http://www.tiddlywiki.com</DIV>\n    <DIV id='storeFirstVersion' modified='200504131940' modifier='JeremyRuston'>\nThe FirstVersion of TiddlyWiki is distinguished by what it lacks: saving, searching and formatting, all of which are included in the ThirdVersion.</DIV>\n    <DIV id='storeSavingStuff' modified='200504131941' modifier='JeremyRuston'>This FirstVersion of TiddlyWiki doesnt handle saving at all elegantly. Click the Save all link at the top right for more details.</DIV>\n\n\n<!-- ********************************************************************* -->\n<!-- Paste your TiddlyWiki content between this marker and the one above   -->\n<!-- ********************************************************************* -->\n\t\t</div>\n";

// ---------------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------------

function main()
{
    // Do the header, menu and sidebar
    refreshAll();
    // Display the StartHere tiddler
    displayTiddler(null,'StartHere',1);
}

// ---------------------------------------------------------------------------------
// Tiddler functions
// ---------------------------------------------------------------------------------

// Display a tiddler with animation and scrolling, as though a link to it has been clicked on
//  src = source element object (eg link) for animation effects and positioning
//  title = title of tiddler to display
//  state = 0 is default or current state, 1 is read only and 2 is edittable
function displayTiddler(src,title,state)
{
	//try{
    // Figure out the tiddler this one must go after
    var after = findContainingTiddler(src);
    //alert(after);
    // Create the tiddler if needed
    var theTiddler = createTiddler(title,state,after);
    // Make it invisible if we got here on an event
    if(src != null)
        ;//theTiddler.style.opacity = 0;
    // Ensure the new tiddler is visible
    ensureVisible(theTiddler);
    // Animate from the target of the event that followed the link
    if(false)//src)
        {
        // Set the text of the floater to match the title
        var floater = document.getElementById("floater");
        var floaterTitle = document.createTextNode(title);
        floater.replaceChild(floaterTitle,floater.firstChild);
        // Animate the floater from the link location to the location of the new tiddler  
        startZoomer(floater,src,theTiddler);
        }
	//}catch(e){}
}

// Create a tiddler if it doesn't exist (with no fancy animating). The tiddler is invisible unless it was already visible
//  title = title of tiddler to display
//  state = 0 is default or current state, 1 is read only and 2 is edittable
//  after = optional existing tiddler element to put the new one after
function createTiddler(title,state,after)
{
    // See if the tiddler div is already there
    var theTiddler = document.getElementById("tiddler" + title);
    if(!theTiddler)
        {
        // If it's not there, create the tiddler header
        theTiddler = createTiddlerHeader(title,after);
        // Create the tiddler body appropriately
        if(state != 2)
            createTiddlerBody(theTiddler,title);
        else
            createTiddlerEditor(theTiddler,title);
        }
    else
        {
        // If the tiddler does exist, make sure that it's in the right state
        var theBody = document.getElementById("body" + title);
        var theEditor = document.getElementById("editor" + title);
        // Create and delete as appropriate
        switch (state)
            {
                case 0: // For default state, leave everything alone
                break;
                case 1: // For read-only state, delete any editor
                    if(!theBody)
                        {
                        if(theEditor)
                            theEditor.parentNode.removeChild(theEditor);
                        createTiddlerBody(theTiddler,title);
                        }
                break;
                case 2: // For editor state, delete any read-only body
                    if(!theEditor)
                        {
                        if(theBody)
                            theBody.parentNode.removeChild(theBody);
                        createTiddlerEditor(theTiddler,title);
                        }
                break;
            }
        }
    // Return the completed tiddler
    return(theTiddler);
}

// Create an invisible common header section of a tiddler
//  title = title of tiddler to display
//  after = optional existing tiddler element to put the new one after
function createTiddlerHeader(title,after)
{
    // Create the tiddler div
    var theTiddler = createTiddlyElement(null,"div",null,null);
    if (!theTiddler) theTiddler= window.document.createElement("div");
    theTiddler.setAttribute("id","tiddler" + title);
    theTiddler.onmouseover = onMouseOverTiddler;
    theTiddler.onmouseout = onMouseOutTiddler;
    theTiddler.ondblclick = onDblClickTiddler;
    // Get the subtitle
    var subtitle = getTiddlerSubtitle(title);
    theTiddler.title = subtitle;
    // Link it in
    var place = document.getElementById("tiddlerDisplay");
    if(after)
        {
        if(after.nextSibling)
            place.insertBefore(theTiddler,after.nextSibling);
        else
            place.appendChild(theTiddler);
        }
    else
        {
        if(place.firstChild)
            place.insertBefore(theTiddler,place.firstChild);
        else
            place.appendChild(theTiddler);
        }
    // Create the anchor
    var theAnchor = createTiddlyElement(theTiddler,"a",null,null);
    theAnchor.setAttribute("name","link" + title);
    // Create the title
    var theTitle = createTiddlyElement(theTiddler,"div","title",title);
    theTitle.setAttribute("id","title" + title);
    // Return the created tiddler
    return(theTiddler);
}

// Create a tiddler toolbar according to whether it's an editor or not
function createTiddlerToolbar(title,editor)
{
    // Delete any existing toolbar
    var theToolbar = document.getElementById("toolbar" + title);
    if(theToolbar)
        theToolbar.parentNode.removeChild(theToolbar);
    // Create the toolbar
    var theTitle = document.getElementById("title" + title);
    var theToolbar = createTiddlyElement(theTitle,"div","toolbar", String.fromCharCode(160));
    theToolbar.setAttribute("id","toolbar" + title);
    // Create each button in turn
    if(!editor)
        {
        // Non-editor toolbar
        createTiddlyButton(theToolbar,
                           "close",
                           "Close this tiddler",
                           onClickToolbarClose);
        theToolbar.appendChild(document.createTextNode(String.fromCharCode(160)));
        createTiddlyButton(theToolbar,
                           "link",
                           "Permalink for this tiddler",
                           onClickToolbarLink);
        theToolbar.appendChild(document.createTextNode(String.fromCharCode(160)));
        createTiddlyButton(theToolbar,
                           "edit",
                           "Edit this tiddler",
                           onClickToolbarEdit);
        }
    else
        {
        // Editor toolbar
        createTiddlyButton(theToolbar,
                           "done",
                           "Finish changing this tiddler",
                           onClickToolbarSave);
        theToolbar.appendChild(document.createTextNode(String.fromCharCode(160)));
        createTiddlyButton(theToolbar,
                           "undo",
                           "Undo changes to this tiddler",
                           onClickToolbarUndo);        
        theToolbar.appendChild(document.createTextNode(String.fromCharCode(160)));
        createTiddlyButton(theToolbar,
                           "delete",
                           "Delete this tiddler",
                           onClickToolbarDelete);
        }
}

// Create the body section of a read-only tiddler
function createTiddlerBody(place,title)
{
    // Create the toolbar
    createTiddlerToolbar(title,false);
    // Get the body of the tiddler
    var tiddlerText = myTiddlerText(title);
    var tiddlerExists = (tiddlerText != null);
    if(!tiddlerExists)
        tiddlerText = "[This tiddler doesn't yet exist. Double-click to create it]";
    // Create the body
    var theBody = createTiddlyElement(place,"div","body",null);
    theBody.setAttribute("id","body" + title);
    if(!tiddlerExists)
        theBody.style.fontStyle = "italic";
    // Add the body text wikifing the links
    wikify(tiddlerText,theBody);
}

// Create the body section of a read-only tiddler
function createTiddlerEditor(place,title)
{
    // Create the toolbar
    createTiddlerToolbar(title,true);
    // Get the body of the tiddler
    var tiddlerText = myTiddlerText(title);
    var tiddlerExists = (tiddlerText != null);
    if(!tiddlerExists)
        tiddlerText = "Type the text for '" + title + "' here.";
    // Create the editor div
    var theEditor = createTiddlyElement(place,"div","editor",null);
    theEditor.setAttribute("id","editor" + title);
    // Create the title editor
    var theTitle = createTiddlyElement(theEditor,"div",null,null);
    var theTitleBox = createTiddlyElement(theTitle,"input",null,null);
    theTitleBox.setAttribute("id","editorTitle" + title);
    theTitleBox.setAttribute("type","text");
    theTitleBox.value = title;
    theTitleBox.setAttribute("size","40");
    // Do the body
    var theBody = createTiddlyElement(theEditor,"div",null,null);
    var theBodyBox = createTiddlyElement(theBody,"textarea",null,null);
    theBodyBox.value = tiddlerText;
    theBodyBox.setAttribute("id","editorBody" + title);
    theBodyBox.setAttribute("rows","10");
    theBodyBox.setAttribute("cols","50");
}

// Create child text nodes and link elements to represent a wiki-fied version of some text
function wikify(text,parent)
{
    // Link patterns
    var upperLetter = "[A-Z]";
    var lowerLetter = "[a-z]";
    var anyLetter = "[A-Za-z_0-9]";
    var linkPattern = upperLetter + "+" + lowerLetter + "+" + upperLetter + anyLetter + "*";
    var urlPattern = "(?:http|https|mailto|ftp):\\S*";
    var breakPattern = "\\n";
    // Create the RegExp object
    var theRegExp = new RegExp("(" + linkPattern + ")|(" + urlPattern + ")|(" + breakPattern + ")","mg");
    // Set the position after the last match
    var lastMatch = 0;
    // Loop through the bits of the body text
    do {
        // Get the next match
        var theMatch = theRegExp.exec(text);
        if(theMatch)
            {
            // If so, dump out any text before the link
            if(theMatch.index > lastMatch)
                parent.appendChild(document.createTextNode(text.substring(lastMatch,theMatch.index)));
            lastMatch = theRegExp.lastIndex;
            // Dump out the link itself in the appropriate format
            if(theMatch[1])
                createTiddlyLink(parent,theMatch[0],true);
            else if(theMatch[2])
                createExternalLink(parent,theMatch[0]);
            else if(theMatch[3])
                parent.appendChild(document.createElement("br"));            }
        else
            {
            // If no match, just dump out the remaining text
            parent.appendChild(document.createTextNode(text.substring(lastMatch)));
            }
    } while(theMatch != null);
}

function saveTiddler(title)
{
    // Get the title and body text
    var theNewTitle = document.getElementById("editorTitle" + title).value;
    var theNewBody = document.getElementById("editorBody" + title).value;
    // Remove any existing entry from the store
    var theExisting = document.getElementById("store" + title);
    if(theExisting)
        theExisting.parentNode.removeChild(theExisting);
    // Create the new entry in the store
    var place = document.getElementById("storeArea");
    var storeItem = createTiddlyElement(place,"div",null,theNewBody);
    storeItem.setAttribute("id","store" + theNewTitle);
    var now = new Date();
    storeItem.setAttribute("modified",ConvertToYYYYMMDDHHMM(now));
    storeItem.setAttribute("modifier","JeremyRuston");
    // Display the new tiddler read-only
    displayTiddler(null,theNewTitle,1,null);
    // Refresh the menu and sidebars to take it into account
    refreshAll();
}

function selectTiddler(title)
{
    // Change the background colour
    var e = document.getElementById("tiddler" + title);
    if(e != null)
        e.className = "tiddlerSelected";
    // Make the toolbar visible
    e = document.getElementById("toolbar" + title);
    if(e != null)
        e.style.visibility = "visible";
}

function deselectTiddler(title)
{
    // Change the background colour
    var e = document.getElementById("tiddler" + title);
    if(e != null)
        e.className = "tiddler";
    // Make the toolbar invisible
    e = document.getElementById("toolbar" + title);
    if(e != null)
        e.style.visibility = "hidden";
}

function deleteTiddler(title)
{
    // Remove the tiddler from the display
    closeTiddler(title);
    // Delete it from the store
    var tiddler = document.getElementById("store" + title);
    if(tiddler)
        tiddler.parentNode.removeChild(tiddler);
    // Refresh the menu and sidebars to take it into account
    refreshAll();
}

function closeTiddler(title)
{
    var tiddler = document.getElementById("tiddler" + title);
    if(tiddler != null)
        tiddler.parentNode.removeChild(tiddler);
}

function closeAllTiddlers()
{
    // Delete all the elements in the displayArea
    var e = document.getElementById("tiddlerDisplay");
    while(e.firstChild != null)
        e.removeChild(e.firstChild);
}



function myTiddlerText(title)
{
        // Attempt to retrieve it from the store
        var tiddlerStore = document.getElementById("store" + title);
        if(tiddlerStore != null)
            return(tiddlerStore.firstChild.nodeValue);
        else
            return(null);
}

function getTiddlerSubtitle(title)
{
    var tiddlerStore = document.getElementById("store" + title);
    if(tiddlerStore != null)
        {
        var theModifier = tiddlerStore.getAttribute("modifier");
        if(!theModifier)
            theModifier = "(unknown)";
        var theModified = tiddlerStore.getAttribute("modified");
        if(theModified)
            theModified = ConvertFromYYYYMMDDHHMM(theModified);
        else
            theModified = "(unknown)";
        return("Modified by " + theModifier + " on " + theModified);
        }
    else
        return(null);
}

function createTiddlyElement(theParent,theElement,theClass,theText)
{
    var e = document.createElement(theElement);
    if(theClass != null)
        e.className = theClass;
    if(theText != null)
        e.appendChild(document.createTextNode(theText));
    if(theParent != null)
        theParent.appendChild(e);
    return(e);
}

function createTiddlyButton(theParent,theText,theTooltip,theAction)
{
    var theButton = document.createElement("a");
    theButton.onclick = theAction;
    theButton.setAttribute("href","JavaScript:;");
    theButton.setAttribute("title",theTooltip);
    theButton.appendChild(document.createTextNode(theText));
    theParent.appendChild(theButton);
    return(theButton);
}

// Create a link to a tiddler
function createTiddlyLink(place,title,styleIt)
{
    // Figure out if the wiki word exists
    var btn;
    if(myTiddlerText(title) == null)
        {
        // If it does not exist
        btn = createTiddlyButton(place,title,
                           title + " doesn't yet exist",
                           onClickTiddlerLink);
        if(styleIt)
            btn.style.fontStyle = "italic";
        }
    else
        {
        // If it does exist
        btn = createTiddlyButton(place,title,
                           getTiddlerSubtitle(title),
                           onClickTiddlerLink);
        if(styleIt)
            btn.style.fontWeight = "bold";
        }
}

// Create an external link
function createExternalLink(place,url)
{
    var theLink = document.createElement("a");
    theLink.setAttribute("href",url);
    theLink.setAttribute("title","External link to " + url);
    theLink.setAttribute("target","_blank");
    theLink.appendChild(document.createTextNode(url));
    place.appendChild(theLink);
}

// Find the tiddler instance (if any) containing a specified element
function findContainingTiddler(e)
{
    if(e == null)
        return(null);
    do {
        if(e != document)
            {
            if(e.id)
                if(e.id.substr(0,7) == "tiddler")
                    return(e);
            }
        e = e.parentNode;
    } while(e != document);
    return(null);
}

// ---------------------------------------------------------------------------------
// Menu and sidebar functions
// ---------------------------------------------------------------------------------

// Refresh everything
function refreshAll()
{
    refreshHeader();
    refreshMenu();
    refreshSidebar();
}

// Refresh all parts of the header
function refreshHeader()
{
    // Get the site title and subtitle
    var theTitle = myTiddlerText("SiteTitle");
    var theSubtitle = myTiddlerText("SiteSubtitle");
    // Set the page title
    document.title = theTitle + " - " + theSubtitle;
    // Do the title
    var place = document.getElementById("headerTitle");
    while(place.firstChild != null)
        place.removeChild(place.firstChild);
    wikify(theTitle,place);
    // Do the subtitle
    var place = document.getElementById("headerSubtitle");
    while(place.firstChild != null)
        place.removeChild(place.firstChild);
    wikify(theSubtitle,place);
}

// Refresh all parts of the main menu
function refreshMenu()
{
    var place = document.getElementById("leftMenuMain");
    while(place.firstChild != null)
        place.removeChild(place.firstChild);
    var theMenu = document.createElement("div");
    place.appendChild(theMenu);
    wikify(myTiddlerText("MainMenu"),theMenu);
}

// Refresh all parts of the sidebar
function refreshSidebar()
{
    // Get names and dates of all tiddlers from the store
    var allTiddlers = new Array(); // Will be an array of 2-entry arrays, where entry 0 = name, 1 = date
    var storeNodes = document.getElementById("storeArea").childNodes;
    for (var t = 0; t < storeNodes.length; t++)
        {
        var n = storeNodes[t];
        if(n.id)
            if(n.id.substr(0,5) == "store")
                allTiddlers.push(new Array(n.id.substr(5),n.getAttribute("modified")));
        }
    // Sort the tiddlers by name
    allTiddlers.sort(function (a,b) { if(a[0] == b[0]) return(0); else return (a[0] > b[0]) ? +1 : -1; });
    // Delete any existing entries in the 'all' list
    var place = document.getElementById("sidebarAllTiddlers");
    while(place.firstChild != null)
        place.removeChild(place.firstChild);
    // Output the links
    var separator = false;
    for (t = 0; t < allTiddlers.length; t++)
        {
        if(separator)
            place.appendChild(document.createElement("br"));
        createTiddlyLink(place,allTiddlers[t][0],false)
        separator = true;
        }
    // Sort the tiddlers by date
    allTiddlers.sort(function (a,b) { if(a[1] == b[1]) return(1); else return (a[1] < b[1]) ? +1 : -1; });
    // Delete any existing entries in the 'recent' list
    var place = document.getElementById("sidebarRecentTiddlers");
    while(place.firstChild != null)
        place.removeChild(place.firstChild);
    // Output the most recent few as links
    var separator = false;
    var inList = 5;
    if (allTiddlers.length < inList)
        inList = allTiddlers.length;
    for (t = 0; t < inList; t++)
        {
        if(separator)
            place.appendChild(document.createElement("br"));
        createTiddlyLink(place,allTiddlers[t][0],false)
        separator = true;
        }
}

// ---------------------------------------------------------------------------------
// Quine (http://www.google.com/search?q=quine&ie=UTF-8&oe=UTF-8)
// ---------------------------------------------------------------------------------

// Get the text of the TiddlyWiki HTML file itself, incorporating new edits
function ShowSource()
{
    // Create the popup window
    var srcWindow = window.open("","sourceWindow","width=700,height=600");
    var srcDocument = srcWindow.document;
    // Jam in the text template
    srcDocument.write("<html><head></head><body>" +
                      window.document.getElementById("saveMessage").innerHTML +
                      "</body></html>");
    srcDocument.close();
    // Get a reference to the text area
    var theTextBox = srcDocument.getElementById("source");
    // Jam in the current source
    //theTextBox.value = "<html>\n" + window.document.getElementsByTagName("html")[0].innerHTML + "\n</html>";
    theTextBox.value = window.document.getElementById("storeArea").innerHTML; // Optionally, add .replace(/\n+/g, "\n");
    // Select the text in the textbox
    theTextBox.focus();
    theTextBox.select();
;
}

// ---------------------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------------------

// Event handler for clicking on the logo


// Event handler for clicking on a tiddly link
 onClickTiddlerLink=function(e)
{
	// Get the text of the link
	var title;
	if(this.firstChild)
        title = this.firstChild.nodeValue;
    else if (this.nodeValue)
	   title = this.nodeValue; 
	// Display that tiddler
	if(title)
		displayTiddler(this,title,0);
}

// Event handler for mouse over a tiddler
 onMouseOverTiddler=function(e)
{
	// Get the name of this tiddler
	var tiddler;
	if(this.id.substr(0,7) == "tiddler")
		tiddler = this.id.substr(7);
	// Select that tiddler
	if(tiddler)
		selectTiddler(tiddler);
}

// Event handler for mouse out of a tiddler
 onMouseOutTiddler=function(e)
{
	// Get the name of this tiddler
	var tiddler;
	if(this.id.substr(0,7) == "tiddler")
		tiddler = this.id.substr(7);
	// Deselect that tiddler
	if(tiddler)
		deselectTiddler(tiddler);
}

// Event handler for double click on a tiddler
 onDblClickTiddler=function(e)
{
    // Empty the current selection
    if(document.selection)
        document.selection.empty();
	// Get the name of this tiddler
	var tiddler;
	if(this.id.substr(0,7) == "tiddler")
		tiddler = this.id.substr(7);
	// Deselect that tiddler
	if(tiddler)
        displayTiddler(null,tiddler,2);
}

// Event handler for clicking on toolbar close
 onClickToolbarClose=function(e)
{
	// Close that tiddler
	if(this.parentNode.id)
		closeTiddler(this.parentNode.id.substr(7));
}

// Event handler for clicking on toolbar close
 onClickToolbarDelete=function(e)
{
	// Close that tiddler
	if(this.parentNode.id)
		deleteTiddler(this.parentNode.id.substr(7));
}

// Event handler for clicking on toolbar link
 onClickToolbarLink=function(e)
{
	// Close all other tiddlers
	if(this.parentNode.id)
		{
		closeAllTiddlers();
		displayTiddler(null,this.parentNode.id.substr(7),1);
		}
}

// Event handler for clicking on toolbar close
 onClickToolbarEdit=function(e)
{
	// Edit that tiddler
	if(this.parentNode.id)
		displayTiddler(null,this.parentNode.id.substr(7),2);
}

// Event handler for clicking on toolbar save
 onClickToolbarSave=function(e)
{
	// Save that tiddler
	if(this.parentNode.id)
		saveTiddler(this.parentNode.id.substr(7));
}

// Event handler for clicking on toolbar save
 onClickToolbarUndo=function(e)
{
	// Redisplay that tiddler in read-only mode
	if(this.parentNode.id)
		displayTiddler(null,this.parentNode.id.substr(7),1);
}

// ---------------------------------------------------------------------------------
// Animation engine
// ---------------------------------------------------------------------------------

// Animation housekeeping
var animating = 0; // Incremented at start of each animation, decremented afterwards. If zero, the interval timer is disabled
var animaterID; // ID of the timer used for animating
// 'zoomer' module of the animation engine that smoothly moves an element from the position/size of the start element to th etarget element
var zoomerElement = null; // Element being shifted; null if none
var zoomerStart; // Where we're shifting to
var zoomerTarget; // Where we're shifting to
var zoomerProgress; // 0..1 of how far we are
var zoomerStep; // 0..1 of how much to shift each step

// Start animation engine
function startAnimating()
{
    if(animating++ == 0)
        animaterID = window.setInterval(doAnimate(),25);
}

// Stop animation engine
function stopAnimating()
{
    if(--animating == 0)
        window.clearInterval(animaterID)
}

// Perform an animation engine tick, calling each of the known animation modules
function doAnimate()
{
    if(zoomerElement != null)
        doZoomer();
}

// Start moving the element 'e' from the position of the element 'start' to the position of the element 'target'
function startZoomer(e,start,target)
{
    stopZoomer();
    zoomerElement = e;
    zoomerStart = start;
    zoomerTarget = target;
    zoomerProgress = 0;
    zoomerStep = 0.08;
    startAnimating();
}

// Stop any ongoing zoomer animation
function stopZoomer()
{
    if(zoomerElement != null)
        {
        stopAnimating();
        zoomerElement.style.visibility = "hidden"; 
        zoomerElement = null;
        }
}

// Perform a tick of the zoomer animation
function doZoomer()
{
    zoomerProgress += zoomerStep;
    if(zoomerProgress > 1.0)
        stopZoomer();
    else
        {
        zoomerTarget.style.opacity = zoomerProgress;
        var f = slowInSlowOut(zoomerProgress);
        var zoomerStartLeft = findPosX(zoomerStart);
        var zoomerStartTop = findPosY(zoomerStart);
        var zoomerStartWidth = zoomerStart.offsetWidth;
        var zoomerStartHeight = zoomerStart.offsetHeight;
        var zoomerTargetLeft = findPosX(zoomerTarget);
        var zoomerTargetTop = findPosY(zoomerTarget);
        var zoomerTargetWidth = zoomerTarget.offsetWidth;
        var zoomerTargetHeight = zoomerTarget.offsetHeight;
        zoomerElement.style.left = zoomerStartLeft + (zoomerTargetLeft-zoomerStartLeft) * f;
        zoomerElement.style.top = zoomerStartTop + (zoomerTargetTop-zoomerStartTop) * f;
        zoomerElement.style.width = zoomerStartWidth + (zoomerTargetWidth-zoomerStartWidth) * f;
        zoomerElement.style.height = zoomerStartHeight + (zoomerTargetHeight-zoomerStartHeight) * f;
        zoomerElement.style.visibility = "visible";
        }
}

// ---------------------------------------------------------------------------------
// Standalone utility functions
// ---------------------------------------------------------------------------------

// Return a date in UTC YYYYMMDDHHMM format
function ConvertToYYYYMMDDHHMM(d)
{
    return(d.getFullYear() + '' + (d.getMonth() <= 8 ? '0' : '') + (d.getMonth() + 1) + '' + (d.getDate() <= 9 ? '0' : '') + d.getDate() + (d.getHours() <= 9 ? '0' : '') + d.getHours() + (d.getMinutes() <= 9 ? '0' : '') + d.getMinutes());
}

// Convert a date in UTC YYYYMMDDHHMM format to printable local time
function ConvertFromYYYYMMDDHHMM(d)
{
    var theDate = new Date(parseInt(d.substr(0,4),10),
                            parseInt(d.substr(4,2),10)-1,
                            parseInt(d.substr(6,2),10),
                            parseInt(d.substr(8,2),10),
                            parseInt(d.substr(10,2),10),0,0);
    return(theDate.toLocaleString());
}

// Map a 0..1 value to 0..1, but slow down at the start and end
function slowInSlowOut(progress)
{
    return(1-((Math.cos(progress * Math.PI)+1)/2));
}

// Scroll if necessary to ensure that a given element is visible
function ensureVisible(e)
{
    // The position we're trying to scroll into view; the top of it...
    var posY = findPosY(e);
    // ...or, if the element will fit on the screen, the bottom of it
    if(e.offsetHeight < window.innerHeight)
        posY += e.offsetHeight;
    // Make sure the chosen position is visible
    if ((posY < window.scrollY) || (posY > (window.scrollY + window.innerHeight)))
        window.scrollTo(0,posY);
}

// From QuirksMode.com
function findPosX(obj)
{
        var curleft = 0;
        if (obj.offsetParent)
        {
                while (obj.offsetParent)
                {
                        curleft += obj.offsetLeft
                        obj = obj.offsetParent;
                }
        }
        else if (obj.x)
                curleft += obj.x;
        return curleft;
}

// From QuirksMode.com
function findPosY(obj)
{
        var curtop = 0;
        if (obj.offsetParent)
        {
                while (obj.offsetParent)
                {
                        curtop += obj.offsetTop
                        obj = obj.offsetParent;
                }
        }
        else if (obj.y)
                curtop += obj.y;
        return curtop;
}

// ---------------------------------------------------------------------------------
// End of scripts
// ---------------------------------------------------------------------------------


})();


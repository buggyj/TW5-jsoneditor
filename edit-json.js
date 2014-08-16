/*\
title: $:/plugins/bj/jsoneditor/jsoneditor.js
type: application/javascript
module-type: startup

jsoneditor adaptor

\*/
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
    		document.body.insertBefore(domNode,document.body.firstChild);
    		    		document.body.insertBefore(domNode2,document.body.firstChild);
	domNode.innerHTML = '<div style="font-size: 11px; font-family: Verdana,Arial,Helvetica,sans-serif;" id="jsoneditortree'+newid+'"></div>';
	domNode2.innerHTML 	=	formHTML;
	

	var updater =function(x){
		alert("updater!");
	}
	var test ={testing:"val"};
	instance=JSONeditor.start('jsoneditortree'+newid,domNode2.firstChild.firstChild,$tw.wiki.allTitles(),
									'$:/plugins/bj/jsoneditor/','',updater);


	newid++;

	formsetup(domNode2.firstChild);
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



})();

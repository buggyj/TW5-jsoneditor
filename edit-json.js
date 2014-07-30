/*\
title: $:/plugins/bj/WidgetTreeViewer/edit-json.js
type: application/javascript
module-type: widget


\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var MIN_TEXT_AREA_HEIGHT = 100; // Minimum height of textareas in pixels

var Widget = require("$:/core/modules/widgets/widget.js").widget;
var newid=0;
var EditJsonWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};
if($tw.browser) {
	var JSONeditor=require("$:/plugins/bj/WidgetTreeViewer/JSONeditor.js").JSONeditor;
}
/*
Inherit from the base widget class
*/
EditJsonWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
EditJsonWidget.prototype.render = function(parent,nextSibling) {
	var self = this;
	// Save the parent dom node
	this.parentDomNode = parent;
	// Compute our attributes
	this.computeAttributes();
	// Execute our logic
	this.execute();
	// Create our element
	var domNode = this.document.createElement("div");
	var domNode2 = this.document.createElement("div");


	var domNode2 = this.document.createElement("div");
	domNode.innerHTML = '<div style="font-size: 11px; font-family: Verdana,Arial,Helvetica,sans-serif;" id="jsoneditortree'+newid+'"></div>';
	domNode2.innerHTML 	=	this.formHTML;
	
	// Insert the element into the DOM
	parent.insertBefore(domNode2,nextSibling);
	parent.insertBefore(domNode,domNode2);

	this.instance=JSONeditor.start('jsoneditortree'+newid,domNode2.firstChild.firstChild,this.root,
									'$:/plugins/bj/WidgetTreeViewer/',this.format,this.items);
	var instance = this.instance;

	newid++;
	this.domNodes.push(domNode);
	this.domNodes.push(domNode2);
	if(this.postRender) {
		this.postRender();
	}
	this.formsetup(domNode2.firstChild);
};

EditJsonWidget.prototype.formHTML=	
	'<div style="font-size: 11px; font-family: Verdana,Arial,Helvetica,sans-serif;" ">'+
	"<form name=\"jsoninput\" >"	+
	"\nLabel:<br>"+
	"<input name=\"jlabel\" type=\"text\" value=\"\" size=\"60\" style=\"width:400px\">"+
	"<br><br>\nValue: <br>"+
	"<textarea name=\"jvalue\" rows=\"10\" cols=\"50\" style=\"width:400px\"></textarea>"+
	"</form></div>";
				
EditJsonWidget.prototype.formsetup = function(f) {
	var instance = this.instance
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

			default:
			//e[i].style.display = 'none';
		}
	}
}
/*
Compute the internal state of the widget
*/
EditJsonWidget.prototype.execute = function() {
	// Get our parameters
	this.root = this.getAttribute("root","$tw.rootWidget");
	try {
	eval("this.root="+this.root);
	} catch (e) {
	this.root = $tw.rootWidget;
	}	
	this.items = JSON.parse(this.getAttribute("items","[]"));
	this.onkeyupdate = "no"; 

};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
EditJsonWidget.prototype.refresh = function(changedTiddlers) {
	return false;
};


exports["widget-tree-viewer"] = EditJsonWidget;

})();

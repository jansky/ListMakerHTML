/*
lmapp.js
Defines the main application

Dependencies:

list.js
*/

var root;

var LMList = new List();

var w = null;

function ClearElement(e)
{
	while ( e.firstChild ) {
  		e.removeChild( e.firstChild );
	}
}

function ChangeLMListTitle(newtitle)
{
	LMList.name = newtitle;
}

function InitList(u)
{
	root = document.getElementById(u);
	LMList.name = "New List";
}

function LoadListFromJSON(j)
{
	LMList = new List();
	var listLiteral = JSON.parse(j);

	for (var prop in listLiteral)
    	LMList[prop] = listLiteral[prop];

	UpdateLMListDisplay();

	window.location.hash = "";
}

function GetJSONFromList()
{
	return JSON.stringify(LMList);
}

function BoolToStr(b)
{
	if(b)
	{
		return "true";
	}
	else
	{
		return "false";
	}
}

function AddListItemToULList(element, index, array)
{
	var li = document.createElement("li");
	var c = document.createElement("input");
	var s = document.createElement("span");
	var s2 = document.createElement("span");
	var editLink = document.createElement("a");
	var removeLink = document.createElement("a");
	var moveUpLink = document.createElement("a");
	var moveDownLink = document.createElement("a");
	var boldLink = document.createElement("a");
	var italicLink = document.createElement("a");
	var urgentLink = document.createElement("a");
	li.setAttribute("id", index);
	c.setAttribute("type", "checkbox");
	c.setAttribute("id", "check" + index);
	c.setAttribute("onchange", "checkChange(" + index + ")");
	s.innerHTML = element.text;
	s.setAttribute("id", "text" + index);

	//Bold, Italics, Urgent

	if(element.bold)
	{
		s.style.fontWeight = "bold";
	}
	
	if(element.italic)
	{
		s.style.fontStyle = "italic";
	}

	if(element.urgent)
	{
		s.style.color = "red";
	}

	c.checked = element.completed;
	s.style.marginLeft = "3px";

	editLink.setAttribute("href", "javascript:startEdit(" + index + ")");
	editLink.innerHTML = "Edit";

	removeLink.setAttribute("href", "javascript:RemoveLMListItem(" + index + ")");
	removeLink.innerHTML = "Remove";
	removeLink.style.marginLeft = "5px";

	moveUpLink.setAttribute("href", "javascript:moveUp(" + index + ")");
	moveUpLink.innerHTML = "&uarr;";
	moveUpLink.style.marginLeft = "5px";

	moveDownLink.setAttribute("href", "javascript:moveDown(" + index + ")");
	moveDownLink.innerHTML = "&darr;";
	moveDownLink.style.marginLeft = "5px";

	boldLink.setAttribute("href", "javascript:doBold(" + index + ")");
	boldLink.innerHTML = "Bold";
	boldLink.style.marginLeft = "5px";
	boldLink.style.fontWeight = "bold";

	italicLink.setAttribute("href", "javascript:doItalic(" + index + ")");
	italicLink.innerHTML = "Italic";
	italicLink.style.marginLeft = "5px";
	italicLink.style.fontStyle = "italic";

	urgentLink.setAttribute("href", "javascript:doUrgent(" + index + ")");
	urgentLink.innerHTML = "Urgent";
	urgentLink.style.marginLeft = "5px";
	urgentLink.style.color = "red";


	s2.setAttribute("id", "links" + index);
	s2.style.marginLeft = "50px";
	s2.style.display = "none";
	s2.appendChild(editLink);
	s2.appendChild(removeLink);
	s2.appendChild(urgentLink);
	s2.appendChild(boldLink);
	s2.appendChild(italicLink);
	s2.appendChild(moveUpLink);
	s2.appendChild(moveDownLink);
	

	li.setAttribute("onmouseover", "doControlShow(" + index + ")");
	li.setAttribute("onmouseout", "doControlHide(" + index + ")");
	li.setAttribute("ondblclick", "startEdit(" + index + ")");
	li.appendChild(c);
	li.appendChild(s);
	li.appendChild(s2);
	root.appendChild(li);
}

function DoLMAboutBox()
{
	var w = window.open('', '', 'width=700,height=400,scrollbars');

	w.document.write(document.getElementById("about").innerHTML);
	w.document.body.style.fontFamily = "sans-serif";
	w.document.title = "About List Maker HTML";
	w.document.close();
}

function DoLMPrint()
{
	var w = window.open('', '', 'width=400,height=400,resizeable,scrollbars');

	
	
	
	var ol = document.createElement("ol");
	var h1 = document.createElement("h1");
	h1.innerHTML = LMList.name;

	
	
	

	LMList.items.forEach(function(element, index, array){

		var li = document.createElement("li");
		var c = document.createElement("input");
		var s = document.createElement("span");

		li.setAttribute("id", index);
		c.setAttribute("type", "checkbox");
		s.innerHTML = element.text;
		c.checked = element.completed;
		s.style.marginLeft = "3px";

		li.appendChild(c);
		li.appendChild(s);
		ol.appendChild(li);
		
	});

	
	w.document.body.appendChild(h1)
	w.document.body.appendChild(ol);
	w.document.body.style.fontFamily = "sans-serif"
	w.document.title = LMList.name;

	w.print();

	

	w.document.close();


}

function UpdateLMListDisplay()
{
	//Remove all li from root
	while ( root.firstChild ) {
  		root.removeChild( root.firstChild );
	}

	LMList.items.forEach(AddListItemToULList);

	if(LMList.GetNumListItems() > 0)
	{
		document.getElementById("noitems").style.display = "none";
	}
	else
	{
		document.getElementById("noitems").style.display = "block";
	}

	var title = document.getElementById("ltitle");
	ClearElement(title);

	title.innerHTML = LMList.name;

	document.title = LMList.name + " - List Maker";




}

function RemoveLMListItem(itemid)
{
	LMList.RemoveItem(itemid);
	UpdateLMListDisplay();
}

function AddLMListItem(itemtext, completed)
{
	var li = new ListItem(itemtext, completed);

	LMList.AddItem(li);
	UpdateLMListDisplay();
}

function EditLMListItem(itemid, itemtext, completed)
{
	var li = new ListItem(itemtext, completed);

	LMList.ReplaceItem(itemid, li);
	UpdateLMListDisplay();
}


/*
list.js
Defines the 'list' object
*/

var List = function()
{
	this.name = "";
	this.author = "";
	this.desc = "";

	this.items = [];

	


}

var ListItem = function(t, c)
{
	this.text = t;
	this.completed = c;
}


List.prototype.AddItem = function(li)
{
	this.items[this.items.length] = li;
}

List.prototype.RemoveItem = function(liid)
{
	this.items.splice(liid, 1);
}

List.prototype.ReplaceItem = function(liid, newli)
{
	this.items[liid] = newli;
}

List.prototype.GetNumListItems = function(liid, newli)
{
	return this.items.length;
}

List.prototype.InitializeWithListData = function(n,a,d,i)
{
	name = n;
		author = a;
		desc = d;
		items = i;
}


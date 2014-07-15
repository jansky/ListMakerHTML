/*
undoredo.js
Deals with undo / redo functionality

!! NOT WORKING !!

Dependencies:

lmapp.js
list.js
*/

var undoarray = [];
var redoarray = [];
var undostep = 0;
var redostep = 0;


function AddToUndoQueue(j)
{
	undoarray[undoarray.length] = j;
	undostep = undoarray.length - 1;
}

function AddToRedoQueue(j)
{
	redoarray[redoarray.lenth] = j;
	redostep = redoarray.length - 1;
}

function DoUndo()
{
	LoadListFromJSON(undoarray[undostep]);

	if(undostep > 0)
	{
		undostep = undostep - 1;
	}
}

function DoRedo()
{
	LoadListFromJSON(undoarray[redostep]);

	if(redostep > 0)
	{
		redostep = redostep - 1;
	}
}


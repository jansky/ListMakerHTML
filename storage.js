/*
storage.js
Deals with list storage

Dependencies:

lmapp.js
list.js
*/



function LSIterate(callback)
{
	for ( var i = 0, len = localStorage.length; i < len; ++i )
	{
		callback.call(this, localStorage.key(i));
	}
}

function LSSaveList()
{
	var key = document.getElementById("lsfn").value;

	if(key != "")
	{
		//Check if filename already exists
		var keyAlreadyExists = false;
		var willSave = true;

		LSIterate(function(k){
			if(k == key)
  			{
  				keyAlreadyExists = true;
  			}
		});
  			
		

		if(keyAlreadyExists)
		{
			if(!confirm("A list has been saved with that save name already. Overwrite it?"))
			{
				willSave = false;
			}
		}

		if(willSave)
		{
			localStorage.setItem(key, GetJSONFromList());

			//Make sure the list was saved
			var listSaved = false;
			LSIterate(function(k)
			{
				if(k == key)
				{
					listSaved = true;
				}
			});

			if(listSaved)
				alert("List saved");
			else
				alert("The list was not able to be saved");

			//Update the open list form
			ClearElement(document.getElementById("olform"));
			LSOpenListForm();

			window.location.hash = encodeURIComponent(key);
			

		}
	}

	return false;
}

function LSOpenList()
{
	var key = document.getElementById("lsopensel").value;

	if(key != "" || key != undefined)
	{

		var json = localStorage.getItem(key);

		LoadListFromJSON(json);

		document.getElementById("lsfn").value = key;

		window.location.hash = encodeURIComponent(key);
		
	}

	return false;


}

function LSOpenListFromKey(key)
{
	if(key != "" || key != undefined)
	{

		var json = localStorage.getItem(key);

		LoadListFromJSON(json);

		document.getElementById("lsfn").value = key;

		window.location.hash = encodeURIComponent(key);
		
	}
}

function LSDeleteList()
{
	var key = document.getElementById("lsopensel").value;

	if(confirm("Really Delete '" + key + "'?"))
	{
		localStorage.removeItem(key);

		//Check if list was really deleted
		var listDeleted = true;

		LSIterate(function(k)
		{
			if(k == key)
			{
				listDeleted = false;
			}
		});

		if(listDeleted)
		{
			alert("List deleted");
		}
		else
		{
			alert("The list was not able to be deleted");
		}

		//Update the open list form
		ClearElement(document.getElementById("olform"));
		LSOpenListForm();
	}
}

function LSOpenListForm()
{
	if(localStorage.length > 0)
	{
	var form = document.createElement("form");
	form.setAttribute("action", "#");
	form.setAttribute("onsubmit", "return LSOpenList()");

	var slabel = document.createElement("label");
	slabel.setAttribute("for", "lsopensel");

	var select = document.createElement("select");
	select.setAttribute("id", "lsopensel");

	LSIterate(function(key){

		var option = document.createElement("option");
		option.setAttribute("value", key);
		option.innerHTML = key;

		select.appendChild(option);

	});

	var submit = document.createElement("input");
	submit.setAttribute("type", "submit");
	submit.setAttribute("value", "Open");

	var del = document.createElement("input");
	del.setAttribute("type", "button");
	del.setAttribute("onclick", "LSDeleteList()");
	del.setAttribute("value", "Delete List");
	del.style.marginLeft = "20px";
	del.style.color = "red";

	form.appendChild(slabel);
	form.appendChild(select);
	form.appendChild(submit);
	form.appendChild(del);

	document.getElementById("olform").appendChild(form);
	}
	else
	{
		var i = document.createElement("i");
		i.innerHTML = "No saved lists."
		document.getElementById("olform").appendChild(i);
	}
}

function JLShowExportDialog()
{
	var w = window.open('', '', 'width=400,height=400,scrollbars');

	var h1 = document.createElement("h1");
	h1.innerHTML = "Export To JSON";

	var p = document.createElement("p");
	p.innerHTML = "The text in the box below contains the JSON.";

	var textarea = document.createElement("textarea");
	textarea.value = GetJSONFromList();
	textarea.setAttribute("rows", "10");
	textarea.setAttribute("cols", "45");

	w.document.body.appendChild(h1);
	w.document.body.appendChild(p);
	w.document.body.appendChild(textarea);

	
	w.document.body.style.fontFamily = "sans-serif";
	
	w.document.title = "Export List To JSON";
	w.document.close();
}

function JLShowImportDialog()
{
	var w = window.open('', '', 'width=400,height=400,scrollbars');

	var h1 = document.createElement("h1");
	h1.innerHTML = "Import List From JSON";

	var p = document.createElement("p");
	p.innerHTML = "Paste the list JSON into the box below and click 'Import'.";

	var textarea = document.createElement("textarea");
	
	textarea.setAttribute("rows", "10");
	textarea.setAttribute("cols", "45");
	textarea.setAttribute("id", "json");

	var button = document.createElement("input");
	button.setAttribute("value", "Import");
	button.setAttribute("onclick", "var j = document.getElementById('json').value; window.opener.LoadListFromJSON(j)");
	button.setAttribute("type", "button");

	w.document.body.appendChild(h1);
	w.document.body.appendChild(p);
	w.document.body.appendChild(textarea);
	w.document.body.appendChild(document.createElement("br"));
	w.document.body.appendChild(button);

	
	w.document.body.style.fontFamily = "sans-serif";
	
	w.document.title = "Import List From JSON";
	w.document.close();
}

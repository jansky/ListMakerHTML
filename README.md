ListMakerHTML
=============

A pure HTML and JavaScript web application that allows users to create ordered lists.

Features
--------

(As of 1.0)

* Create, edit, remove, and change placement of list items (new list items can only be inserted at the end of the list currently)
* Save and retrieve lists using local storage
* Print lists

(As of 1.5, the current version)
* Create, edit, remove, and change placement of list items (new list items can only be inserted at the end of the list currently)
* Save and retrieve lists using local storage
* Print lists
* Format list items using **bold** and *italics*
* Set list items as urgent, making them <span style="color: red">red</span>
* Export lists to JSON, import lists from JSON
* After loading and saving lists to local storage, the URL hash (the part of the URL after #) is set to the list save name, so when you refresh the page the list is automatically loaded from local storage (**LISTS ARE NOT AUTOMATICALLY SAVED**)

Todo
----

* Implement undo / redo support. The file *undoredo.js* doesn't work, and the application doesn't contain any references to it (you can safely remove it if you like)
* Download list JSON directly to a file, and allow users to upload files containing list JSON instead of forcing them to copy and paste it



index.html vs index-min.html
----------------------------

index.html requires the inclusion of the various javascript files in this repository. index-min.html is completely standalone. It contains a minified version of all the javascript code right within the file.

Boths versions *do not require internet access*.

Compatibility
-------------

List Maker HTML includes polyfills for JSON parsing, array.forEach, and local storage (using cookies).

Try It
------

You can try List Maker HTML at http://git.io/listmakerhtml





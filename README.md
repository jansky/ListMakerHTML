ListMakerHTML
=============

A pure HTML and JavaScript web application that allows users to create ordered lists.

Features
--------

* Create, edit, remove, and change placement of list items (new list items can only be inserted at the end of the list currently)
* Save and retrieve lists using local storage

index.html vs index-min.html
----------------------------

index.html requires the inclusion of the various javascript files in this repository. index-min.html is completely standalone. It contains a minified version of all the javascript code right within the file.

Boths versions *do not require internet access*.

Compatibility
-------------

List Maker HTML includes polyfills for JSON parsing, array.forEach, and local storage (using cookies).





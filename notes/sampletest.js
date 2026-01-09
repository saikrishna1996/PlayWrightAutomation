import { text } from "node:stream/consumers"

if Id is present
CSS ->  tagname#id (or) #id
Class -> tagname.classname (or) .classname
Attributes -> tagname[attribute='value'] (or) [attribute='value']

Write CSS with traversing from parent to child or sibling to sibling is also possible.
css ->   parenttagname > childtagname  (for direct child)
         parenttagname childtagname   (for any level child)
         tagname1 + tagname2         (for immediate next sibling)
         tagname1 ~ tagname2         (for any next sibling)
         for more details refer to W3Schools CSS selectors documentation.  

If needs to write the locator based on text
text = "textvalue"   (exact match)
text = "textvalue"   (partial match using regex)  -> /textvalue/



Example:
<input id="username" class="inputtext" type="text">

CSS by id -> #username  OR  input#username
CSS by class -> .inputtext  OR  input.inputtext

In Playwright, we use locator() method to find any element on the page using CSS selectors.

In the above code, we have added CSS selectors to locate username, password fields and sign-in button using their respective ids.
We have also added an assertion to verify that the error message "Incorrect username or password." is displayed after attempting to sign in with incorrect credentials.
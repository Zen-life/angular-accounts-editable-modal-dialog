# angular-accounts-editable-modal-dialog

This project is written in Angular 4+ framework. It is a single page project, which contains a list of Accounts that are editable
via fields in a modal (pop up dialog). Next to each account name, there is an 'edit' button. When the button is clicked, it opens a
modal dialog. 

The modal dailog displays the details of the account clicked, e.g. name (first and second name) and date of birth. These can be edited
if necessary. Once the editing is done (or not) the 'Save' or 'Cancel' buttons is clicked clicked to save the details or cancel to 
keep the original details. Clicking either button will automatically close the modal and bring the user to the main Accounts page.

This was my first experince in using Angular to build a little app. The modal and editing works well. However, I need to tidy up the source
codes, e.g. to remove some console.log codes, which i used for testing during development. Also to remove some comments, which were 
used to remind me of different things I was sometimes testing. Otherwise all works fine. 

This was a small project, so have not yet done data validation to ensure e.g. the name only accepts letters (and not numbers). Also. I
haven't yet done authentication on the app. The idea of the project was more about editing in modal.

# MyReads Project

This is a project part of the Udacity's React NanoDegree course.

The App comprehends 2 views, the "Personal Library" main view and the "Search" 
tool.

## Functionalities

### Personal Library
This is the main view of the app. When it's displayed for the 1st time it 
shows 3 shelves with a placeholder text. At the same time the App is trying 
to fetch the personal library over the net. As soon as the fetch is 
completed, the books will appear on the page.

### Search tool
The search view can be displayed by clicking on the "+" symbol on the bottom 
right of the main page.
This tool allows to search for books between predefined keywords on a remote 
service. A complete list of available keywords can be found here: 
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
Note: partial and multiple worlds are supported.

On each book the "Book action" button is sync with the Personal Library, so 
if a book is in a shelf in the Personal Library, this value is reflected on 
the default option on the specific book.

### Book actions
Each book displayed offers the opportunity to add, move or remove itself on a
 shelf. This functionality is available via the arrow button on the bottom 
 right on each book.

### Notifications
A notification system is in place for give suggestions and feedback from the 
App. It consists on flash messages that appear on the top-right corner of the
 window.
 
## Run the App
- Clone the app in you local machine:
```$ git@github.com:duiliopastorelli/reactnd-myreads.git```
- Install the project dependencies:
```$ npm install```
- Start the project
    - For development
    ```$npm start```
    - For production
    ```$ npm run-script build```
    
## Issues
For any issue please open a ticket on:
https://github.com/duiliopastorelli/reactnd-myreads/issues
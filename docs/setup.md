**Setup Guide****

1. Ensure that all necessary dependencies are installed
   a. Node
   b. NPM
   c. Express
   
 2. Start server within project directory using node
node server.js 

This will run the server on the local 3000 port as specified in the server file. From here you should navigate to the login page:

http://localhost:3000/client/login/login.html

At the current moment, we do not have redirects therefore it is necessary to navigate manually between pages. The urls for the main pages are as follows: 

Dashboard Link: http://localhost:3000/client/dashboard.html

Contains overview of class information and any assignments due that day. Will eventually redirect to chat and calendar. 

Calendar Link: http://localhost:3000/client/project_calendar.html

Contains Calendar of classes/users

Message Link: http://localhost:3000/client/message-board.html

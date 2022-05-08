# 39G's

## Coursify UMass

## Spring 2022

### Overview

* Our application is essentially a course manager with the additional functionality of a message board. This consolidates and streamlines mutiple different current applications that separate these.

### Team Members

* Samuel Anderson
    * Github: samA003 & Samuel-L-Anderson
* William Hogan
    * Github: willhogan370
* Tarun Patra
    * Github: Tars1A
* Gil Handy
    * Github: g-handy

### User Interface

* Dashboard
[![dashboard.jpg](https://i.postimg.cc/fTPxh85D/dashboard.jpg)](https://postimg.cc/HVQJw4fh)
* Message Board 
[![message.jpg](https://i.postimg.cc/YqvW817V/message.jpg)](https://postimg.cc/rKLswRKC)
* Login

* Registration

* Calendar
[![Screen-Shot-2022-05-07-at-10-41-57-PM.png](https://i.postimg.cc/CK7dH4vW/Screen-Shot-2022-05-07-at-10-41-57-PM.png)](https://postimg.cc/0668971f) 

### API's

* Messages
    * app.get('/class')
        * Retrieves information of class given class id
    * app.get('/classes')
        * Retrieves all classes and information
    * app.get('/class/user')
        * Retrieves all users associated with class id
    * app.get('/class/message')
        * Retrieves all messsages associated with class id
    * app.get('/class/channel/message')
        * Retrieves messages associated with channel and class
    * app.get('/user')
        * Retrieves information of user with user id
    * app.post('/message')
        * Posts a message to the database
* Dashboard
    * app.get('/dashboard')
        * Retrieves all classes given user id
    * app.get('/upcomingAssignments')
        * Retrieves five closest assignments due given user id
    * app.get('/assignments')
        * Gets all assignments given user id
    * app.get('/classIds')
        * Gets class id's associated with particular user
* Calendar
    * app.get('/assignments')
        * Gets all assignemts given user id
* Login/Registration
    * app.get('/login')
        * Sends the login file
    * app.post('/login')
        * Handles post data from login
    * app.get('/logout')
        * Handles logging out
    * app.post('/register')
        * Add user and password
    * app.get('/register')
        * Register url
    * app.get('/private')
        * Gets private data
    * app.get('/private/:userID/')
        * Page for user
    
### Database

* Database Documents included in /docs/milestone3.md
* The dashboard interacts with classes and assignment documents
* The message board interacts with spire_users, messages, and classes documents
* The login page interacts with users document
* The registration page interacts with spire_users document
* The calendar interacts with assignment and classes document 

### Authentication/Authorization

* Authentication was done using passport

### Division of Labor

* Samuel Anderson
    * Completed ideas.md, milestone1.md, milestone2.md, milestone3.md, and final.md
    * Contributed to message-board.html, message-board.css, message-board-scripts.js
    * Completed all message board server functions and message_crud.js
* Wiliam Hogan
    * Completed setup.md
    * Completed dashboard.html, dashboard.css, dashboard_client.js, dashboard_crud.js, and all dashboard server functions
    * Contributed to all calendar html/css/js and server functions
* Tarun Patra
    * Completed client/Login and client/Registration
    * Contributed to message-board.html, message-board.css, and message-board-scripts.js
    * Completed authentication 
* Gil Handy
    * Contributed to all calendar html/css/js and server functions

### Heroku link

https://coursify-umass.herokuapp.com/

### Conclusion

Through this project, we all learned what needs to be done to deploy full fledged websites. Some of the difficulties we encountered was linking the information of different pages together. We also faced some difficulties in authentication, and the redirect process between pages. Before starting the project, we all would have liked to have a better understanding of rendering dynamic data and authentication with passport. 

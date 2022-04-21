# Coursify UMass

## API Preview

* Message Board
    * GET '/class'
        * http://localhost:3000/class?class=cs326
        * Retrieves information of singular class
    * GET '/classes'
        * http://localhost:3000/classes
        * Retrieves all classes and information
    * GET '/class/message'
        * http://localhost:3000/class/message?class=cs446
        * Retrieves all messages associated with class
    * GET 'class/channel/message'
        * http://localhost:3000/class/channel/message?channel=1.2
        * Retrieves messages associated with channel and class
    * GET '/user'
        * http://localhost:3000/user?user_id=1
        * Retrieve user object by ID
    * POST '/message'
        * http://localhost:3000/message?content=this%20is%20a%20message&userID=1&channel=1.1
        * Posts message content 
* Dash Board
    * GET Dashboard
        * This endpoint will retrieve the list of all classes that the user is a member of for displaying on the dashboard
    * GET Due Today
        * This api endpoint will be used to obtain an individual class's assignment that is due today from the assignment records. If no assigments are due today then it will display N/A
* Calendar
    * GET Date
        * This functionality simply returns the day of the week for the user, as well as a ny assignments due on that day, and classes scheduled for that day.
        * This GET request will source other API's which contain the user's course schedule, as well as the assignments for the student's courses
    * POST Assignment
        * This functionality simplay allows the user to create their own assignment/meeting/appointment/etc on the day they choose. They can select the day and time for this event.
        * This functionality is available for students or teachers, where teachers can post the assignment and it will be available for all students belonging to that class.
    * PUT Edit Assignment
        * This functionality allows the user to edit any assignments that they have created themselves. Assignments that are created by the instructor are not able to be edited by students. 
    * DELETE Assignment
        * This functionality allows the user to delete any assignments that they have created. The same rules apply here as for the Edit function. 
* Login
    * Create User
        * Creates user
    * Read User
        * Reads user information

## Division of Labor

* Samuel Anderson
    * Developed Message Board API and front end message board interactions
* Tarun Patra
    * Developed login page API and front end login page interactions
* William Hogan
    * Developed Dashboard API and front end dashboard interactions
* Gil Handy
    * Developed calendar API and front end calendar interactions

## Client Interface Screenshots

[![Screen-Shot-2022-04-20-at-9-29-13-PM.png](https://i.postimg.cc/Hs3htcYH/Screen-Shot-2022-04-20-at-9-29-13-PM.png)](https://postimg.cc/zVb7zfHP)

This screenshots illustrates a delete operation on our calendar page

[![frontendclientstuff.jpg](https://i.postimg.cc/RZw4RmKr/frontendclientstuff.jpg)](https://postimg.cc/BjZrSdmN)

[![frontendpost.jpg](https://i.postimg.cc/PrwjXH6L/frontendpost.jpg)](https://postimg.cc/Mvq45CJx)

These two screenshots illustrate a POST request updating the message board.




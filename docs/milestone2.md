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

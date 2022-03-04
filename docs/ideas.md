##Team Name: 39G's

##Application Name: Coursify UMass

##Team Overview
    - Samuel Anderson   Github: Samuel-L-Anderson
    - Will Hogan        Github: willhogan370
    - Tarun Patra       Github: Tars1A
    - Gil Handy         Github: g-handy

##Innovative Idea
    The general idea for our project is a course task manager targeted specifically to UMass Amherst students. Students have repeatedly expressed</br> frustration with the lack of integration between moonami and spire, as well as both systems lacking user friendliness. Our idea, titled Coursify,</br> would allow students at UMass to track their classes meeting times, deadlines, and provide a communication hub for students in the class. </br>Additionally, professors would be authorized to post class wide deadlines which would automatically populate users calendars. This system would create a modern and easy to use academic hub for UMass Students.</br>
    
    This task manager differs from Moonami itself as it allows students to track assignments and deadlines around their existing course schedule. It also provides functionality for students to communicate with classmates other than in the traditional discussion forums provided on the class homepage. Not only this, but calendar deadlines can be more community based, and classmates or even TA’s can share schedules and add meetings to their calendar. 

##Important Components
    The fundamental data type on the system would be a course. Each course would have at least one Professor user, at least one Student user, a calendar, and an associated discussion channel. As mentioned above,  the system would have two types of users which would interact with the various courses. User type one would be Professors. Professors have a teaching relationship with a course. This means that they can post class wide deadlines to the course calendar, see all messages in the discussion channel, as well as access the usual functionality that students have with regards to calendar and discussion channel. User type two would be a student, they would not be able to post class wide deadlines or see all messages in the discussion channel (i.e. cant see private messages between students that they are not involved in).

    The Calendar would contain various deadlines which would possess a date they are due, a date they were assigned,  a brief description, and (optionally) relevant pdf files. The individual users Calendar would automatically populate any class wide deadlines entered by the professor and also be filled with manually entered deadlines by the student. 

    Each class would have a discussion channel that would automatically contain a general channel for all course users and have the functionality for direct messaging as well as adding more channels by the professor. Discussion channels would be filled with messages which have the following attributes: fromUser, toChannel, timeSent, text, Image(optional). Discussion channels would support image sharing but not other file sharing. 
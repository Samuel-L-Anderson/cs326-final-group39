# Database Implementation

## MongoDB

### Documents

* assignments document {
    name: String,
    assignment_id: Number,
    date: String,
    class_id: Number
}

* messages document {
    user: [{
        name: {type: String},
        password: {type: String},
        spire_id: {type: String}
    }],
    message: String,
    class: [{
        title: {type: String},
        class_id: {type: String},
        professor: {type: String}
    }],
    channel: String
}

* classes document {
    title: String,
    class_id: Number,
    professor: String
}

* spire_users document {
    spireid: Number,
    class_ids: [Number],
     name: String
}

* users document {
    name: String,
    password: String,
    spire_id: Number
}

### Breakdown of Division of Labor

* Samuel Anderson
    * Message Board
* William Hogan
    * Dashboard
* Tarun Patra
    * Login/Registration
* Gil Handy
    * Calendar Page
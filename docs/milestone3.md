# Database Implementation

## MongoDB

### Documents

* assignments document {  
    &emsp; name: String,  
    &emsp; assignment_id: Number,  
    &emsp; date: String,  
    &emsp; class_id: Number  
}  

* messages document {  
    &emsp; user: [{  
        &emsp; &emsp; name: {type: String},  
        &emsp; &emsp; password: {type: String},  
        &emsp; &emsp; spire_id: {type: String}  
    &emsp; }],  
    &emsp; message: String,  
    &emsp; class: [{  
        &emsp; &emsp; title: {type: String},  
        &emsp; &emsp; class_id: {type: String},  
        &emsp; &emsp; professor: {type: String}  
    &emsp; }],  
    &emsp; channel: String  
}  

* classes document {  
    &emsp; title: String,  
    &emsp; class_id: Number,  
    &emsp; professor: String  
}  

* spire_users document {  
    &emsp; spireid: Number,  
    &emsp; class_ids: [Number],  
    &emsp; name: String  
}  

* users document {  
    &emsp; name: String,  
    &emsp; password: String,  
    &emsp; spire_id: Number  
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
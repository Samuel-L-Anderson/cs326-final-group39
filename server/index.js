import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv'


// We will use __dirname later on to send files back to the client.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Create the Express app
const app = express();
const port = process.env.PORT || 3000;

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

// Setup the session middleware
app.use(expressSession(sessionConfig));
// Allow JSON inputs
app.use(express.json());
// Allow URLencoded data
app.use(express.urlencoded({ extended: true }));
// Allow static file serving
app.use(express.static('client'));
// Configure our authentication strategy
app.use(logger('dev'));
// app.use('/client', express.static("client"));
auth.configure(app);
// app.use(express.urlencoded({ extended: false }));


// Our own middleware to check if the user is authenticated
function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}

app.get('/', checkLoggedIn, (req, res) => {
  res.sendFile('client/login.html', { root: __dirname })
});

// Handle the URL /login (just output the login.html file).
app.get('/login', (req, res) =>{
  res.sendFile('client/login.html',{root: __dirname})
});

// Handle post data from the login.html form.
app.post(
  '/login',
  auth.authenticate('local', {
    // use username/password authentication
    successRedirect: '/private', // when we login, go to /private
    failureRedirect: '/login', // otherwise, back to login
  })
);

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
  req.logout(); // Logs us out!
  res.redirect('/login'); // back to login
});

// Like login, but add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
app.post('/register', (req, res) => {
  const { username, password } = req.body; 
  if (users.addUser(username,password)) {
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }
});

// Register URL
app.get('/register', (req, res) =>
  res.sendFile(__dirname +'client/register.html', { root: __dirname })
);

// Private data
app.get(
  '/private',
  checkLoggedIn, // If we are logged in (notice the comma!)...
  (req, res) => {
    // Go to the user's page.
    res.redirect('/private/' + req.user);
  }
);

// A dummy page for the user.
app.get(
  '/private/:userID/',
  checkLoggedIn, // We also protect this route: authenticated...
  (req, res) => {
    app.post('/private',(req,res) =>{
      re
    })
    // Verify this is the right user.
    if (req.params.userID === req.user) {
      res.sendFile(`client/message-board.html`, { root: __dirname });
    } else {
      res.redirect('/private/');
    }
  }
);

dotenv.config();


let MONGO_URI = "mongodb+srv://tpatra:tarun@cluster0.69p7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongoose....');
});

var Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: [{
        name: { type: String },
        password: { type: String },
        spire_id: { type: String }
    }],
    message: String,
    class: [{
        title: { type: String },
        class_id: { type: String },
        professor: { type: String }
    }],
    channel: String
});

const message = mongoose.model("Message", messageSchema);

const classSchema = new Schema({
    title: String,
    class_id: Number,
    professor: String,
});


const classModel = mongoose.model('Class', classSchema);

const spireUserSchema = new Schema({
    spireid: Number,
    class_ids: [Number],
    name: String
});

const spireUserModel = mongoose.model('spire_user', spireUserSchema);

const userSchema = new Schema({
    name: String,
    password: String,
    spire_id: Number
});

const userModel = mongoose.model('user', userSchema);

app.get('/dashboard', async (request, response) => {
    classModel.find({})
        .then((data) => {
            response.send(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
})


app.get('/class', async (request, response) => {
    //http://localhost:3000/class?class=cs326
    //Retrieves information of class, i.e. student count, id
    const options = request.query;
    classModel.find({ "classid": options.classid })
        .then((data) => {
            response.send(data);

        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/classes', async (request, response) => {
    //http://localhost:3000/classes
    //Retrieves all classes and info
    classModel.find({})
        .then((data) => {
            response.send(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

app.get('/class/user', async (request, response) => {
    //get all users associated with specific class
    // /class/user?class_id=1
    const options = request.query;
    spireUserModel.find({ class_ids: options.class_id })
        .then((data) => {
            response.send(data);
        })
        .catch((error) => {
            console.log('error', error);
        });
})

app.get('/class/message', async (request, response) => {
    //http://localhost:3000/class/message?class_id=cs446
    //Retrieve all messages associated with class
    const options = request.query;
    message.find({ "class.class_id": { $eq: options.class_id } }, { message: 1, _id: 0 })
        .then((data) => {
            response.send(data);
        })
        .catch((err) => {
            console.log("error", err);
        });
});

app.get('/class/channel/message', async (request, response) => {
    //http://localhost:3000/class/channel/message?channel=1.2
    //Retrieves messages associated with channel and class
    const options = request.query;
    message.find({ "channel": { $eq: options.channel } })
        .then((data) => {
            response.send(data);
        })
        .catch((err) => {
            console.log("Error", err);
        });
});


app.get('/user', async (request, response) => {
    //http://localhost:3000/user?user_id=1
    //Retrieve by ID => name not unique
    const options = request.query;
    spireUserModel.findOne({ spire_id: { $eq: options.user_id } })
        .then((data) => {
            response.send(data);
        })
        .catch((err) => {
            console.log("Error", err);
        })
});

app.post('/message', async (request, response) => {
    //http://localhost:3000/message?content=this%20is%20a%20message&userID=1&channel=1.1
    const options = request.query;
    const text = options.content;
    const channel = options.channel;
    let num = parseFloat(options.channel);
    const name = Math.trunc(num);
    let user = await userModel.find({ spire_id: { $eq: options.userID } });
    let c = await classModel.find({ class_id: { $eq: name } });
    const message_entry = {
        user: user,
        message: text,
        class: c,
        channel: channel
    }
    const m = new message(message_entry);
    m.save();
    response.send("OK");
});
app.listen(port, () => {
  console.log(`App now listening at http://localhost:${port}`);
});

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`)
});



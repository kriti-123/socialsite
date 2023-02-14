const express = require('express');
// const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGooogle = require('./config/passport-google-auth-strategy');
const mailerpost=require('./config/nodemailer');
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(1000);
console.log('chat server is listening on 1000');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware'); 
app.use(
    sassMiddleware({
       src: "./assets/scss",
       dest: "./assets/css",
       debug: "true",
       outputStyle: "expanded",
       prefix: "/css",
    })
 );
app.use(express.urlencoded());


app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    name:'codial',
    secret:'somethinisnew',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://127.0.0.1/codial_development',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

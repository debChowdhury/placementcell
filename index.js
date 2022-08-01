const express = require('express');
const MongoStore = require('connect-mongo');
const env = require('./config/environment');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const logger = require('morgan');


// using the express urlencoded middleware
app.use(express.urlencoded());
// setting and using the asset path
app.use(express.static(env.asset_path));
// using express layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// setting view engine as ejs
app.set('view engine', 'ejs');
// setting views path
app.set('views','./views');
// using expression session and storing session cookie info in mongodb database
app.use(session({
    name: 'placementcell',
    secret: env.session_cookie_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/'+env.db })
}));
// using passport to login, logout, signup and maintaining session along with express session
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// using morgan logger
app.use(logger(env.morgan.mode, env.morgan.options))
// using routes
app.use('/', require('./routes/index'));
// listening to port
app.listen(port, function(err){
    if(err){
        console.log("Error in running server");
        return;
    }
    console.log(`Server running at port ${port}`);
});
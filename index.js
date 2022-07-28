const express = require('express');
const MongoStore = require('connect-mongo');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');




app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(session({
    name: 'placementcell',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/placementcell_development' })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes/index'));
app.listen(port, function(err){
    if(err){
        console.log("Error in running server");
        return;
    }
    console.log(`Server running at port ${port}`);
});
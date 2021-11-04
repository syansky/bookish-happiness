const express = require('express');
const session = require('express-session');
const passport = require("passport");
const flash = require('connect-flash');

const layouts = require('express-ejs-layouts');

const PORT = process.env.PORT || 3000;

const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// use layouts
app.use(layouts);
app.set('layout', 'layouts/main.ejs');

// Use body-parser to parse request body
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Config passportjs
require("./config/passport")(passport);

// Config db
const db = require('./config/database');

// Enabling session
app.use(session({
    secret: 'some_secret_key', 
    cookie: {}, 
    resave: false,
    saveUninitialized: false
 }));

 // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// Flash global var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routes
const index = require('./routes/index');
const user = require('./routes/user');

app.use('/', index);
app.use('/user', user);


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

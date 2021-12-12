const express = require('express');
const bodyParser = require('body-parser');
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

// place all style block in the layout at the head
app.set("layout extractStyles", true);
// place all scripts block in the layout at the end
app.set("layout extractScripts", true);

// routes
const index = require('./routes/index');
const train = require('./routes/train');
const detect = require('./routes/detect');
const help = require('./routes/help');
const about = require('./routes/about');

app.use('/', index);
app.use('/train', train);
app.use('/detect', detect);
app.use('/help', help);
app.use('/about', about);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//Connect to database
const config = require('./config/database');

mongoose.Promise = global.Promise;

mongoose.connect(config.database, {
    useMongoClient: true
}, (err) => {
    if (err) {
        console.log(`Database error: ${err}`);
    } else {
        console.log(`Successfully connected to ${config.database}`);
    }
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize and require passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Users route
const users = require('./routes/users');
app.use('/users', users);

app.use(express.static(path.join(__dirname, 'public')));

// Homepage
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Set up and listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
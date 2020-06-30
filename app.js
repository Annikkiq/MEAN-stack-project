const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users');

//Connect to database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
})

//Routers
app.use('/users', users);

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

//Homepage
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//Set up and listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

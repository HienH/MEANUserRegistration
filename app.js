const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// use env config
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Connect to mongoose
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('connected', () => {
    console.log('Connected to MONGO DB: ' + process.env.DATABASE)
});
mongoose.connection.on('error', (error) => {
    console.log('MONGO DB connection error: ' + error)
});

app.use(cors());
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routers
require('./middleware/passport')(passport);


//Set static folder -- !IMPORTANT
app.use(express.static(path.join(__dirname, 'public')));

// routes 
const userRouter = require('./routes/user.route');

app.get('/', (req, res) => {
    res.send('Invalid Endpoint!!')
});
app.use('/user', userRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
}); 
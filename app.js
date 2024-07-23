const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express app
const app = express();

// Using body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Connecting to MongoDB
// mongoose.connect('mongodb://localhost:27017/userTracking', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const Mongo_url = "mongodb://localhost:27017/userTracking";

    main().then(() => {
        console.log("connected to DB")
     }).catch((err) => {
        console.log(err);
     });
    
    async function main() {
        await mongoose.connect(Mongo_url);
    };


// Define Schemas and Models
const cursorSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    timestamp: Date
});

const clickSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    timestamp: Date
});

const eventSchema = new mongoose.Schema({
    event: String,
    timestamp: Date
});

const Cursor = mongoose.model('Cursor', cursorSchema);
const Click = mongoose.model('Click', clickSchema);
const Event = mongoose.model('Event', eventSchema);

// Middleware to log cursor movements
app.post('/api/cursor', (req, res) => {
    const cursorData = new Cursor(req.body);
    cursorData.save().then(() => res.sendStatus(200));
});

// Middleware to log clicks
app.post('/api/click', (req, res) => {
    const clickData = new Click(req.body);
    clickData.save().then(() => res.sendStatus(200));
});

// Middleware to log page events
app.post('/api/event', (req, res) => {
    const eventData = new Event(req.body);
    eventData.save().then(() => res.sendStatus(200));
});

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Serve the app.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



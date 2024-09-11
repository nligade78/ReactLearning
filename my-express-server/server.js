const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Dummy data
let dummyData = [
    {
        "id": "1",
        "state": "LA",
        "LOB": "8002",
        "Automation_flag": "NO",
        "user_id": "test1"
    },
    {
        "id": "2",
        "state": "PA",
        "LOB": "8003",
        "Automation_flag": "NO",
        "user_id": "test2"
    }
];

// GET request handler
app.get('/api/data', (req, res) => {
    res.json(dummyData);
});

// POST request handler
app.post('/api/data', (req, res) => {
    const newData = req.body;
    // Add the new entry to the dummyData array
    dummyData.push(newData);
    res.send({ message: 'Data added successfully', data: newData });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

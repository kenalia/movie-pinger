const express = require('express');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/v1/getMovieByTitle/:title', (req, res) => {
    res.send(req.params.title);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);


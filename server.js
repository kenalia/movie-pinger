if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const crypto = require('crypto');
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

client.connect();

const app = express();

const endpoint = `http://omdbapi.com/?apikey=${process.env.API_KEY}&`;

const mountRoutes = require('./routes');
mountRoutes(app);

var route, routes = [];

app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});

console.log(routes.map((i) => { return {path: i.path, methods: i.methods}}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/v1/search/:query', (req, res) => {
    fetch(`${endpoint}s=${req.params.query}&type=movie`).then(data => data.json()).then((data) => res.send(data));
})

app.get('/test', (req, res) => {
    res.send('Yeah it work');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);
var route, routes = [];

app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});


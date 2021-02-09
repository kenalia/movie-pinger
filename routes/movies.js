const Router = require('express-promise-router');
const db = require('../db')
const fetch = require('node-fetch');
const endpoint = `http://omdbapi.com/?apikey=${process.env.API_KEY}&`;

const router = new Router();

module.exports = router;

router.get('/byTitle/:title', (req, res) => {
    console.log(req.params.title);
    fetch(`${endpoint}t=${req.params.title}`).then(data => data.json()).then((data) => res.send(data));
});


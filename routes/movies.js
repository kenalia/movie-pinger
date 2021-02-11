const Router = require('express-promise-router');
const db = require('../db')
const fetch = require('node-fetch');
const endpoint = `http://omdbapi.com/?apikey=${process.env.API_KEY}&`;

const router = new Router();

router.get('/byTitle/:title', (req, res) => {
    fetch(`${endpoint}t=${req.params.title}`).then(data => data.json()).then((data) => res.send(data));
});

router.get('/byID', (req, res) => {
    fetch(`${endpoint}i=${req.query.id}`).then(data => data.json()).then((data) => res.status(200).send(data))
})

const isMovieValid = async (id) => {
    const res = await fetch(`${endpoint}i=${id}`);
    const data = await res.json();
    if(!data.Error)
        return true;
    return false;
}

module.exports = {
    router: router,
    isMovieValid: isMovieValid
}
const Router = require('express-promise-router');
const db = require('../db')

const router = new Router();

module.exports = router;

router.get('/byTitle/:title', (req, res) => {
    fetch(`${endpoint}t=${req.params.title}`).then(data => data.json()).then((data) => res.send(data));
});


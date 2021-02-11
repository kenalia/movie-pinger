const Router = require('express-promise-router');
const db = require('../db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = new Router();

module.exports = router;

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept");
    console.log('In Auth');
    next();
})

/**
 * Middleware for authenticating tokens
 * @param req
 * @param res
 * @param next
 */
const checkAuth = (req, res, next) => {
    const token = req.query.token;
    if(!token) {
        res.status(409).send({ reason: 'Missing auth token'});
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decoded);
        if((Date.now() / 1000) > decoded.exp) {
            res.status(409).send({reason: 'Auth token expired'});
            return;
        }
    } catch(e) {
        console.log(e);
    }

    next();
}

router.get('/login', async (req, res) => {
    const result = await db.query('SELECT * FROM watcher WHERE uid = $1', [req.query.userid]);
    if(result.rows?.length === 0) {
        res.status(409).send({ reason: 'Bad info'});
    }

    const id = result.rows[0].id;
    const user = result.rows[0].uid;
    const pass = req.query.pass;
    const salt = result.rows[0].salt;
    const hash = crypto.createHash('sha256').update(pass+salt).digest('hex');

    if(result.rows[0].pass_hash !== hash) res.status(409).send({ reason: 'Bad info'});

    const payload = {
        exp: Math.floor(Date.now() / 1000) + (60*60*6),
        data: {
            'id': result.rows[0].id,
            'userid': result.rows[0].uid
        }
    }

    const token = jwt.sign(payload, process.env.PRIVATE_KEY);
    res.status(200).send({ token: token, id: id, userid: user});
})

router.get('/test', checkAuth,(req, res) => {
    res.status(200).send({ message: 'Token Authenticated'})
});
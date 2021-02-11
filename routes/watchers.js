const Router = require('express-promise-router');
const db = require('../db')
const crypto = require('crypto');
const router = new Router();
const movies = require('./movies');

module.exports = router;

router.post('/pingWatcher', async (req, res) => {
    const user = req.query.userid;
    const movie = req.query.movie;

    let valid = await movies.isMovieValid(movie);
    if(!valid) {
        res.status(409).send({ reason: 'Bad IMDB id'});
        return;
    }

    const result = await db.query('SELECT * FROM watcherlist WHERE userid = $1 AND movieid = $2', [user, movie]);
    if(result.rows?.length > 0) {
        db.query('UPDATE watcherlist SET rec_count = $1 WHERE userid = $2 AND movieid = $3 RETURNING *', [result.rows[0].rec_count+1, user, movie])
        res.status(200).send({ });
        return;
    }

    db.query('INSERT INTO watcherlist (userid, movieid, rec_count, pending) VALUES ($1, $2, $3, $4) RETURNING *', [user, movie, 1, true])
        .then((data) => console.log(data));
    res.status(200).send({});
})

router.post('/addNewWatcher', async (req, res) => {
    console.log(req.query);
    const user = req.query.user;
    const pass = req.query.pass;
    const email = req.query.email ? req.query.email : '';

    let result = await db.query('SELECT uid FROM watcher WHERE uid = $1', [user]);
    if(result.rows?.length > 0) {
        res.status(409).send({reason: 'Username already exists'})
        return;
    }

    // Check password length only, security is the user's problem.
    if(pass.length < 8)
        res.status(400).send({ reason: 'Password is too short'})

    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHash('sha256').update(pass+salt).digest('hex');

    db.query('INSERT INTO watcher (uid, pass_hash, salt) VALUES ($1, $2, $3) RETURNING *', [user, hash, salt])
        .catch(err => console.log(err))
        .finally(() => console.log(`Successfully added user \'${user}\'`));
    res.status(200).send({});
});

router.get('/watcherList', async (req, res) => {
    try {
        console.log(req.query.id);
        const result = await db.query('SELECT movieid, rec_count, pending FROM watcherlist WHERE userid = $1', [req.query.id]);
        console.log(result.rows);
        res.status(200).send(result.rows);
    } catch(e) {
        console.log(e.stack);
        res.status(409).send({reason: 'No known user with ID'});
    }
})

router.get('/allWatchers', async (req, res) => {
    const result = await db.query('SELECT id, uid from watcher;');
    res.status(200).send(result.rows);
})

router.get('/watcherName', async (req, res) => {
    db.query('SELECT uid FROM watcher WHERE id = $1', [req.query.id], (err, result) => {
        if(err) console.log(err.stack);
        else {
            res.status(200).send({ username: result?.rows[0]?.uid });
            return;
        }
        res.status(409).send({ reason: 'No user found with that ID'});
    })
})
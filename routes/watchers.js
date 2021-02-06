const Router = require('express-promise-router');
const db = require('../db')

const router = new Router();

module.exports = router;

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    res.send(rows[0]);
})

router.post('/pingWatcher', (req, res) => {
    console.log(req.path);
    console.log(req.query.uid);
    console.log(req.query.movie);
})

router.post('/addNewWatcher', async (req, res) => {
    console.log(req.query);
    const user = req.query.user;
    const pass = req.query.pass;
    const email = req.query.email ? req.query.email : '';

    // await client.query('SELECT uid FROM watcher WHERE uid = $1', [user], (err, res) => {
    //     console.log('Query: ', Date.now());
    //     if(err) console.log(err)
    //     if(res.rows?.length > 0)
    //         res.status(400).send({reason: 'Username already exists'})
    // })

    // Check password length only, security is the user's problem.
    if(pass.length < 8)
        res.status(400).send({ reason: 'Password is too short'})

    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHash('sha256').update(pass+salt).digest('hex');

    console.log(`Adding User: ${user} with hash ${hash}`);
    res.status(200).send();
})
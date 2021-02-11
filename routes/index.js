const watchers = require('./watchers');
const movies = require('./movies');
const auth = require('./auth');

module.exports = app => {
    app.use('/watchers', watchers);
    app.use('/movies', movies);
    app.use('/auth', auth);
}
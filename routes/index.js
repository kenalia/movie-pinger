const watchers = require('./watchers');
const movies = require('./movies')

module.exports = app => {
    app.use('/watchers', watchers);
    app.use('/movies', movies);
}
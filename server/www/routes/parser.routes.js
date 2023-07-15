const controller = require('../controllers/parser.controller');

module.exports = (app) => {
    app.post('/api/parser', controller.Parser);
};
const userController = require('../controllers/user.controller');

module.exports = app => {
    // Create
    app.post('/api/users', userController.register);
}
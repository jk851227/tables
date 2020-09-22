const User = require('../models/user.model');

module.exports = {
    // Create User
    register: (req, res) => {
        User.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json(err))
    }
}
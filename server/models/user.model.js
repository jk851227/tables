const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, "Required Field" ]
    },
    email: {
        type: String,
        required: [ true, "Required Field" ]
    },
    password: {
        type: String,
        required: [ true, "Required Field" ],
        minlength: [ 8, "Password too short" ],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/copy.test(val),
            message: "Please enter a valid email"
        }
    }
}, { timestamps: true })

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value )

UserSchema.pre('validate',  function(next) {
    if(this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match')
    }
    next()
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next()
        })
});

const User = mongoose.model('User', UserSchema)

module.exports = User;
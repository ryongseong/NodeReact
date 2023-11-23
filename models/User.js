const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', async function(next) {
    let user = this;

    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch (err) {
            return next(err);
        }
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567 암호화된 비밀번호 $2b$10$ZwLrQMGz8/g9IsYzJXcti.Y9G5OP/G9FCOwz8PNkWqNOnrnWrnHUi
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
    })

}


const User = mongoose.model('User', userSchema)

module.exports = { User }
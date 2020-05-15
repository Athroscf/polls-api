const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre("save", function(next) {
    const user = this;

    if (!user.isModified("password")) {
      return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.post("save", function(error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(
            "Ya existe un usuario con la dirección de correo electrónico ingresada"
        );
    } else {
        next(error);
    }
});

UserSchema.methods.compararPassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

UserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
            return reject(err);
            }

            if (!isMatch) {
            return reject(false);
            }

            resolve(true);
        });
    }).catch();
};

module.exports = mongoose.model('User', UserSchema);
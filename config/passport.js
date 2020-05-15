const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            const usuario = await User.findOne({ email });

            if (!usuario) {
                return done(null, false, {
                    error: "Esta cuenta no existe!"
                });
            }

            const passwordVerification = usuario.comparePassword(password);

            if (!passwordVerification) {
                return done(null, false, {
                    error: "Contraseña incorrecta"
                });
            }

            return done(null, usuario);
        }
    )
);

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
    const usuario = await User.findById(id).exec();

    return done(null, usuario);
})

module.exports = passport;
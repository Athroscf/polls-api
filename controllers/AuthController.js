const passport = require('passport');

exports.userAuthentication = passport.authenticate("local", {
    successMessage: {
        mensaje: "Usuario autenticado"
    }
});

exports.verificarUsuario = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return next();
        }
    } catch (error) {
        res
            .status(422)
            .send({
                error: "Correo electronico o contraseña no coinciden"
            })
    }
}

exports.cerrarSesion = (req, res) => {
    req.logout();

    res
        .send({
            mensaje: "Has cerrado sesion"
        })
}
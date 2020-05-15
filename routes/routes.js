const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/AuthController");
const usuariosController = require("../controllers/UserController");
const pollsController = require("../controllers/PollsController");

module.exports = function () {
    router.get(
        "/listPolls",
        pollsController.listPolls
    );

    router.get(
        "/listPoll",
        pollsController.listPoll
    );

    router.post(
        "/newPoll",
        authController.verificarUsuario,
        pollsController.newPoll
    );

    router.put(
        "/updatePoll",
        authController.verificarUsuario,
        pollsController.updatePoll
    );

    router.delete(
        "/deletePoll",
        authController.verificarUsuario,
        pollsController.deletePoll
    );

    router.post(
        "/newAnswer",
        pollsController.newAnswer
    );

    router.get(
        "/answerStatistics",
        // authController.verificarUsuario,
        pollsController.countAnswers
    )

    router.get(
        "/user",
        authController.verificarUsuario,
        usuariosController.listUser
    );

    router.post(
        "/newUser",
        [
            check("username", "El nombre de usuario es requerido")
                .not()
                .isEmpty()
                .escape(),
            check("email", "El correo electronico es requerido")
                .not()
                .isEmpty(),
            check("email", "El correo electronico no es valido")
                .isEmail()
                .normalizeEmail(),
            check("password", "La contraseña es requerida")
                .not()
                .isEmpty()
        ],
        usuariosController.newUser
    );

    router.post(
        "/login",
        authController.userAuthentication
    );

    router.get(
        "/logout",
        authController.cerrarSesion
    );

    router.put(
        "/updateUser/:idUser",
        authController.verificarUsuario,
        usuariosController.updateUser
    );

    router.delete(
        "/deleteUser/:idUser",
        authController.verificarUsuario,
        usuariosController.deleteUser
    );

    return router;
}
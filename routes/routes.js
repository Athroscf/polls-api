const express = require("express");
const router = express.Router();
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
        pollsController.newPoll
    );

    router.put(
        "/updatePoll",
        pollsController.updatePoll
    );

    router.delete(
        "/deletePoll",
        pollsController.deletePoll
    );

    router.post(
        "/newAnswer",
        pollsController.newAnswer
    );

    router.get(
        "/user",
        usuariosController.listUser
    );

    router.post(
        "/newUser",
        usuariosController.newUser
    );

    router.put(
        "/updateUser/:idUser",
        usuariosController.updateUser
    );

    router.delete(
        "/deleteUser/:idUser",
        usuariosController.deleteUser
    );

    return router;
}
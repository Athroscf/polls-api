const Usuario = require("../models/Usuarios");

exports.newUser = async (req, res, next) => {
    const user = new Usuario(req.body);

    try {
        await user.save();

        res
            .status(200)
            .send({
                mensaje: "Se agregó un nuevo usuario"
            });

    } catch (error) {
        res
            .status(422)
            .send({
                error: "Error al agregar un nuevo usuario"
            });
    }
};

exports.listUser = async (req, res, next) => {
    try {
        const user = await Usuario.findOne(req.params._id);

        if (!user) {
            res.status(404).send({ error: "No existe el usuario" });
        }

        res
            .status(200)
            .send({
                username: user.username
            });

    } catch (error) {
        res
            .status(422)
            .send({
                error: "Error al obtener el usuario"
            });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        await Usuario.findOneAndUpdate({
                _id: req.params.idUser
            },
            req.body,
            { new: true }
        );

      res
        .status(200)
        .send({
            mensaje: "El usuario fue actualizado con exito"
        });

    } catch (error) {
      res
        .status(422)
        .send({
            error: "Ha ocurrido un error al momento de actualizar"
        });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await Usuario.findOneAndDelete({
            _id: req.params.idUser
        });

        res
            .status(200)
            .send({
                mensaje: "Se eliminó el usuario"
            });

    } catch (error) {
        res
            .status(422)
            .send({
                error: "Error al eliminar el usuario"
            });
    }
};
const Poll = require('../models/Encuesta');
const Answer = require('../models/Respuestas');

exports.newPoll = async (req, res, next) => {
    const poll = new Poll(req.body);
    console.log(poll);

    try {
        await poll.save();

        res
            .status(200)
            .send({
                mensaje: 'Se agrego una nueva encuesta'
            });

    } catch (error) {
        res
            .status(422)
            .send({
                error: 'Error al momento de agregar una nueva encuesta'
            });
    }
};

exports.updatePoll = async (req, res, next) => {
    try {
        let newPoll = req.body;

        await Poll.findOneAndUpdate({
                _id: req.params.pollCode
            },
            newPoll,
            { new: true }
        );

        res
            .status(200)
            .send({
                mensaje: 'La encuesta ha sido modificada'
            })

    } catch (error) {
        res
            .status(422)
            .send({
                error: 'Error al actualizar la encuesta'
            });
    }
};

exports.listPolls = async (req, res, next) => {
    try {
        const polls = await Poll.find({});

        res
            .status(200)
            .send({
                result: polls
            });

    } catch (error) {
        res
            .status(422)
            .send({
                error: 'Error al obtener el listado de encuestas'
            });
    }
};

exports.listPoll = async (req, res, next) => {
    try {
        const poll = await Poll.findOne({
            _id: req.params.idPoll
        });

        if (!poll) {
            res.status(404).send({
                error: 'Esta encuesta no existe'
            });
        }

        res
            .status(200)
            .send({
                result: poll
            });

    } catch (error) {
        res
            .status(422)
            .send({
                error: 'Error al obtener la encuesta'
            });
    }
};

exports.deletePoll = async (req, res, next) => {
    try {
        await Poll.findByIdAndDelete({
            pollCode: req.params.pollCode
        });

        res.status(200).send({
            mensaje: 'Encuesta eliminada'
        });
    } catch (error) {
        res
            .status(422)
            .send({
                error: 'Error al eliminar la encuesta'
            });
    }
};

exports.newAnswer = async (req, res, next) => {
    try {
        const answer = new Answer(req.body);

        await answer.save();

        res.status(200).send({
            mensaje: 'Respuesta guardada'
        });

    } catch (error) {
        res
            .status(422)
            .send({
                error: 'Error al responder la encuesta'
            });
    }
};


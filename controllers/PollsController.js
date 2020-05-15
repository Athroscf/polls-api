const Poll = require('../models/Encuesta');
const Answer = require('../models/Respuestas');

exports.newPoll = async (req, res, next) => {
    const poll = new Poll(req.body);

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

exports.countAnswers = async (req, res, next) => {
    try {
        res
            .status(200)
            .send({
                first: {
                    Si: await Answer.find({}).countDocuments({ first: "Si" }),
                    No: await Answer.find({}).countDocuments({ first: "No" })
                },
                second: {
                    Accion: await Answer.find({}).countDocuments({ second: "Accion" }),
                    Deportes: await Answer.find({}).countDocuments({ second: "Deportes" }),
                    Estrategia: await Answer.find({}).countDocuments({ second: "Estrategia" }),
                    Otros: await Answer.find({}).countDocuments({ second: "Otros" })
                },
                third: {
                    uno: await Answer.find({}).countDocuments({ third: "0-1" }),
                    dos: await Answer.find({}).countDocuments({ third: "1-3" }),
                    tres: await Answer.find({}).countDocuments({ third: "3-5" }),
                    cuatro: await Answer.find({}).countDocuments({ third: ">5" })
                },
                fourth: {
                    Si: await Answer.find({}).countDocuments({ fourth: "Si" }),
                    No: await Answer.find({}).countDocuments({ fourth: "No" })
                },
                fifth: {
                    uno: await Answer.find({}).countDocuments({ fifth: "0-50" }),
                    dos: await Answer.find({}).countDocuments({ fifth: "50-100" }),
                    tres: await Answer.find({}).countDocuments({ fifth: "100-1000" }),
                    cuatro: await Answer.find({}).countDocuments({ fifth: ">1000" })
                }
            })
    } catch (error) {
        res
            .status(422)
            .send({
                error: error
            })
    }
}

// const countFirstYes = await Answer.countDocuments({ first: "Si" });
// const countFirstNo = await Answer.countDocuments({ first: "No" });
// const countSecond1 = await Answer.countDocuments({ second: "Accion" });
// const countSecond2 = await Answer.countDocuments({ second: "Deportes" });
// const countSecond3 = await Answer.countDocuments({ second: "Estrategia" });
// const countSecond4 = await Answer.countDocuments({ second: "Otros" });
// const countThird1 = await Answer.countDocuments({ third: "0-1" });
// const countThird2 = await Answer.countDocuments({ third: "1-3" });
// const countThird3 = await Answer.countDocuments({ third: "3-5" });
// const countThird4 = await Answer.countDocuments({ third: ">5" });
// const countFourthYes = await Answer.countDocuments({ fourth: "Si" });
// const countFourthNo = await Answer.countDocuments({ fourth: "No" });
// const countFifth1 = await Answer.countDocuments({ fifth: "0-50" });
// const countFifth2 = await Answer.countDocuments({ fifth: "50-100" });
// const countFifth3 = await Answer.cocountDocumentsunt({ fifth: "100-1000" });
// const countFifth4 = await Answer.countDocuments({ fifth: ">1000" });
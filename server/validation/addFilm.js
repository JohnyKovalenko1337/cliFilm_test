const Joi = require('joi');

exports.addFilmSchema = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        released: Joi.number().required(),
        format: Joi.string().valid('VHS', 'DVD', 'Blu-Ray').required(),
        actors: Joi.array().items(Joi.string().required())
    });
    validateRequest(req, next, schema);
}

const validateRequest = (req, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        return next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next(' ');
    }
}
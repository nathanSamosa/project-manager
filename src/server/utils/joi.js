const joi = require('joi');

const registerSchema = joi.object({
    name: joi.string()
        .min(3)
        .required(),
    password: joi.string()
        .min(6)
        .required(),
    email: joi.string().
        email({ 
            minDomainSegments: 2,
            tlds: { allow: true } 
        }),
});

const loginSchema = joi.object({
    password: joi.string()
        .min(6)
        .required(),
    email: joi.string().
        email({ 
            minDomainSegments: 2,
            tlds: { allow: true } 
        }),
});

module.exports = {
    registerSchema,
    loginSchema
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserJoi = void 0;
const Joi = require("joi");
const globle_constrant_1 = require("../shared/constants/globle.constrant");
exports.CreateUserJoi = Joi.object({
    username: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(...Object.values(globle_constrant_1.ROLES))
});
//# sourceMappingURL=user.joi.validation.js.map
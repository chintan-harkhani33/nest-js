import * as Joi from 'joi';
import { ROLES } from 'src/shared/constants/globle.constrant';
 export const CreateUserJoi = Joi.object({
    username: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname:Joi.string().required(),
    email:Joi.string().email().required(),
    password :Joi.string().required(),
    role:Joi.string().valid(...Object.values(ROLES))
})
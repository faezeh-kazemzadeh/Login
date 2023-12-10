import mongoose from "mongoose";
import Joi from "joi";
import {joiPasswordExtendCore} from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore)
const userSchema= mongoose.Schema({
    email:{
        type:String,
        minlength:12,
        maxlength:250,
        required:true,
        unique:true
    },
    firstname:{
        type:String,
        minlength:3,
        maxlength:150,
        required:true
    },
    lastname:{
        type:String,
        minlength:3,
        maxlength:150,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:100,
        trim:true,
        required:true
    },
    userRole:{
        type:String,
        default:'User'
    }
},{tumestamps:true})

 export const validate=(user)=>{

    const schema= Joi.object({
        firstname:Joi.string().min(3).max(150).required(),
        lastname:Joi.string().min(3).max(150).required(),
        // password:Joi.string().min(7).max(100).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        phone:Joi.string().required(),
        email:Joi.string().min(12).max(250).required().email(),
        password:joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .required()
        .messages({
            'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters':
                  '{#label} should contain at least {#min} special character',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces',
            'password.onlyLatinCharacters': '{#label} should contain only latin characters',
      })
      
    })

    return schema.validate(user, { abortEarly: false })
}

export const User=mongoose.model('User', userSchema)










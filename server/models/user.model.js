import mongoose from "mongoose";
import Joi from "joi";
import joiPasswordExtendCore from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore)
const userSchema= mongoose.Schema({
    email:{
        type:String,
        minlength:12,
        maxlength:250,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        minlength:3,
        maxlength:150,
        required:true
    },
    lastName:{
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

const validateUser=(user)=>{

    const schema= Joi.object({
        firstName:Joi.string().min(3).max(150).required(),
        lastName:Joi.string().min(3).max(150).required(),
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

const User=mongoose.model('User', userSchema)


module.exports={
User, validate:validateUser
}






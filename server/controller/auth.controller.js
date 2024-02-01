import bcrypt from "bcrypt";
import _ from "lodash";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { User, validate } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return next(errorHandler(400, error.details[0].message));
  let user = await User.findOne({ email: req.body.email });
  if (user) return next(errorHandler(400, "This User is exist"));

  const salt =await bcrypt.genSalt(10);
  req.body.password =await bcrypt.hash(req.body.password, salt);
  user = new User(
    _.pick(req.body, ["firstname", "lastname", "email", "password", "phone"])
  );

  console.log(`user is ${user}`);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    user.token = token;

    // Set 'Access-Control-Expose-Headers' header
    res.set("Access-Control-Expose-Headers", "x-auth-token");

    res
      .header("x-auth-token", token)
      .send(_.pick(req.body, ["firstname", "lastname", "email"]));
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  
  const { email, password } = req.body; 
  try {
    const validUser =await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not found"));
    const validPassword =await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credential"));
    const token = jwt.sign({ id: validUser._id , roles:validUser.roles}, process.env.SECRET_KEY);
    const{password:pass , ...rest}=validUser._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 *30),
      })
      .status(200)
      .send(rest);
  } catch (error) {
    next(error);
  }
};

export const google =async (req,res,next)=>{
  try {
    // console.log(req.body)
    const user = await User.findOne({email:req.body.email})
    if(user){
      const token= jwt.sign({id:user._id, roles: user.roles},process.env.SECRET_KEY)
      const {password:pass,...rest}=user._doc
  
      res.cookie('access_token',token,{
        httpOnly:true
      }).status(200).send(rest)
   
    }else{
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        email:req.body.email,
        password:hashedPassword,
        phone:req.body.phone,
        avatar:req.body.avatar
      }) 
      await newUser.save();
      const token = jwt.sign({id:newUser._id , roles:newUser.roles},process.env.SECRET_KEY)
      const {password:pass,...rest}=newUser._doc
      res
      .cookie('access_token',token,{httpOnly:true})
      .status(200).send(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signout=async(req,res,next)=>{
  try {
    res.clearCookie('access_token')
    res.status(200).json({ message: "sign Out successfully" });
  } catch (error) {
    next(error)
  }

}



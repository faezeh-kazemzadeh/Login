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
    console.log(validUser)
    if (!validUser) return next(errorHandler(404, "User Not found"));
    const validPassword =await bcrypt.compare(password, validUser.password);
    console.log(validPassword)
    if (!validPassword) return next(errorHandler(401, "Wrong Credential"));
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const{password:pass , ...rest}=validUser._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .send(rest);
  } catch (error) {
    next(error);
  }
};



import bcrypt from "bcrypt";
import _ from "lodash";
import { User, validate } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) next(errorHandler(400, error.details[0].message));
  let user = await User.findOne({ email: req.body.email });
  if (user) next(errorHandler(400, "This User is exist"));

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  user = new User(
    _.pick(req.body, ["firstname", "lastname", "email", "password", "phone"])
  );
  console.log(`user is ${user}`);

  try {
    await user.save();
    res.send(_.pick(req.body, ["firstname", "lastname", "email", "password"]));
  } catch (error) {
    next(error);
  }
};

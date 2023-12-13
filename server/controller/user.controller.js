import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
export const test = (req, res) => {
  res.json({ response: "hello World" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can update your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: req.body.password,
          avatar: req.body.avatar,
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          phone:req.body.phone,
        },
      },
      { new: true }
    );
console.log(updatedUser)
    const { password, ...rest } = updatedUser._doc;
    res.status(200).send(rest);
  } catch (error) {
    next(error);
  }
};

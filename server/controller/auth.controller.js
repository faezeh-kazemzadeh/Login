import bcrypt from "bcrypt";
import _ from "lodash";
import { User, validate } from "../models/user.model.js";
export const signup = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ code: 400, message: error.details[0].message });
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ code: 400, message: "This User is exist" });

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  user = new User(
    _.pick(req.body, ["firstname", "lastname", "email", "password", "phone"])
  );
  console.log(`user is ${user}`);

  await user.save()
  console.log(req.body.password);
  res.send(_.pick(req.body, ["firstname", "lastname", "email", "password"]));
};

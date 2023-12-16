import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "UnAuthorized"));

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "forbidden"));
    req.user = user;
    next();
  });
};

export const authorize=(requiredRoles)=> (req,res,next)=>{
  if(req.user.roles.filter(role=>requiredRoles.includes(role)).length ){
      next()
  }else{
    return next(errorHandler(401, "UnAuthorized"));
  }

}
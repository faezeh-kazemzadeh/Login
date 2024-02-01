import _ from "lodash";
import { Content , validate } from "../models/content.model.js";
import { errorHandler } from "../utils/error.js";

export const add=async(req,res,next)=>{
      console.log(req.body);
      const {error} = validate(req.body)
      if (error) return next(errorHandler(400, error.details[0].message));
      try {
            const content =await new Content(_.pick(req.body , ['title','body','category','author','imageUrls','isPublished']))
            console.log(content)
            await content.save()
            res.status(200).json({        
                  success: true,
                  message:'content added successfuly',
                  content})
      } catch (error) {
            next(error)
      }
}
//get all contents
export const getAll =async(req,res,next)=>{
      try { 
           const contents= await Content.find().populate('imageUrls','name _id').populate('category','name -_id').populate('author','firstname -_id')
           res.status(200).json({contents})
      } catch (error) {
            next(error)
      }
}
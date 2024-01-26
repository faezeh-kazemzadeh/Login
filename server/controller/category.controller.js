import { Category } from "../models/category.model.js"
import _ from 'lodash'
export const add = async(req,res,next)=>{
    console.log(req.body)
    try {
        const category = await Category.create(_.pick( req.body , ['name']))
        res.status(200).json({category})
    } catch (error) {
        next(error)
    }
}
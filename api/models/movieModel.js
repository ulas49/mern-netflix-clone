const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
title:{type:String,required:true,unique:true},
desc:{type:String},
img:{type:String},
imgTitle:{type:String},
imgSm:{type:String},
trailer:{type:String},
video:{type:String},
year:{type:String},
limit:{type:Number},
genre:{type:String},
isSeries:{type:Boolean,default:false}



},{timestamps:true})


const MovieModel = mongoose.model('Movie',MovieSchema)

module.exports=MovieModel
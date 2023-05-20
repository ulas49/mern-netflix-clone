const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
title:{type:String,required:true,unique:true},
type:{type:String},
genre:{type:String},
content:{type:Array}



},{timestamps:true})


const ListModel = mongoose.model('List',ListSchema)

module.exports=ListModel
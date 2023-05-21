const User = require('../models/userModel')
const CryptoJS = require("crypto-js");

//UPDATE

const updateUser = async (req,res,next)=>{

    if(req.user.id===req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password =CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }

        try {
            
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true})
            res.status(200).json(updatedUser)

        } catch (error) {
            res.status(500).json(error)
        }

        
    }else{
        res.status(500).json({
            "message":"You can update only your account!!"
        })
    }

   

}

//DELETE
const deleteUser = async (req,res,next)=>{

    if(req.user.id===req.params.id || req.user.isAdmin){

        try {
            
             await User.findByIdAndDelete(req.params.id)

            res.status(200).json({
                "message":"User has been deleted..."
            })

        } catch (err) {
            res.status(500).json(err)
        }
    }else{
        res.status(500).json({
            "message":"You can delete only your account!!"
        })
    }


}

//GET
const getUser = async (req,res,next)=>{

   

        try {
            
            const user =  await User.findById(req.params.id)
            const {password,...info} = user._doc
            res.status(200).json(info)

        } catch (err) {
            res.status(500).json(err)
        }
    


}


//GET ALL 
const getAllUser = async (req,res,next)=>{
   const query = req.query.new
   if(req.user.isAdmin){
    try {
        
        const users =  query ?  await User.find().sort({_id:-1}).limit(10) : await User.find()
        const newUsers = users.map((user)=>{
            const {password,...info} = user._doc
            return  info
        })
        // const {password,...info} = users._doc
        res.status(200).json(newUsers)
    } catch (err) {
        res.status(500).json(err)
    }
   }else{
    res.status(403).json({
        "message":"You are not allowed to see all users!!"
    })
   }

    



}

//GET USER STATS
const userStats = async (req,res,next)=>{
    const today = new Date()
    const lastYear = today.setFullYear(today.setFullYear()-1)

    const monthsArray=[
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",  "December"
    ]

    try {
        const data = await User.aggregate([
            {
                $project:{
                    month:{$month:"$createdAt"}
                }
            },{
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
       res.status(500).json(error)
    }
}


module.exports={
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
    userStats
}



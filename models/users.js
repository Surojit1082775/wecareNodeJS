const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
        },
        name:{
            type:String,
        },
        password:{
            type:String,
        },
        gender:{
            type:String,
        },
        dateOfBirth:{
            type:Date,
        },
        email:{
            type:String,
        },
        mobileNumber:{
            type:Number,
        },
        pinCode:{
            type:Number,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        country:{
            type:String,
        },
    },
    {
        timestamps:{
            createdAt:true,
            updatedAt:true,
        },
    }
)

module.exports=userSchema;
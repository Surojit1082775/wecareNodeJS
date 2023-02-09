const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema(
    {
        coachId:{
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
        mobileNumber:{
            type:Number,
        },
        speciality:{
            type:String,
        },
    }
)

module.exports=coachSchema;
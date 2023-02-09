const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        bookingId:{
            type:String,
        },
        userId:{
            type:String,
        },
        coachId:{
            type:String,
        },
        appointmentDate:{
            type:Date,
        },
        slot:{
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

module.exports=bookingSchema;
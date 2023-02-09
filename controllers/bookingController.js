const db = require('../models/index')
const validator = require('../utilities/validators')
const helper = require('../utilities/helper')

exports.makeAppointment = async(req,res,next) => {
    try{
        const checkUserExists = await db.userModel.find({userId:req.params.userId});
        const checkCoachExists = await db.coachModel.find({coachId:req.params.coachId});
        const checkUserAlreadyExists = await db.bookingModel.find({
            userId:req.params.userId,
            coachId:req.params.coachId,
            appointmentDate:req.body.dateOfAppointment,
        })
        const checkAlreadyExists = await db.bookingModel.find({
            appointmentDate:req.body.dateOfAppointment,
            slot:req.body.slot
        })
        if(checkUserExists.length === 0){
            let error = new Error();
            error.message = 'User Id does not exist';
            error.status = 400;
            throw error;
        }
        else if(checkCoachExists.length === 0){
            let error = new Error();
            error.message = 'Coach Id does not exist';
            error.status = 400;
            throw error;
        }
        else if(checkAlreadyExists.length>0 || checkUserAlreadyExists.length>0){
            let error = new Error();
            error.message = 'There is an appointment in this slot already';
            error.status = 400;
            throw error;
        }
        else{
            let dataObj={}
            const checkSlot = validator.checkSlot(req.body.slot);
            const checkDateOfAppointment =validator.checkDateOfAppointment(req.body.dateOfAppointment);
            if(checkSlot && checkDateOfAppointment){
                let bookId = await helper.bookingId();
                dataObj.bookingId=bookId;
                dataObj.userId = req.params.userId;
                dataObj.coachId=req.params.coachId;
                dataObj.appointmentDate=req.body.dateOfAppointment;
                dataObj.slot=req.body.slot;
                let insertedData = await db.bookingModel.create(dataObj);
                if(insertedData != null){
                    res.status(200).send(true);
                }
            }
        }
        
    }catch(err){
        next(err);
    }
}

exports.rescheduleAppointment = async(req,res,next) => {
    try{
        let bookingId = req.params.bookingId;
        let checkExists = await db.bookingModel.find({
            bookingId:req.params.bookingId
        })
        // console.log(checkExists.length)
        const checkAlreadyExists = await db.bookingModel.find({
            appointmentDate:req.body.dateOfAppointment,
            slot:req.body.slot
        })
        if(checkExists.length == 0){
            const err = new Error();
            err.message = 'Booking Id does not exist';
            err.status = 400;
            throw err;
        }
        else if(checkAlreadyExists.length > 0){
            const err = new Error();
            err.message = 'There is an appointment in this slot already';
            err.status = 400;
            throw err;
        }
        else{
            const checkSlot = await validator.checkSlot(req.body.slot);
            const checkDateOfAppointment = await validator.checkDateOfAppointment(req.body.dateOfAppointment);
            if(checkSlot && checkDateOfAppointment){
                let bookingDetails = {
                    slot : req.body.slot,
                    appointmentDate : req.body.dateOfAppointment,
                }
                let updatedData = await db.bookingModel.findOneAndUpdate(
                    {bookingId:req.params.bookingId},
                    bookingDetails,
                    {
                        new : true,
                        runValidators : true,
                    }
                )
                // console.log(newData)
                if(updatedData != null){
                    res.send(true).status(200)
                }
            }
        }
    }catch(err){
        next(err);
    }
}

exports.deleteAppointment = async(req,res,next) => {
    try{
        const checkExists = await db.bookingModel.find({
            bookingId : req.params.bookingId
        })
        if(checkExists.length > 0){
            const deleteBooking = await db.bookingModel.deleteOne({
                bookingId : req.params.bookingId
            });
            if(deleteBooking.deletedCount > 0){
                res.send(true).status(200);
            }
        }
        else{
            const err = new Error();
            err.message = 'Could not delete this appointment';
            err.status = 400;
            throw(err);
        }
    }catch(err){
        next(err);
    }
}
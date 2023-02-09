const db = require('../models/index');
const validator = require('../utilities/validators');
const helper = require('../utilities/helper')


exports.registerCoach = async(req,res,next) =>{
    try{
        const checkName = validator.checkName(req.body.name);
        const checkPassword = validator.checkPassword(req.body.password);
        const checkAge = validator.checkAge(req.body.dateOfBirth)
        const checkGender = validator.checkGender(req.body.gender);
        const checkmobileNo = validator.checkMobileNo(req.body.mobileNumber);
        const checkSpeciality = validator.checkSpeciality(req.body.speciality);

        if(checkName && checkPassword && checkAge && checkGender && checkmobileNo && checkSpeciality){
            let data = await db.coachModel.find({name:req.body.name});
            if(data.length === 0){
                const nextId = await helper.coachId();
                let insertedData = await db.coachModel.create({
                    ...req.body,
                    ...{
                        coachId:nextId
                    }
                })
                if(insertedData != null){
                    res.status(201).json({
                        message:nextId
                    })
                }
            }
            else{
                let err = new Error();
                err.message = 'Coach exists with this name';
                err.status = 400;
                throw err;
            }
        }

    }catch(err){
        next(err);
    }
}

exports.loginCoach = async(req,res,next) => {
    try{
        let data = await db.coachModel.find({
            coachId:req.body.id,
            password:req.body.password
        });
        if(data.length > 0){
            res.status(200);
            res.send(true);
        }
        else{
            let err = new Error();
            err.message = 'Incorrect coach id or password';
            err.status = 400;
            throw err;
        }
    }catch(err){
        next(err)
    }
}

exports.getAllCoaches = async(req,res,next) => {
    try{
        let data = await db.coachModel.find();
        res.status(200);
        res.send(data);
    }catch(err){
        next(err);
    }
}

exports.getDetailsByID = async(req,res,next) => {
    try{
        let data = await db.coachModel.find({coachId:req.params.coachId});
        if(data.length > 0){
            res.status(200).json(data);
        }
        else{
            res.status(400).json({
                message:'Coach Id does not exist'
            })
        }
    }catch(err){
        next(err);
    }
}

exports.getBookingsByID = async(req,res,next) => {
    try{
        let checkExist = await db.bookingModel.find({
            coachId : req.params.coachId
        })
        if(checkExist.length > 0){
            let data = await db.bookingModel.find({
                coachId:req.params.coachId
            })
            if(data != null){
                res.status(200).json(data);
            }
        }else{
            const err = new Error();
            err.message = 'Could not find any bookings';
            err.status = 400;
            throw err;
        }
    }catch(err){
        next(err);
    }
}
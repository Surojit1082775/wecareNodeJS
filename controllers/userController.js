const db = require('../models/index');
const sanitize = require('mongo-sanitize')
const validator = require('../utilities/validators')
const helper = require('../utilities/helper')

exports.registerUser = async (req,res,next) => {
    try{
        const checkName = validator.checkName(req.body.name);
        const checkPassword = validator.checkPassword(req.body.password);
        const checkAge = validator.checkAge(req.body.dateOfBirth)
        const checkGender = validator.checkGender(req.body.gender);
        const checkmobileNo = validator.checkMobileNo(req.body.mobileNumber);
        const checkEmail = validator.checkEmail(req.body.email);
        const checkPincode = validator.checkPincode(req.body.pinCode);
        const checkCity = validator.checkCity(req.body.city);
        const checkState = validator.checkState(req.body.state);
        const checkCountry = validator.checkCountry(req.body.country);
        
        if(checkName && checkPassword && checkAge && checkGender && checkmobileNo && checkEmail
            && checkPincode && checkCity && checkState && checkCountry){
            let emailExist = await db.userModel.findOne({email:req.body.email});
            if(emailExist == null){
                let nextId = await helper.generateID();
                const userInserted = await db.userModel.create({
                    ...req.body,
                    ...{
                        userId:nextId
                    }
                })
                if(userInserted != null){
                    res.status(201).json({
                        message:nextId
                    })
                }
            }else{
                let err = new Error();
                err.message = 'User exists with this email id';
                err.status = 400;
                throw err;
            }

        }
    }catch(err){
        next(err)
    }
}

exports.loginUser = async(req,res,next) => {
    try{
        let data = await db.userModel.find({
            userId:req.body.id,
            password:req.body.password
        })
        if(data.length > 0){
            res.status(200);
            res.send(true)
        }
        else{
            let err = new Error();
                err.message = 'Incorrect user id or password';
                err.status = 400;
                throw err;
        }
    }catch(err){
        next(err);
    }
}

exports.getUsers = async(req,res,next) => {
    try{
        let userid = req.params.userId;
        console.log(userid)
        let data = await db.userModel.findOne({userId:userid})
        if(data != null){
            res.status(200).json(data);
        }else{
            // let err = new Error();
            // err.message='User Id does not exist'
            // err.status=400;
            // return next(err);
            res.status(400).json({
                message:'User Id does not exist',
            })
        }
    }catch(error){
        next(error);
    }
}

exports.getBookingsByID = async(req,res,next) => {
    try{
        let checkExist = await db.bookingModel.find({
            userId : req.params.userId
        })
        if(checkExist.length > 0){
            let data = await db.bookingModel.find({
                userId:req.params.userId
            })
            if(data != null){
                res.status(200).json(data);
            }
        }else{
            const err = new Error();
            err.message = 'Could not find any appointment details';
            err.status = 400;
            throw err;
        }
    }catch(err){
        next(err);
    }
}
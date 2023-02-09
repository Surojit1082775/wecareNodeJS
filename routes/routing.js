const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const coachController = require('../controllers/coachController');
const bookingController = require('../controllers/bookingController');

router.post('/users',userController.registerUser);
router.post('/users/login',userController.loginUser);
router.post('/coaches',coachController.registerCoach);
router.post('/coaches/login',coachController.loginCoach);
router.get('/coaches/all',coachController.getAllCoaches);
router.get('/coaches/:coachId',coachController.getDetailsByID);
router.get('/users/:userId',userController.getUsers);
router.post('/users/booking/:userId/:coachId',bookingController.makeAppointment);
router.put('/booking/:bookingId',bookingController.rescheduleAppointment);
router.delete('/booking/:bookingId',bookingController.deleteAppointment);
router.get('/coaches/booking/:coachId',coachController.getBookingsByID);
router.get('/users/booking/:userId',userController.getBookingsByID);
router.all('*',(req,res,next)=>{
    let err = new Error();
    err.message = 'Invalid path';
    err.status = 404;
    next(err);
});

module.exports=router;
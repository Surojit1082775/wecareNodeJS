const mongoose = require('mongoose');
const userSchema = require('./users');
const coachSchema = require('./coaches');
const bookingSchema = require('./bookings');

mongoose.connect('mongodb://localhost:27017/wecare')
    .then(()=>{
        console.log("DB connected")
    });

const db={};

db.userModel = mongoose.model('users',userSchema);
db.coachModel = mongoose.model('coaches',coachSchema);
db.bookingModel = mongoose.model('bookings',bookingSchema);

module.exports=db;
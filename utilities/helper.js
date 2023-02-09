const db = require('../models/index')

const helper = {};

helper.generateID = async() => {
    let data = await db.userModel.find({});
    let genId = data.length + 1;
    const userId = 'UI-'.concat(genId.toString().padStart(4,'0'));
    return userId;
}

helper.coachId = async() => {
    let data = await db.coachModel.find();
    let cid = data.length + 1;
    const id = 'CI-'.concat(cid.toString().padStart(4,'0'));
    return id;
}

helper.bookingId = async() => {
    let data = await db.bookingModel.find();
    let bid = data.length + 1;
    const id = 'B-'.concat(bid.toString().padStart(4,'0'));
    return id;
}

module.exports=helper;
const fs = require('fs');

let errorLogger = (err,req,res,next) => {
    if(err){
        fs.appendFile('ErrorLogger.txt',`${new Date().toDateString}-${err.message}\n`,
        (error) => {
            if(error){
                console.log('Logging failed')
            }
        });
        res.status(err.status).json({
            message:err.message,
        });
    }
}
module.exports=errorLogger;
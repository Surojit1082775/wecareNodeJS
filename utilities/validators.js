const validator ={};

validator.checkName = (name) => {
    if(name != null){
        if(name.trim().length >=3 && name.trim().length <=50){
            return true;
        }
        let err = new Error();
        err.message='Name should have minimum 3 and maximum 50 characters'
        err.status=400;
        throw err;
    }else{
        let err = new Error('Name should have minimum 3 and maximum 50 characters');
        err.status=400;
        throw err;
    }
}

validator.checkPassword = (password) => {
    if(password != null){
        if(password.trim().length >=5 && password.trim().length <=10){
            return true;
        }
        let err = new Error();
        err.message = 'Password should have minimum 5 and maximum 10 characters',
        err.status=400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'Password should have minimum 5 and maximum 10 characters',
        err.status=400;
        throw err;
    }
}

validator.checkAge = (DOB) => {
    if(DOB != null){
        let dob = new Date(DOB);
        let today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        let monthDiff = today.getMonth() - dob.getMonth();
        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() > dob.getDate())){
            --age;
        }
        if(age>20 && age<100){
            return true;
        }
        let err = new Error();
        err.message = 'Age should be greater than 20 and less than 100',
        err.status=400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'Age should be greater than 20 and less than 100',
        err.status=400;
        throw err;
    }
}

validator.checkGender = (gender) => {
    if(gender != null) {
        if(gender === 'F' || gender === 'M'){
            return true;
        }
        let err = new Error();
        err.message = 'Gender should be either M or F';
        err.status = 400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'Gender should be either M or F';
        err.status = 400;
        throw err;
    }
}

validator.checkMobileNo = (mobileNumber) => {
    if(mobileNumber != null){
        if(mobileNumber.toString().length === 10 && !isNaN(mobileNumber)){
            return true;
        }
        let err = new Error();
        err.message = 'Mobile Number should have 10 digits';
        err.status = 400;
        throw err;
    }else{
        console.log('Error')
        let err = new Error();
        err.message = 'Mobile Number should have 10 digits';
        err.status = 400;
        throw err;
    }
}

validator.checkEmail = (email) => {
    if(email != null){
        let regex = /^([a-zA-z]+)([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.com$/
        if(email.match(regex)){
            return true;
        }
        let err = new Error();
        err.message = 'Email should be a valid one';
        err.status = 400;
        throw err;
    }else{
        console.log('Error')
        let err = new Error();
        err.message = 'Email should be a valid one';
        err.status = 400;
        throw err;
    }
}

validator.checkPincode = (pinCode) => {
    if(pinCode != null){
        if(pinCode.toString().length === 6 && !isNaN(pinCode)){
            return true;
        }
        let err = new Error();
        err.message = 'Pincode should have 6 digits';
        err.status = 400;
        throw err;
    }else{
        console.log('Error')
        let err = new Error();
        err.message = 'Pincode should have 6 digits';
        err.status = 400;
        throw err;
    }
}

validator.checkCity = (city) => {
    if(city != null){
        if(city.trim().length >=3 && city.trim().length <=20){
            return true;
        }
        let err = new Error();
        err.message = 'City should have minimum 3 and maximum 20 characters';
        err.status=400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'City should have minimum 3 and maximum 20 characters';
        err.status=400;
        throw err;
    }
}

validator.checkState = (state) => {
    if(state != null){
        if(state.trim().length >=3 && state.trim().length <=20){
            return true;
        }
        let err = new Error();
        err.message = 'State should have minimum 3 and maximum 20 characters';
        err.status=400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'State should have minimum 3 and maximum 20 characters';
        err.status=400;
        throw err;
    }
}

validator.checkCountry = (country) => {
    if(country != null){
        if(country.trim().length >=3 && country.trim().length <=20){
            return true;
        }
        let err = new Error();
        err.message = 'Country should have minimum 3 and maximum 20 characters';
        err.status=400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'Country should have minimum 3 and maximum 20 characters';
        err.status=400;
        throw err;
    }
}

validator.checkSpeciality = (speciality) => {
    if(speciality != null){
        if(speciality.length >=10 && speciality.length <=50){
            return true;
        }
        let err = new Error();
        err.message = 'Specialty should have 10 to 50 characters';
        err.status=400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'Specialty should have 10 to 50 characters';
        err.status=400;
        throw err;
    }
}

validator.checkSlot = (slot) => {
    if(slot != null){
        let pattern = /^([1-9]|10|11|12)\s([AP]{1})M\sto\s([1-9]|10|11|12)\s([AP]{1})M$/
        console.log(slot.match(pattern))
        if(slot.match(pattern)){
            return true;
        }
        let err = new Error();
        err.message = 'Slot should be a valid one';
        err.status=400;
        throw err;
    }else{
        let err = new Error();
        err.message = 'Slot should be a valid one';
        err.status=400;
        throw err;
    }
}

validator.checkDateOfAppointment = (date) => {
    if(date != null){
        let dateOfAppointment = new Date(date);
        let today = new Date();
        if(dateOfAppointment > today){
            let difference = Math.ceil(
                (dateOfAppointment-today)/(1000 * 60 * 60 * 24)
            );
            if(difference>0 && difference<8){
                return true;
            }
        }
        let err = new Error();
        err.message = 'Date should be any upcoming 7 days';
        err.status=400;
        throw err;
    }
    else{
        let err = new Error();
        err.message = 'Date should be any upcoming 7 days';
        err.status=400;
        throw err;
    }
}

module.exports=validator;
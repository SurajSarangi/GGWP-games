const handleErrors = (err) => {
    let errors = { email : '', password : '' };

    if(err.message === 'Incorrect Email'){
        errors.email = "Email not registered. Try signing up";
    }
    if(err.message === 'Incorrect Password'){
        errors.password = "Incorrect Password";
    }


    if(err.code === 11000){
        errors.email = "That email has already been registered. Try logging in"
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports = handleErrors;
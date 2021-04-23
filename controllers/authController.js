const User = require('../models/User');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email : '', password : '' };

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

const signup_get = (req,res) => {
    res.render('signup', { title: "Sign Up" });
};

const signup_post = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const login_get = (req,res) => {
    res.render('login', { title: "Log In" });
};

const login_post = async (req,res) => {
    const { email, password } = req.body;
    res.send(`${email} ${password}`);
};
module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
}
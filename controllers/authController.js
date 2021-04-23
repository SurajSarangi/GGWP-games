const User = require('../models/User');

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
        console.log(err);
        res.status(400).send('error, user not created');
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
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const handleErrors = require('./handleErrors');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    const secret = process.env.SECRET;
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    });
}

const signup_get = (req,res) => {
    res.render('signup', { title: "Sign Up" });
};

const signup_post = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user : user._id });
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

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id });
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge:1 });
    res.redirect('/');
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}
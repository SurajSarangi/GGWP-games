const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtCheck = (req, res, next) => {
    
    const token = req.cookies.jwt;

    if(token){
        const secret = process.env.SECRET || 'play valorant';
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token){
        const secret = process.env.SECRET || 'play valorant';
        jwt.verify(token, secret, async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {
    jwtCheck,
    checkUser
};
const jwt = require('jsonwebtoken');

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

module.exports = { jwtCheck };
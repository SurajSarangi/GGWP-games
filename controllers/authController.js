const signup_get = (req,res) => {
    res.render('signup', { title: "Sign Up" });
};

const signup_post = (req,res) => {
    res.send('new signup');
};

const login_get = (req,res) => {
    res.render('login', { title: "Log In" });
};

const login_post = (req,res) => {
    res.send('user logged in');
};
module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
}
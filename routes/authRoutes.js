const { Router } = require('express');
const controllers = require('../controllers/authController');

const router = Router();

router.get('/signup', (req, res) => controllers.signup_get(req, res));

router.post('/signup', (req, res) => controllers.signup_post(req, res));

router.get('/login', (req, res) => controllers.login_get(req, res));

router.post('/login', (req, res) => controllers.login_post(req, res));

module.exports = router;
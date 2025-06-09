const express = require('express');
const { signup, login, userInfo } = require('../controllers/authController.js');
const verifyToken = require('../middleware/authMiddleware.js');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({msg: "this is working"});
})
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', verifyToken, userInfo);


module.exports = router;
const express = require("express");
const router = express.Router();

const { getUserById, updateUserById} = require('../controllers/userController.js');

router.get('/:userId', getUserById);
router.put('/:userId', updateUserById);


module.exports = router;
const express = require('express');
const { fetchUser } = require('../../control/login');
const verifyToken  = require('../../middlewares/authMiddleware');
const router = express.Router();

// Login Route
router.post('/login', fetchUser);

// Protected Route Example
router.get('/protected', verifyToken, (req, res) => {

    console.log("protected",req.user)
    res.status(200).json({ success: true, message: 'Welcome to the protected route', user: req.user });
});

module.exports = router;
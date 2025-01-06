const express = require('express');
// const { fetchUser } = require('../../controller/login');
const authMiddleware = require('../../middlewares/authMiddleware');
const {manualAuth,logout,fetchUser}=require('../../controller/login')
const router = express.Router();

// Login Route
// router.post('/login', fetchUser);
router.route('/manual').post(manualAuth)
router.route('/logout').post(logout)
router.route('/getuser/:userId').get(fetchUser)


// Protected Route Example
// router.get('/protected', verifyToken, (req, res) => {
//     res.json({ success: true, message: 'Access granted' });
//   });

module.exports = router;
const express=require('express')
const  router=express.Router()

const {fetchUser} = require('../../control/login')




router.route('/loginuser').post(fetchUser)

module.exports=router;
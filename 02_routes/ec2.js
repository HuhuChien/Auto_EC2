const express = require('express')
const {auth_login,get_user_ADinfo,user_logout,check_name_in_DB,create_ec2_DB,demand_apply,demand_apply2,storage,update_ec2_backend,delete_ec2_backend} = require('../01_controllers/ec2')
const {authenticatedToken} = require('../03_middleware/auth')
const router = express.Router()

router.post('/auth/login',auth_login)
router.get('/auth/AD/:sAMAccountName',get_user_ADinfo)
router.get('/logout',user_logout)
router.get('/check_name',check_name_in_DB)  //目前沒用到
router.post('/task',authenticatedToken,create_ec2_DB) //token到期後，無法再繼續執行
router.post('/demand',demand_apply)
router.get('/demand/:demand_apply',demand_apply2)//前端目前沒用到
router.put('/update_ec2/:id',authenticatedToken,update_ec2_backend) //token到期後，無法再繼續執行
router.delete('/delete_ec2/:id',authenticatedToken,delete_ec2_backend) //token到期後，無法再繼續執行


module.exports = router;
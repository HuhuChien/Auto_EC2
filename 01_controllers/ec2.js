const Terraform_data = require('../Models/EC2_defination');
const {the_ad} = require('../04_config/ad')
const jwt = require('jsonwebtoken');



//POST
//登入
exports.auth_login = (req,res,next) => {
    try{
        const username = req.body.username
        const password = req.body.password 
        const user = {
            username: username,
            password: password
        
        }
    
        the_ad.authenticate(req.body.username, req.body.password, function(err, auth) {
            
            if (auth) {
              console.log('Authenticated!');
              //登入成功才會產生token
              //方法1，token沒有設定到期日，但res.cookie也可以設定cookie到期時間
              const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
             
              res.cookie('token',token,{ 
                maxAge: 24 *60 * 60 * 1000,//token會在24小時候到期
                httpOnly: true, //標記此cookie只能從web server　訪問，以避免不正確的進入來取得竄改。
                //跟https有關係應該是另一個property->secure

            }).status(200).json({message: 'Logged in successfully',user:user});
    
      
             
            }
            else {
              console.log('ERROR: '+JSON.stringify(err));
              console.log('Authentication failed!');
              res.status(401).json('Authenticated failed')
            }
          });
    }catch(error){
        res.status(400).json({error:error})
    }
   
}

//GET
//登入時，client接收AD資訊
exports.get_user_ADinfo = (req,res,next) => {
    try{
        const {sAMAccountName} = req.params
        the_ad.findUser(sAMAccountName, function(err, user) {
            if (err) {
                return res.status(400).json({ERROR:err})
        
            }
            if (!user) {
                res.status(200).json({error: sAMAccountName + 'not found'})
    
            } else {
                res.status(200).json(user)
    
            }
          
          });
    }catch(error){
        res.status(400).json({error:error})
    }
    
    
   
}

//GET
//登出，清除cookie
exports.user_logout = (req,res,next) => {
    try{
        
        return res.clearCookie("token").status(200).json({ message: "Successfully logged out 😏 🍀" });
    }catch(error){
        res.status(400).json({error:error})
    }
    
  
}



//POST
//新建雲端主機-送出按鈕
exports.create_ec2_DB = async(req,res,next) => {
    try {
        //console.log(req.headers['x-forwarded-for'] || req.socket.remoteAddress )
        //console.log(req.ip)
        //let ip = req.connection.remoteAddress.split(`:`).pop();
        //console.log(ip)
        const Terraform = await Terraform_data.create(req.body)
        //console.log(Terraform)
        await Terraform.save()
        await res.status(201).json({Terraform});

    }catch(error){
        res.status(400).json({error:error})
    }
}

//POST
//1.檢視申請內容
//2.後台管理-需求單號輸入
exports.demand_apply = async(req,res,next) => {
  
    try{
        const demand = await req.body.demand
        const the_data = await Terraform_data.find({ demand: demand});
        res.send(the_data);
    }catch(error){
        res.status(400).json({error:error})
    }
}

//GET
//上述另一種寫法，目前沒使用
//1.檢視申請內容
//2.後台管理-需求單號輸入
exports.demand_apply2 = async(req,res,next) => {
    try{
        const {demand_apply} = req.params
        const the_data = await Terraform_data.find({ demand: demand_apply});
        res.status(200).send(the_data)
    }catch(error){
        res.status(400).json({error:error})
    }

}


//PUT
//後台管理，更新單一主機申請內容
exports.update_ec2_backend = async(req,res,next) => {

    try{
        const {id} = req.params
        let update = req.body
        const updatedEC2 = await Terraform_data.findOneAndUpdate({_id:id},update,{returnOriginal: false})

     
        res.status(200).json("doneee")
    }catch(error){
        res.status(400).json({error:error})
    }

}



//DELETE
//後台管理，更新單一主機申請內容
exports.delete_ec2_backend = async(req,res,next) => {

    try{
        const {id} = req.params
        const deletedEC2 = await Terraform_data.deleteOne({ _id:id});
        console.log(deletedEC2)
        res.status(200).json("already deleted")
    }catch(error){
   
        res.status(400).json({error:error})
    }
   

}
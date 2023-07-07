const mongoose = require('mongoose');




var Terraform_data_Schemma = new mongoose.Schema({
    

    ad_displayname: {
        type:String,
        required:[true,'must provide AD_displayName'],
        default: "NULL"

    },
    
    ad_samaccountname: {
        type:String,
        required:[true,'must provide AD_sAMAccountName'],
        default: "NULL"
     
    },
    ad_depeartment:{
        type:String,
        required:[true,'must provide AD_department'],
        default: "NULL"
    },

    demand: {
        type:String,
        required:[true,'must provide demand'],
     
    },
    
    server_name: {
        type:String,
        required:[true,'must provide server_name'],
     
    },

    ami: {
        type:String,
        required:[true,'must provide ami'],
    },

    instance_type: {
        type:String,
        required:[true,'must provide instance_type'],
                
    },
    disk1:{
        type:String,
        required:[true,'must provide disk1'],
    },
    extra_disks:{
        type:Object
    },
    subnet: {
        type:String,
        required:[true,'must provide subnet'],
     
    },
    elastic_ip: {
        type:Boolean,
        required:[false,'not necessary'],
        default: false
    }


},{
    timestamps: true,
    timestamps: { currentTime: () => Math.floor(Date.now() + 8*60*60*1000) }
})





module.exports = mongoose.model('Terraform_data',Terraform_data_Schemma)





/*
You cannot access the document being updated in pre('updateOne') or pre('findOneAndUpdate') query middleware. 
If you need to access the document that will be updated,
 you need to execute an explicit query for the document.

*/






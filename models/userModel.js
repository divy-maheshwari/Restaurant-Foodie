const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    token: {
        type:String
    }
});

module.exports = mongoose.model('UserDetail',UserSchema);
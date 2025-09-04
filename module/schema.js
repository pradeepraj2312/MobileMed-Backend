const {default : mongoose,model }= require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email: {
        type : String,
        require :true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type :String,
        required:true
    }
    
});
const User = mongoose.model("User",userSchema);
module.exports = User ;
const mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://pradeeprajec23_db_user:MobileMed@cluster0.dok228m.mongodb.net/UserData").then(()=>{
mongoose.connect("mongodb://localhost:27017/Userdata").then(()=>{
    console.log({message :"conected to database......."})
}).catch((error)=>{
    console.log({message :"not connected......"})
}) 
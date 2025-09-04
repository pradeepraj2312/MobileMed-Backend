const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://pradeeprajec23_db_user:MobileMed@cluster0.dok228m.mongodb.net/UserData").then(()=>{
    console.log({message :"conected to database......."})
}).catch((error)=>{
    console.log({message :"not connected......"})
}) 
const express = require('express');
const app = express();
const port = 3333;
require('./module/connection');
const user = require('./module/schema');
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.json()); 
const authRouter = require('./route/Auth'); 
app.use("/user", authRouter);
app.listen(port, () => { 
    console.log(`Server is listening at http://localhost:${port}`);
});
const express = require('express')
const patientRouter = express.Router();
const Patient = require('../module/patientSchema')
patientRouter.use(express.json());

patientRouter.post("/addpatient", async (req ,res)=>{
    try {
        const {name , age , gender , contactNumber, initialSymptoms, temperature,language} = req.body;
        console.log(req.body);
        const newPatient = new Patient({name , age , gender , contactNumber, initialSymptoms, temperature,language})
        await newPatient.save();
        console.log({
            patient : newPatient
        })
        res.json({message : "Patient Added Successfully"})
    } catch (error) {
        console.error("add patient Error:",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
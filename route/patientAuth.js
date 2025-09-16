const express = require('express')
const patientRouter = express.Router();
const Patient = require('../module/patientSchema')
patientRouter.use(express.json());

patientRouter.post("/addpatient", async (req ,res)=>{
    try {
        const {name , age , gender , contactNumber, initialSymptoms, temperature,language , addedBy} = req.body;
        console.log(req.body);
        const newPatient = new Patient({name , age , gender , contactNumber, initialSymptoms, temperature,language,addedBy,timeOfAdd: new Date()})
        await newPatient.save();
        console.log({
            patient : newPatient
        })
        res.json({message : "Patient Added Successfully",
        })
    } catch (error) {
        console.error("add patient Error:",error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
patientRouter.put("/updatepatient/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const updateData = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({
      message: "Patient updated successfully",
      patient: updatedPatient
    });
  } catch (error) {
    console.error("Update patient error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports=patientRouter
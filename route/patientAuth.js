const express = require('express')
const patientRouter = express.Router();
const Patient = require('../module/patientSchema')
patientRouter.use(express.json());
// function formatTimeOfAdd(date) {
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const ampm = hours >= 12 ? 'pm' : 'am';
//   const formattedHours = hours % 12 || 12; // Convert 0 to 12
//   const formattedMinutes = minutes.toString().padStart(2, '0');
//   const day = date.getDate();
//   const month = date.getMonth() + 1; // Months are 0-based
//   const year = date.getFullYear();

//   return `${formattedHours}:${formattedMinutes} ${ampm} (${day}-${month}-${year})`;
// }

patientRouter.post("/addpatient", async (req ,res)=>{
    try {
        const {name , age , gender , contactNumber, initialSymptoms, temperature,language , addedBy} = req.body;
        console.log(req.body);
        const date_ = new Date()
        const newPatient = new Patient({name , age , gender , contactNumber, initialSymptoms, temperature,language,addedBy,time: date_.toLocaleTimeString(),date : date_.toLocaleDateString(),updateTime : date_.toLocaleString()})
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
patientRouter.get("/allpatients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({
      message: "All patients retrieved successfully",
      patients
    });
  } catch (error) {
    console.error("Get all patients error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports=patientRouter
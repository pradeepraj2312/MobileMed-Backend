const { default: mongoose } = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contactNumber: { type: String, required: true },
  initialSymptoms: String,
  temperature: Number,
  language: String,
  time : String,
  bloodType: String,
  bloodPressure: String,
  bloodSugar: String,
  weight: Number,
  height: Number,
  addedBy : String,
  frequency : String,
  dosage : String,
  medication : String,
  diagnosis : String,
  dateOfVisit : String,
  duration :String,
  // addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
const { default: mongoose } = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contactNumber: { type: String, match: /^[6-9]\d{9}$/, required: true },
  initialSymptoms: String,
  temperature: Number,
  language: String,
  timeOfAdd: { type: Date, default: Date.now },
  bloodType: String,
  bloodPressure: String,
  bloodSugar: String,
  weight: Number,
  height: Number,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 40, default: '' },
  company: { type: String, trim: true, maxlength: 160, default: '' },
  service: { type: String, required: true, trim: true, maxlength: 100 },
  budget: { type: String, trim: true, maxlength: 80, default: '' },
  timeline: { type: String, trim: true, maxlength: 80, default: '' },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['new', 'in-progress', 'closed'], default: 'new' }
})

export default mongoose.model('Contact', contactSchema)

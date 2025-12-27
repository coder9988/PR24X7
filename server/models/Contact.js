import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    // Lead tracking fields
    source: {
      type: String,
      default: 'website',
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    utmSource: {
      type: String,
      trim: true,
    },
    utmMedium: {
      type: String,
      trim: true,
    },
    utmCampaign: {
      type: String,
      trim: true,
    },
    // Lead status
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'closed'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    notes: [{
      content: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      createdBy: String,
    }],
  },
  {
    timestamps: true,
  }
)

const Contact = mongoose.model('Contact', contactSchema)

export default Contact


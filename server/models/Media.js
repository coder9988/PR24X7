import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Business', 'Crisis', 'Entertainment', 'Startup']
  },
  publicationName: {
    type: String,
    required: true,
    trim: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  externalUrl: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt field before saving
mediaSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Create slug from title if not provided
mediaSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export default mongoose.model('Media', mediaSchema)

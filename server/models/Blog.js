import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
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
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: 'PR Agency Team'
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['PR Strategy', 'Digital Marketing', 'Crisis Management', 'Brand Building', 'Media Relations', 'Industry News']
  },
  relatedService: {
    type: String,
    enum: ['media-relations', 'brand-management', 'strategic-communications', 'content-creation', 'digital-pr', 'crisis-management'],
    default: null
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true
  },
  seoKeywords: [{
    type: String,
    trim: true
  }],
  readTime: {
    type: Number,
    default: 5
  },
  publishedAt: {
    type: Date
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
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  
  // Set publishedAt when blog is first published
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  
  next()
})

// Create slug from title if not provided
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

// Generate excerpt from content if not provided
blogSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.excerpt) {
    this.excerpt = this.content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .substring(0, 160)
      .replace(/\s+\S*$/, '') // Remove incomplete last word
      + '...'
  }
  next()
})

// Calculate read time based on content length
blogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200
    const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    this.readTime = Math.ceil(wordCount / wordsPerMinute)
  }
  next()
})

export default mongoose.model('Blog', blogSchema)

import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  icon: String,

  features: [
    {
      title: String,
      description: String,
    },
  ],

  process: [
    {
      step: Number,
      title: String,
      description: String,
    },
  ],

  benefits: [String],
  useCases: [String],

  faqs: [
    {
      question: String,
      answer: String,
    },
  ],

  cta: {
    heading: String,
    buttonText: String,
    link: String,
  },

  order: Number,
  isActive: Boolean,

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
serviceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create slug from title if not provided
serviceSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

export default mongoose.model("Service", serviceSchema);

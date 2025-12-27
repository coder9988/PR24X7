import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.js'
import serviceRoutes from './routes/services.js'
import mediaRoutes from './routes/media.js'
import blogRoutes from './routes/blogs.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/blogs', blogRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pr-agency', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    console.log('Server will run with fallback data')
    // Don't exit process, continue with fallback data
  }
}

// Connect to database
connectDB()

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app


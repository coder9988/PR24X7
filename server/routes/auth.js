import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router()

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role || 'admin' 
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  )
}

// Helper function to compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

// Default admin credentials (in production, use database)
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@pragency.com',
  password: process.env.ADMIN_PASSWORD || 'admin123'
}

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    // Check against default admin credentials
    if (email === DEFAULT_ADMIN.email) {
      // Simple password comparison for demo (in production, use hashed passwords)
      const isValidPassword = password === DEFAULT_ADMIN.password
      
      if (isValidPassword) {
        const token = generateToken({ 
          id: 'admin', 
          email: email, 
          role: 'admin' 
        })

        res.json({
          success: true,
          message: 'Login successful',
          token,
          user: {
            id: 'admin',
            email: email,
            role: 'admin'
          }
        })
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        })
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    })
  }
})

// POST /api/auth/verify - Verify token
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      })
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired token',
          isValid: false
        })
      }

      res.json({
        success: true,
        message: 'Token is valid',
        isValid: true,
        user
      })
    })
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    })
  }
})

export default router

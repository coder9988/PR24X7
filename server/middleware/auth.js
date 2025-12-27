import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }

    req.user = user
    next()
  })
}

// Middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }
  next()
}

// Helper function to generate JWT token
export const generateToken = (user) => {
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

// Helper function to hash password
export const hashPassword = async (password) => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

// Helper function to compare password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

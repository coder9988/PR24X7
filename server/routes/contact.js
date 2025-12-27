import express from 'express'
import Contact from '../models/Contact.js'
import nodemailer from 'nodemailer'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Email transporter configuration (you'll need to set up actual email service)
let transporter = null

try {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
} catch (error) {
  console.log('Email service not configured, using fallback mode')
}

// Helper function to get client IP
const getClientIP = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null)
}

// Helper function to send email notification
const sendEmailNotification = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@pragency.com',
      to: process.env.EMAIL_TO || 'hello@pragency.com',
      subject: `New Lead: ${contactData.name} - ${contactData.company || 'No Company'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${contactData.service || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${contactData.budget || 'Not specified'}</p>
        <p><strong>Source:</strong> ${contactData.source}</p>
        ${contactData.utmSource ? `<p><strong>UTM Source:</strong> ${contactData.utmSource}</p>` : ''}
        ${contactData.utmMedium ? `<p><strong>UTM Medium:</strong> ${contactData.utmMedium}</p>` : ''}
        ${contactData.utmCampaign ? `<p><strong>UTM Campaign:</strong> ${contactData.utmCampaign}</p>` : ''}
        <p><strong>IP Address:</strong> ${contactData.ipAddress}</p>
        <h3>Message:</h3>
        <p>${contactData.message}</p>
        <hr>
        <p><small>This message was sent from the PR Agency website contact form.</small></p>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email notification sent successfully')
  } catch (error) {
    console.error('Error sending email notification:', error)
  }
}

// POST /api/contact - Create a new contact submission
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      company, 
      service, 
      budget, 
      message,
      source,
      userAgent,
      utmSource,
      utmMedium,
      utmCampaign
    } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields',
      })
    }

    // Determine lead priority based on budget and service
    let priority = 'medium'
    if (budget === 'over-50k' || service === 'crisis-management') {
      priority = 'high'
    } else if (budget === 'under-5k') {
      priority = 'low'
    }

    // Create contact with enhanced tracking
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      company: company || '',
      service: service || '',
      budget: budget || '',
      message,
      source: source || 'website',
      userAgent: userAgent || '',
      ipAddress: getClientIP(req),
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      utmCampaign: utmCampaign || null,
      priority,
    })

    await contact.save()

    // Send email notification (async, don't wait for it)
    sendEmailNotification(contact.toObject()).catch(err => 
      console.error('Failed to send email notification:', err)
    )

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Error creating contact:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    })
  }
})

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      priority, 
      source,
      search 
    } = req.query

    // Build filter object
    const filter = {}
    
    if (status && status !== 'all') {
      filter.status = status
    }
    
    if (priority && priority !== 'all') {
      filter.priority = priority
    }
    
    if (source && source !== 'all') {
      filter.source = source
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }

    const skip = (page - 1) * limit
    
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Contact.countDocuments(filter)
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: contacts,
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    })
  }
})

// GET /api/contact/:id - Get single contact submission (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found',
      })
    }
    
    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error('Error fetching contact:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    })
  }
})

// PUT /api/contact/:id - Update contact status (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, priority, notes } = req.body
    
    const updateData = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    
    if (notes) {
      updateData.$push = {
        notes: {
          content: notes,
          createdAt: new Date(),
          createdBy: 'Admin', // In production, get from authenticated user
        }
      }
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found',
      })
    }
    
    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    })
  }
})

// DELETE /api/contact/:id - Delete contact submission (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found',
      })
    }
    
    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting contact:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    })
  }
})

// GET /api/contact/stats - Get contact statistics (admin only)
router.get('/stats/dashboard', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments()
    const newContacts = await Contact.countDocuments({ status: 'new' })
    const contactedContacts = await Contact.countDocuments({ status: 'contacted' })
    const qualifiedContacts = await Contact.countDocuments({ status: 'qualified' })
    const convertedContacts = await Contact.countDocuments({ status: 'converted' })
    
    const highPriority = await Contact.countDocuments({ priority: 'high' })
    const mediumPriority = await Contact.countDocuments({ priority: 'medium' })
    const lowPriority = await Contact.countDocuments({ priority: 'low' })
    
    // Last 30 days stats
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const last30Days = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    })
    
    // Top services
    const topServices = await Contact.aggregate([
      { $match: { service: { $ne: null, $ne: '' } } },
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])
    
    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        byStatus: {
          new: newContacts,
          contacted: contactedContacts,
          qualified: qualifiedContacts,
          converted: convertedContacts,
        },
        byPriority: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority,
        },
        last30Days,
        topServices,
      },
    })
  } catch (error) {
    console.error('Error fetching contact stats:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message,
    })
  }
})

export default router


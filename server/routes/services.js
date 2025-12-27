import express from 'express'
import Service from '../models/Service.js'

const router = express.Router()

// Fallback data for when MongoDB is not available
const fallbackServices = [
  {
    _id: '1',
    title: 'Media Relations',
    slug: 'media-relations',
    description: 'Build and maintain strong relationships with journalists and media outlets to maximize your brand visibility and credibility.',
    icon: '📰',
    features: [
      'Press release distribution',
      'Media kit creation',
      'Journalist outreach',
      'Press conference organization',
      'Media monitoring and analysis'
    ],
    order: 1,
    isActive: true
  },
  {
    _id: '2',
    title: 'Brand Management',
    slug: 'brand-management',
    description: 'Develop and maintain a consistent brand identity that resonates with your target audience.',
    icon: '🎯',
    features: [
      'Brand strategy development',
      'Visual identity design',
      'Brand guidelines creation',
      'Brand voice development',
      'Consistent messaging across platforms'
    ],
    order: 2,
    isActive: true
  },
  {
    _id: '3',
    title: 'Strategic Communications',
    slug: 'strategic-communications',
    description: 'Craft compelling narratives and messaging strategies that drive engagement and action.',
    icon: '📢',
    features: [
      'Message development',
      'Storytelling techniques',
      'Audience analysis',
      'Communication planning',
      'Performance measurement'
    ],
    order: 3,
    isActive: true
  },
  {
    _id: '4',
    title: 'Content Creation',
    slug: 'content-creation',
    description: 'Produce high-quality content including press releases, articles, and thought leadership pieces.',
    icon: '✍️',
    features: [
      'Press release writing',
      'Blog content creation',
      'Thought leadership articles',
      'Social media content',
      'Video script development'
    ],
    order: 4,
    isActive: true
  },
  {
    _id: '5',
    title: 'Digital PR',
    slug: 'digital-pr',
    description: 'Leverage digital channels to amplify your message and reach your audience where they are.',
    icon: '💻',
    features: [
      'Social media strategy',
      'Influencer partnerships',
      'Content marketing',
      'Online reputation management',
      'SEO and content optimization'
    ],
    order: 5,
    isActive: true
  },
  {
    _id: '6',
    title: 'Crisis Management',
    slug: 'crisis-management',
    description: 'Navigate challenging situations with strategic communication and reputation protection.',
    icon: '🛡️',
    features: [
      'Crisis communication strategy',
      'Rapid response team',
      'Reputation repair',
      'Stakeholder communication',
      'Post-crisis analysis'
    ],
    order: 6,
    isActive: true
  }
]

// GET all active services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v')
    
    res.json({
      success: true,
      count: services.length,
      data: services
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback data')
    // Return fallback data if MongoDB is not available
    res.json({
      success: true,
      count: fallbackServices.length,
      data: fallbackServices,
      fallback: true
    })
  }
})

// GET service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).select('-__v')
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    res.json({
      success: true,
      data: service
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback data')
    // Return fallback data if MongoDB is not available
    const fallbackService = fallbackServices.find(s => s.slug === req.params.slug)
    
    if (!fallbackService) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    res.json({
      success: true,
      data: fallbackService,
      fallback: true
    })
  }
})

// POST new service (admin only)
router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body)
    await service.save()
    
    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Service with this slug already exists'
      })
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    })
  }
})

// PUT update service (admin only)
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    })
  }
})

// DELETE service (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    })
  }
})

export default router

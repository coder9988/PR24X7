import express from 'express'
import Media from '../models/Media.js'

const router = express.Router()

// Fallback data for when MongoDB is not available
const fallbackMediaItems = [
  {
    _id: '1',
    title: 'Tech Startup Raises $10M in Series A Funding',
    slug: 'tech-startup-series-a-funding',
    description: 'Breaking news about innovative startup securing major investment round led by top venture capital firms.',
    category: 'Startup',
    publicationName: 'TechCrunch',
    publicationDate: new Date('2024-01-15'),
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    externalUrl: 'https://techcrunch.com/example',
    featured: true,
    order: 1,
    isActive: true
  },
  {
    _id: '2',
    title: 'Crisis Management: How Brands Navigate Public Relations Challenges',
    slug: 'crisis-management-brands-pr',
    description: 'Expert analysis of successful crisis communication strategies employed by major corporations.',
    category: 'Crisis',
    publicationName: 'Forbes',
    publicationDate: new Date('2024-01-10'),
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
    externalUrl: 'https://forbes.com/example',
    featured: false,
    order: 2,
    isActive: true
  },
  {
    _id: '3',
    title: 'Entertainment Industry PR Trends for 2024',
    slug: 'entertainment-pr-trends-2024',
    description: 'The latest public relations strategies shaping the entertainment and media landscape.',
    category: 'Entertainment',
    publicationName: 'Variety',
    publicationDate: new Date('2024-01-08'),
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
    externalUrl: 'https://variety.com/example',
    featured: true,
    order: 3,
    isActive: true
  },
  {
    _id: '4',
    title: 'Business Transformation Through Strategic PR',
    slug: 'business-transformation-pr',
    description: 'How strategic public relations initiatives drive business growth and market expansion.',
    category: 'Business',
    publicationName: 'Harvard Business Review',
    publicationDate: new Date('2024-01-05'),
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    externalUrl: 'https://hbr.org/example',
    featured: false,
    order: 4,
    isActive: true
  },
  {
    _id: '5',
    title: 'Startup Ecosystem Thriving with PR Innovation',
    slug: 'startup-ecosystem-pr-innovation',
    description: 'Emerging trends in startup public relations and brand building strategies.',
    category: 'Startup',
    publicationName: 'Entrepreneur',
    publicationDate: new Date('2024-01-03'),
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
    externalUrl: 'https://entrepreneur.com/example',
    featured: false,
    order: 5,
    isActive: true
  },
  {
    _id: '6',
    title: 'Entertainment Marketing Revolution',
    slug: 'entertainment-marketing-revolution',
    description: 'How digital transformation is reshaping entertainment PR and celebrity branding.',
    category: 'Entertainment',
    publicationName: 'Hollywood Reporter',
    publicationDate: new Date('2024-01-01'),
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
    externalUrl: 'https://hollywoodreporter.com/example',
    featured: true,
    order: 6,
    isActive: true
  },
  {
    _id: '7',
    title: 'Business Innovation in Digital Age',
    slug: 'business-innovation-digital-age',
    description: 'How traditional businesses are adapting to digital transformation and modern PR strategies.',
    category: 'Business',
    publicationName: 'Business Insider',
    publicationDate: new Date('2023-12-28'),
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    externalUrl: 'https://businessinsider.com/example',
    featured: false,
    order: 7,
    isActive: true
  },
  {
    _id: '8',
    title: 'Startup Success Stories of 2024',
    slug: 'startup-success-stories-2024',
    description: 'Inspiring journeys of startups that made it big with strategic PR and marketing.',
    category: 'Startup',
    publicationName: 'Inc Magazine',
    publicationDate: new Date('2023-12-25'),
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    externalUrl: 'https://inc.com/example',
    featured: true,
    order: 8,
    isActive: true
  }
]

// GET all media items with optional category filter
router.get('/', async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 12 } = req.query
    
    // Build filter object
    const filter = { isActive: true }
    
    if (category && category !== 'all') {
      filter.category = category
    }
    
    if (featured === 'true') {
      filter.featured = true
    }
    
    const skip = (page - 1) * limit
    
    const mediaItems = await Media.find(filter)
      .sort({ featured: -1, order: 1, publicationDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v')
    
    const total = await Media.countDocuments(filter)
    
    res.json({
      success: true,
      count: mediaItems.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: mediaItems
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback data')
    // Return fallback data if MongoDB is not available
    let filteredData = fallbackMediaItems
    
    if (req.query.category && req.query.category !== 'all') {
      filteredData = filteredData.filter(item => item.category === req.query.category)
    }
    
    if (req.query.featured === 'true') {
      filteredData = filteredData.filter(item => item.featured === true)
    }
    
    res.json({
      success: true,
      count: filteredData.length,
      total: filteredData.length,
      page: 1,
      pages: 1,
      data: filteredData,
      fallback: true
    })
  }
})

// GET media item by slug
router.get('/:slug', async (req, res) => {
  try {
    const mediaItem = await Media.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).select('-__v')
    
    if (!mediaItem) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      })
    }
    
    res.json({
      success: true,
      data: mediaItem
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback data')
    // Return fallback data if MongoDB is not available
    const fallbackItem = fallbackMediaItems.find(item => item.slug === req.params.slug)
    
    if (!fallbackItem) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      })
    }
    
    res.json({
      success: true,
      data: fallbackItem,
      fallback: true
    })
  }
})

// GET categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Media.distinct('category', { isActive: true })
    
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback categories')
    // Return fallback categories if MongoDB is not available
    const categories = ['Business', 'Crisis', 'Entertainment', 'Startup']
    
    res.json({
      success: true,
      data: categories,
      fallback: true
    })
  }
})

// POST new media item (admin only)
router.post('/', async (req, res) => {
  try {
    const mediaItem = new Media(req.body)
    await mediaItem.save()
    
    res.status(201).json({
      success: true,
      message: 'Media item created successfully',
      data: mediaItem
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Media item with this slug already exists'
      })
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating media item',
      error: error.message
    })
  }
})

// PUT update media item (admin only)
router.put('/:id', async (req, res) => {
  try {
    const mediaItem = await Media.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!mediaItem) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Media item updated successfully',
      data: mediaItem
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating media item',
      error: error.message
    })
  }
})

// DELETE media item (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const mediaItem = await Media.findByIdAndDelete(req.params.id)
    
    if (!mediaItem) {
      return res.status(404).json({
        success: false,
        message: 'Media item not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Media item deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting media item',
      error: error.message
    })
  }
})

export default router

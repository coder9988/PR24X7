import express from 'express'
import Blog from '../models/Blog.js'

const router = express.Router()

// Fallback data for when MongoDB is not available
const fallbackBlogs = [
  {
    _id: '1',
    title: 'The Future of PR: AI and Automation in Public Relations',
    slug: 'future-pr-ai-automation',
    content: `<p>Artificial Intelligence is revolutionizing the public relations industry, bringing unprecedented opportunities for automation, data analysis, and personalized communication.</p>
    <p>From automated press release distribution to sentiment analysis and predictive analytics, AI tools are enabling PR professionals to work more efficiently and effectively than ever before.</p>
    <h3>Key Applications of AI in PR</h3>
    <ul>
      <li>Automated media monitoring and analysis</li>
      <li>Predictive analytics for campaign success</li>
      <li>Personalized content creation</li>
      <li>Sentiment analysis and reputation management</li>
    </ul>`,
    excerpt: 'Artificial Intelligence is revolutionizing the public relations industry, bringing unprecedented opportunities for automation and data analysis.',
    image: 'https://images.unsplash.com/photo-1677756119517-756a188d2f59?w=800&h=400&fit=crop',
    author: 'PR Agency Team',
    tags: ['AI', 'Automation', 'Innovation', 'Technology'],
    category: 'PR Strategy',
    featured: true,
    published: true,
    seoTitle: 'The Future of PR: AI and Automation in Public Relations | PR Agency',
    seoDescription: 'Discover how artificial intelligence is transforming public relations with automation, analytics, and personalized communication.',
    seoKeywords: ['AI in PR', 'PR automation', 'artificial intelligence', 'public relations technology'],
    readTime: 5,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'Crisis Communication in the Digital Age: Best Practices',
    slug: 'crisis-communication-digital-age',
    content: `<p>In today's fast-paced digital world, crisis communication has become more complex and challenging than ever before.</p>
    <p>Social media amplifies both problems and solutions, making it essential for organizations to have robust crisis communication strategies in place.</p>
    <h3>Essential Crisis Communication Elements</h3>
    <ul>
      <li>Rapid response protocols</li>
      <li>Clear messaging frameworks</li>
      <li>Multi-channel communication strategies</li>
      <li>Post-crisis analysis and learning</li>
    </ul>`,
    excerpt: 'In today\'s fast-paced digital world, crisis communication has become more complex and challenging than ever before.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    author: 'PR Agency Team',
    tags: ['Crisis Management', 'Digital PR', 'Communication Strategy'],
    category: 'Crisis Management',
    featured: false,
    published: true,
    seoTitle: 'Crisis Communication in the Digital Age: Best Practices | PR Agency',
    seoDescription: 'Learn essential crisis communication strategies for the digital age, including rapid response and multi-channel approaches.',
    seoKeywords: ['crisis communication', 'digital PR', 'reputation management', 'crisis management'],
    readTime: 7,
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    _id: '3',
    title: 'Building Brand Authority Through Thought Leadership',
    slug: 'building-brand-authority-thought-leadership',
    content: `<p>Thought leadership has become a cornerstone of modern brand building, establishing organizations as credible voices in their industries.</p>
    <p>By consistently sharing valuable insights and expertise, companies can build trust, attract customers, and differentiate themselves from competitors.</p>
    <h3>Developing Thought Leadership Strategy</h3>
    <ul>
      <li>Identify your unique perspective</li>
      <li>Create consistent content streams</li>
      <li>Leverage multiple channels and formats</li>
      <li>Engage with industry conversations</li>
    </ul>`,
    excerpt: 'Thought leadership has become a cornerstone of modern brand building, establishing organizations as credible voices in their industries.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop',
    author: 'PR Agency Team',
    tags: ['Thought Leadership', 'Brand Building', 'Content Strategy', 'Authority'],
    category: 'Brand Building',
    featured: true,
    published: true,
    seoTitle: 'Building Brand Authority Through Thought Leadership | PR Agency',
    seoDescription: 'Learn how to establish your brand as an industry leader through strategic thought leadership initiatives.',
    seoKeywords: ['thought leadership', 'brand authority', 'content strategy', 'industry expertise'],
    readTime: 6,
    publishedAt: new Date('2024-01-08'),
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  }
]

// GET all published blogs with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 6, 
      category, 
      tag, 
      featured, 
      search 
    } = req.query
    
    // Build filter object
    const filter = { published: true }
    
    if (category && category !== 'all') {
      filter.category = category
    }
    
    if (tag) {
      filter.tags = { $in: [tag] }
    }
    
    if (featured === 'true') {
      filter.featured = true
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ]
    }
    
    const skip = (page - 1) * limit
    
    const blogs = await Blog.find(filter)
      .sort({ featured: -1, publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content')
    
    const total = await Blog.countDocuments(filter)
    
    res.json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: blogs
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback data')
    // Return fallback data if MongoDB is not available
    let filteredData = fallbackBlogs.filter(blog => blog.published)
    
    if (req.query.category && req.query.category !== 'all') {
      filteredData = filteredData.filter(blog => blog.category === req.query.category)
    }
    
    if (req.query.tag) {
      filteredData = filteredData.filter(blog => blog.tags.includes(req.query.tag))
    }
    
    if (req.query.featured === 'true') {
      filteredData = filteredData.filter(blog => blog.featured === true)
    }
    
    if (req.query.search) {
      const searchLower = req.query.search.toLowerCase()
      filteredData = filteredData.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower)
      )
    }
    
    res.json({
      success: true,
      count: filteredData.length,
      total: filteredData.length,
      page: 1,
      pages: 1,
      data: filteredData.map(blog => ({ ...blog, content: undefined })),
      fallback: true
    })
  }
})

// GET blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      published: true 
    })
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }
    
    res.json({
      success: true,
      data: blog
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback data')
    // Return fallback data if MongoDB is not available
    const fallbackBlog = fallbackBlogs.find(blog => 
      blog.slug === req.params.slug && blog.published
    )
    
    if (!fallbackBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }
    
    res.json({
      success: true,
      data: fallbackBlog,
      fallback: true
    })
  }
})

// GET categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Blog.distinct('category', { published: true })
    
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback categories')
    // Return fallback categories if MongoDB is not available
    const categories = ['PR Strategy', 'Digital Marketing', 'Crisis Management', 'Brand Building', 'Media Relations', 'Industry News']
    
    res.json({
      success: true,
      data: categories,
      fallback: true
    })
  }
})

// GET tags
router.get('/tags/list', async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { published: true })
    
    res.json({
      success: true,
      data: tags
    })
  } catch (error) {
    console.log('MongoDB not available, using fallback tags')
    // Return fallback tags if MongoDB is not available
    const tags = ['AI', 'Automation', 'Innovation', 'Technology', 'Crisis Management', 'Digital PR', 'Communication Strategy', 'Thought Leadership', 'Brand Building', 'Content Strategy', 'Authority']
    
    res.json({
      success: true,
      data: tags,
      fallback: true
    })
  }
})

// POST new blog (admin only)
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Blog post with this slug already exists'
      })
    }
    
    res.status(400).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    })
  }
})

// PUT update blog (admin only)
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    })
  }
})

// DELETE blog (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    })
  }
})

export default router

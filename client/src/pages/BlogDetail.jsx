import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { blogAPI } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await blogAPI.getBySlug(slug)
      
      if (response.data.success) {
        setBlog(response.data.data)
        
        // Fetch related blogs from the same category
        const relatedResponse = await blogAPI.getAll({
          category: response.data.data.category,
          limit: 3
        })
        
        if (relatedResponse.data.success) {
          // Filter out the current blog
          const filtered = relatedResponse.data.data.filter(
            b => b._id !== response.data.data._id
          )
          setRelatedBlogs(filtered.slice(0, 3))
        }
      } else {
        setError('Blog post not found')
      }
    } catch (err) {
      setError('Failed to load blog post')
      console.error('Error fetching blog:', err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Blog Post - PR Agency</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !blog) {
    return (
      <>
        <Helmet>
          <title>Blog Post Not Found - PR Agency</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <div className="space-x-4">
              <button 
                onClick={() => navigate('/blog')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Posts
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{blog.seoTitle || blog.title} - PR Agency</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt} />
        <meta name="keywords" content={blog.seoKeywords?.join(', ') || blog.tags?.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={blog.seoTitle || blog.title} />
        <meta property="og:description" content={blog.seoDescription || blog.excerpt} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.seoTitle || blog.title} />
        <meta name="twitter:description" content={blog.seoDescription || blog.excerpt} />
        <meta name="twitter:image" content={blog.image} />
        
        {/* Article Meta */}
        <meta property="article:published_time" content={blog.publishedAt} />
        <meta property="article:author" content={blog.author} />
        <meta property="article:section" content={blog.category} />
        {blog.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4">
          <div className="container mx-auto px-6">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/blog" className="text-gray-500 hover:text-gray-700 transition-colors">
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{blog.title}</span>
            </nav>
          </div>
        </section>

        {/* Blog Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-8">
                <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
                  {blog.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex items-center justify-center space-x-6 text-gray-300">
                  <span>By {blog.author}</span>
                  <span>•</span>
                  <span>{formatDate(blog.publishedAt)}</span>
                  <span>•</span>
                  <span>{blog.readTime} min read</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Featured Image */}
                <motion.div variants={itemVariants} className="mb-12">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </motion.div>

                {/* Blog Content */}
                <motion.div
                  variants={itemVariants}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Share Section */}
                <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this post</h3>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Share on Twitter
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
                    >
                      Share on LinkedIn
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      Copy Link
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
              >
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Related Posts
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedBlogs.map((relatedBlog, index) => (
                    <motion.div
                      key={relatedBlog._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Link to={`/blog/${relatedBlog.slug}`}>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                          <div className="h-48 overflow-hidden">
                            <img
                              src={relatedBlog.image}
                              alt={relatedBlog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-blue-600 font-medium">
                                {relatedBlog.category}
                              </span>
                              <span className="text-sm text-gray-500">
                                {relatedBlog.readTime} min read
                              </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {relatedBlog.title}
                            </h3>
                            
                            <p className="text-gray-600 line-clamp-3 mb-4">
                              {relatedBlog.excerpt}
                            </p>

                            <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your PR Strategy?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's discuss how our expert PR services can help your business grow and succeed.
              </p>
              <div className="space-x-4">
                <Link 
                  to="/contact"
                  className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  to="/services"
                  className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default BlogDetail

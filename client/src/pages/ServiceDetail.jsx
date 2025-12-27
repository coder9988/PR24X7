import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { servicesAPI } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ServiceDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchService()
  }, [slug])

  const fetchService = async () => {
    try {
      setLoading(true)
      const response = await servicesAPI.getBySlug(slug)
      if (response.data.success) {
        setService(response.data.data)
      } else {
        setError('Service not found')
      }
    } catch (err) {
      setError('Failed to load service')
      console.error('Error fetching service:', err)
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

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Service - PR Agency</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !service) {
    return (
      <>
        <Helmet>
          <title>Service Not Found - PR Agency</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h2>
            <p className="text-gray-600 mb-8">The service you're looking for doesn't exist or has been removed.</p>
            <div className="space-x-4">
              <button 
                onClick={() => navigate('/services')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Services
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
        <title>{service.title} - PR Agency</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="article" />
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
              <Link to="/services" className="text-gray-500 hover:text-gray-700 transition-colors">
                Services
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{service.title}</span>
            </nav>
          </div>
        </section>

        {/* Service Hero */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">{service.icon}</span>
                </div>
              </motion.div>
              <motion.h1 
                variants={itemVariants}
                className="text-5xl font-bold mb-6"
              >
                {service.title}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-300 leading-relaxed"
              >
                {service.description}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Service Details */}
        {service.features && service.features.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl font-bold text-center text-gray-900 mb-12"
                >
                  What We Offer
                </motion.h2>
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </motion.div>
                  ))}
                </motion.div>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's discuss how our {service.title} service can help your business grow.
              </p>
              <div className="space-x-4">
                <Link 
                  to="/contact"
                  className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/services"
                  className="inline-block px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all"
                >
                  View All Services
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

export default ServiceDetail

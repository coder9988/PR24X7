import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { servicesAPI } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await servicesAPI.getAll()
      if (response.data.success) {
        setServices(response.data.data)
      }
    } catch (err) {
      setError('Failed to load services')
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Services - PR Agency</title>
          <meta name="description" content="Explore our comprehensive PR services designed to elevate your brand." />
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Services - PR Agency</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={fetchServices}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Services - PR Agency</title>
        <meta name="description" content="Explore our comprehensive PR services designed to elevate your brand." />
        <meta property="og:title" content="Services - PR Agency" />
        <meta property="og:description" content="Explore our comprehensive PR services designed to elevate your brand." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive PR solutions tailored to elevate your brand and connect you with your audience
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {services.map((service) => (
                <motion.div
                  key={service._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={`/services/${service.slug}`}>
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                        <span className="text-2xl group-hover:text-white transition-colors">
                          {service.icon}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {service.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                        Learn More
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services available at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Services

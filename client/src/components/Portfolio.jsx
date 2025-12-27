import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = ['all', 'technology', 'fashion', 'food', 'healthcare']

  const projects = [
    {
      id: 1,
      title: 'Tech Startup Launch',
      category: 'technology',
      description: 'Comprehensive PR campaign for a revolutionary AI platform',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      results: '500+ media mentions, 50M+ impressions',
    },
    {
      id: 2,
      title: 'Fashion Brand Revival',
      category: 'fashion',
      description: 'Rebranding and media relations for luxury fashion house',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      results: 'Featured in Vogue, Elle, and Harper\'s Bazaar',
    },
    {
      id: 3,
      title: 'Restaurant Chain Expansion',
      category: 'food',
      description: 'Launch campaign for national restaurant chain expansion',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      results: '200+ local media features, 30% increase in foot traffic',
    },
    {
      id: 4,
      title: 'Healthcare Innovation',
      category: 'healthcare',
      description: 'Thought leadership and media strategy for health tech company',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      results: 'Coverage in Forbes, TechCrunch, and Healthcare Weekly',
    },
    {
      id: 5,
      title: 'Fintech Product Launch',
      category: 'technology',
      description: 'Strategic communications for innovative payment solution',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      results: '300+ articles, 25M+ social media impressions',
    },
    {
      id: 6,
      title: 'Sustainable Fashion Line',
      category: 'fashion',
      description: 'Eco-conscious brand launch with sustainability focus',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
      results: 'Featured in sustainable fashion publications globally',
    },
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-100 rounded-full">
            Our Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful PR campaigns across various industries.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium">{project.results}</p>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-primary-600 bg-primary-100 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  View Case Study
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio


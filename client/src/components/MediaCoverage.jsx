import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'

const MediaCoverage = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const mediaOutlets = [
    {
      name: 'Forbes',
      logo: 'https://via.placeholder.com/200x100/000000/ffffff?text=Forbes',
      description: 'Featured in Forbes for innovative PR strategies',
      link: '#',
    },
    {
      name: 'TechCrunch',
      logo: 'https://via.placeholder.com/200x100/00a562/ffffff?text=TechCrunch',
      description: 'Coverage of our tech client launches',
      link: '#',
    },
    {
      name: 'The New York Times',
      logo: 'https://via.placeholder.com/200x100/000000/ffffff?text=NY+Times',
      description: 'Major feature story placement',
      link: '#',
    },
    {
      name: 'Bloomberg',
      logo: 'https://via.placeholder.com/200x100/000000/ffffff?text=Bloomberg',
      description: 'Business news coverage',
      link: '#',
    },
    {
      name: 'Vogue',
      logo: 'https://via.placeholder.com/200x100/000000/ffffff?text=Vogue',
      description: 'Fashion brand feature',
      link: '#',
    },
    {
      name: 'Harvard Business Review',
      logo: 'https://via.placeholder.com/200x100/000000/ffffff?text=HBR',
      description: 'Thought leadership article',
      link: '#',
    },
  ]

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-100 rounded-full">
            Media Coverage
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
            Featured in Top Media Outlets
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our clients have been featured in the world's most prestigious publications and media platforms.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mediaOutlets.map((outlet) => (
            <motion.a
              key={outlet.name}
              href={outlet.link}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="p-8">
                <div className="h-20 mb-6 flex items-center justify-center">
                  <img
                    src={outlet.logo}
                    alt={outlet.name}
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {outlet.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {outlet.description}
                </p>
                <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                  Read Article
                  <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-primary-100">Media Placements</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50M+</div>
              <div className="text-primary-100">Total Impressions</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-primary-100">Top-Tier Publications</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MediaCoverage


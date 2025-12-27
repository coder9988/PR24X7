import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  Megaphone, 
  Users, 
  TrendingUp, 
  FileText, 
  Globe, 
  Target,
  Sparkles,
  BarChart3
} from 'lucide-react'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      icon: Megaphone,
      title: 'Media Relations',
      description: 'Build strong relationships with journalists and secure top-tier media coverage for your brand.',
      color: 'from-primary-500 to-primary-600',
      delay: 0,
      slug: 'media-relations',
    },
    {
      icon: Users,
      title: 'Brand Management',
      description: 'Develop and maintain a consistent brand identity that resonates with your target audience.',
      color: 'from-accent-500 to-accent-600',
      delay: 0.1,
      slug: 'brand-management',
    },
    {
      icon: TrendingUp,
      title: 'Strategic Communications',
      description: 'Craft compelling narratives and messaging strategies that drive engagement and action.',
      color: 'from-primary-500 to-accent-500',
      delay: 0.2,
      slug: 'strategic-communications',
    },
    {
      icon: FileText,
      title: 'Content Creation',
      description: 'Produce high-quality content including press releases, articles, and thought leadership pieces.',
      color: 'from-accent-500 to-primary-500',
      delay: 0.3,
      slug: 'content-creation',
    },
    {
      icon: Globe,
      title: 'Digital PR',
      description: 'Leverage digital channels to amplify your message and reach your audience where they are.',
      color: 'from-primary-500 to-primary-700',
      delay: 0.4,
      slug: 'digital-pr',
    },
    {
      icon: Target,
      title: 'Crisis Management',
      description: 'Navigate challenging situations with strategic communication and reputation protection.',
      color: 'from-accent-500 to-accent-700',
      delay: 0.5,
      slug: 'crisis-management',
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <section id="services" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-100 rounded-full">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
            Comprehensive PR Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer a full spectrum of public relations services to elevate your brand and drive meaningful results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex p-4 mb-6 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Hover Arrow */}
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-block"
                >
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="text-primary-600 font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    Learn More
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services

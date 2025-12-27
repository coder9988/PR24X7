import { motion } from 'framer-motion'
import { Award, Users, Target, Zap } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Award-Winning Team',
      description: 'Recognized industry experts with proven track records',
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your success is our priority, with dedicated support',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Data-backed strategies that deliver measurable outcomes',
    },
    {
      icon: Zap,
      title: 'Innovative Approach',
      description: 'Cutting-edge techniques and creative solutions',
    },
  ]

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-100 rounded-full">
              About Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 mb-6">
              Crafting Stories That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                Make an Impact
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over a decade of experience in public relations, we've helped hundreds of brands 
              elevate their presence and connect with their audiences. Our team combines strategic 
              thinking with creative execution to deliver PR campaigns that drive real results.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe in the power of authentic storytelling and meaningful relationships. 
              Every campaign we create is tailored to your unique brand voice and business objectives, 
              ensuring that your message resonates with the right people at the right time.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Work With Us
            </motion.a>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex p-3 mb-4 rounded-lg bg-primary-100 text-primary-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '10+', label: 'Years Experience' },
            { number: '500+', label: 'Happy Clients' },
            { number: '1000+', label: 'Campaigns Launched' },
            { number: '50+', label: 'Team Members' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About


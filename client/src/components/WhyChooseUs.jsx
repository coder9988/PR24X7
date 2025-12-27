import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Award, Users, Target, Zap, TrendingUp, Clock } from 'lucide-react'

const WhyChooseUs = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    {
      icon: Award,
      number: 500,
      suffix: '+',
      label: 'Successful Campaigns',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: Users,
      number: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      icon: Target,
      number: 50,
      suffix: '+',
      label: 'Industry Awards',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: TrendingUp,
      number: 1000,
      suffix: '+',
      label: 'Media Placements',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      icon: Clock,
      number: 10,
      suffix: '+',
      label: 'Years Experience',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: Zap,
      number: 24,
      suffix: '/7',
      label: 'Support Available',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100',
    },
  ]

  const Counter = ({ end, suffix, duration = 2 }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!isInView) return

      let startTime = null
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }
      
      requestAnimationFrame(animate)
    }, [isInView, end, duration])

    return (
      <span>
        {count}{suffix}
      </span>
    )
  }

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
    <section ref={ref} className="py-24 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-100 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
            Proven Results That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              Speak for Themselves
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine strategic thinking with creative execution to deliver PR campaigns that drive real results.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <div className={`inline-flex p-3 mb-4 rounded-lg ${stat.bgColor} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`text-4xl sm:text-5xl font-bold ${stat.color} mb-2`}>
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
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
    </section>
  )
}

export default WhyChooseUs


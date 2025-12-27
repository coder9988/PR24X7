import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const TrustedByBrands = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  const brands = [
    { name: 'TechCorp', logo: 'https://images.unsplash.com/photo-1562577187-c316b05c6fa5?w=150&h=80&fit=crop&auto=format' },
    { name: 'FashionHub', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd228d2?w=150&h=80&fit=crop&auto=format' },
    { name: 'FoodieBrand', logo: 'https://images.unsplash.com/photo-1556909058-7f7b972584c7?w=150&h=80&fit=crop&auto=format' },
    { name: 'HealthPlus', logo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=80&fit=crop&auto=format' },
    { name: 'FinancePro', logo: 'https://images.unsplash.com/photo-1611974289855-9c2b0d63dd6?w=150&h=80&fit=crop&auto=format' },
    { name: 'EduTech', logo: 'https://images.unsplash.com/photo-1501505907466-5674a12d3aa1?w=150&h=80&fit=crop&auto=format' },
    { name: 'GreenLife', logo: 'https://images.unsplash.com/photo-1542601906-a0b8e4c029a?w=150&h=80&fit=crop&auto=format' },
    { name: 'MediaMax', logo: 'https://images.unsplash.com/photo-1596528937114-4b1c8f66459e?w=150&h=80&fit=crop&auto=format' },
  ]

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Trusted By Industry Leaders
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
            Brands That Trust Us
          </h2>
        </motion.div>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* Sliding Brands */}
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -(brands.length * 198)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex-shrink-0 w-[150px] h-[80px] flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TrustedByBrands


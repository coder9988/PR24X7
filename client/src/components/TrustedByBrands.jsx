import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const TrustedByBrands = () => {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  const brands = [
    { name: 'TechCorp', logo: 'https://via.placeholder.com/150x80/0ea5e9/ffffff?text=TechCorp' },
    { name: 'FashionHub', logo: 'https://via.placeholder.com/150x80/d946ef/ffffff?text=FashionHub' },
    { name: 'FoodieBrand', logo: 'https://via.placeholder.com/150x80/0ea5e9/ffffff?text=FoodieBrand' },
    { name: 'HealthPlus', logo: 'https://via.placeholder.com/150x80/d946ef/ffffff?text=HealthPlus' },
    { name: 'FinancePro', logo: 'https://via.placeholder.com/150x80/0ea5e9/ffffff?text=FinancePro' },
    { name: 'EduTech', logo: 'https://via.placeholder.com/150x80/d946ef/ffffff?text=EduTech' },
    { name: 'GreenLife', logo: 'https://via.placeholder.com/150x80/0ea5e9/ffffff?text=GreenLife' },
    { name: 'MediaMax', logo: 'https://via.placeholder.com/150x80/d946ef/ffffff?text=MediaMax' },
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


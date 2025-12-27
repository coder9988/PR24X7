import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      content: 'PR Agency transformed our brand presence completely. Their strategic approach and media relations expertise helped us secure coverage in top-tier publications. The results exceeded our expectations.',
      rating: 5,
      company: 'TechStart Inc.',
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director, Fashion Forward',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'Working with PR Agency has been a game-changer. They understand our brand voice and consistently deliver campaigns that resonate with our target audience. Highly recommend!',
      rating: 5,
      company: 'Fashion Forward',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, GreenEats',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'The team at PR Agency is professional, creative, and results-driven. They helped us launch our sustainable food brand with a comprehensive PR strategy that generated incredible buzz.',
      rating: 5,
      company: 'GreenEats',
    },
    {
      name: 'David Thompson',
      role: 'VP Communications, HealthTech Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Outstanding crisis management and strategic communications. PR Agency navigated a challenging situation for us with expertise and professionalism. We couldn\'t have done it without them.',
      rating: 5,
      company: 'HealthTech Solutions',
    },
  ]

  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isInView, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-100 rounded-full">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-primary-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-primary-600" />
          </button>

          {/* Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative"
          >
            <Quote className="w-16 h-16 text-primary-200 absolute top-8 left-8" />
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].content}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-primary-100"
                />
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-sm text-primary-600 font-medium">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

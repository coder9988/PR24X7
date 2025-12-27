import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Mail, Phone } from 'lucide-react'

const CTABanner = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl sm:text-2xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your PR goals and take your brand to the next level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-primary-900 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors shadow-2xl hover:shadow-3xl flex items-center gap-3 group"
            >
              Get Started Today
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="tel:+15551234567"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors border-2 border-white/30 flex items-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Call Us Now
            </motion.a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-primary-100"
          >
            <a
              href="mailto:hello@pragency.com"
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>hello@pragency.com</span>
            </a>
            <span className="hidden sm:block">•</span>
            <a
              href="tel:+15551234567"
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+1 (555) 123-4567</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner


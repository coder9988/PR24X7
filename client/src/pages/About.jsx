import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import About from '../components/About'

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - PR Agency</title>
        <meta name="description" content="Learn about our PR agency's mission, team, and approach to delivering exceptional public relations services." />
        <meta property="og:title" content="About Us - PR Agency" />
        <meta property="og:description" content="Learn about our PR agency's mission and approach to public relations." />
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
              <h1 className="text-5xl font-bold mb-6">About Our Agency</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover our story, mission, and the passionate team behind our success
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Component */}
        <About />
      </main>

      <Footer />
    </>
  )
}

export default AboutPage

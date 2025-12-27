import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustedByBrands from '../components/TrustedByBrands'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import MediaCoverage from '../components/MediaCoverage'
import Testimonials from '../components/Testimonials'
import CTABanner from '../components/CTABanner'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>PR Agency - Elevate Your Brand with Expert Public Relations</title>
        <meta 
          name="description" 
          content="Professional PR agency offering strategic communications, media relations, brand management, and digital PR services to elevate your brand presence." 
        />
        <meta name="keywords" content="PR agency, public relations, media relations, brand management, digital PR, communications" />
        <meta property="og:title" content="PR Agency - Elevate Your Brand" />
        <meta property="og:description" content="Professional PR agency offering strategic communications and media relations services." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <TrustedByBrands />
        <Services />
        <WhyChooseUs />
        <MediaCoverage />
        <Testimonials />
        <CTABanner />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default Home

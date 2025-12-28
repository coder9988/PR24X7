import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Media", href: "/media" },
    { name: "Blog", href: "/blog" },
    { name: "Login", href: "/login" },
  ];

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const menuItemVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: -20, opacity: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="text-2xl font-display font-bold text-primary-600"
            >
              PR<span className="text-accent-600">Agency</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -2 }}>
                <Link
                  to={item.href}
                  className={`font-medium transition-colors relative group px-4 py-2 rounded-full ${
                    location.pathname === item.href
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary-100/70 rounded-full z-[-1]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="absolute inset-0 rounded-full bg-primary-100/70 scale-x-0 group-hover:scale-x-100 transition-transform origin-center z-[-1]"></span>
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="/#contact"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 20px -10px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium transition-all shadow-lg"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={menuItemVariants}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block font-medium transition-colors py-2 px-4 rounded-md ${
                        location.pathname === item.href
                          ? "text-primary-600 bg-primary-100/70"
                          : "text-gray-700 hover:text-primary-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-4 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full font-medium transition-all text-center"
                  variants={menuItemVariants}
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;

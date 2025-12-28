import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { mediaAPI } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Media = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef();
  const loadMoreRef = useRef();

  const fetchMediaItems = useCallback(
    async (reset = false) => {
      try {
        if (reset) {
          setLoading(true);
          setPage(1);
          setMediaItems([]);
        } else {
          setLoadingMore(true);
        }

        const currentPage = reset ? 1 : page;
        const params = {
          page: currentPage,
          limit: 6,
        };

        if (selectedCategory !== "all") {
          params.category = selectedCategory;
        }

        const response = await mediaAPI.getAll(params);
        console.log("MEDIA API RESPONSE:", response.data);

        if (response.data.success) {
          if (reset) {
            setMediaItems(response.data.data);
          } else {
            setMediaItems((prev) => [...prev, ...response.data.data]);
          }

          setHasMore(response.data.data.length === 6);

          if (!reset) {
            setPage((prev) => prev + 1);
          }
        }
      } catch (err) {
        setError("Failed to load media coverage");
        console.error("Error fetching media items:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, page]
  );

  const fetchCategories = async () => {
    try {
      const response = await mediaAPI.getCategories();
      if (response.data.success) {
        setCategories(["all", ...response.data.data]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchMediaItems(true);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const loadMore = () => {
      if (!loadingMore && hasMore) {
        fetchMediaItems(false);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loadingMore, fetchMediaItems]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Media Coverage - PR Agency</title>
          <meta
            name="description"
            content="Explore our media coverage and press mentions across various publications."
          />
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Media Coverage - PR Agency</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => fetchMediaItems(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Media Coverage - PR Agency</title>
        <meta
          name="description"
          content="Explore our media coverage and press mentions across various publications."
        />
        <meta property="og:title" content="Media Coverage - PR Agency" />
        <meta
          property="og:description"
          content="Explore our media coverage and press mentions across various publications."
        />
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
              <h1 className="text-5xl font-bold mb-6">Media Coverage</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore our latest press mentions and media coverage across
                leading publications
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Media Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {mediaItems.map((item) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                            {item.category}
                          </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full uppercase tracking-wide">
                                {item.publicationName}
                              </span>
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">
                              {item.title}
                            </h4>
                            <a
                              href={item.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-white font-semibold hover:text-blue-300 transition-colors text-sm"
                            >
                              Read Article
                              <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {formatDate(item.publicationDate)}
                          </span>
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {item.publicationName}
                          </span>
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
                          >
                            Read More
                            <svg
                              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {mediaItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No media coverage found for this category.
                </p>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && (
              <div ref={loadMoreRef} className="text-center mt-12">
                {loadingMore && (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-gray-600 font-medium">
                      Loading more coverage...
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Fallback Load More Button */}
            {hasMore && !loadingMore && (
              <div className="text-center mt-8">
                <motion.button
                  onClick={() => fetchMediaItems(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Articles
                </motion.button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Media;

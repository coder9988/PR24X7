import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { blogAPI } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchBlogs = useCallback(
    async (reset = false) => {
      try {
        if (reset) {
          setLoading(true);
          setPage(1);
          setBlogs([]);
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

        if (selectedTag) {
          params.tag = selectedTag;
        }

        if (searchQuery) {
          params.search = searchQuery;
        }

        const response = await blogAPI.getAll(params);

        if (response.data.success) {
          if (reset) {
            setBlogs(response.data.data);
          } else {
            setBlogs((prev) => [...prev, ...response.data.data]);
          }

          setHasMore(response.data.page < response.data.pages);
          if (!reset) {
            setPage((prev) => prev + 1);
          }
        }
      } catch (err) {
        setError("Failed to load blog posts");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, selectedTag, searchQuery, page]
  );

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await blogAPI.getAll({ featured: "true", limit: 3 });
      if (response.data.success) {
        setFeaturedBlogs(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching featured blogs:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await blogAPI.getCategories();
      if (response.data.success) {
        setCategories(["all", ...response.data.data]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await blogAPI.getTags();
      if (response.data.success) {
        setTags(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  useEffect(() => {
    fetchBlogs(true);
  }, [selectedCategory, selectedTag, searchQuery, fetchBlogs]);

  useEffect(() => {
    fetchFeaturedBlogs();
    fetchCategories();
    fetchTags();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedTag("");
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setSelectedCategory("all");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs(true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchBlogs(false);
    }
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
          <title>Blog - PR Agency</title>
          <meta
            name="description"
            content="Read our latest insights on PR strategies, digital marketing, and industry trends."
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
          <title>Blog - PR Agency</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => fetchBlogs(true)}
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
        <title>Blog - PR Agency</title>
        <meta
          name="description"
          content="Read our latest insights on PR strategies, digital marketing, and industry trends."
        />
        <meta property="og:title" content="Blog - PR Agency" />
        <meta
          property="og:description"
          content="Read our latest insights on PR strategies, digital marketing, and industry trends."
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
              <h1 className="text-5xl font-bold mb-6">Blog</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Insights, strategies, and trends shaping the world of public
                relations
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blog posts..."
                    className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Search
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center text-gray-900 mb-12"
              >
                Featured Posts
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                              Featured
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-blue-600 font-medium">
                              {blog.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {blog.readTime} min read
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h3>

                          <p className="text-gray-600 line-clamp-3 mb-4">
                            {blog.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {formatDate(blog.publishedAt)}
                            </span>
                            <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-8 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>

              {/* Tag Filter */}
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 5).map((tag) => (
                  <motion.button
                    key={tag}
                    onClick={() =>
                      handleTagChange(selectedTag === tag ? "" : tag)
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedTag === tag
                        ? "bg-gray-800 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${selectedTag}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-blue-600 font-medium">
                              {blog.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {blog.readTime} min read
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h3>

                          <p className="text-gray-600 line-clamp-3 mb-4">
                            {blog.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {formatDate(blog.publishedAt)}
                            </span>
                            <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {blogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No blog posts found matching your criteria.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <motion.button
                  onClick={loadMore}
                  disabled={loadingMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Loading...
                    </span>
                  ) : (
                    "Load More"
                  )}
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

export default Blog;

import { useState, useEffect, useCallback, useDeferredValue } from "react";
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
        reset ? setLoading(true) : setLoadingMore(true);

        if (reset) {
          setPage(1);
          setBlogs([]);
        }

        const params = {
          page: reset ? 1 : page,
          limit: 6,
          ...(selectedCategory !== "all" && { category: selectedCategory }),
          ...(selectedTag && { tag: selectedTag }),
          ...(searchQuery.trim() && { search: searchQuery.trim() }),
        };

        const response = await blogAPI.getAll(params);

        if (response.data.success) {
          setBlogs((prev) =>
            reset ? response.data.data : [...prev, ...response.data.data]
          );
          setHasMore(response.data.page < response.data.pages);
          if (!reset) setPage((p) => p + 1);
        }
      } catch {
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, selectedTag, searchQuery, page]
  );

  useEffect(() => {
    fetchBlogs(true);
  }, [selectedCategory, selectedTag, fetchBlogs]);

  useEffect(() => {
    blogAPI.getAll({ featured: "true", limit: 3 }).then((r) => {
      if (r.data.success) setFeaturedBlogs(r.data.data);
    });
    blogAPI.getCategories().then((r) => {
      if (r.data.success) setCategories(["all", ...r.data.data]);
    });
    blogAPI.getTags().then((r) => {
      if (r.data.success) setTags(r.data.data);
    });
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full" />
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center text-center">
          <p className="text-gray-600">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - PR Agency</title>
      </Helmet>

      <Header />

      <main className="pt-20">
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-gray-300 mb-8">
              Insights, strategies, and trends shaping PR
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchBlogs(true);
              }}
              className="max-w-2xl mx-auto flex gap-4"
            >
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blog posts..."
                className="flex-1 px-6 py-3 rounded-lg text-gray-900"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 rounded-lg"
              >
                Search
              </motion.button>
            </form>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">{blog.title}</h3>
                        <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                        <span className="text-sm text-gray-500">
                          {formatDate(blog.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {hasMore && (
              <div className="text-center mt-12">
                <motion.button
                  onClick={() => fetchBlogs(false)}
                  disabled={loadingMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg"
                >
                  {loadingMore ? "Loading..." : "Load More"}
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

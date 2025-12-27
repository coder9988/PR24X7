import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { contactAPI, blogAPI, mediaAPI, servicesAPI } from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('adminToken'))
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({})
  const [contacts, setContacts] = useState([])
  const [blogs, setBlogs] = useState([])
  const [media, setMedia] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [token])

  const verifyToken = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token })
      })
      const data = await response.json()
      if (data.success) {
        setIsAuthenticated(true)
        fetchDashboardData()
      } else {
        localStorage.removeItem('adminToken')
        setToken(null)
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('adminToken')
      setToken(null)
    }
  }

  const fetchDashboardData = async () => {
    try {
      const [contactsRes, blogsRes, mediaRes, servicesRes, statsRes] = await Promise.all([
        contactAPI.getAll({ limit: 5 }),
        blogAPI.getAll({ limit: 5 }),
        mediaAPI.getAll({ limit: 5 }),
        servicesAPI.getAll(),
        fetch('http://localhost:5001/api/contact/stats/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.data)
      }

      setContacts(contactsRes.data?.data || [])
      setBlogs(blogsRes.data?.data || [])
      setMedia(mediaRes.data?.data || [])
      setServices(servicesRes.data?.data || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
    setIsAuthenticated(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      converted: 'bg-purple-100 text-purple-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-orange-100 text-orange-800',
      low: 'bg-green-100 text-green-800'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  if (!isAuthenticated) {
    return <Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - PR Agency</title>
        <meta name="description" content="Admin dashboard for managing PR Agency content and leads" />
      </Helmet>

      <Header />
      
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* Admin Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6">
            <nav className="flex space-x-8">
              {['dashboard', 'contacts', 'blogs', 'media', 'services'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Total Leads</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.total || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">New Leads</h3>
                  <p className="text-3xl font-bold text-blue-600">{stats.byStatus?.new || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Converted</h3>
                  <p className="text-3xl font-bold text-green-600">{stats.byStatus?.converted || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Last 30 Days</h3>
                  <p className="text-3xl font-bold text-purple-600">{stats.last30Days || 0}</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Contacts */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h3>
                  <div className="space-y-3">
                    {contacts.slice(0, 5).map((contact) => (
                      <div key={contact._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-500">{contact.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Blogs */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Blogs</h3>
                  <div className="space-y-3">
                    {blogs.slice(0, 5).map((blog) => (
                      <div key={blog._id} className="p-3 bg-gray-50 rounded">
                        <p className="font-medium text-gray-900">{blog.title}</p>
                        <p className="text-sm text-gray-500">{formatDate(blog.publishedAt)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Contact Submissions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.map((contact) => (
                        <tr key={contact._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.service || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(contact.priority)}`}>
                              {contact.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(contact.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Blog Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{blog.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{blog.category}</p>
                      <p className="text-sm text-gray-600 line-clamp-3">{blog.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Media Coverage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {media.map((item) => (
                    <div key={item._id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.publicationName}</p>
                      <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service._id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

const Login = ({ setToken, setIsAuthenticated }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        setToken(data.token)
        setIsAuthenticated(true)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-6 shadow-lg rounded-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@pragency.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••••"
              />
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        <div className="text-center text-sm text-gray-600">
          <p>Default credentials: admin@pragency.com / admin123</p>
        </div>
      </div>
    </div>
  )
}

export default Admin

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  Users, 
  FileText, 
  Image, 
  Settings, 
  LogOut,
  BarChart3,
  Calendar,
  TrendingUp,
  Eye
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Admin = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const navigate = useNavigate()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      navigate('/login')
      return
    }
    
    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      console.error('Error parsing user data:', error)
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Admin - PR Agency</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    )
  }

  const stats = [
    { label: 'Total Blog Posts', value: '24', icon: FileText, color: 'bg-blue-500' },
    { label: 'Media Coverage', value: '18', icon: Image, color: 'bg-green-500' },
    { label: 'Total Services', value: '6', icon: Settings, color: 'bg-purple-500' },
    { label: 'Total Views', value: '1,234', icon: Eye, color: 'bg-orange-500' },
  ]

  const recentActivity = [
    { id: 1, action: 'New blog post created', time: '2 hours ago', type: 'blog' },
    { id: 2, action: 'Media coverage updated', time: '4 hours ago', type: 'media' },
    { id: 3, action: 'Service edited', time: '1 day ago', type: 'service' },
    { id: 4, action: 'New user registered', time: '2 days ago', type: 'user' },
  ]

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - PR Agency</title>
        <meta name="description" content="PR Agency admin dashboard for managing content" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Admin'}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Site
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/admin/blog/new"
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Create Blog Post
                  </Link>
                  <Link
                    to="/admin/media/new"
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Add Media Coverage
                  </Link>
                  <Link
                    to="/admin/services"
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Services
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Statistics
                  </div>
                  <div className="flex items-center text-gray-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Traffic Overview
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Content Calendar
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.slice(0, 3).map(activity => (
                    <div key={activity.id} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                        activity.type === 'blog' ? 'bg-blue-500' :
                        activity.type === 'media' ? 'bg-green-500' :
                        activity.type === 'service' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentActivity.map((activity, index) => (
                      <motion.tr
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activity.action}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            activity.type === 'blog' ? 'bg-blue-100 text-blue-800' :
                            activity.type === 'media' ? 'bg-green-100 text-green-800' :
                            activity.type === 'service' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {activity.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {activity.time}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Admin
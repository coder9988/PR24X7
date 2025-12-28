import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const activePlan = localStorage.getItem("activePlan");
    setPlan(activePlan || "free");
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Welcome{user?.name ? `, ${user.name}` : ""} 👋
            </h1>
            <p className="text-gray-600">
              Here’s what’s happening with your account
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Current Plan</h3>
            <p className="text-xl font-bold capitalize">{plan}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Media Mentions</h3>
            <p className="text-xl font-bold">0</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm text-gray-500 mb-1">Active Campaigns</h3>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>

        {/* NEXT STEPS */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="text-green-600">✔</span>
              Account created
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-600">✔</span>
              Plan selected ({plan})
            </li>
            <li className="flex items-center gap-3">
              <span className="text-gray-400">○</span>
              Add your brand details
            </li>
            <li className="flex items-center gap-3">
              <span className="text-gray-400">○</span>
              Launch your first PR campaign
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
          >
            Explore Services
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 border rounded-xl hover:bg-gray-100"
          >
            Talk to Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

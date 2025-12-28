import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Media from "./pages/Media";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Admin from "./pages/Admin";
import AdminRoute from "./routes/AdminRoute";
import Pricing from "./pages/pricing";
import Signup from "./pages/Signup";
import GetStartedModal from "./components/GetStartedModal";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/media" element={<Media />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* ✅ PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* ✅ MODAL MUST LIVE OUTSIDE ROUTES */}
      <GetStartedModal />
    </>
  );
}

export default App;

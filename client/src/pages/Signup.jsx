import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(formData);

      const pendingPlan = localStorage.getItem("pendingPlan");
      if (pendingPlan) {
        localStorage.setItem("activePlan", pendingPlan);
        localStorage.removeItem("pendingPlan");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h2>

        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        <input
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </section>
  );
};

export default Signup;

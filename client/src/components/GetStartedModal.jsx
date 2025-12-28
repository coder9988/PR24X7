import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUI } from "../context/UIContext";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const GetStartedModal = () => {
  const { isGetStartedOpen, activeView, closeGetStarted, setActiveView } =
    useUI();

  const { login } = useAuth();
  const navigate = useNavigate();
  console.log("MODAL RENDER", isGetStartedOpen, activeView);

  if (!isGetStartedOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl w-full max-w-md p-8 relative min-h-[300px] flex flex-col justify-center"
        >
          <button
            onClick={closeGetStarted}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          {activeView === "options" && (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">Get Started</h2>
              <p className="text-gray-600">What would you like to do?</p>

              <button
                onClick={() => {
                  closeGetStarted();
                  navigate("/contact");
                }}
                className="w-full py-3 rounded-xl bg-primary-600 text-white font-medium"
              >
                Talk to Our Team
              </button>

              <button
                onClick={() => {
                  closeGetStarted();
                  navigate("/pricing");
                }}
                className="w-full py-3 rounded-xl border font-medium"
              >
                Create an Account
              </button>

              <button
                onClick={() => setActiveView("login")}
                className="w-full py-3 rounded-xl text-primary-600 font-medium"
              >
                Login
              </button>
            </div>
          )}

          {activeView === "login" && (
            <LoginForm
              onSuccess={(user) => {
                closeGetStarted();
                if (user.role === "admin") {
                  navigate("/admin");
                }
              }}
            />
          )}

          {activeView === "signup" && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold">Signup coming soon</h2>
              <button
                onClick={() => setActiveView("login")}
                className="text-primary-600 font-medium"
              >
                Already have an account? Login
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GetStartedModal;

import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;

import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    description: "Explore PR tools with limited access",
    highlight: true,
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "Coming Soon",
    description: "Advanced PR services billed monthly",
    disabled: true,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "Coming Soon",
    description: "Best value annual PR partnership",
    disabled: true,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSelect = (plan) => {
    if (plan.disabled) return;

    localStorage.setItem("pendingPlan", plan.id);

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="pt-32 pb-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 mb-12">
          Start free. Upgrade when you're ready.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-8 bg-white text-center ${
                plan.highlight
                  ? "border-primary-600 shadow-xl"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-semibold mb-4">{plan.price}</p>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <button
                disabled={plan.disabled}
                onClick={() => handleSelect(plan)}
                className={`w-full py-3 rounded-xl font-medium transition ${
                  plan.disabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-8">
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default Pricing;

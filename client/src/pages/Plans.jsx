import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import PlanCard from "../components/PlanCard";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/plans").then((res) => setPlans(res.data));
  }, []);

  const handleSubscribe = async (id) => {
    try {
      await api.post(`/subscribe/${id}`);
      alert("✅ Subscribed successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Login required to subscribe.");
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Choose Your Subscription Plan
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} onSubscribe={handleSubscribe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Plans;

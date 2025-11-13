import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    api.get("/my-subscription")
      .then((res) => setSubscription(res.data))
      .catch(() => setSubscription(null));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">My Subscription</h1>

          {!subscription ? (
            <p className="text-gray-500">You don't have any active subscriptions.</p>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-2">
                {subscription.plan_id.name}
              </h2>
              <p className="text-gray-600 mb-2">
                ₹{subscription.plan_id.price} / {subscription.plan_id.duration} days
              </p>
              <p className="text-green-600 font-medium mb-4">
                Status: {subscription.status.toUpperCase()}
              </p>
              <div className="text-sm text-gray-500">
                <p>Start: {new Date(subscription.start_date).toLocaleDateString()}</p>
                <p>End: {new Date(subscription.end_date).toLocaleDateString()}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

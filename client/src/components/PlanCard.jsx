import React from "react";

const PlanCard = ({ plan, onSubscribe }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1 text-center">
          {plan.name}
        </h2>
        <p className="text-gray-500 text-center mb-4">
          ₹{plan.price} / {plan.duration} days
        </p>
        <ul className="space-y-2 mb-6">
          {plan.features.map((f, i) => (
            <li key={i} className="text-gray-700 text-sm flex items-center">
              <span className="text-green-500 mr-2">✔</span> {f}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => onSubscribe(plan._id)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium w-full transition"
      >
        Subscribe
      </button>
    </div>
  );
};

export default PlanCard;

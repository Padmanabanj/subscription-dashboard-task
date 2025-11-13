import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const AdminSubscriptions = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get("/admin/subscriptions")
      .then((res) => setSubs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin — All Subscriptions
        </h1>

        <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {subs.length > 0 ? (
                subs.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{s.user_id?.name}</td>
                    <td className="px-4 py-2 text-gray-500">{s.user_id?.email}</td>
                    <td className="px-4 py-2 font-medium">{s.plan_id?.name}</td>
                    <td className="px-4 py-2">
                      {new Date(s.start_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(s.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          s.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No subscriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSubscriptions;

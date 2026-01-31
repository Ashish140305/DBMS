import { useEffect, useState } from "react";
import { getFunds } from "../services/api";

const FundList = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFunds()
      .then((data) => {
        setFunds(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const addToPortfolio = async (fundId) => {
    try {
      await fetch("http://localhost:5000/api/portfolio/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1, // demo user
          fund_id: fundId,
          amount: 10000,
          type: "Lumpsum",
        }),
      });

      alert("Added to portfolio");
    } catch (err) {
      console.error(err);
      alert("Failed to add");
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-600">Loading funds...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Available Mutual Funds</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Fund Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                NAV
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Risk
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {funds.map((fund) => (
              <tr key={fund.fund_id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{fund.fund_name}</td>
                <td className="px-4 py-3">{fund.category}</td>
                <td className="px-4 py-3">₹{fund.nav}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                      ${
                        fund.risk_level === "High"
                          ? "bg-red-100 text-red-700"
                          : fund.risk_level === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                  >
                    {fund.risk_level}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => addToPortfolio(fund.fund_id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundList;

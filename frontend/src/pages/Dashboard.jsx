import { useEffect, useState } from "react";

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState([]);
  const userId = 1; // demo user

  useEffect(() => {
    fetch(`http://localhost:5000/api/dashboard/${userId}`)
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((err) => console.error(err));
  }, []);

  const totalInvestment = portfolio.reduce(
    (sum, item) => sum + Number(item.investment_amount),
    0,
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Portfolio</h2>

      <div className="mb-4 text-lg font-medium">
        Total Invested:{" "}
        <span className="text-blue-600">₹{totalInvestment}</span>
      </div>

      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Fund Name</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-3">{item.fund_name}</td>
              <td className="px-4 py-3">{item.category}</td>
              <td className="px-4 py-3">₹{item.investment_amount}</td>
              <td className="px-4 py-3">{item.investment_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

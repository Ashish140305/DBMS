import { useEffect, useState } from "react";

const Analytics = () => {
  const [data, setData] = useState([]);
  const userId = 1; // demo user

  useEffect(() => {
    fetch(`http://localhost:5000/api/analytics/${userId}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Investment Analytics</h2>

      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Total Invested</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-3">{item.category}</td>
              <td className="px-4 py-3">₹{item.total_invested}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;

import { useState } from "react";
import { Filter, Search } from "lucide-react";

// Mock data simulating "Mutual Funds Table" [cite: 126]
const ALL_FUNDS = [
  {
    id: 101,
    name: "Vanguard 500 Index",
    category: "Equity",
    risk: "High",
    expense: "0.04%",
  },
  {
    id: 102,
    name: "Fidelity Total Bond",
    category: "Debt",
    risk: "Low",
    expense: "0.45%",
  },
  {
    id: 103,
    name: "ARK Innovation ETF",
    category: "Equity",
    risk: "Very High",
    expense: "0.75%",
  },
  {
    id: 104,
    name: "Goldman Sachs Liquid",
    category: "Hybrid",
    risk: "Medium",
    expense: "0.18%",
  },
];

const FundList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // SQL-like filtering logic [cite: 151]
  const filteredFunds = ALL_FUNDS.filter((fund) => {
    const matchesSearch = fund.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || fund.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Funds</h1>
          <p className="text-gray-500">
            Discover new investment opportunities.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search funds..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Equity">Equity</option>
            <option value="Debt">Debt</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunds.map((fund) => (
          <div
            key={fund.id}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold 
                ${
                  fund.category === "Equity"
                    ? "bg-purple-100 text-purple-700"
                    : fund.category === "Debt"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                }`}
              >
                {fund.category}
              </span>
              <span className="text-xs font-medium text-gray-400">
                Exp: {fund.expense}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
              {fund.name}
            </h3>

            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
              <TrendingUp size={16} />
              <span>
                Risk Level:{" "}
                <strong className="text-gray-900">{fund.risk}</strong>
              </span>
            </div>

            <button className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundList;

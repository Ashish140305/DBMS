import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
} from "lucide-react";

// Mock data simulating "Portfolio Holdings Table" [cite: 142]
const PORTFOLIO_DATA = [
  {
    id: 1,
    name: "Vanguard Total Stock",
    units: 45.5,
    avgPrice: 150.0,
    currentNav: 168.2,
  },
  {
    id: 2,
    name: "Global Tech ETF",
    units: 120.0,
    avgPrice: 85.5,
    currentNav: 82.1,
  },
  {
    id: 3,
    name: "BlueChip Growth",
    units: 15.0,
    avgPrice: 420.0,
    currentNav: 455.0,
  },
];

const StatCard = ({ title, value, subtext, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
    <div className="flex items-end gap-3">
      <span className="text-3xl font-bold tracking-tight">{value}</span>
      {trend && (
        <span
          className={`flex items-center text-sm font-semibold mb-1 ${trend > 0 ? "text-green-600" : "text-red-600"}`}
        >
          {trend > 0 ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    {subtext && <p className="text-gray-400 text-xs mt-2">{subtext}</p>}
  </div>
);

const Dashboard = () => {
  // Logic for Calculate_PL Stored Procedure [cite: 182]
  const totalInvested = PORTFOLIO_DATA.reduce(
    (acc, fund) => acc + fund.units * fund.avgPrice,
    0,
  );
  const currentValue = PORTFOLIO_DATA.reduce(
    (acc, fund) => acc + fund.units * fund.currentNav,
    0,
  );
  const netProfit = currentValue - totalInvested;
  const percentageReturn = ((netProfit / totalInvested) * 100).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <p className="text-gray-500">
          Real-time insight into your portfolio performance.
        </p>
      </div>

      {/* Key Metrics Cards [cite: 160] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Portfolio Value"
          value={`$${currentValue.toLocaleString()}`}
          trend={percentageReturn}
        />
        <StatCard
          title="Total Invested Amount"
          value={`$${totalInvested.toLocaleString()}`}
        />
        <StatCard
          title="Unrealized Gains"
          value={`$${Math.abs(netProfit).toLocaleString()}`}
          trend={percentageReturn}
          subtext="Paper profit on held units"
        />
      </div>

      {/* Holdings Table [cite: 142, 160] */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Current Holdings
          </h2>
          <button className="text-brand-600 text-sm font-medium hover:text-brand-900">
            Download Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Fund Name</th>
                <th className="px-6 py-4">Units Held</th>
                <th className="px-6 py-4">Avg Buy Price</th>
                <th className="px-6 py-4">Current NAV</th>
                <th className="px-6 py-4">Current Value</th>
                <th className="px-6 py-4">P/L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PORTFOLIO_DATA.map((fund) => {
                const fundValue = fund.units * fund.currentNav;
                const fundCost = fund.units * fund.avgPrice;
                const gain = fundValue - fundCost;
                const gainPercent = ((gain / fundCost) * 100).toFixed(2);

                return (
                  <tr
                    key={fund.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {fund.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{fund.units}</td>
                    <td className="px-6 py-4 text-gray-600">
                      ${fund.avgPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      ${fund.currentNav.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ${fundValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gain >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {gain >= 0 ? "+" : ""}
                        {gainPercent}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

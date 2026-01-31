import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Compass, LineChart, Wallet } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-brand-600 bg-brand-50"
      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              FundFolio
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isActive("/")}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              to="/funds"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isActive("/funds")}`}
            >
              <Compass size={18} /> Explore Funds
            </Link>
            <Link
              to="/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isActive("/analytics")}`}
            >
              <LineChart size={18} /> Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

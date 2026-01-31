import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import FundList from "./pages/FundList";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <Routes>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/funds" element={<FundList />} />
          <Route
            path="/analytics"
            element={
              <div className="p-8 text-center text-gray-500">
                Analytics Component (Placeholder)
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

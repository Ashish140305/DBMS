import { useEffect, useState } from "react";
import { Server, Users, Activity, BarChart3, Database, Lock, LogOut, Zap, Target, PieChart } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("dba_token") ? true : false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [stats, setStats] = useState(null);
  const [airdropStatus, setAirdropStatus] = useState("");

  const fetchStats = () => {
    fetch("http://localhost:5000/api/advanced/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  };

  useEffect(() => {
    if (isAuthenticated) fetchStats();
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("http://localhost:5000/api/advanced/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("dba_token", data.token);
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Login failed");
      }
    } catch (err) { setAuthError("Server connection failed."); }
  };

  const handleLogout = () => {
    localStorage.removeItem("dba_token");
    setIsAuthenticated(false);
    setStats(null);
  };

  // ✨ THE MASS UPDATE FUNCTION
  const handleAirdrop = async () => {
    if (!window.confirm("WARNING: This will deploy ₹10,000 to EVERY user on the platform. Proceed?")) return;
    setAirdropStatus("Deploying funds...");
    try {
      const res = await fetch("http://localhost:5000/api/advanced/admin/airdrop", { method: "POST" });
      if (res.ok) {
        setAirdropStatus("✅ Stimulus Deployed!");
        setTimeout(() => setAirdropStatus(""), 4000);
      }
    } catch (err) { setAirdropStatus("❌ Failed to deploy."); }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '24px', border: '1px solid #334155', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#0f172a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid #38bdf8' }}>
              <Lock color="#38bdf8" size={32} />
            </div>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: '900' }}>DBA Access Required</h2>
          </div>
          {authError && <div style={{ backgroundColor: '#4c1d95', color: '#f472b6', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>{authError}</div>}
          <div style={{ marginBottom: '20px' }}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '12px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer' }}>Authenticate</button>
        </form>
      </div>
    );
  }

  if (!stats) return <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Accessing Mainframe...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '40px 24px', fontFamily: 'sans-serif', color: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #1e293b', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: '#38bdf8', borderRadius: '12px', color: '#0f172a' }}><Server size={28} /></div>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', letterSpacing: '-1px' }}>DBA Control Panel</h1>
              <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold' }}>Global Aggregations & System Operations</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#334155', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            <LogOut size={16} /> Terminate Session
          </button>
        </div>

        {/* Top Aggregation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '20px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16}/> Total Users</p>
            <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#fff' }}>{stats.users}</h2>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '20px', border: '1px solid #38bdf8' }}>
            <p style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={16}/> Platform Volume</p>
            <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', color: '#38bdf8' }}>₹{Number(stats.volume).toLocaleString('en-IN')}</h2>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '20px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Database size={16}/> Top Asset</p>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: '#fff', marginTop: '8px' }}>{stats.popular.replace('.NS', '')}</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* Left Column: Live Feed & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* MASS UPDATE ACTION */}
            <div style={{ backgroundColor: '#4c1d95', borderRadius: '24px', border: '1px solid #7c3aed', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={20}/> Mass Wallet Stimulus</h3>
                <p style={{ margin: 0, color: '#fbcfe8', fontSize: '0.9rem' }}>Execute global UPDATE query to inject ₹10k to all users.</p>
              </div>
              <button onClick={handleAirdrop} style={{ backgroundColor: '#ec4899', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)' }}>
                {airdropStatus || "Deploy Stimulus"}
              </button>
            </div>

            {/* Live Feed */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '24px', border: '1px solid #334155', padding: '32px' }}>
              <h3 style={{ margin: '0 0 24px 0', fontSize: '1.2rem', color: '#fff', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>Global Transaction Log</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {stats.recent_logs.map((log, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '900', backgroundColor: log.action_type === 'BUY ORDER' ? '#064e3b' : '#4c1d95', color: log.action_type === 'BUY ORDER' ? '#34d399' : '#f472b6', padding: '4px 10px', borderRadius: '6px' }}>
                        {log.action_type}
                      </span>
                      <span style={{ fontWeight: 'bold', color: '#cbd5e1' }}>@{log.username}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: '900', color: '#fff' }}>₹{Number(log.amount).toLocaleString('en-IN')}</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold' }}>{new Date(log.transaction_date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: DB Aggregations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Buy vs Sell Breakdown */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '24px', border: '1px solid #334155', padding: '32px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18}/> Market Sentiment</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '16px' }}>Total execution breakdown by order type.</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#34d399', fontWeight: 'bold' }}>Buys ({stats.buys})</span>
                <span style={{ color: '#f472b6', fontWeight: 'bold' }}>Sells ({stats.sells})</span>
              </div>
              <div style={{ width: '100%', height: '12px', backgroundColor: '#334155', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${(stats.buys / (stats.buys + stats.sells || 1)) * 100}%`, backgroundColor: '#34d399' }}></div>
                <div style={{ width: `${(stats.sells / (stats.buys + stats.sells || 1)) * 100}%`, backgroundColor: '#f472b6' }}></div>
              </div>
            </div>

            {/* Demographics Breakdown */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '24px', border: '1px solid #334155', padding: '32px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}><PieChart size={18}/> Demographics</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '16px' }}>User count grouped by Financial Goal.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {stats.demographics.map((demo, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 'bold' }}>{demo.financial_goal || "Unknown"}</span>
                    <span style={{ backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: '900', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{demo.count} Users</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
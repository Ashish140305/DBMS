import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

// 1. LEADERBOARD: Complex SQL query combining Users and Portfolio tables
router.get("/leaderboard", (req, res) => {
  const query = `
        SELECT u.id, u.username, u.full_name, u.profile_picture, u.wallet_balance,
        COALESCE(SUM(p.investment_amount), 0) AS total_invested,
        (u.wallet_balance + COALESCE(SUM(p.investment_amount), 0)) AS net_worth
        FROM users u
        LEFT JOIN portfolio p ON u.id = p.user_id
        GROUP BY u.id
        ORDER BY net_worth DESC LIMIT 10
    `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 2. AUDIT LOGS: Fetch trigger-generated history for the PDF
router.get("/audit/:userId", (req, res) => {
  db.query(
    "SELECT * FROM audit_logs WHERE user_id = ? ORDER BY transaction_date DESC",
    [req.params.userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    },
  );
});

// 4. ADMIN PANEL: Global System Aggregations (God Mode)
router.get("/admin/stats", (req, res) => {
  const stats = {};

  // Query 1: Total Users
  db.query("SELECT COUNT(*) as total_users FROM users", (err, r1) => {
    stats.users = r1 ? r1[0].total_users : 0;

    // Query 2: Total Platform Volume & Sentiment
    db.query(
      "SELECT action_type, COUNT(*) as count, COALESCE(SUM(amount), 0) as total_volume FROM audit_logs GROUP BY action_type",
      (err, r2) => {
        let buyCount = 0;
        let sellCount = 0;
        let totalVol = 0;
        if (r2) {
          r2.forEach((row) => {
            if (row.action_type === "BUY ORDER") buyCount = row.count;
            if (row.action_type === "SELL ORDER") sellCount = row.count;
            totalVol += Number(row.total_volume);
          });
        }
        stats.volume = totalVol;
        stats.buys = buyCount;
        stats.sells = sellCount;

        // Query 3: Most Popular Asset
        db.query(
          "SELECT m.ticker_symbol, COUNT(p.id) as holders FROM portfolio p JOIN mutual_funds m ON p.fund_id = m.id GROUP BY m.id ORDER BY holders DESC LIMIT 1",
          (err, r3) => {
            stats.popular = r3 && r3.length > 0 ? r3[0].ticker_symbol : "N/A";

            // Query 4: User Demographics (Goals)
            db.query(
              "SELECT financial_goal, COUNT(*) as count FROM users GROUP BY financial_goal",
              (err, r4) => {
                stats.demographics = r4 || [];

                // Query 5: Global Live Feed
                db.query(
                  "SELECT a.action_type, a.amount, a.transaction_date, u.username FROM audit_logs a JOIN users u ON a.user_id = u.id ORDER BY a.transaction_date DESC LIMIT 8",
                  (err, r5) => {
                    stats.recent_logs = r5 || [];
                    res.json(stats);
                  },
                );
              },
            );
          },
        );
      },
    );
  });
});

// 5. MASS UPDATE: "The Stimulus Check"
router.post("/admin/airdrop", (req, res) => {
  // Check for the admin authorization token
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer dba-secret-access-granted") {
    return res.status(403).json({ error: "Unauthorized: Admin access required." });
  }

  const bonusAmount = 10000;
  // This mass-updates EVERY user in the database simultaneously
  db.query(
    "UPDATE users SET wallet_balance = wallet_balance + ?",
    [bonusAmount],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({
        message: "Stimulus deployed successfully!",
        affected: result.affectedRows,
      });
    },
  );
});

// 6. ADMIN AUTHENTICATION
router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "investiq2026") {
    res.json({ token: "dba-secret-access-granted" });
  } else {
    res.status(401).json({ error: "Access Denied. Invalid DBA credentials." });
  }
});

export default router;

import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

// Fetch top 10 richest users (Wallet + Active Portfolio)
router.get("/", (req, res) => {
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

export default router;
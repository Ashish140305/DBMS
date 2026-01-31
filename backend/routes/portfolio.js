import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

// ADD to portfolio
router.post("/add", (req, res) => {
    const { user_id, fund_id, amount, type } = req.body;

    const query = `
    INSERT INTO portfolio (user_id, fund_id, investment_amount, investment_type, investment_date)
    VALUES (?, ?, ?, ?, CURDATE())
  `;

    db.query(query, [user_id, fund_id, amount, type], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Added to portfolio successfully" });
    });
});

export default router;

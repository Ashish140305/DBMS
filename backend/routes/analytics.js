import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    const query = `
    SELECT 
      mf.category,
      SUM(p.investment_amount) AS total_invested
    FROM portfolio p
    JOIN mutual_funds mf ON p.fund_id = mf.fund_id
    WHERE p.user_id = ?
    GROUP BY mf.category
  `;

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

export default router;

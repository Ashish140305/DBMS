import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

// GET portfolio dashboard for a user
router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    const query = `
    SELECT 
      mf.fund_name,
      mf.category,
      p.investment_amount,
      p.investment_type,
      p.investment_date
    FROM portfolio p
    JOIN mutual_funds mf ON p.fund_id = mf.fund_id
    WHERE p.user_id = ?
  `;

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

export default router;

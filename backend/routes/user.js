import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

// Get User Profile & Live Wallet Balance
router.get("/:id", (req, res) => {
    db.query(
        "SELECT id, username, email, full_name, phone, financial_goal, wallet_balance, profile_picture FROM users WHERE id = ?", 
        [req.params.id], 
        (err, results) => {
            if (err) return res.status(500).json(err);
            if (results.length === 0) return res.status(404).json({ error: "User not found" });
            res.json(results[0]);
        }
    );
});

// Update Profile Details
router.put("/:id", (req, res) => {
    const { full_name, phone, financial_goal, profile_picture } = req.body;
    db.query(
        "UPDATE users SET full_name = ?, phone = ?, financial_goal = ?, profile_picture = ? WHERE id = ?",
        [full_name, phone, financial_goal, profile_picture, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Profile updated successfully" });
        }
    );
});

export default router;

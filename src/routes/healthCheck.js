import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/status", async (req, res) => {
  const mongoStatus = mongoose.connection.readyState;

  res.json({
    server: "OK",
    database: mongoStatus === 1 ? "Connected" : "Not Connected"
  });
});

export default router;
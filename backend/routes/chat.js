const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Get Messages by Room
router.get("/:room", async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.room }).sort({ date_sent: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;

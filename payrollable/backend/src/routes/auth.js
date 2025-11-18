const express = require("express"); 
const router = express.Router();
const oracle = require("../db/oracle");

router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({ error: "username and password required"});
        }

        const result = await oracle.verifyCredentials(username, password);

        if (!result.success) {
            return res.status(401).json({ error: "invalid oracle credentials"});
        }

        return res.json({success: true});
    } catch (err) {
        return res.status(500).json({ error: "internal server error", details: err.message });
    }
})

module.exports = router;
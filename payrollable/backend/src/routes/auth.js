const express = require("express"); 
const getConnection = require("../db/oracle");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await getConnection(username, password);

    if (!result.success) {
        return res.status(401).json({ error: "invalid oracle credentials"});
    }

    return res.json({success: true});
})

module.exports = router;
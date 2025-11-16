const express = require("express");
const cors = require("cors");
const auth = require("./src/routes/auth");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use("/auth", auth);

app.listen(3000, () => {
    console.log("backend running on http://localhost:3000");
})
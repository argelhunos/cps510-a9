const express = require("express");
const auth = require("./src/routes/auth")

const app = express();

// middlewares
app.use(express.json());
app.use("/auth", auth);

app.listen(3000, () => {
    console.log("backend running on http://localhost:3000");
})
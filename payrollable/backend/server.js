const express = require("express");
const cors = require("cors");
const auth = require("./src/routes/auth");
const adminRouter = require('./src/routes/admin');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use("/auth", auth);

app.use('/admin', adminRouter);

const db = require("./src/db");
app.use(db.attachGetDb());

app.get("/", async (req, res) => {
    res.send("Payrollable Backend is running. Endpoints: /auth/login");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`backend running on http://localhost:${process.env.PORT || 3000}`);
});
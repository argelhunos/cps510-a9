const express = require('express');
const oracledb = require('oracledb');
const fs = require("fs");
const router = express.Router();



function splitSQL(script) {
    return script
    .replace(/\r\n/g, "\n")
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * POST /admin/refresh
 * Runs the refresh.sql file.
*/
router.post('/refresh', async (req, res) => {
  try {
    const script = fs.readFileSync("./refresh.sql", "utf8");

    const statements = splitSQL(script);

    for (const stmt of statements) {
      try {
        await req.db.runSql(stmt, [], { autoCommit: true });
      } catch (err) {
        console.error("SQL FAILED:", stmt);
        throw err;
      }
    }

    res.json({ success: true, ran: statements.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/drop-table
 * Body: {}
 */
router.post('/drop-tables', async (req, res) => {
  try {
    const script = fs.readFileSync("./drop.sql", "utf8");

    const statements = splitSQL(script);

    for (const stmt of statements) {
      try {
        await req.db.runSql(stmt, [], { autoCommit: true });
      } catch (err) {
        console.error("SQL FAILED:", stmt);
        throw err;
      }
    }

    res.json({ success: true, ran: statements.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/create-table
 * Body: {}
 */
router.post('/create-tables', async (req, res) => {
  try {
    const script = fs.readFileSync("./create.sql", "utf8");

    const statements = splitSQL(script);

    for (const stmt of statements) {
      try {
        await req.db.runSql(stmt, [], { autoCommit: true });
      } catch (err) {
        console.error("SQL FAILED:", stmt);
        throw err;
      }
    }

    res.json({ success: true, ran: statements.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/populate-table
 * Body: {}
 */
router.post('/populate-table', async (req, res) => {
  try {
    const script = fs.readFileSync("./populate.sql", "utf8");

    const statements = splitSQL(script);

    for (const stmt of statements) {
      try {
        await req.db.runSql(stmt, [], { autoCommit: true });
      } catch (err) {
        console.error("SQL FAILED:", stmt);
        throw err;
      }
    }

    res.json({ success: true, ran: statements.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/query
 * Body: { choice: "1" }
*/
router.post('/query', async (req, res) => {
  try {
    const { choice } = req.body;

    if (!/^[a-zA-Z0-9_-]+$/.test(choice)) {
      return res.status(400).json({ error: "Invalid choice" });
    }
    const filePath = path.join(__dirname, `./queries/query${choice}.sql`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "SQL file not found" });
    }

    const script = fs.readFileSync(filePath, "utf8");

    const statements = splitSQL(script);

    for (const stmt of statements) {
      try {
        await req.db.runSql(stmt, [], { autoCommit: true });
      } catch (err) {
        console.error("SQL FAILED:", stmt);
        throw err;
      }
    }

    res.json({ success: true, ran: statements.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
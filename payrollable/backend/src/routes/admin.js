const express = require('express');
const oracledb = require('oracledb');
const router = express.Router();

/**
 * POST /admin/refresh
 * Body: { sqls?: [string] }
 * If sqls omitted, runs a default drop/create for example tables.
 */
router.post('/refresh', async (req, res) => {
  try {
    const sqls = req.body?.sqls || [
      // DO NOT USE THIS YET, NOT READY, I'M TRYNA FIX
    ];
    for (const sql of sqls) {
      await req.db.runSql(sql, [], { autoCommit: true });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/drop-table
 * Body: { table: "TABLE_NAME" }
 * HAVENT TESTED THIS YET, TRYING TO FIX REFRESH FIRST
 */
router.post('/drop-table', async (req, res) => {
  const { table } = req.body;
  if (!table) return res.status(400).json({ error: 'table required' });
  try {
    const sql = `BEGIN EXECUTE IMMEDIATE 'DROP TABLE "${table}" PURGE'; EXCEPTION WHEN OTHERS THEN IF SQLCODE != -942 THEN RAISE; END IF; END;`;
    await req.db.runSql(sql, [], { autoCommit: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/create-table
 * Body: { ddl: "CREATE TABLE ... " }
 */
router.post('/create-table', async (req, res) => {
  const { ddl } = req.body;
  if (!ddl) return res.status(400).json({ error: 'ddl required' });
  try {
    await req.db.runSql(ddl, [], { autoCommit: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/populate-table
 * Body: { table: "name", rows: [{col: val}, ...] }
 */
router.post('/populate-table', async (req, res) => {
  const { table, rows, sqls } = req.body;
  try {
    if (Array.isArray(sqls)) {
      for (const s of sqls) await req.db.runSql(s, [], { autoCommit: true });
      return res.json({ success: true });
    }
    if (!table || !Array.isArray(rows)) return res.status(400).json({ error: 'table and rows required' });
    for (const row of rows) {
      const cols = Object.keys(row).map(c => `"${c}"`).join(',');
      const binds = Object.values(row);
      const placeholders = binds.map((_, i) => `:${i + 1}`).join(',');
      const sql = `INSERT INTO "${table}" (${cols}) VALUES (${placeholders})`;
      await req.db.runSql(sql, binds, { autoCommit: false });
    }

    await req.db.runSql('COMMIT', [], { autoCommit: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/query
 * Body: { sql: "SELECT ... " }
 */
router.post('/query', async (req, res) => {
  const { sql } = req.body;
  if (!sql) return res.status(400).json({ error: 'sql required' });
  try {
    const result = await req.db.runSql({ sql, options: { outFormat: oracledb.OUT_FORMAT_OBJECT } });
    res.json({ rows: result.rows || [], meta: result.metaData || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
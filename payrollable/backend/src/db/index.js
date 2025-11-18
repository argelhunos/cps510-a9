require('dotenv').config();
const oracledb = require('oracledb');
const oracle = require('./oracle');

async function connect({ username, password } = {}) {
  const user = username || process.env.DB_USER;
  const pass = password || process.env.DB_PASSWORD;

  if (!user || !pass) {
    throw new Error('Database credentials required (username/password)');
  }


  return oracle.getConnection(user, pass);
}

async function runSql({ username, password, sql, binds = [], options = {} }) {
  const conn = await getConnection(username, password);
  try {
    const opts = Object.assign({ outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: false }, options);
    const result = await conn.execute(sql, binds, opts);
    if (opts.autoCommit) await conn.commit();
    return result;
  } finally {
    try { await conn.close(); } catch (e) { /* ignore close errors */ }
  }
}

function attachGetDb() {
  return (req, res, next) => {
    req.db = {
      runSql: (sql, binds = [], options = {}, creds = {}) => {
        const username = creds.username || req.body?.username || req.headers['x-db-user'];
        const password = creds.password || req.body?.password || req.headers['x-db-pass'];
        return runSql({ username, password, sql, binds, options });
      }
    };
    next();
  };
}

module.exports = { connect, attachGetDb };
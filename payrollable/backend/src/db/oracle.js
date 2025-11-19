const oracledb = require("oracledb");
require('dotenv').config();

const CONNECT_STRING =
  process.env.DB_CONNECT_STRING ||
  "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.cs.torontomu.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))";

async function verifyCredentials(username, password) {
  try {
        // note: thick client no longer needed for change to 12c
        // oracleDB.initOracleClient();
    const conn = await oracledb.getConnection({
      user: username,
      password,
      connectString: CONNECT_STRING,
    });
    await conn.close();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// returns a live connection or throws
async function getConnection(username, password) {
  return oracledb.getConnection({
    user: username,
    password,
    connectString: CONNECT_STRING,
  });
}

module.exports = { verifyCredentials, getConnection };
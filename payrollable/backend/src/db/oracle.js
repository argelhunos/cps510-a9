const oracleDB = require("oracledb");

async function getConnection(username, password) {
    try {
        // note: thick client no longer needed for change to 12c
        // oracleDB.initOracleClient();

        const conn = await oracleDB.getConnection({
            user: username,
            password: password,
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.cs.torontomu.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))"
        });
        
        console.log("Connected to Oracle 12c!");

        await conn.close();
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

module.exports = getConnection;
const oracleDB = require("oracledb");

async function getConnection(username, password) {
    try {
        oracleDB.initOracleClient();

        const conn = await oracleDB.getConnection({
            user: username,
            password: password,
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl)))"
        });
        
        console.log("Connected to Oracle 11g!");

        await conn.close();
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}

module.exports = getConnection;
require("dotenv").config({path: "../../.env"});
const oracleDB = require("oracledb");

async function getConnection() {
    try {
        oracleDB.initOracleClient();

        const conn = await oracleDB.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl)))"
        });

        console.log("Connected to Oracle 11g!");

        await conn.close();
    } catch (err) {
        console.error("Connection error:", err);
    }
}

getConnection();
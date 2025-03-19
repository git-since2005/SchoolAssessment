require("dotenv").config();
let log = console.log
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors({"origin":"http://localhost:5173"}))

// MySQL Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection)=>{
    if(err){
        log("Error", err)
    }
    log("Connected")
})

app.post("/", async(req, res)=>{
    return res.json({"status":"success"})
})

app.post("/addSchool", (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const values = [name, address, latitude, longitude];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting school:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ status: "success", schoolId: result.insertId });
    });
});

app.get("/listSchools", (req, res) => {
    const { latitude, longitude } = req.query;
    log(latitude, longitude)

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const sql = `SELECT *, 
        ( 6371 * acos( cos( radians(?) ) * cos( radians(latitude) ) * 
        cos( radians(longitude) - radians(?) ) + sin( radians(?) ) * 
        sin( radians(latitude) ) ) ) AS distance 
        FROM schools 
        ORDER BY distance`;
    log(sql)

    const values = [latitude, longitude, latitude];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error fetching schools:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, "127.0.0.1", () => console.log(`Server running on port ${PORT}`));
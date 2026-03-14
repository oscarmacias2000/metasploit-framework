const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');
require('dotenv').config();


//configuracion de EJS
/*app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));*/



const app = express();

//midleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', '../../views');

app.use(cors());
app.use(express.json());


const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'modules',
    password: '123chivas',
    port: 5433,
});

pool.connect()
.then(()=> console.log("DB conectada"))
.catch(err => console.error("Error DB:", err));

  
//ruta para mostrar las tablas y columnas
app.get('/', async (req, res) => {
    try{
        //obtener tablas
        const tablesResult = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
        `);
        const tables = tablesResult.rows.map(row => row.table_name);
        //obtener columnas para cada tabla
        const modules = [];
        for (const table of tables) {
            const columnsResult = await pool.query(`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = $1;
            `,[table]);
            const columns = columnsResult.rows.map(row => row.column_name);
            modules.push({tables, columns});
        }
          
    } catch (error) {
        console.error("Error fetching tables:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }

});

//modules paths
app.get("/modules", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM modules");
        res.json(result.rows); // ✅ Correcto: Devuelve las filas de la consulta
    } catch (error) {
        console.error("Error fetching modules:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/modules", async (req, res) => {
    const {namemodule, description, type, plataform} = req.body;
    await pool.query(
        "INSERT INTO modules (namemodule, description, type, plataform) VALUES ($1, $2, $3, $4)",
        [namemodule, description, type, plataform]
    );
    res.json({ message: "Module added successfully", status: "success" });
});





app.listen(3000, () => {
    console.log("Server is running on port 3000 API Running!");
});
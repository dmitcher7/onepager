const { Pool } = require('@neondatabase/serverless');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = async (req, res) => {
    try {
        const { type } = req.body; // Vercel geeft body al geparsed als JSON
        await pool.query('UPDATE counters SET count = count + 1 WHERE type = $1', [type]);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify({ success: true }));
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ error: 'DB error' }));
    }
};

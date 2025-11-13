const { Pool } = require('@neondatabase/serverless');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM counters;');
        let companies = 0, sponsors = 0;
        result.rows.forEach(r => {
            if (r.type === 'companies') companies = r.count;
            if (r.type === 'sponsors') sponsors = r.count;
        });
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(JSON.stringify({ companies, sponsors }));
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ error: 'DB error' }));
    }
};

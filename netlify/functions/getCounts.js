const { Pool } = require('@neondatabase/serverless');
const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL
});

exports.handler = async function(event, context){
    try{
        const res = await pool.query('SELECT * FROM counters;');
        let companies=0, sponsors=0;
        res.rows.forEach(r=>{
            if(r.type==='companies') companies = r.count;
            if(r.type==='sponsors') sponsors = r.count;
        });
        return {
            statusCode:200,
            headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
            body: JSON.stringify({companies, sponsors})
        };
    } catch(err){
        console.error(err);
        return {statusCode:500, body:JSON.stringify({error:'DB error'})};
    }
};

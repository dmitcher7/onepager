const { Pool } = require('@neondatabase/serverless');
const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL
});

exports.handler = async function(event, context){
    try{
        const { type } = JSON.parse(event.body);
        await pool.query('UPDATE counters SET count = count + 1 WHERE type = $1', [type]);
        return {
            statusCode:200,
            headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
            body: JSON.stringify({success:true})
        };
    } catch(err){
        console.error(err);
        return {statusCode:500, body:JSON.stringify({error:'DB error'})};
    }
};

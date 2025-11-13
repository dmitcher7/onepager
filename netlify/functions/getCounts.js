import { createClient } from '@supabase/supabase-js';

// Haal je database URL en key uit environment variables
const supabaseUrl = process.env.NETLIFY_DATABASE_URL;
const supabaseKey = process.env.NETLIFY_DATABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function handler(event, context) {
    try {
        const { data } = await supabase.from('counters').select('*');
        const counts = {};
        data.forEach(row => counts[row.type] = row.count);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(counts)
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
}

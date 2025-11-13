import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NETLIFY_DATABASE_URL;
const supabaseKey = process.env.NETLIFY_DATABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function handler(event, context) {
    try {
        const { type } = JSON.parse(event.body);

        // Haal huidige teller
        const { data } = await supabase.from('counters').select('*').eq('type', type).single();
        const newCount = data.count + 1;

        // Update teller
        await supabase.from('counters').update({ count: newCount }).eq('type', type);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ [type]: newCount })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
}

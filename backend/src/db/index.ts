import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

// const query = (text: string, params: any[], callback:( error: Error | null, result?: QueryResult<any>) => void ) => {
//   return pool.query(text, params, callback);
// };
const queryWithPool = async (
  text: string,
  params?: any[],
): Promise<QueryResult<any>> => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.log('Error executing query with pool ', error);
    throw error;
  } finally {
    client.release();
  }
};

const queryTransaction = async (queryText: string[], params: any[][]) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const results: QueryResult<any>[] = [];
    // Loop through the queries and execute them in sequence
    for (let i = 0; i < queryText.length; i++) {
      const result = await client.query(queryText[i], params[i]);
      results.push(result);
    }

    await client.query('COMMIT'); // Commit the transaction
    return results;
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error('Error executing transaction:', error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

export { query, queryWithPool, pool, queryTransaction };

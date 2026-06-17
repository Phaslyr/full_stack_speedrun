import dns from 'node:dns';
import { MongoClient } from 'mongodb';

// Node's c-ares resolver defaults to 127.0.0.1 on this machine (nothing listening
// there), which breaks the mongodb+srv SRV lookup. Point it at a real DNS server.
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function runGetStarted() {
  // Connection string is loaded from .env (run with: node --env-file=.env server.js)
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    await client.close();
  }
}
runGetStarted().catch(console.dir);
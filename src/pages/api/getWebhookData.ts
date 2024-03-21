import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri = 'mongodb+srv://baseboardfi:baseboardfi@test.oa5jx.mongodb.net/?retryWrites=true&w=majority&appName=test';
const dbName = 'test';
const collectionName = 'test';

// Initialize a global variable to hold the connection
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    // Use the existing database connection
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('MongoDB URI is not defined in environment variables');
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  // Cache the database connection and return the connection
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);

    // Fetch the latest webhook data
    const data = await collection.find({}).sort({_id: -1}).limit(1).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch data', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}
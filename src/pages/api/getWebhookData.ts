import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri = 'mongodb+srv://baseboardfi:thieryhenry14@test.oa5jx.mongodb.net/?retryWrites=true&w=majority&appName=test';
const dbName = 'test';
const collectionName = 'test';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new MongoClient(uri as string);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch the latest webhook data
    const data = await collection.find({}).sort({_id: -1}).limit(1).toArray();

    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch data', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  } finally {
    await client.close();
  }
}
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

// MongoDB URI and database/collection names
const uri = 'mongodb+srv://baseboardfi:4uUh4iSdAFuUFaC5@test.oa5jx.mongodb.net/';
const dbName = 'test';
const collectionName = 'test';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const client = new MongoClient(uri as string);
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Insert the webhook data into the collection
      await collection.insertOne(req.body);

      res.status(200).json({ message: 'Data saved' });
    } catch (error) {
      console.error('Failed to save data', error);
      res.status(500).json({ message: 'Failed to save data' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
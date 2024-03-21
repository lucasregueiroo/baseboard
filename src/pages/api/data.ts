
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri = "mongodb+srv://baseboardfi:4uUh4iSdAFuUFaC5@test.oa5jx.mongodb.net/";
const client = new MongoClient(uri);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db("test");
      const collection = database.collection("test");
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Unable to connect to the database" });
    } finally {
      await client.close();
    }
  }
}

export default handler;
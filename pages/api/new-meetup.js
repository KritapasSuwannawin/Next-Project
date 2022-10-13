import { clientPromise } from '../../lib/mongoDB';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await clientPromise;

    await client.db('meetups').collection('meetups').insertOne(data);

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;

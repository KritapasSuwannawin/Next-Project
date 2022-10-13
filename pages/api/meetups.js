import { clientPromise } from '../../lib/mongoDB';

async function handler(req, res) {
  if (req.method === 'GET') {
    const client = await clientPromise;
    const meetups = await client.db('meetups').collection('meetups').find().toArray();

    res.json({
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    });
  }
}

export default handler;

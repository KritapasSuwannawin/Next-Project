import { MongoClient } from 'mongodb';

export const clientPromise = MongoClient.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`,
  { useUnifiedTopology: true }
);

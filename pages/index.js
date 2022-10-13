import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';

import { clientPromise } from '../lib/mongoDB';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  const [meetupsUpdated, setMeetupsUpdated] = useState();

  useEffect(async () => {
    const response = await fetch('/api/meetups');
    const data = await response.json();
    const meetups = data.meetups;

    if (JSON.stringify(props.meetups) === JSON.stringify(meetups)) {
      return;
    }

    setMeetupsUpdated(meetups);
  }, []);

  console.log(meetupsUpdated);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={meetupsUpdated || props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await clientPromise;
  const meetups = await client.db('meetups').collection('meetups').find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 60,
  };
}

export default HomePage;

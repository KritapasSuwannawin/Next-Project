import { useRouter } from 'next/router';

import classesDetail from './MeetupDetail.module.css';
import classesItem from './MeetupItem.module.css';

function MeetupDetail(props) {
  const router = useRouter();

  function backHandler() {
    router.push('/');
  }

  return (
    <section className={classesDetail.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <div className={classesItem.actions}>
        <button onClick={backHandler}>Back</button>
      </div>
    </section>
  );
}

export default MeetupDetail;

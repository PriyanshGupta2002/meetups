import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import {useRouter} from 'next/router'
function MeetupItem(props) {
  const router = useRouter()
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          {props.type==="detail" && <p>{props.description}</p>}
        </div>
         {!props.type&&<div className={classes.actions}>
          <button onClick={()=>{router.push(`/meetup/${props.id}`)}}>Show Details</button>
        </div>}

      </Card>
    </li>
  );
}

export default MeetupItem;

import React, { useEffect, useState } from 'react'
import MeetupList from '../components/meetups/MeetupList'
import { connection_to_db, fetchAllEvents } from '../lib/db-util'
import {useSession} from 'next-auth/react'
const HomePage = (props) => {

    const [meetups, setmeetups] = useState()    
   const {status} = useSession()

    useEffect(() => {
    if (props.meets) {
      setmeetups(props.meets)
    }
    }, [props.meets])
    if (!meetups) {
      return<p>Loading...</p>
    }
    if (status==="unauthenticated") {
      return <h1 style={{textAlign:"center"}}>Login to see events</h1>
    }
  return (
    <MeetupList meetups={meetups}/>
  )
}
export const getStaticProps=async()=>{
  const client =await connection_to_db()
  const data = await fetchAllEvents(client)

  return{
    props:{
      meets:data.map((meet)=>{
        return {
          title:meet.title,
          image:meet.image,
          description:meet.description,
          address:meet.address,
          id:meet._id.toString()
        }
      })
    }
  }
}


export default HomePage
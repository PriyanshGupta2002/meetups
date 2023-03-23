import React from 'react'
import MeetupItem from '../../components/meetups/MeetupItem'
// import { connection_to_db, fetchAllEvents } from '../lib/db-util'
import {getSession} from 'next-auth/react'

const meetdetail = (props) => {
  
  if (props.error) {
    return <h1>{props.error}</h1>
  }
  
  return (
    <MeetupItem type="detail" id={props.meetup.id} title={props.meetup.title} image={props.meetup.image} description={props.meetup.description} address={props.meetup.address} />
  )
}


export const getServerSideProps=async(context)=>{
  const {meetId} = context.params
  const res = await fetch(`http://localhost:3000/api/meet-detail/${meetId}`)
  let data
  try {
     data = await res.json()
    } catch (err) {
      return{
        props:{
          error:"No Meetups Found"
        }
      }
    }
  const session = await getSession({req:context.req})

  if (!session) {
      return {
          redirect:{
              destination:'/auth',
              permanent:false
          }
      }
  }


  if (session) {
      return{
          props:{
              session,
              meetup:{
                title:data.message.title,
                description:data.message.description,
                image:data.message.image,
                id:data.message._id.toString(),
                address:data.message.address,
              }
            }

            
      }
  }
}
export default meetdetail
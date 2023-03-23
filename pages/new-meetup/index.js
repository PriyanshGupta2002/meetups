import React, { useState } from 'react'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import {useRouter} from 'next/router'
import{getSession} from 'next-auth/react'
const NewMeetup = () => {
  const router = useRouter()
  const [message, setmessage] = useState("")
  const addMeetupHandler=async(meetupData)=>{
    const res = await fetch("/api/meetup",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(meetupData),
      
    })
    if (!res.ok) {
     const data = await res.json()
     setmessage(data.message)
     return
    }

      const data1 = await res.json() 
      setmessage(data1.message)
      router.push('/')
      setTimeout(() => {
        setmessage("")
      }, 3000);
      return
    //  console.log(data1)
    
  }
  return (
    <>
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    {message&&<h1 className="noti">{message}!</h1>}
    </>
  )
}

export const getServerSideProps=async(context)=>{
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
              session
          }
      }
  }
}
export default NewMeetup
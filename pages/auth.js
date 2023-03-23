import React, { useState } from 'react'
import AuthForm from '../components/auth/auth-form'
import { motion } from 'framer-motion'
import {getSession} from 'next-auth/react'
const Auth = () => {
    
    const [message, setmessage] = useState("")
    
    const addUserInfo=async(userData)=>{
    const res = await fetch('/api/auth/signup',{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
            'Content-Type':'application/json'
        }
    })
    if (!res.ok) {
        const data = await res.json()
        setmessage(data.message)
        setTimeout(() => {
            setmessage("")
        }, 2000);
        return
    }
    const data1 = await res.json()
    setmessage(data1.message)
    setTimeout(() => {
        setmessage("")
    }, 2000);
    }

  return (
    <>
    <AuthForm addUserInfo={addUserInfo}/>
    {message && <motion.h1 className='message'
    initial={{
        y:1000
    }}
    animate={{
        y:0,
    }}
    transition={{
        type:"spring",
        stiffness:60
    }}
    >{message}</motion.h1>}
    </>
  )
}
export const getServerSideProps=async(context)=>{
    const session = await getSession({req:context.req})
    if (session) {
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    if (!session) {
        return{
            props:{
                session
            }
        }
    }
}
export default Auth
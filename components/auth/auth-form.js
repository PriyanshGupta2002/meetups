import React, { useState } from "react";
import { useRef } from "react";
import classes from "./auth-form.module.css";
import {motion} from 'framer-motion'
import {signIn} from 'next-auth/react'
import { useRouter } from "next/router";

const AuthForm = (props) => {
  const [message,setMessage]=useState("")
  const router = useRouter()
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  const [isLogin, setisLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const submitHandler = async(e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (!isLogin) {
      const userData = {
        email: enteredEmail,
        password: enteredPassword,
      };
      props.addUserInfo(userData);
      setisLogin(true)
      
    }
    if (isLogin) {
      const result = await signIn("credentials",
      {
        email:enteredEmail,
        password:enteredPassword,
        redirect:false
      }
      )
      if (!result.error) {
        router.push('/')
        setMessage("Login Successful!")
        return
      }
      setMessage(result.error)
      setTimeout(() => {
        setMessage("")
      }, 2000);
      
    }
  };
  return (
    <motion.div className={classes.container}
    
    variants={container}
    initial="hidden"
    animate="show">
      <form action="" className={classes.form} onSubmit={submitHandler}>
        <motion.h1 variants={item}> {isLogin ? "Login to add Events" : "Create an Account"}</motion.h1>
        <div  className={classes.controls}>
          <motion.label variants={item} htmlFor="email">Email</motion.label>
          <motion.input type="email" variants={item} id="email" ref={emailRef} />
        </div>
        <div className={classes.controls}>
          <motion.label htmlFor="password" variants={item}>Password</motion.label>
          <motion.input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            variants={item}
          />
        </div>

        <motion.div variants={item} className={classes.btn}>
          <button>{isLogin ? "Login" : "Create account"}</button>
        </motion.div>
        {isLogin && (
          <motion.span
          variants={item}
            onClick={() => {
              setisLogin(false);
            }}
          >
            Don&apos;t have an account ? <strong>Create One Now</strong>
          </motion.span>
        )}
      </form>
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
    </motion.div>
  );
};

export default AuthForm;

import classes from './MainNavigation.module.css';
import Link from 'next/link';
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/react'
import { AccountCircle } from '@mui/icons-material';
import { signOut } from "next-auth/react"
function MainNavigation() {
  const router = useRouter()
  const {status} = useSession()
  const logoutHandler=async()=>{
    const userData = await signOut({redirect:false,callbackUrl:'/auth'})
    router.push('/auth')
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={()=>{router.push('/')}} >React Meetups</div>
      <nav>
        <ul>
        {status==="authenticated" || status==="loading" ? <> <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
         </>:""}
          <div className={classes.button}>
          {status==="loading" || status==="authenticated" && <button onClick={logoutHandler} className={classes.btn}>Logout</button>}
          {status==="unauthenticated" && <button onClick={()=>{router.push('/auth')}} className={classes.btn}>Login</button>}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

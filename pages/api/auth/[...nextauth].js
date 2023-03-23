import nextauth from 'next-auth'
import credentialsProvider from 'next-auth/providers/credentials'
import {MongoClient} from 'mongodb'
import { verifyPassword } from '../../../lib/pass-hash'
const connectionHandler=async()=>{
    
     return await MongoClient.connect('mongodb+srv://Priyansh:mCyeOaHfs3HHuRvQ@cluster0.cpydn.mongodb.net/functions?retryWrites=true&w=majority')
}
const userFinder=async(client,email)=>{
    const db = client.db()
    const user  = await db.collection("UserInfo").findOne({email})
    return user
}
export default nextauth({
    session:{
        jwt:true,
    },
    providers:[
        credentialsProvider({
            async authorize(credentials){
                const {email,password}=credentials
                if (!email || !email.includes("@")) {
                    throw new Error("Email not valid")
                }
                if (!password || password.trim().length<6) {
                    throw new Error("Password must be 6 characters long")
                }
                let client
                try {
                client = await connectionHandler() 
                } catch (error) {
                    throw new error("Connection to database failed")
                }
                const user=await userFinder(client,email)
                if (!user) {
                    throw new Error("User not found")
                }
                const isGenuine = await verifyPassword(password,user.password)
                if (!isGenuine) {
                    throw new Error("Incorrect Password")
                }
                return{
                    email:user.email
                }
            }
        })
    ]
})
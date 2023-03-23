import { MongoClient } from "mongodb"
import { hashPassword } from "../../../lib/pass-hash"
const connection_to_db=async()=>{
    const client = await MongoClient.connect('mongodb+srv://Priyansh:mCyeOaHfs3HHuRvQ@cluster0.cpydn.mongodb.net/functions?retryWrites=true&w=majority')
    return client
}
const insertUser=async(client,{email,password})=>{
    const db = client.db()
    const hashedP = await hashPassword(password)
    const userData = {
        email,
        password:hashedP
    }
    const result = await db.collection('UserInfo').insertOne(userData)
    return result
}
const find_a_user=async(client,email)=>{
const db = client.db()
const result = await db.collection('UserInfo').findOne({email:email})
return result
}
const eventRegistrationUserHandler=async(req,res)=>{
    if (req.method==="POST") {
        const {email,password}=req.body
        if (!email || !email.includes("@")) {
            res.status(422).json({error:true,"message":"Email is Invalid"})
            return
        }

        if (!password || password.trim().length<6) {
            res.status(422).json({error:true,"message":"Password is Invalid"})
            return
        }
        let client;
        try {
             client = await connection_to_db()
             const isUser = await find_a_user(client,email)
             if (isUser) {
                res.status(422).json({error:true,"message":"User Already Exists!"})
                return
             }
        } catch (error) {
            res.status(422).json({error:true,"message":"Connection to database failed"})
            return
        }
        const result = await insertUser(client,{email,password})
        if (!result) {
            res.status(422).json({error:true,"message":"Fail to signup"})
            return
        }
        res.status(201).json({error:false,"message":"Signup Successful"})
    }

}
export default eventRegistrationUserHandler
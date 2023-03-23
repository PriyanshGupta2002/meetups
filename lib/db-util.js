import { MongoClient,ObjectId } from "mongodb";

export const connection_to_db=async()=>{
    const client =await MongoClient.connect('mongodb+srv://Priyansh:mCyeOaHfs3HHuRvQ@cluster0.cpydn.mongodb.net/functions?retryWrites=true&w=majority')
    return client
}
export const fetchAllEvents=async(client)=>{
    const db = client.db()
    return await db.collection('function').find().toArray()
}
export const addEvents=async(client,event)=>{
    const db = client.db()
    return await db.collection('function').insertOne(event)
}

export const findEventById=async(client,id)=>{
    const db = client.db()
    const event = await db.collection('function').findOne({_id:id})
    return event
}
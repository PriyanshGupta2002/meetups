import { addEvents, connection_to_db, fetchAllEvents } from "../../lib/db-util";

const handleMeetups=async(req,res)=>{
    if (req.method==="POST") {
        const {title,image,address,description}=req.body
        if (!title || title.trim().length<=0 || !image || image.trim().length<=0 || !address || address.trim().length<=0 || !description || description.trim().length<=0) {
            res.status(422).json({error:true,"message":"All Inputs are neccessary"})
            return
        }
        let client;
        try {
            client = await connection_to_db()
        } catch (error) {
            res.status(422).json({error:true,"message":"failed to connect to db"})
            return
        }
        const result = await addEvents(client,{title,image,address,description})
        if (!result) {
            res.status(422).json({error:true,"message":"Cannot Insert Data into db"})
            return
        }
        res.status(201).json({error:false,message:"Added Meetup Successfully"})
        
    }
    
        let client
        try {
             client = await connection_to_db()
            
        } catch (error) {
            res.status(422).json({error:true,"message":"failed to connect to db"})
        }
        try {
            const getAllEvents = await fetchAllEvents(client)
            res.status(201).json(getAllEvents)
            
        } catch (error) {
            res.status(422).json({error:true,"message":"failed to fetch data"})
        }
        
}
export default handleMeetups
import { connection_to_db, findEventById } from "../../../lib/db-util"
import{ObjectId} from 'mongodb'
const eventByIdHandler=async(req,res)=>{
    if (req.method==="GET") {
        
        const {meetId} = req.query

        var hex = /[0-9A-Fa-f]{6}/g;
        let mongoId  = (hex.test(meetId))? ObjectId(meetId) : meetId;
        let client
        try {
            client = await connection_to_db()
        } catch (error) {
            res.status(422).json({error:true,"message":"Connection to database failed"})
            client.close()
            return
        }
        
            const getAPost =await  findEventById(client,mongoId)
        if (!getAPost) {
            res.status(404).json({error:true,"message":"No Event Found"})
            return
        }
        res.status(201).json({error:false,message:getAPost})
        client.close()

    }
}
export default eventByIdHandler
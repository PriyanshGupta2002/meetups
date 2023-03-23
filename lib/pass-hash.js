import { hash,compare } from "bcryptjs";

export const hashPassword=(password)=>{
    return hash(password,12)
}
export const verifyPassword=(userpass,db_stored_pass)=>{
    return compare(userpass,db_stored_pass)
}
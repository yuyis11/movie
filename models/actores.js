import  mongoose  from "mongoose";

const actoresSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    biografia:{
        type:String,
        minLength:8,
    },
    foto:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Actor',actoresSchema)


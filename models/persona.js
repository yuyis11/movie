import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
    email:{
      type:String,
      maxLength:25,
      required: true 
    },
    password:{
        type:String,
        required: true,
        minLength:8
    },
    nombre:{
        type:String,
        maxLength:20,
        required: true
    },
    apellido:{
        type:String,
        maxLength:20,
        required: true
    },
    edad:{
        type:Number,
        required: true,
        default:0
    },
    alias:{
        type:String,
        maxLength:8,
        default:"anonimo"
            
    },
    foto:{
        type:String,
        default:""
    },
    estado:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})

export default mongoose.model('Persona',personaSchema)
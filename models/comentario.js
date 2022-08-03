import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema({
    Comment:{
        type:String,
        minLength:6,
        required:true
    },
    idUsuario:{
        type: mongoose.Schema.ObjectId,
        ref:"Persona",
        required: true
    },
    idPelicula:{
        type:mongoose.Schema.ObjectId,
        ref:"Pelicula",
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model('Comentario',ComentarioSchema )
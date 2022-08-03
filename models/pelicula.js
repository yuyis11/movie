import mongoose from "mongoose";

const PeliculaSchema = new mongoose.Schema({
    tituloOriginal: {
        type: String,
        maxLength: 50,
        required: true
    },
    tituloEspañol: {
        type: String,
        maxLength: 50,
        required: true
    },
    fechaLanzamiento: {
        type: Date,
        required: true
    },
    genero: {
        type: String,
        minLength: 5,
        required: true
    },
    calificacion: {
        type: Number,
        default: 0,

    },
    sinopsis: {
        type: String,
        minLength: 10,
        required: true
    },
    director: {
        type: String,
        maxLength: 25,
        required: true
    },
    escritor: {
        type: String,
        maxLength: 50,
        required: true
    },
    repartoPrincipal: [
        {
            act: {
                type: mongoose.Schema.ObjectId,
                ref: "Actor",
                required: true
            }
        }

    ],
    estado: {
        type: String,
        maxLength: 20,
        required: true
    },
    idiomaOriginal: {
        type: String,
        maxLength: 20,
        required: true
    },
    presupuesto: {
        type: Number,
        default: 0
    },
    ingresos: {
        type: Number,
        default: 0
    },
    foto:{
        type: String,
        default:""
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Pelicula', PeliculaSchema)
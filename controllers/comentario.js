import Comentario from "../models/comentario.js"

const comentarioPost=async(req,res)=>{
    const {Comment,idPelicula,idUsuario}=req.body
    const comentario= new Comentario({Comment,idPelicula,idUsuario})
    comentario.save()
    res.json({comentario})
}
const comentarioGet=async(req,res)=>{
    const {idPelicula,idUsuario}=req.body
    const comentario= await Comentario.find({idPelicula,idUsuario}) 
    .populate("idPelicula",["tituloOriginal"])
    .populate("idUsuario",["nombre","apellido"])
    .populate("Comment",["Comment"])
    res.json({comentario})
}

export{comentarioPost,comentarioGet}


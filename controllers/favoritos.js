import Favorito from "../models/favoritos.js"

const favoritoPost=async(req,res)=>{
    const {idPelicula,idUsuario}=req.body
    const favorito= new Favorito({idPelicula,idUsuario}) 
    favorito.save()
    res.json({favorito})
}

const favoritoGet=async(req,res)=>{
    const favorito= await Favorito.find() 
    .populate("idPelicula",["tituloOriginal","tituloEspañol"])
    .populate("idUsuario",["nombre","apellido"])
    res.json({favorito})
}

export{favoritoGet,favoritoPost}
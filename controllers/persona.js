import Persona from "../models/persona.js"
import bcryptjs from "bcryptjs" 
import {generarJWT} from "../middlewares/validar.js"
import subirArchivo from "../helpers/subir-archivo.js"

const personaMostar=async (req, res) => {
    const persona= await Persona.find();
    res.json({persona})
    
}
const personaPost = async(req,res)=>{
    const {email,password,nombre,apellido,edad,alias,foto,estado}=req.body
    const persona= new Persona({email,password,nombre,apellido,edad,alias,foto,estado})
    const salt= bcryptjs.genSaltSync(10)
    persona.password=bcryptjs.hashSync(password, salt)
    persona.save()
    res.json({
        persona
    })
}

const personaLogin= async(req,res)=>{

    const { email, password } = req.body;

    try {
        const usuario = await Persona.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Hable con el WebMaster"
        })
    }
}

const personaDelete= async (req, res) => {
    const {email}=req.body
    const persona= await Persona.findOneAndDelete({email});
    res.json({
        persona
    })
    
}

const personaput= async (req, res) => {
    const{id}=req.params
    const{_id,createAt,estado,...resto}=req.body;
    const modificar= await Persona.findByIdAndUpdate(id,resto);
    res.json({
        modificar
    })
}

const personaGetId=async(req,res)=>{
    const {id}=req.body
    const persona= await Persona.findById(id);
    res.json({persona})
}

const personaActivar=async (req, res) => {
    const{id}=req.params;
    const persona= await Persona.findByIdAndUpdate(id,{estado:1})
    res.json({
        persona
    })
}

const personaDesactivar=async (req, res) => {
    const{id}=req.params;
    const persona= await Persona.findByIdAndUpdate(id,{estado:0})
    res.json({
        persona
    })
}

const cargarFoto=async (req, res) => {
    const { id } = req.params;
    try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));

        //persona a la cual pertenece la foto
        let persona = await Persona.findById(id);
        if (persona.foto) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', persona.foto);
            
            if (fs.existsSync(pathImage)) {
                console.log('Existe archivo');
                fs.unlinkSync(pathImage)
            }
            
        }
       
        persona = await Persona.findByIdAndUpdate(id, { foto: nombre })
        //responder
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }

}





export{personaPost,personaLogin,personaDelete,personaput,personaGetId,personaActivar,personaDesactivar,personaMostar,cargarFoto}
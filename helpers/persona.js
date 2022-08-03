import Persona from "../models/persona.js"


const helpersUsuarios = {
    existeUsuarioById: async (id) => {
        const existe = await Persona.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEmail:async(email) => {

        const existe = await Persona.findOne({ email });

        if (existe) {
            throw new Error(`El email ya esta registrado`)
        }
    },

}
export default helpersUsuarios
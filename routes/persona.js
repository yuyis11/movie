import {Router} from "express"
import { check } from "express-validator"
import {personaPost,personaLogin,personaDelete,personaput,personaGetId,personaActivar,personaDesactivar,personaMostar,cargarFoto} from "../controllers/persona.js"
import { validarCampos } from "../middlewares/middleware.js"
import helpersUsuarios from "../helpers/persona.js"
import { validarJWT } from "../middlewares/validar.js"
import validarArchivo from "../middlewares/validar-archivo.js"

const router=new Router()

router.post('/',[
    check('email').not().isEmpty(),
    check('email').isEmail(),
    check('email').custom(helpersUsuarios.existeEmail),
    check('password').not().isEmpty(),
    check('password').isLength({min:8}),
    check('nombre','no puede quedar vacio el campo nombre').not().isEmpty(),
    check('nombre').isLength({max:20}),
    check('apellido').not().isEmpty(),
    check('apellido').isLength({max:20}),
    check('edad').not().isEmpty(),
    check('foto').isLength({min:5}),
    validarCampos
    
], personaPost)
router.get('/mostrar',[
    validarJWT,
    validarCampos
],personaMostar)
router.get('/login',personaLogin)
router.delete('/delete',personaDelete)
router.put('/:id',personaput)
router.get('/buscar',[
    check('id').custom(helpersUsuarios.existeUsuarioById),
    validarCampos
],personaGetId)
router.put('/activar/:id',[
    check('id','id activo').not().isEmpty(),
    validarCampos
],personaActivar)
router.put('/desactivar/:id',[
    check('id','ingrese id a desactivar').not().isEmpty(),
    validarCampos
],personaDesactivar)

router.post('/foto/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersUsuarios.existeUsuarioById), 
    validarArchivo,
    validarCampos
],cargarFoto)



export default router
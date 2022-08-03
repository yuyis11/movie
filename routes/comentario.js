import {Router} from "express"
import {comentarioPost,comentarioGet} from "../controllers/comentario.js"
import { validarCampos } from "../middlewares/middleware.js"
import { check } from "express-validator"

const router=new Router()

router.post('/',[
    check('Comment','no puede estar vacio').not().isEmpty(),
    check('Comment','debe ser menor a 6').isLength({min:6}),
    check('idUsuario').isMongoId(),
    check('idPelicula').isMongoId(),
    validarCampos
],comentarioPost)
router.get('/get',comentarioGet)

export default router
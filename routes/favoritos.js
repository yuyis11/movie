import {Router} from "express"
import { check } from "express-validator"
import {favoritoPost,favoritoGet} from "../controllers/favoritos.js"
import { validarCampos } from "../middlewares/middleware.js"

const router=new Router()

router.post('/',[
    check('idPelicula').isMongoId(),
    check('idUsuario').isMongoId(),
    validarCampos
],favoritoPost)
router.get('/get',favoritoGet)

export default router


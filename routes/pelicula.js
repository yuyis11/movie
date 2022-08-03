import {Router} from "express"
import {peliculaPost,peliculaGet,peliculaGetId,peliculaDelate,peliculaGetNombre,peliculaActores,cargarArchivo,cargarArchivoCloud,mostrarImagenCloud} from "../controllers/pelicula.js"
import { validarCampos } from "../middlewares/middleware.js"
import { check } from "express-validator"
import {helpersPelicula,existeActor} from "../helpers/pelicula.js"
import validarArchivo from "../middlewares/validar-archivo.js"
import {validarJWT} from "../middlewares/validar.js"



const router=new Router()

router.post('/',[
    check('tituloOriginal','el campo titulo no puede estar vacio').not().isEmpty(),
    check('tituloOriginal','el campo titulo debe tener minimo 2 caracteres').isLength({max:50}),
    check('tituloEspañol','el campo titulo en español no puede estar vacio').not().isEmpty(),
    check('tituloEspañol','el campo titulo en español debe tener minimo 2 caracteres').isLength({max:50}),
    check('fechaLanzamiento', 'el campo fecha no puede estar vacio').not().isEmpty(),
    check('fechaLanzamiento','el campo debe ser formato fecha').isDate(),
    check('genero','el campo genero no puede estar vacio').not().isEmpty(),
    check('genero','el campo genero debe tener minimo 4 caracteres').isLength({min:5}),
    check('sinopsis','el campo sinopsis no puede estar vacio').not().isEmpty(),
    check('sinopsis','el campo sinopsis debe tener minimo 10 caracteres').isLength({min:10}),
    check('director','el campo director no puede estar vacio').not().isEmpty(),
    check('director','el campo director debe tener maximo 25 caracteres').isLength({max:25}),
    check('escritor','el campo escritor no puede estar vacio').not().isEmpty(),
    check('escritor','el campo escritor debe tener maximo 50 caracteres').isLength({max:50}),
    check('repartoPrincipal').custom(existeActor),
    check('estado','el campo estado no puede estar vacio').not().isEmpty(),
    check('estado','el campo estado debe tener minimo 4 caracteres').isLength({max:20}),
    check('idiomaOriginal','el campo idioma original no puede estar vacio').not().isEmpty(),
    check('idiomaOriginal','el campo idioma original debe tener minimo 4 caracteres').isLength({max:20}),
    
    validarCampos
],peliculaPost)

router.get('/get',peliculaGet)
router.get('/ID',[
    check('id').custom(helpersPelicula.peliculasId),
    validarCampos
],peliculaGetId)

router.get('/Delate',peliculaDelate)

router.get('/Nombre',[
    
],peliculaGetNombre)

router.get('/buscar',peliculaActores)

router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPelicula.peliculasId), 
    validarArchivo,
    validarCampos
],cargarArchivo)

router.post('/uploadCloud/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPelicula.peliculasId), 
    validarArchivo,
    validarCampos
],cargarArchivoCloud)

router.get('/uploadImagen/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPelicula.peliculasId), 
    validarCampos
],mostrarImagenCloud)

export default router
import Actor from"../models/actores.js"

const actorespost=async(req,res)=>{
    const {nombre,biografia,foto}=req.body
    const actores= new Actor({nombre,biografia,foto})
    actores.save()
    res.json({actores})


}

const actoresget=async(req,res)=>{
    const actores=await Actor.find();
    res.json({actores})
}

const actoresGetId=async(req,res)=>{
    const {id}=req.body
    const actores= await Actor.findById(id);
    res.json({actores})
}
export{actorespost,actoresget,actoresGetId}
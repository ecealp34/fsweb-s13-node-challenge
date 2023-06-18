// projects ara yazılımları buraya

const projectsModel = require("./projects-model");

async function validateProjectId(req,res,next) {
    try {
        let existProject = await projectsModel.get(req.params.id);
        if(!existProject) {
            res.status(404).json({message: "Project not found"})
        } else {
            req.existProject = existProject;
            next();
        }
    } catch (error) {
        next(error);
    }
}


function validateProjectPayload (req,res,next) {
    try {
        let {name, description} = req.body;
        if(!name || !description) {
            res.status(400).json({message: "Please check the needed fields"})
        } else {       
            next();     
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateProjectId, 
    validateProjectPayload
}
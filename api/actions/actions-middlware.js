// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require("./actions-model");
const projectsModel = require("../projects/projects-model");

async function validateActionId(req,res,next) {
    try {
        let existAction = await actionsModel.get(req.params.id);
        if(!existAction) {
            res.status(404).json({message: "Action not found"})
        } else {
            req.existAction = existAction;
            next();
        }
    } catch (error) {
        next(error);
    }
}


async function validateActionPayload(req,res,next) {
    try {
        let {project_id, description, notes} = req.body;
        if(!project_id || !description || !notes) {
            res.status(400).json({message: "Please check the needed fields"})
        } else {
            const existProject = await projectsModel.get(project_id);
            if(!existProject) {
                res.status(400).json({message:"Please check the needed fields"})
            } else {
                next();   
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validateActionId, 
    validateActionPayload
}
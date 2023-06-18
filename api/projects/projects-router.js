// "project" routerını buraya yazın!
const router = require("express").Router();
const projectsModel = require("./projects-model");
const mw = require("./projects-middleware");


router.get("/", async (req,res,next) => {
    try {
        const projects = await projectsModel.get();
        res.json(projects);
    } catch (error) {
        next(error);
    }
})
router.get("/:id", mw.validateProjectId,(req,res,next) => {
   try {
    res.json(req.existProject);
   } catch (error) {
    next(error);
   }
})

router.post("/",mw.validateProjectPayload, async (req,res,next) => {
    try {
        let project = { 
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        res.status(201).json(await projectsModel.insert(project));
    } catch (error) {
        next(error);
    }
})

router.put("/:id",mw.validateProjectId,mw.validateProjectPayload, async (req,res,next) => {
    try {
        let project = { 
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        }
        const updatedProject = await projectsModel.update(req.params.id, project);
        res.json(updatedProject);
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", mw.validateProjectId,async (req,res,next) => {
    try {
        await projectsModel.remove(req.params.id);
        res.json({message: `${req.params.id} numaralı id silindi`});
    } catch (error) {
        next(error);
    }
})


router.get("/:id/actions", mw.validateProjectId,async (req,res,next) => {
    try {
        res.json(await projectsModel.getProjectActions(req.params.id));
    } catch (error) {
        next(error);
    }
})

module.exports = router;
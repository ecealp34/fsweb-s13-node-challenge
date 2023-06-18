// "eylem" routerını buraya yazın
const router = require("express").Router();
const actionsModel = require("./actions-model");
const mw = require("./actions-middlware");


router.get("/", async (req,res,next) => {
    try {
        const actions = await actionsModel.get();
        res.json(actions);
    } catch (error) {
        next(error);
    }
})
router.get("/:id", mw.validateActionId,(req,res,next) => {
   try {
    res.json(req.existAction);
   } catch (error) {
    next(error);
   }
})

router.post("/",mw.validateActionPayload, async (req,res,next) => {
    try {
        let action = { 
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        res.status(201).json(await actionsModel.insert(action));
    } catch (error) {
        next(error);
    }
})

router.put("/:id",mw.validateActionId,mw.validateActionPayload, async (req,res,next) => {
    try {
        let action = { 
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        const updatedAction = await actionsModel.update(req.params.id,action);
        res.json(updatedAction);
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", mw.validateActionId,async (req,res,next) => {
    try {
        await actionsModel.remove(req.params.id);
        res.json({message: `${req.params.id} numaralı id silindi`});
    } catch (error) {
        next(error);
    }
})

module.exports = router;
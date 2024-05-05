// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model.js");
const {
    findId,
    validate,
    errorCatcher
} = require("./actions-middlware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try{
        let users = await Actions.get()
        res.status(200).send(users)
    } catch (err) {
        next(err)
    }
});

router.get("/:id", findId, (req, res, next) => {
    res.status(200).send(req.action)
});

router.post("/", validate, async (req, res, next) => {
    try {
        let newAction = await Actions.insert(req.body)
        res.status(201).send(newAction)
    } catch(err) {
        next(err)
    }
});

router.put("/:id", findId, validate, async (req, res, next) => {
    try {
        let updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).send(updatedAction)
    } catch(err) {
        next(err)
    }
});

router.delete("/:id", findId, async (req, res, next) => {
    try {
        let deletedAction = await Actions.remove(req.params.id)
        res.status(200).send(deletedAction)
    } catch(err) {
        next(err)
    }
});

router.use(errorCatcher);

module.exports = router;
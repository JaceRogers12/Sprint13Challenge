// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model.js");
const {
    findId,
    validate,
    errorCatcher
} = require("./projects-middleware.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.status(200).send(projects)
    } catch(err) {
        next(err)
    }
});

router.get("/:id", findId, async (req, res, next) => {
        res.status(200).send(req.project)
});

router.post("/", validate, async (req, res, next) => {
    try {
        let newProject = await Projects.insert(req.body)
        res.status(201).send(newProject)
    } catch(err) {
        next(err)
    }
});

router.put("/:id", findId, validate, async (req, res, next) => {
    if (req.body.completed == undefined) {
        next({status: 400, message: "Completed is required"})
    }
    try {
        let updatedProject = await Projects.update(req.params.id, req.body)
        res.status(200).send(updatedProject)
    } catch(err) {
        next(err)
    }
});

router.delete("/:id", findId, async (req, res, next) => {
    try {
        let deletedProject = await Projects.remove(req.params.id)
        res.status(200).send(deletedProject)
    } catch(err) {
        next(err)
    }
});

router.get("/:id/actions", findId, async (req, res, next) => {
    try {
        let projectActions = await Projects.getProjectActions(req.params.id)
        res.status(200).send(projectActions)
    } catch(err) {
        next(err)
    }
});

router.use(errorCatcher)

module.exports = router;
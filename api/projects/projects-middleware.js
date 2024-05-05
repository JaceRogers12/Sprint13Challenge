// add middlewares here related to projects
const Projects = require("./projects-model.js");

async function findId (req, res, next) {
    let selectedProject = await Projects.get(req.params.id);
    if (selectedProject) {
        req.project = selectedProject;
        next();
    } else {
        next({status: 404, message: "Project not found."})
    }
}

function validate (req, res, next) {
    if (!req.body.name) {
        next({status: 400, message: "Name is required"})
    } else if (!req.body.description) {
        next({status: 400, message: "Description is required"})
    } else {
        next()
    }
}

function errorCatcher(err, req, res, next) {
    if (!err.status || err.status == 500) {
        err.status == 500;
        err.message == "Sorry, there was some issue with the server."
    }
    res.status(err.status).json({message: err.message})
}

module.exports = {
    findId,
    validate,
    errorCatcher
}
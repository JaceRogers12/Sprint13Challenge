// add middlewares here related to actions
const Actions = require("./actions-model.js");

async function findId (req, res, next) {
    let selectedAction = await Actions.get(req.params.id);
    if (selectedAction) {
        req.action = selectedAction;
        next();
    } else {
        next({status: 404, message: "Action not found."})
    }
}

//   MAKE SURE TO REQUIRE A FUNCTION TO VALIDATE THAT THE PROJECT ID EXISTS!!!

function validate (req, res, next) {
    if (!req.body.project_id) {
        next({status: 400, message: "Project Id must be valid"})
    } else if (!req.body.description) {
        next({status: 400, message: "Description is required"})
    } else if (req.body.description.length > 128) {
        next({status: 400, message: "Description must be under 128 characters"})
    } else if (!req.body.notes) {
        next({status: 400, message: "Notes are required"})
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
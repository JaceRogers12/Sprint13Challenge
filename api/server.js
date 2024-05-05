const express = require('express');
const actionsRoutes = require("./actions/actions-router.js");
const projectsRoutes = require("./projects/projects-router.js");

const server = express();
server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.get("/", (req, res) => {
    console.log("This works!");
    res.status(200).send("Hello World!")
})
server.use("/api/actions", actionsRoutes);
server.use("/api/projects", projectsRoutes);

server.use("*", function(req, res) {
    res.status(404).send("There is no data at this path. Ty accessing /api/actions or /api/projects instead.")
});

module.exports = server;

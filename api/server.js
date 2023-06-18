const express = require('express');
const server = express();

server.use(express.json());
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)

module.exports = server;

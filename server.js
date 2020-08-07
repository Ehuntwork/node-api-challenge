const express = require("express");
const server = express();
//LOCAL IMPORTS
const projectRouter = require('./Projects/projects')
const actionsRouter = require('./Actions/actionRouter')

//req.body bug fix
const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.get("/", (req, res) => {
    res.status(200).json({ hello: "Web 32" });
});

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionsRouter)

module.exports = server;
 
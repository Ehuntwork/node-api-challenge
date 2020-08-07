const express = require('express')
const router = express.Router();
const projects = require('../data/helpers/projectModel')
const actions = require('../data/helpers/actionModel')
//(WORKING!!)
router.get('/', (req, res) => {
    projects.get()
    .then(projects=>{
      res.status(200).json(projects)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({
        message: "Error w/ GET Project"
      })
    })
});
//(WORKING!!)
router.get('/:id', validateId, (req, res) => {
    projects.get(req.params.id)
    .then(PROJECTS=>{
      res.status(200).json(PROJECTS)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({
        message: "Error w/ GET Project"
      })
    })
});

//(WORKING!!)
router.get('/:id/actions', validateId, (req, res) => {
  projects.getProjectActions(req.params.id)
  .then(PROJECTS=>{
    res.status(200).json(PROJECTS)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      message: "Error w/ GET Project"
    })
  })
});

//(WORKING!!)
router.post('/', (req, res) => {
    const body = req.body;
    projects.insert(body)
        .then(PROJECTS=>{
        res.status(200).json(PROJECTS)
        })
        .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: "Error w/ POST Project",
            error: err,
            request: req.body
        })
        })
});
//(WORKING!!)
router.post('/:id/actions', validateId,(req, res) => {
    const body = req.body;
    const userId = req.params.id;
    actions.insert({description: body.description, notes: body.notes, project_id: userId})
        .then(PROJECTS=>{
        res.status(200).json(PROJECTS)
        })
        .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: "Error w/ POST Project",
            error: err,
            request: req.body
        })
        })
});
//(WORKING!!)
router.put('/:id', validateId, (req, res) => {
    const body = req.body;
    const userId = req.params.id;
    projects.update(userId, body)
        .then(PROJECTS=>{
        res.status(200).json(PROJECTS)
        })
        .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: "Error w/ PUT Project",
            error: err,
            request: req.body
        })
        })
});

//(WORKING!!)
router.delete('/:id', validateId, (req, res) => {
    const userId = req.params.id;
    projects.remove(userId)
        .then(PROJECTS=>{
        res.status(200).json(PROJECTS)
        })
        .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: "Error w/ DELETE Project",
            error: err,
        })
        })
});

//CUSTOM MIDDLEWARE
function validateId(req, res, next) {
  projects.get(req.params.id)
  .then(ACTIONS=>{
    if(ACTIONS){
        next()
    }else{
        res.status(400).json({ message: "invalid id" });

    }
}).catch(err=>{res.status(500).json({error: error.message})})
}

module.exports = router
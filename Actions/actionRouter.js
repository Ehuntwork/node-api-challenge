const express = require('express')
const router = express.Router();
const actions = require('../data/helpers/actionModel')
//(WORKING!!)
router.get('/', (req, res) => {
    actions.get()
    .then(actions=>{
      res.status(200).json(actions)
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
    actions.get(req.params.id)
    .then(actions=>{
      res.status(200).json(actions)
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({
        message: "Error w/ GET Project"
      })
    })
});

//(WORKING!!)
router.put('/:id',  validateId,(req, res) => {
    const body = req.body;
    const userId = req.params.id;
    actions.update(userId, body)
        .then(actions=>{
        res.status(200).json(actions)
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
router.delete('/:id',  validateId,(req, res) => {
    const userId = req.params.id;
    actions.remove(userId)
        .then(actions=>{
        res.status(200).json(actions)
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
    actions.get(req.params.id)
    .then(ACTIONS=>{
      if(ACTIONS){
          next()
      }else{
          res.status(400).json({ message: "invalid id" });
  
      }
  }).catch(err=>{res.status(500).json({error: error.message})})
  }
module.exports = router
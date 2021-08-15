// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const router = express.Router()

router.get('/', (req,res)=>{
    Action.get()
          .then(action =>{
                res.status(200).json(action)
          })
          .catch(err =>{
              console.log(err)
              res.status(500).json({message:"the Action could not be recieved"})
          })
})

router.get('/:id', (req, res) =>{
    const {id} = req.params
    Action.get(id)
          .then(action => {
              res.status(200).json(action)
          })
          .catch(err => {
              console.log(err)
              res.status(404).json({message:'There is no action wit hthe current id'})
          })
})

router.post('/', (req,res) => {
    Action.insert(req.body)
          .then(action => {
              res.status(201).json(action)
          })
          .catch(err => {
              console.log(err)
              res.status(400).json({message:err.message})
          })
})


router.put('/:id', async (req, res)=> {
    const {id} = req.params
    const changes = req.body 
    Action.update (id, changes)
          .then(action => {
              res.status(200).json(action)
          })
          .catch(err => {
              res.status(400).json({message:err.message})
          })

})


router.delete('/:id',  (req, res) => {

    Action.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: "Delete complete" })
    })
    .catch(err => {
        res.status(404).json({ message: err.message })
    })
})
module.exports = router
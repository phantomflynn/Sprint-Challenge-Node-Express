const express = require('express');
const dbActions = require('../data/helpers/actionModel');
const dbProjects = require('../data/helpers/projectModel');
const router = express.Router();

// get all actions
router.get('/', (req, res) => {
  dbActions.get()
    .then(actions => res.json(actions)) // returns array of objects - each with props id, project_id, description, notes, completed
    .catch(err => res.status(500).json({ error: "Could not retrieve the actions." }))
})

// get actions by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbActions.get(id)
    .then(action => res.json(action)) // returns pbject with props id, project_id, description, notes, completed
    .catch(err => res.status(500).json({ error: "The id you provided does not match any actions." }))
})

// add an action
router.post('/', (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  dbProjects.get(project_id)
    .then(response => 
      dbActions.insert(req.body)
        .then(action => res.json(action)))
        .catch(err => res.status(500).json({ error: `Project ID ${project_id} does not exist.` }))
        // .catch(err => res.status(500).json({ error: "Cannot post this action." }))
})

// update an action 
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  dbActions.update(id, updates) 
    .then(updatedAction => res.json(updatedAction)) // returns the updated action object
    .catch(err => res.status(500).json({ error: "Cannot update this action." }))
})

// delete an action
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  dbActions.remove(id)
    .then(response => res.json(response)) // returns 1 for success, 0 for failure
    .catch(err => res.status(500).json({ error: "Cannot delete this action with the provided ID." }))
})

module.exports = router;
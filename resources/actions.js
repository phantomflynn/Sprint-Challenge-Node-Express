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

module.exports = router;
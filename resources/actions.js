const express = require('express');
const dbActions = require('../data/helpers/actionModel');
const router = express.Router();

// get all actions
router.get('/', (req, res) => {
  dbActions.get()
    .then(actions => res.json(actions)) // returns array of objects - each with props id, project_id, description, notes, completed
    .catch(err => res.status(500).json({ error: "Could not retrieve the actions." }))
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbActions.get(id)
    .then(action => res.json(action)) // returns pbject with props id, project_id, description, notes, completed
    .catch(err => res.status(500).json({ error: "Could not retrieve that aaction." }))
})

module.exports = router;
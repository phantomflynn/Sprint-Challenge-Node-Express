const express = require('express');
const dbProjects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
  dbProjects.get()
    .then(projects => res.json(projects)) // returns array of objects with props id, name, description, completed
    .catch(err => res.status(500).json({ error: "Could not retrieve any projects." }))
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbProjects.get(id)
    .then(project => res.json(project))
    .catch(err => res.status(500).json({ error: "This project does not exist." }))
})

module.exports = router;
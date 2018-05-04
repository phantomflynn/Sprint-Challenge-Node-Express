const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const actionRoutes = require('./resources/actions');
const projectRoutes = require('./resources/projects');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/actions', actionRoutes);
server.use('/projects', projectRoutes);

server.listen(5000);
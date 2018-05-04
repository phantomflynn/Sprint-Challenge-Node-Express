const express = require('express');
const helmet = require('helmet');
const actionRoutes = require('./resources/actions');
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => res.send('server is working'));

server.use('/actions', actionRoutes);

server.listen(5000);
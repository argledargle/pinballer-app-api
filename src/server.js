require('dotenv').config()

const knex = require('knex');
const express = require('express');
const app = express('./app');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

const db = knex({
  client: 'pg',
  connection: CLIENT_ORIGIN,
})

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.set('db', db)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};
require('dotenv').config()

const knex = require('knex');
const express = require('express');
const app = express('./app');
const cors = require('cors');
const { PORT, DB_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.use(
    cors({
        origin: DB_URL
    })
);

const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.set('db', db)

app.listen(PORT, () => console.log(`Listening on ${DB_URL} port ${PORT}`));

module.exports = {app};
require('dotenv').config()

const knex = require('knex');
const app = require('./app');
const {CLIENT_ORIGIN, PORT} = require('./config');

const db = knex({
  client: 'pg',
  connection: CLIENT_ORIGIN,
})

app.set('db', db)

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
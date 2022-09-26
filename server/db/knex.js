import Knex from 'knex'

const knex = Knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'test',
    password : 'test',
    database : 'test'
  }
})

export default knex
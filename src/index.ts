import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import 'express-async-errors'
import {
  create,
  deleteById,
  getAll,
  getOneById,
  updateById,
} from './controllers/planets'

import pgPromise from 'pg-promise'
const db = pgPromise({})('postgres://postgres:postgres@localhost:5432/postgres')

const setupDb = async () => {
  await db.none(`DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );
  `)

  await db.none(`INSERT INTO planets (name) VALUES ('Earth');`)
  await db.none(`INSERT INTO planets (name) VALUES ('Mars');`)
}

setupDb()

export default db

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.get('/api/planets', getAll)

app.get('/api/planets/:id', getOneById)

app.post('/api/planets', create)

app.put('/api/planets/:id', updateById)

app.delete('/api/planets/:id', deleteById)

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})

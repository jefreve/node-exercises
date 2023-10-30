import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import 'express-async-errors'
import {
  create,
  deleteById,
  getAll,
  getOneById,
  updateById,
} from './controllers/planets'
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

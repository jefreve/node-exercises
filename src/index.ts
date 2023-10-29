import express from 'express'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import 'express-async-errors'
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))

app.use(express.json())

type Planet = {
  id: number
  name: string
}

type Planets = Planet[]

let planets: Planets = [
  {
    id: 1,
    name: 'Venus',
  },
  {
    id: 2,
    name: 'Mercury',
  },
  {
    id: 3,
    name: 'Saturn',
  },
]

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})

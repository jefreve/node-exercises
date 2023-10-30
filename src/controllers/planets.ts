import { Request, Response } from 'express'
import Joi from 'joi'

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
const getAll = (req: Request, res: Response) => {
  try {
    res.status(200).json(planets)
  } catch (error: any) {
    console.error(error.message)
  }
}

const getOneById = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const planet = planets.find((planet) => planet.id === Number(id))
    res.status(200).json(planet)
  } catch (error: any) {
    console.error(error.message)
  }
}

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
})

const create = (req: Request, res: Response) => {
  try {
    const { id, name } = req.body
    const newPlanet = { id, name }
    const validatedNewPlanet = planetSchema.validate(newPlanet)
    if (validatedNewPlanet.error) {
      res.status(400).json({ msg: 'Planet format is not valid' })
    } else {
      planets = [...planets, newPlanet]
      res.status(201).json({ msg: 'Planet was created' })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}
const updateById = (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const { id } = req.params
    const validatedName = Joi.string().validate(name)
    console.log(validatedName)
    if (validatedName.error) {
      res.status(400).json({ msg: 'Planet name must be a string' })
    } else {
      planets = planets.map((planet) =>
        planet.id === Number(id) ? { ...planet, name } : planet
      )
      res.status(200).json({ msg: 'Planet updated' })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const deleteById = (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const found = planets.find((planet) => planet.id === Number(id))
    if (found) {
      planets = planets.filter((planet) => planet.id !== Number(id))
      res.status(200).json({ msg: 'planet deleted' })
    } else {
      res.status(400).json({ msg: "id doesn't exist" })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

export { getAll, getOneById, create, updateById, deleteById }

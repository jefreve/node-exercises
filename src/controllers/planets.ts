import { Request, Response } from 'express'
import Joi from 'joi'
import db from '../index'

const getAll = async (req: Request, res: Response) => {
  try {
    const planets = await db.manyOrNone(`SELECT * FROM planets;`)
    if (planets.length) res.status(200).json(planets)
    else {
      res.status(200).json({ msg: 'There are no planets' })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const getOneById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id = $1`, id)
    res.status(200).json(planet)
  } catch (error: any) {
    console.error(error.message)
  }
}

const planetSchema = Joi.object({
  name: Joi.string().required(),
})

const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const newPlanet = { name }
    const validatedNewPlanet = planetSchema.validate(newPlanet)
    if (validatedNewPlanet.error) {
      res.status(400).json({ msg: 'Planet format is not valid' })
    } else {
      await db.none(`INSERT INTO planets (name) VALUES ($1);`, name)
      res.status(201).json({ msg: 'Planet was created' })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}
const updateById = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const { id } = req.params
    const newPlanet = { name }
    const validatedName = planetSchema.validate(newPlanet)
    if (validatedName.error) {
      res.status(400).json({ msg: 'Planet name must be a string' })
    } else {
      await db.none(`UPDATE planets SET name = $1 WHERE id = $2;`, [name, id])
      res.status(200).json({ msg: 'Planet updated' })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedPlanet = await db.oneOrNone(
      `DELETE FROM planets WHERE id = $1 RETURNING *`,
      id
    )
    if (deletedPlanet) {
      res.status(200).json({ msg: 'planet deleted' })
    } else {
      res.status(400).json({ msg: "id doesn't exist" })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

const createImage = async (req: Request, res: Response) => {
  try {
    const fileName = req.file?.path
    const { id } = req.params

    if (fileName) {
      await db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName])
      res.status(201).json({ msg: 'Image added' })
    } else {
      res.status(400).json({ msg: 'Upload failed' })
    }
  } catch (error: any) {
    console.error(error.message)
  }
}

export { getAll, getOneById, create, updateById, deleteById, createImage }

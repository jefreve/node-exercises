"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
const joi_1 = __importDefault(require("joi"));
let planets = [
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
];
const getAll = (req, res) => {
    try {
        res.status(200).json(planets);
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.getAll = getAll;
const getOneById = (req, res) => {
    try {
        const { id } = req.params;
        const planet = planets.find((planet) => planet.id === Number(id));
        res.status(200).json(planet);
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.getOneById = getOneById;
const planetSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required(),
});
const create = (req, res) => {
    try {
        const { id, name } = req.body;
        const newPlanet = { id, name };
        const validatedNewPlanet = planetSchema.validate(newPlanet);
        if (validatedNewPlanet.error) {
            res.status(400).json({ msg: 'Planet format is not valid' });
        }
        else {
            const idAlreadyExist = planets.find((p) => p.id === Number(id));
            if (idAlreadyExist) {
                res.status(400).json({ msg: 'Id already exist' });
            }
            else {
                planets = [...planets, newPlanet];
                res.status(201).json({ msg: 'Planet was created' });
            }
        }
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.create = create;
const updateById = (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const validatedName = joi_1.default.string().validate(name);
        console.log(validatedName);
        if (validatedName.error) {
            res.status(400).json({ msg: 'Planet name must be a string' });
        }
        else {
            planets = planets.map((planet) => planet.id === Number(id) ? Object.assign(Object.assign({}, planet), { name }) : planet);
            res.status(200).json({ msg: 'Planet updated' });
        }
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.updateById = updateById;
const deleteById = (req, res) => {
    try {
        const { id } = req.params;
        const found = planets.find((planet) => planet.id === Number(id));
        if (found) {
            planets = planets.filter((planet) => planet.id !== Number(id));
            res.status(200).json({ msg: 'planet deleted' });
        }
        else {
            res.status(400).json({ msg: "id doesn't exist" });
        }
    }
    catch (error) {
        console.error(error.message);
    }
};
exports.deleteById = deleteById;

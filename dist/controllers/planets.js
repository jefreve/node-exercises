"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
const joi_1 = __importDefault(require("joi"));
const index_1 = __importDefault(require("../index"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planets = yield index_1.default.manyOrNone(`SELECT * FROM planets;`);
        if (planets.length)
            res.status(200).json(planets);
        else {
            res.status(200).json({ msg: 'There are no planets' });
        }
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.getAll = getAll;
const getOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const planet = yield index_1.default.oneOrNone(`SELECT * FROM planets WHERE id = $1`, id);
        res.status(200).json(planet);
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.getOneById = getOneById;
const planetSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newPlanet = { name };
        const validatedNewPlanet = planetSchema.validate(newPlanet);
        if (validatedNewPlanet.error) {
            res.status(400).json({ msg: 'Planet format is not valid' });
        }
        else {
            yield index_1.default.none(`INSERT INTO planets (name) VALUES ($1);`, name);
            res.status(201).json({ msg: 'Planet was created' });
        }
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.create = create;
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const newPlanet = { name };
        const validatedName = planetSchema.validate(newPlanet);
        if (validatedName.error) {
            res.status(400).json({ msg: 'Planet name must be a string' });
        }
        else {
            yield index_1.default.none(`UPDATE planets SET name = $1 WHERE id = $2;`, [name, id]);
            res.status(200).json({ msg: 'Planet updated' });
        }
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.updateById = updateById;
const deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPlanet = yield index_1.default.oneOrNone(`DELETE FROM planets WHERE id = $1 RETURNING *`, id);
        if (deletedPlanet) {
            res.status(200).json({ msg: 'planet deleted' });
        }
        else {
            res.status(400).json({ msg: "id doesn't exist" });
        }
    }
    catch (error) {
        console.error(error.message);
    }
});
exports.deleteById = deleteById;

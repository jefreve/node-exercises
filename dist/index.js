"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const joi_1 = __importDefault(require("joi"));
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
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
app.get('/api/planets', (req, res) => {
    try {
        res.status(200).json(planets);
    }
    catch (error) {
        console.error(error.message);
    }
});
app.get('/api/planets/:id', (req, res) => {
    try {
        const { id } = req.params;
        const planet = planets.find((planet) => planet.id === Number(id));
        res.status(200).json(planet);
    }
    catch (error) {
        console.error(error.message);
    }
});
const planetSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required(),
});
app.post('/api/planets', (req, res) => {
    try {
        const { id, name } = req.body;
        const newPlanet = { id, name };
        const validatedNewPlanet = planetSchema.validate(newPlanet);
        if (validatedNewPlanet.error) {
            res.status(400).json({ msg: 'Planet format is not valid' });
        }
        else {
            planets = [...planets, newPlanet];
            res.status(201).json({ msg: 'Planet was created' });
        }
    }
    catch (error) {
        console.error(error.message);
    }
});
app.put('/api/planets/:id', (req, res) => {
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
});
app.delete('/api/planets/:id', (req, res) => {
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
});
app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});

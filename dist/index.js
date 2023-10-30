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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const planets_1 = require("./controllers/planets");
const pg_promise_1 = __importDefault(require("pg-promise"));
const db = (0, pg_promise_1.default)({})('postgres://postgres:postgres@localhost:5432/postgres');
const setupDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db.none(`DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );
  `);
    yield db.none(`INSERT INTO planets (name) VALUES ('Earth');`);
    yield db.none(`INSERT INTO planets (name) VALUES ('Mars');`);
});
setupDb();
exports.default = db;
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.get('/api/planets', planets_1.getAll);
app.get('/api/planets/:id', planets_1.getOneById);
app.post('/api/planets', planets_1.create);
app.put('/api/planets/:id', planets_1.updateById);
app.delete('/api/planets/:id', planets_1.deleteById);
app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});

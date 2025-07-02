"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const express_1 = __importDefault(require("express"));
//Express Definition
const app = (0, express_1.default)();
app.use(express_1.default.json()); //Transforma el request body a json
const PORT = 3000;
app.get('/ping', (_, res) => {
    console.log("Someone pinged here!!!");
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
});

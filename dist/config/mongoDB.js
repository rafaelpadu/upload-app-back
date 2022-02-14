"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGODB_URL;
const dbInit = () => mongoose_1.default.connect(uri, { dbName: "uploads" }, (err) => {
    if (err)
        console.log(err.message);
    console.log("MongoDB conectado com sucesso ");
});
exports.default = dbInit;
//# sourceMappingURL=mongoDB.js.map
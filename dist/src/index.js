"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const morgan_1 = __importDefault(require("morgan"));
const mongoDB_1 = __importDefault(require("./config/mongoDB"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/", routes_1.default);
app.use(function (req, res) {
    // Invalid request
    res.status(404).json({
        error: {
            name: "Error",
            status: 404,
            message: "Invalid Request",
            statusCode: 404,
            stack: "http://localhost:3001/",
        },
        message: "Porta invalida!",
    });
});
try {
    (0, mongoDB_1.default)();
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}
catch (error) {
    console.log(`Error occured: ${error}`);
}

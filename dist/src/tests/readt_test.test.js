"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Upload_1 = __importDefault(require("../models/Upload"));
const assert_1 = __importDefault(require("assert"));
const mongoose_1 = __importDefault(require("mongoose"));
const uri = "mongodb://admin:123456@localhost:27017/admin";
let upload;
mongoose_1.default.connect(uri, { dbName: "uploads" });
mongoose_1.default.connection
    .once("open", () => console.log("Mongodb Test Conectado"))
    .on("error", (error) => console.warn("Error : ", error));
beforeEach(async () => {
    await mongoose_1.default.connection.dropCollection("uploads");
    upload = new Upload_1.default({
        name: "2022-01-30_16-49.png",
        size: 1222,
        key: "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
        url: "https://upload-project-01.s3.amazonaws.com/b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
    });
    await upload.save();
});
describe("Reading upload details", () => {
    it("find uploads by the key", async () => {
        const uploadFound = await Upload_1.default.findOne({
            key: "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
        });
        (0, assert_1.default)(uploadFound.key ===
            "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png");
    });
});

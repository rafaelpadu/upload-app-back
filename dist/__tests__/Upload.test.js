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
// import "superset";
const mongodb_1 = require("mongodb");
const Upload_1 = __importDefault(require("../models/Upload"));
const uri = process.env.MONGODB_URL;
describe("Upload", () => {
    let connection;
    let db;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield mongodb_1.MongoClient.connect(uri);
        db = connection.db("uploadTest");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.close();
        yield db.dropDatabase();
    }));
    it("post new upload", () => __awaiter(void 0, void 0, void 0, function* () {
        const uploads = db.collection("uploads");
        const mockUpload = new Upload_1.default({
            name: "2022-01-30_16-48.png",
            size: 917,
            key: "0a07e5c4b5084cc6659333ff9ad5b16a-2022-01-30_16-48.png",
            url: "https://upload-project-01.s3.amazonaws.com/0a07e5c4b5084cc6659333ff9ad5b16a-2022-01-30_16-48.png",
        });
        yield uploads.insertOne(mockUpload);
        const newInsert = uploads.findOne({
            key: "0a07e5c4b5084cc6659333ff9ad5b16a-2022-01-30_16-48.png",
        });
        expect(newInsert).toEqual(mockUpload.key);
    }));
});
//# sourceMappingURL=Upload.test.js.map
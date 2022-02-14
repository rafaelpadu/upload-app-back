"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Upload_1 = __importDefault(require("../models/Upload"));
describe("Creating Documents", () => {
    it("creates a upload", (done) => {
        const newUpload = new Upload_1.default({
            name: "2022-01-30_16-49.png",
            size: 1245,
            key: "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
            url: "https://upload-project-01.s3.amazonaws.com/b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
        });
        newUpload.save().then(() => {
            (0, assert_1.default)(!newUpload.isNew);
            done();
        });
    });
});

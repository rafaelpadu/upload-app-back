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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Upload_1 = __importDefault(require("../models/Upload"));
class PostController {
}
_a = PostController;
PostController.s3 = new aws_sdk_1.default.S3();
PostController.post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Bateu no Controlador");
    const { originalname, filename, size, location: url = "", } = req.file;
    const post = yield Upload_1.default.create({
        name: originalname,
        size,
        key: filename,
        url,
    });
    return res.status(200).json(post);
});
PostController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allUploads = yield Upload_1.default.find();
    return res.status(200).json(allUploads);
});
PostController.deleteUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upload = yield Upload_1.default.findById(req.params.id);
    if (upload) {
        _a.s3
            .deleteObject({ Bucket: "upload-project-01", Key: upload.key })
            .promise();
        Upload_1.default.deleteOne({ where: { _id: upload.id } })
            .then(() => res.status(200).json({ message: "Upload deletado com sucesso!" }))
            .catch((err) => res.status(404).json({ message: err.message }));
    }
    else {
        res.status(422).json({ message: "Error" });
    }
    return res;
});
PostController.deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allUploads = yield Upload_1.default.find();
    Promise.all(allUploads.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
        _a.s3
            .deleteObject({
            Bucket: "upload-project-01",
            Key: item.key,
        })
            .promise();
        yield Upload_1.default.deleteOne({ where: { _id: item.id } });
    })))
        .then(() => {
        res.status(200).json({ messsage: "Dados Deletados com sucesso!" });
    })
        .catch(() => {
        res.status(500).json({ messsage: "Erro ao deletar dados" });
    });
    return res;
});
exports.default = PostController;
//# sourceMappingURL=PostController.js.map
"use strict";
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
PostController.post = async (req, res) => {
    console.log("Bateu no Controlador");
    const { originalname, filename, size, location: url = "", } = req.file;
    const post = await Upload_1.default.create({
        name: originalname,
        size,
        key: filename,
        url,
    });
    return res.status(200).json(post);
};
PostController.getAll = async (req, res) => {
    let allUploads = await Upload_1.default.find();
    return res.status(200).json(allUploads);
};
PostController.deleteUpload = async (req, res) => {
    const upload = await Upload_1.default.findById(req.params.id);
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
};
PostController.deleteAll = async (req, res) => {
    let allUploads = await Upload_1.default.find();
    Promise.all(allUploads.map(async (item, index) => {
        _a.s3
            .deleteObject({
            Bucket: "upload-project-01",
            Key: item.key,
        })
            .promise();
        await Upload_1.default.deleteOne({ where: { _id: item.id } });
    }))
        .then(() => {
        res.status(200).json({ messsage: "Dados Deletados com sucesso!" });
    })
        .catch(() => {
        res.status(500).json({ messsage: "Erro ao deletar dados" });
    });
    return res;
};
exports.default = PostController;

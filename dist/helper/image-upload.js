"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storageTypes = {
    local: imageStorageLocal(),
    s3: imageStorageS3(),
};
function imageStorageS3() {
    return (0, multer_s3_1.default)({
        s3: new aws_sdk_1.default.S3(),
        bucket: "upload-project-01",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err, err.message);
                file.filename = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, file.filename);
            });
        },
    });
}
function imageStorageLocal() {
    return multer_1.default.diskStorage({
        destination: (req, res, cb) => {
            cb(null, path_1.default.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err, err.message);
                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    });
}
const imageUpload = (0, multer_1.default)({
    dest: path_1.default.resolve(__dirname, "..", "..", "tmp", "uploads"),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    storage: storageTypes["s3"],
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)) {
            return callback(new multer_1.default.MulterError("LIMIT_UNEXPECTED_FILE"));
        }
        else {
            callback(null, true);
        }
    },
}).single("file");
exports.default = imageUpload;
//# sourceMappingURL=image-upload.js.map
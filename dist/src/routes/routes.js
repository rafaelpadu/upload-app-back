"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_upload_1 = __importDefault(require("../helper/image-upload"));
const PostController_1 = __importDefault(require("../controller/PostController"));
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
router.post("/post", (req, res, next) => {
    return (0, image_upload_1.default)(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            if (err.code == "LIMIT_UNEXPECTED_FILE") {
                res.status(500).json({
                    message: "Só são aceitos imagens nos formatos: jpg, jpeg, png e gif!",
                });
            }
            else if (err.code == "LIMIT_FILE_SIZE") {
                res.status(500).json({
                    message: "Arquivo grande demais, o tamanho máximo é de 2mb",
                });
            }
        }
        else {
            next();
        }
    });
}, PostController_1.default.post);
router.get("/find", PostController_1.default.getAll);
router.delete("/delete/all", PostController_1.default.deleteAll);
router.delete("/delete/:id", PostController_1.default.deleteUpload);
exports.default = router;

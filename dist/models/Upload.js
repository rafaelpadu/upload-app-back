"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uploadScheme = new mongoose_1.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});
const Upload = (0, mongoose_1.model)("Upload", uploadScheme);
exports.default = Upload;
//# sourceMappingURL=Upload.js.map
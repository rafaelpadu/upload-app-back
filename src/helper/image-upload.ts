import multer from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const storageTypes = {
  local: imageStorageLocal(),
  s3: imageStorageS3(),
};

function imageStorageS3() {
  return multerS3({
    s3: new aws.S3(),
    bucket: "upload-project-01",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, err.message);

        file.filename = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.filename);
      });
    },
  });
}

function imageStorageLocal() {
  return multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, err.message);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  });
}

const imageUpload = multer({
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  storage: storageTypes["s3"],
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)) {
      return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    } else {
      callback(null, true);
    }
  },
}).single("file");

export default imageUpload;

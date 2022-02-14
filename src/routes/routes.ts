import { Router } from "express";
import imageUpload from "../helper/image-upload";
import postController from "../controller/PostController";
import { Response, Request, NextFunction } from "express";
import multer from "multer";
const router = Router();

router.post(
  "/post",
  (req, res: Response, next: NextFunction) => {
    return imageUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code == "LIMIT_UNEXPECTED_FILE") {
          res.status(500).json({
            message:
              "Só são aceitos imagens nos formatos: jpg, jpeg, png e gif!",
          });
        } else if (err.code == "LIMIT_FILE_SIZE") {
          res.status(500).json({
            message: "Arquivo grande demais, o tamanho máximo é de 2mb",
          });
        }
      } else {
        next();
      }
    });
  },
  postController.post
);

router.get("/find", postController.getAll);

router.delete("/delete/all", postController.deleteAll);
router.delete("/delete/:id", postController.deleteUpload);
export default router;

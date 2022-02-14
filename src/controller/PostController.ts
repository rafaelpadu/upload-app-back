import { Request, Response } from "express";
import aws from "aws-sdk";
import Upload, { IUpload } from "../models/Upload";
interface MulterRequest2 extends Request {
  file: any;
}
class PostController {
  static s3 = new aws.S3();

  static post = async (req: Request, res: Response): Promise<Response> => {
    console.log("Bateu no Controlador");

    const {
      originalname,
      filename,
      size,
      location: url = "",
    } = (req as MulterRequest2).file;

    const post = await Upload.create({
      name: originalname,
      size,
      key: filename,
      url,
    });

    return res.status(200).json(post);
  };

  static getAll = async (req: Request, res: Response): Promise<Response> => {
    let allUploads: Array<IUpload> = await Upload.find();
    return res.status(200).json(allUploads);
  };

  static deleteUpload = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const upload = await Upload.findById(req.params.id);
    if (upload) {
      this.s3
        .deleteObject({ Bucket: "upload-project-01", Key: upload.key })
        .promise();
      Upload.deleteOne({ where: { _id: upload.id } })
        .then(() =>
          res.status(200).json({ message: "Upload deletado com sucesso!" })
        )
        .catch((err) => res.status(404).json({ message: err.message }));
    } else {
      res.status(422).json({ message: "Error" });
    }
    return res;
  };

  static deleteAll = async (req: Request, res: Response): Promise<Response> => {
    let allUploads: Array<IUpload> = await Upload.find();
    Promise.all(
      allUploads.map(async (item: IUpload, index: number) => {
        this.s3
          .deleteObject({
            Bucket: "upload-project-01",
            Key: item.key,
          })
          .promise();
        await Upload.deleteOne({ where: { _id: item.id } });
      })
    )
      .then(() => {
        res.status(200).json({ messsage: "Dados Deletados com sucesso!" });
      })
      .catch(() => {
        res.status(500).json({ messsage: "Erro ao deletar dados" });
      });
    return res;
  };
}

export default PostController;

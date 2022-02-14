import { Document, model, Model, Schema } from "mongoose";

export interface IUpload extends Document {
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: Date;
}

const uploadScheme: Schema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  key: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Upload: Model<IUpload> = model("Upload", uploadScheme);

export default Upload;

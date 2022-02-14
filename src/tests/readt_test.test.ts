import Upload from "../models/Upload";
import assert from "assert";
import mongoose from "mongoose";

const uri = "mongodb://admin:123456@localhost:27017/admin";

let upload;
mongoose.connect(uri, { dbName: "uploads" });
mongoose.connection
  .once("open", () => console.log("Mongodb Test Conectado"))
  .on("error", (error) => console.warn("Error : ", error));

beforeEach(async () => {
  await mongoose.connection.dropCollection("uploads");
  upload = new Upload({
    name: "2022-01-30_16-49.png",
    size: 1222,
    key: "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
    url: "https://upload-project-01.s3.amazonaws.com/b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
  });
  await upload.save();
});

describe("Reading upload details", () => {
  it("find uploads by the key", async () => {
    const uploadFound = await Upload.findOne({
      key: "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
    });
    assert(
      uploadFound.key ===
        "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png"
    );
  });
});

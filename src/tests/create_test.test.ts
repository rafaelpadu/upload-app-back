import assert from "assert";
import Upload from "../models/Upload";
import mongoose from "mongoose";
describe("Creating Documents", () => {
  it("creates a upload", (done) => {
    const newUpload = new Upload({
      name: "2022-01-30_16-49.png",
      size: 1245,
      key: "b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
      url: "https://upload-project-01.s3.amazonaws.com/b81e3451f9d9a7b28e6f0c913eea1ce3-2022-01-30_16-49.png",
    });
    newUpload.save().then(() => {
      assert(!newUpload.isNew);
      done();
    });
  });
});

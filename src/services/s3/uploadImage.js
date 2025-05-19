const s3 = require("../../config/aws");

function uploadToS3(buffer, key, contentType) {
  return s3
    .putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
    .promise()
    .then(() => {
      return key;
    });
}

module.exports = { uploadToS3 };

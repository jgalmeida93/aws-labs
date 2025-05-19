require("dotenv").config();
const s3 = require("../../config/aws");

function getPresignedUrl(key, expiresIn = 3600) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: expiresIn,
  };

  return s3.getSignedUrl("getObject", params);
}

module.exports = { getPresignedUrl };

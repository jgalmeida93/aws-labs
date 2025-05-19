const sharp = require("sharp");
const { uploadToS3 } = require("./uploadImage");
const { downloadImage } = require("../../utils/downloadImage");

async function convertAndUploadImage(imageUrl) {
  const webpBuffer = await downloadImage(imageUrl);

  const pngBuffer = await sharp(webpBuffer).png().toBuffer();

  const key = `converted/${Date.now()}.png`;

  const objectKey = await uploadToS3(pngBuffer, key, "image/png");
  return objectKey;
}

module.exports = { convertAndUploadImage };

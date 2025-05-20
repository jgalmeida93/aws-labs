const AWS = require("aws-sdk");
const sharp = require("sharp");
const { downloadImage } = require("./utils/downloadImage");

const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    const imageUrl = event.imageUrl;

    if (!imageUrl) {
      return { statusCode: 400, body: "Missing imageUrl" };
    }

    const imageBuffer = await downloadImage(imageUrl);

    const pngBuffer = await sharp(imageBuffer).png().toBuffer();

    const key = `converted/LAMBDA-${Date.now()}.png`;

    await s3
      .putObject({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: pngBuffer,
        ContentType: "image/png",
      })
      .promise();

    const uploadedUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadedUrl }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro interno", error: error.message }),
    };
  }
};

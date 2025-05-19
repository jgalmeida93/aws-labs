require("dotenv").config();
const { convertAndUploadImage } = require("./convertAndUpload");
const { getPresignedUrl } = require("./getPresignedUrl");

async function test() {
  try {
    const imageUrl = "https://www.gstatic.com/webp/gallery/2.webp";

    const objectKey = await convertAndUploadImage(imageUrl);
    console.log("Uploaded object key:", objectKey);

    const presignedUrl = getPresignedUrl(objectKey);
    console.log("Pre-signed URL (expires in 1 hour):", presignedUrl);

    const shortUrl = getPresignedUrl(objectKey, 300);
    console.log("Short-lived URL (expires in 5 minutes):", shortUrl);
  } catch (error) {
    console.error("Error in upload process:", error);
  }
}

test();

const dotenv = require("dotenv");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

const generateImagePart = (path, mimeType) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
};

const runPrompt = async () => {
  const imageObj = generateImagePart("./extra/car-image.jpg", "image/jpeg");
  const res = await model.generateContent([
    "Which car is this in this image?",
    imageObj,
  ]);
  console.log(res.response.text());
};

runPrompt();

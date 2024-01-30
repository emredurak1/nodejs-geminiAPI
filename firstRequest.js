const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const runPrompt = async (content) => {
  const res = await model.generateContent(content);
  console.log(res.response.text());
};

runPrompt("Write me a JS function to generate prime numbers");

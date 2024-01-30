const dotenv = require("dotenv");
const history = require("./extra/history.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chat = model.startChat({
  history,
});

async function sendMessage(message) {
  const res = await chat.sendMessage(message);
  console.log(res.response.text());
  return res.response.text();
}

sendMessage("Whatt?");

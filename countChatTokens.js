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
  const tokenHistory = await chat.getHistory();
  const msgObj = { role: "user", parts: [{ text: message }] };
  const contents = [...tokenHistory, msgObj];
  const { totalTokens } = await model.countTokens({ contents });

  // If too many tokens, send a request to summarize entire chat history

  const res = await chat.sendMessage(message);
  console.log(totalTokens, "tokens in the prompt");
}

sendMessage("Whatt?");

const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const conversation = model.startChat();

// const message1 = conversation.sendMessage("How is your day going?").then(e => console.log(e.response.text()));

// const history = conversation.getHistory().then((e) => console.log(e));

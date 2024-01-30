const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const chat = model.startChat();

async function sendMessage(msg) {
  const result = await chat.sendMessageStream(msg);
  let text = "";
  for await (const chunck of result.stream) {
    const chunckText = chunck.text();
    console.log(chunckText);
    text += chunckText;
  }
}

// sendMessage("write me an essay about the american revolution");

async function run(msg) {
  const result = await model.generateContentStream(msg);
  for await (const chunck of result.stream) {
    const chunckText = chunck.text();
    console.log(chunckText);
  }
}

run("write me a loooong poem about cats");

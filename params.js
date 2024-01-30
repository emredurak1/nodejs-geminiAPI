const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const createModel = (
  model,
  temp = model === "gemini-pro" ? 0.9 : 0.4,
  topK = 1,
  topP = 1,
  stop = [],
  maxToken = 2048
) => {
  const generationConfig = {
    temperature: temp,
    topK,
    topP,
    stopSequences: stop,
    maxOutputTokens: maxToken,
  };
  return genAI.getGenerativeModel({
    model: model,
    generationConfig,
  });
};

const model = createModel("gemini-pro");

const runPrompt = async (content) => {
  const res = await model.generateContent(content);
  console.log(res.response.text());
};

runPrompt("In one sentence, what is the meaning of life?");
runPrompt("In one sentence, what is the meaning of life?");
runPrompt("In one sentence, what is the meaning of life?");

module.exports = createModel;

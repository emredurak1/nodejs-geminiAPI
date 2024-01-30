const dotenv = require("dotenv");
const fs = require("fs");
const createModel = require("./params");
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config({ path: "./config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = createModel("gemini-pro-vision");

const generateImagePart = (path, mimeType) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
};

const parts = [
  {
    text: "According to a given book image, give me the book's name, and similiar book recommendations in the same genre. Only recommend books that written by OTHER authors, not the author of the book in the image.",
  },
  { text: "Book Image: " },
  generateImagePart("./extra/image-1.jpeg", "image/jpeg"),
  { text: "Book Name: One Hundred Years Of Solitude \n" },
  { text: "Book Author: Gabriel Garcia Marquez \n" },
  {
    text: "Similiar Books: The House of the Spirits, Midnight's Children, Like Water for Chocolate",
  },
  { text: "Book Image: " },
  generateImagePart("./extra/image-2.webp", "image/webp"),
  { text: "Book Name: The Prince \n" },
  { text: "Book Author: Niccolo Machiavelli \n" },
  { text: "Similiar Books: The Art of War, Leviathan, The 48 Laws of Power" },
  { text: "Book Image: " },
  generateImagePart("./extra/image-3.webp", "image/webp"),
  { text: "Book Name: 1984 \n" },
  { text: "Book Author: George Orwell \n" },
  {
    text: "Similiar Books: Brave New World, Fahrenheit 451, Never Let Me Go",
  },
  { text: "Book Image: " },
];

const recommendBook = async (imagePath, mimeType) => {
  parts.push(generateImagePart(imagePath, mimeType));
  parts.push({ text: "" });
  const res = await model.generateContent(parts);
  console.log(res.response.text());
};

recommendBook("./extra/image-4.webp", "image/webp");

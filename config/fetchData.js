const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = process.env.PROMPT;
module.exports.getDestinationData = async function() {
  try {
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const jsonResponse = JSON.parse(result.response.text().replace('```json', '').replaceAll('`', ''));
    console.log(jsonResponse);

    fs.writeFile("assets/data/sample.json", JSON.stringify(jsonResponse), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("JSON data has been saved to destinationData.json");
        }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI("AIzaSyDNp5JU9vM99Z2QdW6rWl1_pz79oNHwqD8");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "generate a dataset for 50 destinations which include clues, fun facts for each destination as per the below json format: [{\"city\":\"Paris\",\"country\":\"France\",\"clues\":[\"Thiscityishometoafamoustowerthatsparkleseverynight.\",\"Knownasthe'CityofLove'andahubforfashionandart.\"],\"fun_fact\":[\"TheEiffelTowerwassupposedtobedismantledafter20yearsbutwassavedbecauseitwasusefulforradiotransmissions!\",\"Parishasonlyonestopsignintheentirecity—mostintersectionsrelyonpriority-to-the-rightrules.\"],\"trivia\":[\"Thiscityisfamousforitscroissantsandmacarons.Bonappétit!\",\"PariswasoriginallyaRomancitycalledLutetia.\"]}]";

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


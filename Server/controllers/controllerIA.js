const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

class ControllerIAGemini {
  static async explainWhiteboard(req, res, next) {
    try {
      const { imageBase64 } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ message: "Image data is required." });
      }

      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "image/png",
            data: base64Data,
          },
        },
        {
          text: "Here is the content of the digital whiteboard. Please explain the content in a language that is easy for students to understand.",
        },
      ]);

      const response = await result.response;
      const text = response.text();

      res.status(200).json({
        message: "Whiteboard explanation successfully generated",
        explanation: text,
      });
    } catch (error) {
      console.error("AI error:", error.message);
      next(error);
    }
  }
}

module.exports = ControllerIAGemini;

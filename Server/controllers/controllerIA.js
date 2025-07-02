const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class ControllerIAGemini {
  static async explainWhiteboard(req, res, next) {
    try {
      const { imageBase64 } = req.body;
      console.log(
        "Received image data for explanation",
        imageBase64 ? "with data" : "without data"
      );
      if (!imageBase64) {
        return res.status(400).json({ message: "Image data is required." });
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "image/png",
            data: base64Data,
          },
        },
        {
          text: "Please explain the contents of this whiteboard in simple student-friendly language.",
        },
      ]);
      console.log("AI response received:", result);
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

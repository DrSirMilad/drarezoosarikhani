import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { generateClientAiResponse } from "./src/utils/aiAssistant";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI lazily / safely
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Dental Assistant Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "fa", history = [] } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message string is required" });
      return;
    }

    const ai = getAiClient();
    if (!ai) {
      // Fallback response using knowledge engine if GEMINI_API_KEY is not configured
      const fallback = generateClientAiResponse(message, language);
      res.json({ text: fallback.text });
      return;
    }

    const systemPrompt = `You are the AI Concierge and Patient Assistant for Dr. Arezou Sarikhani's Dental Clinic (مطب دندانپزشکی دکتر آرزو ساریخانی).
    
    CLINIC DETAILS:
    - Doctor Name: Dr. Arezou Sarikhani (دکتر آرزو ساریخانی)
    - Specialty: Cosmetic & Restorative Dentistry Specialist (دندانپزشکی زیبایی و ترمیمی)
    - Experience: 10+ years of clinical excellence, Graduate of Shahid Beheshti University of Medical Sciences.
    - Address: Tehran, Tehranpars, Shahd Blvd, between Adib (208) & Erfaghi (210) St, No. 301, 4th Floor, Unit 4 West.
    - Phone / WhatsApp for Clinic Advisors: 09380454547 (+989380454547)
    - Working Hours: Saturday to Thursday: 09:00 AM - 08:00 PM.
    
    STRICT MANDATORY RULES (YOU MUST FOLLOW ALL OF THEM):
    1. RESPONSE LANGUAGE: Always respond in Persian (Farsi) by default unless the user explicitly converses in full English or Arabic. Even if the user types Finglish (Persian typed in English alphabet e.g., "ezani", "salam", "nobat", "gheymat"), YOU MUST RESPOND IN PERSIAN (FARSI).
    2. HUMAN CHATTING STYLE WITH SPACING: Write line-by-line like a real human texting in a chat. Put double line breaks (empty line spacing) between lines or thoughts so it looks like short human text messages.
    3. CONNECT TO CLINIC ADVISORS: Constantly guide the patient to connect with clinic advisors via phone or WhatsApp at 09380454547 for consultations and photo submissions.
    4. NO PRICE OPINIONS AT ALL: NEVER give any prices, cost estimates, or fee figures under ANY CIRCUMSTANCES. If asked about prices or costs, politely explain that exact pricing requires an in-person clinical examination by Dr. Sarikhani or sending a photo to clinic advisors at 09380454547.
    5. STRICT DENTAL SCOPE: ONLY discuss dental clinic services, doctor qualifications, location, and booking. Do NOT answer non-dental or general knowledge topics outside dentistry.
    6. NO PERSONAL MEDICAL DIAGNOSIS / DOCTOR MUST EXAMINE: Never express medical opinions or diagnose from yourself. Always emphasize in various ways that "Dr. Arezou Sarikhani must examine you in person to evaluate your teeth and provide a professional diagnosis."`;

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Understood. I am ready to assist patients warmly and professionally in Farsi, English, and Arabic." }] },
    ];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.sender === "user" && item.text) {
          contents.push({ role: "user", parts: [{ text: item.text }] });
        } else if (item.sender === "bot" && item.text) {
          contents.push({ role: "model", parts: [{ text: item.text }] });
        }
      }
    }

    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
    });

    const responseText = response.text || "I'm here to help you with your dental care inquiry. How else may I assist you?";
    res.json({ text: responseText });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: error?.message || "Internal server error",
    });
  }
});

// Start Server with Vite Middleware or Production Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

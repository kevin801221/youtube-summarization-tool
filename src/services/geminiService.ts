import { GoogleGenAI, Type } from "@google/genai";
import { VideoMindAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeVideo(youtubeUrl: string, languagePref: string = "auto"): Promise<VideoMindAnalysis> {
  const prompt = `Analyze this YouTube video and provide a comprehensive, structured breakdown in ${languagePref === "auto" ? "the video's primary language" : languagePref}. 
  Focus on high-value insights, actionable takeaways, and memorable moments.
  Return the response in strictly valid JSON format according to the requested schema.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        parts: [
          { fileData: { fileUri: youtubeUrl, mimeType: "video/mp4" } }, // Note: fileUri for YouTube is supported
          { text: prompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          metadata: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              estimatedDuration: { type: Type.STRING },
              contentType: { type: Type.STRING },
              primaryLanguage: { type: Type.STRING }
            },
            required: ["title", "estimatedDuration", "contentType", "primaryLanguage"]
          },
          tldr: { type: Type.STRING },
          chapters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timestamp: { type: Type.STRING },
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                importance: { type: Type.STRING }
              },
              required: ["timestamp", "title", "summary", "importance"]
            }
          },
          keyInsights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                insight: { type: Type.STRING },
                timestamp: { type: Type.STRING },
                category: { type: Type.STRING }
              },
              required: ["insight", "timestamp", "category"]
            }
          },
          goldenQuotes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                quote: { type: Type.STRING },
                timestamp: { type: Type.STRING },
                speaker: { type: Type.STRING }
              },
              required: ["quote", "timestamp", "speaker"]
            }
          },
          mentalModels: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          actionItems: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          followUpQuestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          shortsScript: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
              body: { type: Type.STRING },
              cta: { type: Type.STRING },
              suggestedClipTimestamp: { type: Type.STRING }
            },
            required: ["hook", "body", "cta", "suggestedClipTimestamp"]
          },
          mindMapNodes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                children: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["id", "label", "children"]
            }
          }
        },
        required: [
          "metadata", "tldr", "chapters", "keyInsights", "goldenQuotes", 
          "mentalModels", "actionItems", "followUpQuestions", "shortsScript", "mindMapNodes"
        ]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to get response from Gemini");
  }

  try {
    return JSON.parse(response.text) as VideoMindAnalysis;
  } catch (e) {
    console.error("JSON Parse Error:", response.text);
    throw new Error("Invalid response format from AI");
  }
}

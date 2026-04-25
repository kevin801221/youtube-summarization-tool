import { GoogleGenAI, Type } from "@google/genai";
import { VideoMindAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeVideo(youtubeUrl: string, languagePref: string = "auto"): Promise<VideoMindAnalysis> {
  const prompt = `Analyze this YouTube video and provide a comprehensive, structured breakdown.
  
  LANGUAGE DUAL-MODE REQUIREMENT:
  1. Identify the primary language of the video.
  2. If the video is in English, provide the main content in English and translations in Traditional Chinese (Taiwan, 繁體中文).
  3. If the video is in Chinese (any dialect), provide the main content in Traditional Chinese (Taiwan, 繁體中文) and translations in English.
  4. If the video is in another language, use English as the main content and Traditional Chinese as the translation.
  
  Focus on high-value insights, actionable takeaways, and memorable moments.
  
  RECOMMENDATIONS: Include 3-4 recommended follow-up search queries or video topics that would deepen the user's understanding of this subject.
  
  IMPORTANT: Return strictly valid JSON. Ensure all timestamps are in format MM:SS or HH:MM:SS.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { fileData: { fileUri: youtubeUrl, mimeType: "video/mp4" } },
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
            tldrTranslation: { type: Type.STRING },
            chapters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timestamp: { type: Type.STRING },
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  importance: { type: Type.STRING },
                  translation: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      summary: { type: Type.STRING }
                    },
                    required: ["title", "summary"]
                  }
                },
                required: ["timestamp", "title", "summary", "importance", "translation"]
              }
            },
            keyInsights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  insight: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  category: { type: Type.STRING },
                  translation: {
                    type: Type.OBJECT,
                    properties: {
                      insight: { type: Type.STRING }
                    },
                    required: ["insight"]
                  }
                },
                required: ["insight", "timestamp", "category", "translation"]
              }
            },
            goldenQuotes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  quote: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  speaker: { type: Type.STRING },
                  translation: {
                    type: Type.OBJECT,
                    properties: {
                      quote: { type: Type.STRING }
                    },
                    required: ["quote"]
                  }
                },
                required: ["quote", "timestamp", "speaker", "translation"]
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
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  searchQuery: { type: Type.STRING }
                },
                required: ["title", "reason", "searchQuery"]
              }
            }
          },
          required: [
            "metadata", "tldr", "chapters", "keyInsights", "goldenQuotes", 
            "mentalModels", "actionItems", "followUpQuestions", "shortsScript", "mindMapNodes", "recommendations"
          ]
        }
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(response.text.trim()) as VideoMindAnalysis;
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    // Check for common failure points
    if (error.message?.includes('429')) {
      throw new Error("Quota exceeded. Please try again in 1 minute.");
    }
    if (error.message?.includes('JSON')) {
      throw new Error("AI returned malformed data. Let's try once more.");
    }
    
    throw new Error(error.message || "Something went wrong while analyzing the video.");
  }
}

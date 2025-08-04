

import { GoogleGenAI } from "@google/genai";
import type { AuditData, AuditReport, GroundingSource } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (url: string) => `
Analyze the website at the URL: ${url}

Act as a world-class senior UX/UI designer and performance analyst. Perform a thorough UX/UI and performance audit of the website.
Your primary tool for performance analysis should be Google Search, looking for public data related to its Core Web Vitals (LCP, INP, CLS) and general page speed.

Your response MUST be a single, valid JSON object. Do not include any text, pleasantries, or markdown formatting before or after the JSON object.

For each section, provide a concise, one-sentence conversational "explanation" of what the section covers and why it's important.

For each "areasForImprovement" item, you MUST provide an object with two keys:
1. "point": A string describing the specific, actionable area for improvement.
2. "isVisualizable": A boolean. Set this to true ONLY for points where a visual example of a UI layout/design change would be highly effective. For points about performance metrics, abstract concepts, or text-only changes, set it to false.

The JSON object must conform to the following structure:
{
  "overallScore": <An integer score from 0 to 100 representing the combined UX/UI and performance quality>,
  "summary": "<A concise, one-paragraph summary of the key findings, including a note on performance.>",
  "sections": [
    {
      "title": "Heuristic Evaluation & Usability",
      "explanation": "<A concise, conversational explanation. e.g., 'This looks at core design principles to ensure your site is easy and frustration-free for visitors to use.'>",
      "score": <An integer score from 0 to 10 for this section>,
      "positivePoints": ["<A specific, actionable positive point>"],
      "areasForImprovement": [{"point": "<A specific, actionable area for improvement>", "isVisualizable": true}]
    },
    {
      "title": "Visual Design & Aesthetics",
      "explanation": "<A concise, conversational explanation. e.g., 'This section judges how visually appealing and professional your site looks, which builds trust and engages users.'>",
      "score": <An integer score from 0 to 10 for this section>,
      "positivePoints": ["<A specific, actionable positive point>"],
      "areasForImprovement": [{"point": "<A specific, actionable area for improvement>", "isVisualizable": true}]
    },
    {
      "title": "Accessibility (WCAG Compliance)",
      "explanation": "<A concise, conversational explanation. e.g., 'Here, we check if your site is usable by people with disabilities, which is crucial for inclusion and legal compliance.'>",
      "score": <An integer score from 0 to 10 for this section>,
      "positivePoints": ["<A specific, actionable positive point>"],
      "areasForImprovement": [{"point": "<A specific, actionable area for improvement>", "isVisualizable": true}]
    },
    {
      "title": "Content Clarity & Information Architecture",
      "explanation": "<A concise, conversational explanation. e.g., 'This reviews how well your content is written and organized, making sure users can find what they need quickly.'>",
      "score": <An integer score from 0 to 10 for this section>,
      "positivePoints": ["<A specific, actionable positive point>"],
      "areasForImprovement": [{"point": "<A specific, actionable area for improvement>", "isVisualizable": false}]
    },
    {
      "title": "Performance & Load Speed",
      "explanation": "<A concise, conversational explanation. e.g., 'We analyze how fast your page loads, because a slow site can frustrate users and hurt your search ranking.'>",
      "score": <An integer score from 0 to 10 for this section, based on search findings for Core Web Vitals>,
      "positivePoints": ["<Positive performance aspect, e.g., 'Good First Contentful Paint'>"],
      "areasForImprovement": [{"point": "<Improvement point based on metrics, e.g., 'Reduce Largest Contentful Paint time'>", "isVisualizable": false}]
    }
  ]
}
`;

const withRetry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    // Retry only on 5xx server errors
    if (retries > 0 && error?.response?.status >= 500) {
      console.warn(`API call failed, retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};


export const performUIAudit = async (url: string): Promise<AuditData | null> => {
  return withRetry(async () => {
    try {
      const prompt = generatePrompt(url);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.2,
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingSource[] || [];

      let textResponse = response.text.trim();
      
      if (textResponse.startsWith('```json')) {
        textResponse = textResponse.substring(7, textResponse.lastIndexOf('```')).trim();
      }
      
      const jsonStart = textResponse.indexOf('{');
      const jsonEnd = textResponse.lastIndexOf('}') + 1;

      if (jsonStart === -1 || jsonEnd === 0) {
          throw new Error("No valid JSON object found in the response.");
      }

      const jsonString = textResponse.substring(jsonStart, jsonEnd);

      const parsedJson = JSON.parse(jsonString) as AuditReport;

      return {
          audit: parsedJson,
          sources: groundingChunks
      };

    } catch (error) {
      console.error("Error during AI audit:", error);
      if (error instanceof SyntaxError) {
          throw new Error("Failed to parse the AI's response as JSON.");
      }
      throw error;
    }
  });
};

export const getWebsiteStyleDescription = async (url: string): Promise<string> => {
  return withRetry(async () => {
    try {
      const prompt = `
        Analyze the visual styling and structure of the website at ${url}. 
        Focus on the key design elements:
        - Color Palette: Primary, secondary, accent, and background colors.
        - Typography: Font families, weights, and sizes for headings and body text.
        - Component Style: Describe the look of buttons, inputs, and cards (e.g., border-radius, shadows, fill).
        - Layout: General page structure, use of grids, columns, and spacing.
        - Overall Vibe: Is it minimalist, corporate, playful, dark-mode, etc.?
        
        Provide a concise, one-paragraph description of this visual style and structure. This description will be used to guide an image generation model for structural context ONLY.
      `;
      const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
              tools: [{ googleSearch: {} }],
              temperature: 0.1,
          }
      });

      return response.text;
    } catch (error) {
      console.error("Error getting website style description:", error);
      throw new Error("Failed to analyze website style.");
    }
  });
};


export const generateVisualExample = async (improvement: string, styleDescription: string): Promise<string> => {
    return withRetry(async () => {
      try {
        const prompt = `
You are a UI/UX design visualizer. Your task is to create a single, clear image demonstrating an ideal design solution. This is for quick and educational learning.

**The UI/UX improvement point to demonstrate a solution for:**
"${improvement}"

**The original site's visual style description to reference for structure:**
"${styleDescription}"

**Image Requirements:**
- Create a single image showing **ONLY the ideal, corrected design solution**.
- The image should be clearly titled 'Ideal Solution' or 'Suggested Improvement'.
- Create a medium-fidelity wireframe that shows the CORRECTED design, directly solving the issue described in the improvement point.
- For example, if the problem is 'weak visual hierarchy', the wireframe should show clear headings, proper spacing, and distinct button styles to guide the user's eye.
- Base the general structure on the provided style description, but prioritize demonstrating the design solution.

**Style Rules:**
- **Clarity is paramount.** The visual solution should be obvious.
- Use a clean, modern wireframe style.
- The design must be **monochromatic** (only shades of gray, black, and white).
- Use simple placeholder shapes for images (e.g., a rectangle with a cross) and "lorem ipsum" for text.
- **Do not use any real branding, logos, or colors from any website.** Keep it generic and conceptual.
        `.trim();

        const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '16:9',
          },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          return response.generatedImages[0].image.imageBytes;
        } else {
          throw new Error("Image generation failed. This may be due to content safety filters. Please try a different audit point.");
        }
      } catch (error) {
        console.error("Error generating visual example:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        if (errorMessage.includes("Responsible AI") || errorMessage.includes("filtered")) {
            throw new Error("Image generation was blocked by content safety policies. Please try a different audit point.");
        }
        throw new Error(`Failed to generate visual example.`);
      }
    });
};
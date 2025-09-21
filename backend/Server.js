        // backend/server.js - FINAL CORRECTED CODE

        require('dotenv').config();
        const express = require('express');
        const cors = require('cors');
        // CORRECT: Import the Google Gen AI client
        const { GoogleGenAI } = require('@google/genai'); 

        const app = express();
        const PORT = process.env.PORT || 5000;

        // 1. CORS Setup
        app.use(cors()); 
        app.use(express.json());

        // CORRECT: Initialize the Gemini client using the GEMINI_API_KEY
        const ai = new GoogleGenAI({ 
            apiKey: process.env.GEMINI_API_KEY,
        });

        // --- CRITICAL SAFETY MEASURE: The System Prompt ---
        const systemPrompt = `
          You are a non-medical AI assistant providing general, empathetic mental health support.
          RULES:
          1. DO NOT give a diagnosis. Use language like, "It sounds like you are feeling..."
          2. Start by acknowledging the user's feelings (validation).
          3. Offer general coping strategies (e.g., mindfulness, breathing).
          4. Explicitly state: "I am an AI and not a substitute for a licensed therapist or emergency services."
          5. Keep responses concise, supportive, and end with an open question.
        `;

        app.post('/api/chat', async (req, res) => {
          const userMessage = req.body.prompt;
          
          // 4. Crisis Keyword Check (Safety Protocol) - REMAINS CORRECT
          const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'harm myself', 'hurt myself', 'want to die'];
          const isCrisis = crisisKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));

          if (isCrisis) {
            return res.status(200).json({
              reply: `Thank you for reaching out. Your safety is the priority. If you are in immediate danger or a crisis, please contact professional help right away.

              **National Suicide & Crisis Lifeline:** 988
              **Crisis Text Line:** Text HOME to 741741
              **Emergency Services:** 911 (or local emergency number)

              I am an AI and cannot provide professional emergency services.`
            });
          }

          try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash", 
                contents: [
                    { 
                        role: "user", 
                        parts: [{ text: systemPrompt + "\nUser: " + userMessage }] 
                    }
                ],
                config: {
                    temperature: 0.7,
                    maxOutputTokens: 500,

                    thinkingConfig: {
                      
                        thinkingBudget: 0, // Setting to 0 turns off internal reasoning for 2.5 Flash
                    }
                }
            });
            
            // ⬇️ CRITICAL DEBUGGING AND EMPTY CHECK ⬇️
            console.log('--- RAW GEMINI RESPONSE ---', JSON.stringify(response, null, 2));

            // Check if the response text is empty (Model often returns 200 with no text if filtered)
            if (!response.text || response.text.trim() === '') {
                // Log the failure reason for visibility
                console.error('RESPONSE FILTERED. Reason:', response.candidates[0].finishReason);
                
                // Return a distinct 500 error so the frontend knows something is wrong
                return res.status(500).json({ error: 'Model output was blocked by a safety filter.' });
            }

            // If content exists, send it
            res.json({ reply: response.text });

          }catch (error) {
            // Log the error message
            console.error('CRITICAL GEMINI API Error:', error.message); 
            
            // Send a generic 500 error back to the frontend
            res.status(500).json({ error: 'Failed to get a response from the chatbot due to a server error.' });
          }
        });

        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
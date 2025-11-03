const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { message, apiKey } = JSON.parse(event.body);

        if (!message || !apiKey) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message and API key required' }),
            };
        }

        // VARA context for the AI
        const varaContext = `You are a specialized AI assistant trained on the VARA (Virtual Assets Regulatory Authority) Rulebook. 

Key areas of expertise:
1. VASP Licensing Framework - Categories (Minimal, Restricted, Full), requirements, ongoing conditions
2. External Audit Requirements - Mandatory audits, approved auditors, custody verification procedures
3. Capital Requirements - Minimum capital, activity-based calculations, eligible capital components
4. AML/CTF Compliance - Customer due diligence, transaction monitoring, suspicious activity reporting
5. Governance Standards - Board composition, fit & proper requirements, risk management
6. Reporting Requirements - Periodic returns, notifications, record keeping obligations
7. Enforcement Actions - Penalties, sanctions, compliance monitoring

Always provide specific references to VARA Rulebook sections when applicable. Be precise and actionable in your responses.`;

        const prompt = `${varaContext}

User Question: ${message}

Please provide a comprehensive answer about VARA regulations related to this question. Include specific references to VARA rulebook sections where applicable.`;

        // Call Gemini API
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    topK: 20,
                    topP: 0.8,
                    maxOutputTokens: 2048
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH", 
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini API Error:', errorText);
            return {
                statusCode: geminiResponse.status,
                headers,
                body: JSON.stringify({ error: `Gemini API Error: ${errorText}` }),
            };
        }

        const data = await geminiResponse.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Unexpected API response format' }),
            };
        }
        
        if (data.candidates[0].finishReason === 'SAFETY') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Response was filtered due to safety concerns' }),
            };
        }

        const response = data.candidates[0].content.parts[0].text;
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                response: response 
            }),
        };

    } catch (error) {
        console.error('Server error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
'use server'

import { aiClient } from '@/utils/ai/gemini';

export async function generateResumeContent(data: any) {
  try {
    const prompt = `You are an expert Resume Writer and Career Coach. 
Create professional, ATS-optimized content for a resume based on the following raw user input.

Raw Input:
${JSON.stringify(data, null, 2)}

Provide the output in JSON format with the following structure:
{
  "summary": "<Professional summary paragraph>",
  "experience": [
    {
      "company": "<company name>",
      "role": "<job title>",
      "duration": "<dates>",
      "bullets": [
        "<optimized resume bullet starting with an action verb, highlighting impact>",
        ...
      ]
    }
  ],
  "projects": [
    {
      "name": "<project name>",
      "description": "<short project description>",
      "liveLink": "<optional live link or empty>",
      "githubLink": "<optional github link or empty>",
      "bullets": [
        "<optimized bullet point describing the technical implementation and outcome>",
        ...
      ]
    }
  ],
  "education": [ // format nicely 
    { "institution": "...", "degree": "...", "year": "..." }
  ],
  "skills": ["<skill1>", "<skill2>"]
}

Ensure the output is ONLY the JSON object, with no markdown wrappers or extra text. Make the language strong, professional, and action-oriented.`;

    const response = await aiClient.chat.completions.create({
      model: 'gemini-3-flash-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7, 
    });

    const content = response.choices[0]?.message?.content || '';
    
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```json')) jsonStr = jsonStr.slice(7);
    if (jsonStr.startsWith('```')) jsonStr = jsonStr.slice(3);
    if (jsonStr.endsWith('```')) jsonStr = jsonStr.slice(0, -3);
    
    const result = JSON.parse(jsonStr.trim());

    return { success: true, aiGeneratedResume: result };

  } catch (error) {
    console.error('Error generating resume:', error);
    return { error: 'Failed to generate resume. Please try again.' };
  }
}

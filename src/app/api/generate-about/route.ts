import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { formSchema } from '@/lib/schemas/formSchema';
import OpenAI from 'openai';

/**
 * Environment variable configuration
 * 
 * To use this API, you need to set up the following environment variables:
 * 
 * OPENAI_API_KEY - Your OpenAI API key
 * 
 * For local development:
 * 1. Create a .env.local file in the root of your project
 * 2. Add OPENAI_API_KEY=your_api_key_here to the file
 * 
 * For production deployment on Vercel:
 * 1. Go to your project settings in the Vercel dashboard
 * 2. Navigate to the "Environment Variables" section
 * 3. Add OPENAI_API_KEY as the name and your API key as the value
 */

/**
 * Note: The OpenAI client is initialized only when needed (at runtime)
 * No API key is required during build time, only when the API is actually called
 * This allows successful builds without the OPENAI_API_KEY environment variable set
 */

// Helper function to get OpenAI client - only called at runtime
const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
};
/**
 * API route handler for generating LinkedIn About sections
 */
export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        status: 'error',
        message: 'OpenAI API key is not configured'
      }, { status: 500 });
    }

    // Parse request body
    const body = await request.json();
    
    // Validate the request body against our schema
    const validatedData = formSchema.parse(body);
    const { name, role, experience, technologies, tone, language } = validatedData;

    // Generate the LinkedIn About section using OpenAI
    const generatedText = await generateAboutSection(name, role, experience, technologies, tone, language);

    // Return the generated text
    return NextResponse.json({ 
      text: generatedText,
      status: 'success'
    }, { status: 200 });
    
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Validation error',
        errors: error.errors
      }, { status: 400 });
    }
    
    // Handle OpenAI API errors
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API error:', error);
      return NextResponse.json({ 
        status: 'error',
        message: 'Error generating content with AI service',
        error: error.message
      }, { status: 500 });
    }
    
    // Handle other errors
    console.error('Error generating About section:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to generate About section'
    }, { status: 500 });
  }
}

/**
 * Function to generate a LinkedIn About section using OpenAI's API
 * based on user input data
 */
async function generateAboutSection(
  name: string,
  role: string,
  experience: string,
  technologies: string,
  tone: string,
  language: string
): Promise<string> {
  try {
    // Format the system prompt based on the selected language
    const systemPrompt = language === 'en' 
      ? `You are a professional LinkedIn profile writer specializing in creating compelling "About" sections. 
        Write in the first person as if the person is introducing themselves.`
      : `Eres un redactor profesional de perfiles de LinkedIn especializado en crear secciones "Acerca de" convincentes. 
        Escribe en primera persona como si la persona se estuviera presentando a sí misma.`;

    // Format the user prompt based on the selected language and tone
    const userPrompt = formatPrompt(name, role, experience, technologies, tone, language);

    // Initialize OpenAI client at runtime
    const openai = getOpenAIClient();
    
    // Get the model from environment variables or use a default
    const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
    
    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model,  // Using the model from environment variables
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,  // Adjust for creativity vs. consistency
      max_tokens: 500,   // LinkedIn About sections shouldn't be too long
    });

    // Extract and return the generated text
    const generatedText = completion.choices[0]?.message?.content?.trim() || 
                        "Sorry, unable to generate content. Please try again.";
    
    return generatedText;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

/**
 * Formats the prompt to send to the AI based on the user's inputs
 * and their preferred language and tone
 */
function formatPrompt(
  name: string,
  role: string,
  experience: string,
  technologies: string,
  tone: string,
  language: string
): string {
  // Define tone descriptions for the AI
  const toneDescriptions = {
    en: {
      professional: "professional and straightforward",
      formal: "formal and traditional",
      inspirational: "inspirational and motivating",
      friendly: "friendly and approachable",
      conversational: "conversational and natural"
    },
    es: {
      professional: "profesional y directo",
      formal: "formal y tradicional",
      inspirational: "inspirador y motivador",
      friendly: "amigable y accesible",
      conversational: "conversacional y natural"
    }
  };

  // Select the appropriate tone description based on language
  const toneDescription = language === 'en' 
    ? toneDescriptions.en[tone as keyof typeof toneDescriptions.en] 
    : toneDescriptions.es[tone as keyof typeof toneDescriptions.es];
  
  // Format the prompt based on the selected language
  if (language === 'en') {
    return `Write a LinkedIn "About" section for ${name}, who works as a ${role}.

Experience details:
${experience}

Technologies and skills:
${technologies}

The tone should be ${toneDescription}.

Keep it concise, engaging, and focused on their professional strengths and unique value proposition.
Format it appropriately for a LinkedIn profile with proper spacing and paragraphs.
Do not include "About:" or any title at the beginning.`;
  } else {
    return `Escribe una sección "Acerca de" para LinkedIn para ${name}, quien trabaja como ${role}.

Detalles de experiencia:
${experience}

Tecnologías y habilidades:
${technologies}

El tono debe ser ${toneDescription}.

Mantenlo conciso, atractivo y enfocado en sus fortalezas profesionales y propuesta de valor única.
Formatea apropiadamente para un perfil de LinkedIn con espaciado y párrafos adecuados.
No incluyas "Acerca de:" ni ningún título al comienzo.`;
  }
}

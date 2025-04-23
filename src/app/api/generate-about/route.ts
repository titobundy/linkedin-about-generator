import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { formSchema } from '@/lib/schemas/formSchema';

/**
 * API route handler for generating LinkedIn About sections
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate the request body against our schema
    const validatedData = formSchema.parse(body);
    const { role, experience, technologies, tone, language } = validatedData;

    // Introduce a delay to simulate AI processing time (500-1500ms)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    // Generate the LinkedIn About section based on the provided data
    const generatedText = generateAboutSection(role, experience, technologies, tone, language);

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
    
    // Handle other errors
    console.error('Error generating About section:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to generate About section'
    }, { status: 500 });
  }
}

/**
 * Function to generate a LinkedIn About section based on user input
 * 
 * NOTE: In a production environment, this function would call an AI service
 * like OpenAI's GPT API to generate the content. For this example, we're using
 * templates to simulate AI-generated content.
 */
function generateAboutSection(
  role: string,
  experience: string,
  technologies: string,
  tone: string,
  language: string
): string {
  // Choose the template based on the language and tone
  const templates = language === 'en' ? englishTemplates : spanishTemplates;
  const toneTemplates = templates[tone as keyof typeof templates] || templates.professional;
  
  // Select a random template from the available ones for the chosen tone
  const selectedTemplate = toneTemplates[Math.floor(Math.random() * toneTemplates.length)];
  
  // Replace placeholders with actual content
  return selectedTemplate
    .replace('{{ROLE}}', role)
    .replace('{{EXPERIENCE}}', experience)
    .replace('{{TECHNOLOGIES}}', technologies);
}

// Templates for English content
const englishTemplates = {
  professional: [
    `As a {{ROLE}} with extensive experience in {{EXPERIENCE}}, I specialize in utilizing technologies such as {{TECHNOLOGIES}}. My approach combines technical expertise with strategic thinking to deliver high-quality solutions that align with business objectives. I'm committed to continuous learning and applying best practices to drive innovation and efficiency.`,
    
    `I'm a dedicated {{ROLE}} with a background in {{EXPERIENCE}}. My technical toolkit includes {{TECHNOLOGIES}}, which I leverage to develop robust and scalable solutions. I thrive in collaborative environments where I can apply my analytical skills to solve complex problems and contribute to organizational success.`,
    
    `A results-driven {{ROLE}} with proven experience in {{EXPERIENCE}}. I have deep expertise in {{TECHNOLOGIES}} and a track record of delivering projects that meet both technical requirements and business needs. I value precision, efficiency, and effective communication in all professional endeavors.`
  ],
  formal: [
    `I am a {{ROLE}} with substantial expertise encompassing {{EXPERIENCE}}. My proficiency extends to technologies including {{TECHNOLOGIES}}. I consistently adhere to the highest standards of quality and precision in my work, maintaining a commitment to excellence and professional integrity throughout my career.`,
    
    `As an accomplished {{ROLE}}, I have cultivated extensive knowledge in {{EXPERIENCE}}. I possess comprehensive skills in {{TECHNOLOGIES}}, enabling me to execute complex projects with accuracy and attention to detail. I prioritize clear communication and methodical approaches to ensure optimal outcomes.`,
    
    `I serve as a {{ROLE}} with considerable experience in {{EXPERIENCE}}. My technical proficiencies include {{TECHNOLOGIES}}, which I employ with precision and strategic insight. I maintain a structured approach to challenges, emphasizing thorough analysis and systematic problem-solving.`
  ],
  inspirational: [
    `Passionate {{ROLE}} on a mission to transform {{EXPERIENCE}} through innovation and creativity. I harness the power of {{TECHNOLOGIES}} to build solutions that not only meet requirements but inspire and delight users. I believe in pushing boundaries and challenging the status quo to create meaningful impact.`,
    
    `As a visionary {{ROLE}}, I'm driven by the potential to revolutionize {{EXPERIENCE}} and create lasting change. My journey has led me to master {{TECHNOLOGIES}}, tools I use to turn ambitious ideas into reality. I'm committed to growth, both personal and professional, and to inspiring others along the way.`,
    
    `I'm a {{ROLE}} who believes that technology can change the world. With experience in {{EXPERIENCE}}, I leverage {{TECHNOLOGIES}} to build solutions that matter. Every challenge is an opportunity to learn, grow, and make a difference. I'm dedicated to creating work that stands the test of time and inspires future innovation.`
  ],
  friendly: [
    `Hi there! I'm a {{ROLE}} who loves working with {{EXPERIENCE}}. I enjoy using tools like {{TECHNOLOGIES}} to solve interesting problems and create useful solutions. I'm a team player who values open communication and collaboration—I believe the best results come when we work together.`,
    
    `Hello! As a {{ROLE}}, I've spent my career exploring {{EXPERIENCE}} and having fun along the way. I'm comfortable with {{TECHNOLOGIES}} and always eager to learn more. I bring enthusiasm and a positive attitude to every project, along with a genuine interest in connecting with colleagues and clients.`,
    
    `Hey! I'm a friendly {{ROLE}} with hands-on experience in {{EXPERIENCE}}. I'm proficient in {{TECHNOLOGIES}} but never too serious to share a laugh with the team. I believe work should be enjoyable as well as productive, and I strive to create an environment where creativity and camaraderie can flourish.`
  ],
  conversational: [
    `I'm a {{ROLE}} who's been working with {{EXPERIENCE}} for quite some time now. Along the way, I've picked up skills in {{TECHNOLOGIES}} that help me get the job done effectively. I enjoy breaking down complex concepts into simple terms and finding practical solutions to everyday challenges.`,
    
    `As a {{ROLE}}, I've developed a solid understanding of {{EXPERIENCE}} through real-world application. I work with {{TECHNOLOGIES}} regularly and am always looking to expand my toolkit. I value straightforward communication and believe that the best ideas often come from casual conversations and collaborative brainstorming.`,
    
    `What do I do? I'm a {{ROLE}} who specializes in {{EXPERIENCE}}. Day to day, you'll find me working with {{TECHNOLOGIES}} to solve problems and improve processes. I'm practical, adaptable, and genuinely interested in understanding different perspectives. Let's talk and see how we can work together!`
  ]
};

// Templates for Spanish content
const spanishTemplates = {
  professional: [
    `Como {{ROLE}} con amplia experiencia en {{EXPERIENCE}}, me especializo en utilizar tecnologías como {{TECHNOLOGIES}}. Mi enfoque combina experiencia técnica con pensamiento estratégico para ofrecer soluciones de alta calidad que se alinean con los objetivos empresariales. Estoy comprometido con el aprendizaje continuo y la aplicación de mejores prácticas para impulsar la innovación y la eficiencia.`,
    
    `Soy un dedicado {{ROLE}} con experiencia en {{EXPERIENCE}}. Mi conjunto de herramientas técnicas incluye {{TECHNOLOGIES}}, que aprovecho para desarrollar soluciones robustas y escalables. Prospero en entornos colaborativos donde puedo aplicar mis habilidades analíticas para resolver problemas complejos y contribuir al éxito organizacional.`,
    
    `Un {{ROLE}} orientado a resultados con experiencia probada en {{EXPERIENCE}}. Tengo amplia experiencia en {{TECHNOLOGIES}} y un historial de entrega de proyectos que cumplen tanto con los requisitos técnicos como con las necesidades empresariales. Valoro la precisión, la eficiencia y la comunicación efectiva en todos los esfuerzos profesionales.`
  ],
  formal: [
    `Soy un {{ROLE}} con sustancial experiencia que abarca {{EXPERIENCE}}. Mi competencia se extiende a tecnologías que incluyen {{TECHNOLOGIES}}. Consistentemente me adhiero a los más altos estándares de calidad y precisión en mi trabajo, manteniendo un compromiso con la excelencia e integridad profesional a lo largo de mi carrera.`,
    
    `Como {{ROLE}} consumado, he cultivado un extenso conocimiento en {{EXPERIENCE}}. Poseo habilidades comprensivas en {{TECHNOLOGIES}}, permitiéndome ejecutar proyectos complejos con precisión y atención al detalle. Priorizo la comunicación clara y enfoques metódicos para asegurar resultados óptimos.`,
    
    `Me desempeño como {{ROLE}} con considerable experiencia en {{EXPERIENCE}}. Mis competencias técnicas incluyen {{TECHNOLOGIES}}, que empleo con precisión y visión estratégica. Mantengo un enfoque estructurado hacia los desafíos, enfatizando el análisis minucioso y la resolución sistemática de problemas.`
  ],
  inspirational: [
    `{{ROLE}} apasionado en una misión para transformar {{EXPERIENCE}} a través de la innovación y creatividad. Aprovecho el poder de {{TECHNOLOGIES}} para construir soluciones que no solo cumplen requisitos sino que inspiran y deleitan a los usuarios. Creo en empujar límites y desafiar el status quo para crear un impacto significativo.`,
    
    `Como {{ROLE}} visionario, me impulsa el potencial de revolucionar {{EXPERIENCE}} y crear cambios duraderos. Mi trayectoria me ha llevado a dominar {{TECHNOLOGIES}}, herramientas que uso para convertir ideas ambiciosas en realidad. Estoy comprometido con el crecimiento, tanto personal como profesional, y con inspirar a otros en el camino.`,
    
    `Soy un {{ROLE}} que cree que la tecnología puede cambiar el mundo. Con experiencia en {{EXPERIENCE}}, aprovecho {{TECHNOLOGIES}} para construir soluciones que importan. Cada desafío es una oportunidad para aprender, crecer y hacer una diferencia. Estoy dedicado a crear trabajo que resista la prueba del tiempo e inspire la innovación futura.`
  ],
  friendly: [
    `¡Hola! Soy un {{ROLE}} que adora trabajar con {{EXPERIENCE}}. Disfruto utilizando herramientas como {{TECHNOLOGIES}} para resolver problemas interesantes y crear soluciones útiles. Soy un jugador de equipo que valora la comunicación abierta y la colaboración—creo que los mejores resultados surgen cuando trabajamos juntos.`,
    
    `¡Saludos! Como {{ROLE}}, he dedicado mi carrera a explorar {{EXPERIENCE}} divirtiéndome en el camino. Me siento cómodo con {{TECHNOLOGIES}} y siempre estoy ansioso por aprender más. Aporto entusiasmo y una actitud positiva a cada proyecto, junto con un genuino interés en conectar con colegas y clientes.`,
    
    `¡Hey! Soy un amigable {{ROLE}} con experiencia práctica en {{EXPERIENCE}}. Soy competente en {{TECHNOLOGIES}} pero nunca demasiado serio para compartir una risa con el equipo. Creo que el trabajo debe ser agradable además de productivo, y me esfuerzo por crear un ambiente donde la creatividad y la camaradería puedan florecer.`
  ],
  conversational: [
    `Soy un {{ROLE}} que ha estado trabajando con {{EXPERIENCE}} durante bastante tiempo. En el camino, he adquirido habilidades en {{TECHNOLOGIES}} que me ayudan a realizar el trabajo de manera efectiva. Disfruto desglosando conceptos complejos en términos simples y encontrando soluciones prácticas a desafíos cotidianos.`,
    
    `Como {{ROLE}}, he desarrollado una sólida comprensión de {{EXPERIENCE}} a través de la aplicación en el mundo real. Trabajo con {{TECHNOLOGIES}} regularmente y siempre estoy buscando expandir mi conjunto de herramientas. Valoro la comunicación directa y creo que las mejores ideas a menudo surgen de conversaciones casuales y lluvia de ideas colaborativa.`,
    
    `¿Qué hago? Soy un {{ROLE}} que se especializa en {{EXPERIENCE}}. En el día a día, me encontrarás trabajando con {{TECHNOLOGIES}} para resolver problemas y mejorar procesos. Soy práctico, adaptable y genuinamente interesado en entender diferentes perspectivas. ¡Hablemos y veamos cómo podemos trabajar juntos!`
  ]
};


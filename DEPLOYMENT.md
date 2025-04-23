# Despliegue en Vercel

Este documento contiene información sobre el despliegue de LinkedIn About Generator en Vercel.

## Información general

- **Plataforma de despliegue**: Vercel
- **Fecha de despliegue inicial**: 23 de abril de 2025
- **URL de producción**: [Insertar URL final proporcionada por Vercel]

## Configuración de variables de entorno

La aplicación utiliza la API de OpenAI para generar contenido, lo que requiere configurar las siguientes variables de entorno:

- `OPENAI_API_KEY`: Tu clave API de OpenAI para autenticar las solicitudes a la API.
- `OPENAI_MODEL`: El modelo de OpenAI que se utilizará para la generación de contenido (por defecto: "gpt-4o").

**Nota importante sobre OPENAI_API_KEY**: Se ha observado que el generador de contenido funciona correctamente en el entorno de producción de Vercel sin necesidad de configurar explícitamente esta variable. Esto podría deberse a:

- Configuración predeterminada en la cuenta de Vercel
- Integración existente con OpenAI
- Otra configuración en el backend de Vercel

Si en algún momento el generador de contenido deja de funcionar, podría ser necesario configurar manualmente esta variable.

## Cómo configurar variables de entorno en Vercel

1. Inicia sesión en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto "linkedin-about-generator"
3. Ve a "Settings" > "Environment Variables"
4. Añade las siguientes variables:
   - Nombre: `OPENAI_API_KEY`
     - Valor: [Tu clave API de OpenAI]
     - Selecciona los entornos: Production, Preview, Development
   - Nombre: `OPENAI_MODEL`
     - Valor: El modelo de OpenAI deseado (por ejemplo: "gpt-4o", "gpt-3.5-turbo", etc.)
     - Selecciona los entornos: Production, Preview, Development
5. Guarda la configuración
6. Redespliega la aplicación si es necesario

## Características implementadas

- Interfaz de usuario responsive que se adapta a todos los tamaños de dispositivos
- Fondo profesional con degradado elegante
- Integración con la API de OpenAI para generar contenido para perfiles de LinkedIn
- Soporte multilingüe (inglés y español)
- Diversos tonos para adaptarse a diferentes estilos profesionales
- Configuración flexible del modelo de OpenAI a través de variables de entorno

## Mantenimiento

Para actualizar la aplicación:
1. Realiza los cambios en el código usando la estructura de ramas (feature/*)
2. Crea commits siguiendo la convención: `tipo(alcance): descripción concisa`
3. Integra los cambios en la rama principal
4. Vercel desplegará automáticamente los cambios si la integración con GitHub está activada

## Recursos adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de la API de OpenAI](https://platform.openai.com/docs)
- [Modelos disponibles en OpenAI](https://platform.openai.com/docs/models)
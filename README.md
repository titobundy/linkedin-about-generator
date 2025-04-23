# LinkedIn About Generator

A web application that helps users generate personalized LinkedIn "About" sections using AI. The application takes user inputs like name, professional role, experience, technologies/skills, and preferred tone to create compelling "About" sections for LinkedIn profiles. It supports both English and Spanish languages and uses OpenAI's GPT model to generate high-quality, personalized content.

## Features

- Form for collecting user information (name, role, experience, technologies, tone)
- AI-powered content generation using OpenAI
- Language switching between English and Spanish
- Multiple tone options (professional, formal, inspirational, friendly, conversational)
- Copy to clipboard functionality
- Responsive design for all device sizes

## Installation

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- OpenAI API key

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd linkedin-about-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your OpenAI API key:
   - Copy the example environment file:
     ```bash
     cp .env.local.example .env.local
     ```
   - Edit `.env.local` and replace `your-api-key-here` with your actual OpenAI API key

## Setting Up OpenAI API

1. Sign up for an account at [OpenAI](https://openai.com) if you don't have one
2. Navigate to the [API keys page](https://platform.openai.com/api-keys)
3. Create a new API key
4. Copy the key and add it to your `.env.local` file:
   ```
   OPENAI_API_KEY="your-actual-api-key"
   ```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To run the production build locally:

```bash
npm run start
# or
yarn start
```

## Deploying to Vercel

The simplest way to deploy the application is through Vercel:

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Import the project on [Vercel](https://vercel.com/new)
3. Add your environment variable:
   - In the Vercel dashboard, go to your project settings
   - Navigate to the "Environment Variables" section
   - Add `OPENAI_API_KEY` with your OpenAI API key as the value
4. Deploy the application

Alternatively, you can use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Technologies Used

- **Frontend Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **AI Integration**: [OpenAI API](https://openai.com/blog/openai-api) for content generation
- **Internationalization**: Custom language context for English and Spanish
- **Deployment**: [Vercel](https://vercel.com/)

## Project Structure

- `/src/app`: Next.js App Router pages and API routes
- `/src/components`: React components (AboutForm, GeneratedAbout)
- `/src/lib/contexts`: Context providers (LanguageContext for i18n)
- `/src/lib/schemas`: Zod validation schemas

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# UX/UI Website Auditor

An AI-powered website auditor that analyzes UX/UI design and performance using Google's Gemini AI.

## 🚀 Deployment Issues Fixed

The following issues have been resolved for Vercel deployment:

1. **Environment Variable Mismatch**: Fixed `process.env.API_KEY` → `import.meta.env.GEMINI_API_KEY`
2. **Missing Dependencies**: Added `@types/node` for TypeScript support
3. **Vercel Configuration**: Added `vercel.json` for proper deployment settings
4. **Type Declarations**: Added proper TypeScript declarations for environment variables

## 📋 Prerequisites

- Node.js 18+ installed
- A Google Gemini API key

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables

#### Local Development
Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

#### Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following environment variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
   - **Environment**: Production (and Preview if needed)

### 3. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your environment variables

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variable in Vercel dashboard
4. Deploy

### Option 3: Manual Upload
1. Run `npm run build`
2. Upload the `dist` folder to Vercel

## 🔍 Troubleshooting

### Common Issues:

1. **"Cannot find module '@google/genai'"**
   - Run `npm install` to install dependencies

2. **"API key not found"**
   - Ensure `GEMINI_API_KEY` is set in Vercel environment variables
   - Check that the API key is valid and has proper permissions

3. **Build fails on Vercel**
   - Verify all dependencies are in `package.json`
   - Check that `vercel.json` is properly configured

4. **TypeScript errors**
   - Run `npm install` to install `@types/node`
   - Ensure all type declarations are properly imported

## 📁 Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── services/       # API services (Gemini)
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application
├── vercel.json         # Vercel deployment config
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## 🔒 Security Notes

- Never commit your actual API key to version control
- Use environment variables for all sensitive data
- The `.env.local` file is already in `.gitignore`

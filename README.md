# UX/UI Website Auditor

An AI-powered website auditor that analyzes UX/UI design and performance using Google's Gemini AI.

## ✅ **Status: Ready for Deployment**

- ✅ Node.js installed (v22.18.0)
- ✅ Dependencies installed
- ✅ Local development server working
- ✅ Production build successful
- ✅ Environment variables configured

## 🚀 **Quick Start**

### **Local Development**
```bash
# Start the development server
./start-dev.sh
# OR
npm run dev
```

The app will be available at: http://localhost:5173

### **Deploy to Vercel**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project

3. **Add Environment Variable:**
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = your actual Gemini API key
   - Redeploy the project

## 🔧 **Environment Setup**

### **Get Your Gemini API Key**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key

### **Local Environment**
Create `.env.local` (already exists):
```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### **Vercel Environment**
Add in Vercel dashboard:
- **Name**: `GEMINI_API_KEY`
- **Value**: Your actual Gemini API key
- **Environment**: Production (and Preview)

## 🛠️ **Development Commands**

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 **Project Structure**

```
├── src/
│   ├── components/     # React components
│   ├── services/       # API services (Gemini)
│   ├── types/          # TypeScript definitions
│   └── App.tsx         # Main application
├── vercel.json         # Vercel deployment config
├── vite.config.ts      # Vite configuration
├── start-dev.sh        # Quick start script
└── package.json        # Dependencies and scripts
```

## 🔍 **Troubleshooting**

### **If you see a blank screen:**
1. Check browser console for errors
2. Verify `GEMINI_API_KEY` is set in Vercel
3. Check Vercel deployment logs

### **If build fails:**
1. Run `npm install` to ensure dependencies are installed
2. Check that Node.js is available: `node --version`

### **If API calls fail:**
1. Verify your Gemini API key is valid
2. Check that the key has proper permissions
3. Ensure the key is set in Vercel environment variables

## 📝 **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## 🔒 **Security Notes**

- Never commit your actual API key to version control
- Use environment variables for all sensitive data
- The `.env.local` file is already in `.gitignore`

## 🎯 **Next Steps**

1. **Get your Gemini API key** from Google AI Studio
2. **Add the API key** to Vercel environment variables
3. **Deploy to Vercel** by connecting your GitHub repository
4. **Test the deployment** by visiting your Vercel URL

Your app is now ready for deployment! 🚀

# KrashiAI - Smart Farming Platform 🌱

An AI-powered smart farming platform designed to empower farmers with data-driven insights. Built with a modern, simple, and responsive UI.

## Features Included 🚀
- **Crop Disease Prediction**: Upload crop images to identify diseases and get AI-based treatments.
- **Soil Fertility Analysis**: Input soil and environmental parameters to get AI crop recommendations.
- **Weather Forecast**: Real-time 7-day weather predictions and farming advice.
- **Pesticide Recommendations**: Safe pesticide suggestions based on selected crops and diseases.
- **Mandi Prices Tracking**: Live daily price updates from multiple markets.
- **Price Forecasting**: Advanced AI graphs to predict price movement up to 30 days ahead.
- **Farmer Dashboard**: An intuitive, glassmorphism-inspired UI customized for rural users.
- **Multi-language Ready**: Basic English and Hindi i18n support.
- **AI Chatbot UI**: A built-in AI assistant interface to guide farmers.
- **Admin Dashboard**: Manage crops, users, and general analytics.

## Tech Stack 🛠️
- **Frontend Framework**: React 18, Vite
- **Styling**: Tailwind CSS (v4)
- **Routing**: React Router DOM (v6)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Internationalization**: i18next
- **Animations**: CSS transitions (Tailwind) / Framer Motion ready

## Setup Instructions 💻

**1. Clone or download the repository.**

**2. Navigate to the project directory:**
```bash
cd smart
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the development server:**
```bash
npm run dev
```

**5. Open in Browser:**
Navigate to `http://localhost:5173` to see the app running.

## Folder Structure 📂
```
/src
  /assets        - Images and static files
  /components    - Reusable UI elements (Navbar, Sidebar, Footer, Chatbot)
  /layouts       - MainLayout and DashboardLayout for structured routing
  /pages         - Individual views split by role (Public, Dashboard, Admin)
  /i18n          - Internationalization files
  App.jsx        - Main routing configuration
  index.css      - Tailwind CSS imports and custom root configurations
```

## Vercel Deployment Instructions 🌐
This project is Vite-based and highly optimized for Vercel deployment.

1. Create a free account at [Vercel](https://vercel.com/)
2. Install Vercel CLI via npm (optional): `npm i -g vercel`
3. Run `vercel` command inside the project directory and follow instructions.
4. **Via GitHub/GitLab:** Direct integration with your git repository. Add new project, authorize GitHub, select repository and click "Deploy". Built-in settings for Vite will automatically be detected:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. After build finishes, your live smart farming app will be live and ready for production!

## Important Notes 💡
- The application currently uses **mock data** to emulate AI predictions. Once backend endpoints are established, simply replace the `setTimeout` mock calls with proper `axios.post` / `axios.get` calls in the respective pages (e.g. `CropDiseasePage.jsx` and `SoilFertilityPage.jsx`).
- Routing is secured by a mock `ProtectedRoute` wrapper in `App.jsx`. Change `isAuthenticated` variable logic to actual Redux/Context auth state.

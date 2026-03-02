import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "app_name": "KrashiAI",
            "home": "Home",
            "about": "About Us",
            "services": "Services",
            "contact": "Contact Us",
            "login": "Login",
            "register": "Register",
            "dashboard": "Dashboard",
            "switch_lang": "हिंदी में बदलें",
            "hero_title": "Smart Farming for a Better Future",
            "hero_subtitle": "Empowering farmers with AI-driven insights for crop disease, soil fertility, and market prices.",
            "get_started": "Get Started",
            "features": "Our Features",
            "crop_disease": "Crop Disease Prediction",
            "soil_fertility": "Soil Fertility Analysis",
            "weather_forecast": "Weather Forecast",
            "pesticide_rec": "Pesticide Recommendation",
            "mandi_price": "Mandi Prices",
            "price_forecast": "Price Forecasting"
        }
    },
    hi: {
        translation: {
            "app_name": "कृषि-AI",
            "home": "होम",
            "about": "हमारे बारे में",
            "services": "सेवाएं",
            "contact": "संपर्क करें",
            "login": "लॉग इन",
            "register": "रजिस्टर",
            "dashboard": "डैशबोर्ड",
            "switch_lang": "Switch to English",
            "hero_title": "बेहतर भविष्य के लिए स्मार्ट खेती",
            "hero_subtitle": "फसल रोग, मिट्टी की उर्वरता और बाजार मूल्य के लिए एआई (AI) आधारित जानकारी के साथ किसानों का सशक्तिकरण।",
            "get_started": "शुरू करें",
            "features": "हमारी विशेषताएं",
            "crop_disease": "फसल रोग की भविष्यवाणी",
            "soil_fertility": "मिट्टी की उर्वरता का विश्लेषण",
            "weather_forecast": "मौसम का पूर्वानुमान",
            "pesticide_rec": "कीटनाशक की सिफारिश",
            "mandi_price": "मंडी के भाव",
            "price_forecast": "कीमत का पूर्वानुमान"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

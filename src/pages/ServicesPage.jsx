import { Leaf, MapPin, CloudRain, Shield, TrendingUp, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesPage = () => {
    const services = [
        {
            title: "Crop Disease Prediction",
            desc: "Instant AI analysis of crop images to detect diseases, determine root causes, and suggest effective treatments.",
            icon: Leaf, color: "from-green-400 to-green-600 shadow-green-500/30"
        },
        {
            title: "Soil Fertility Analysis",
            desc: "Comprehensive evaluation of soil NPK levels, pH, and environmental factors to recommend optimal crops.",
            icon: MapPin, color: "from-amber-400 to-amber-600 shadow-amber-500/30"
        },
        {
            title: "Weather Forecast",
            desc: "Hyper-local weather tracking and 7-day forecasting tailored for agricultural planning and risk mitigation.",
            icon: CloudRain, color: "from-blue-400 to-blue-600 shadow-blue-500/30"
        },
        {
            title: "Pesticide Recommendation",
            desc: "Safe and effective pesticide suggestions complete with dosage guidelines, market prices, and safety instructions.",
            icon: Shield, color: "from-red-400 to-red-600 shadow-red-500/30"
        },
        {
            title: "Mandi Price Tracking",
            desc: "Live market prices from various mandis across your state, helping you make informed selling decisions.",
            icon: TrendingUp, color: "from-purple-400 to-purple-600 shadow-purple-500/30"
        },
        {
            title: "Crop Price Forecasting",
            desc: "Advanced AI models predicting future crop price trends over the next 30 days to maximize your profits.",
            icon: Cpu, color: "from-indigo-400 to-indigo-600 shadow-indigo-500/30"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-24 relative overflow-hidden">
            {/* Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 font-bold text-sm tracking-wider uppercase mb-4 border border-primary-100 shadow-sm">AI Features</span>
                    <h1 className="text-5xl font-black text-slate-900 sm:text-6xl mb-6 tracking-tight drop-shadow-sm">
                        Our Services
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        A comprehensive suite of cutting-edge AI solutions tailored specifically for modern agricultural success and exponential growth.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, idx) => (
                        <motion.div
                            variants={itemVariants}
                            key={idx}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white hover:border-primary-100 hover:-translate-y-3 transition-all duration-300 group overflow-hidden relative cursor-pointer"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform opacity-50 z-0"></div>

                            <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg text-white group-hover:rotate-6 transition-transform relative z-10`}>
                                <service.icon className="h-8 w-8" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary-600 transition-colors relative z-10">{service.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium relative z-10">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesPage;

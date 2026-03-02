import { useTranslation } from 'react-i18next';
import { ArrowRight, Leaf, MapPin, CloudRain, Shield, TrendingUp, Cpu, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
    const { t } = useTranslation();

    const features = [
        {
            title: t('crop_disease'),
            description: "Upload a photo of your crop to instantly detect diseases and get treatment recommendations.",
            icon: Leaf, color: "from-green-400 to-green-600 shadow-green-500/30", link: "/dashboard/crop-disease"
        },
        {
            title: t('soil_fertility'),
            description: "Analyze NPK values, pH, and climate data to find the best crops for your land.",
            icon: MapPin, color: "from-amber-400 to-amber-600 shadow-amber-500/30", link: "/dashboard/soil-fertility"
        },
        {
            title: t('weather_forecast'),
            description: "Get real-time weather updates, 7-day forecasts, and farming advice based on weather.",
            icon: CloudRain, color: "from-blue-400 to-blue-600 shadow-blue-500/30", link: "/dashboard/weather"
        },
        {
            title: t('pesticide_rec'),
            description: "Find the right pesticide for your crop disease, with dosage and safety warnings.",
            icon: Shield, color: "from-red-400 to-red-600 shadow-red-500/30", link: "/dashboard/pesticide"
        },
        {
            title: t('mandi_price'),
            description: "Check live market prices for your crops across different mandis (markets).",
            icon: TrendingUp, color: "from-primary-400 to-primary-600 shadow-primary-500/30", link: "/dashboard/mandi-prices"
        },
        {
            title: t('price_forecast'),
            description: "Predict future crop prices using AI to decide the best time to sell your produce.",
            icon: Cpu, color: "from-indigo-400 to-indigo-600 shadow-indigo-500/30", link: "/dashboard/price-forecast"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Bright, Modern Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-primary-50 via-white to-white">
                {/* Clean, abstract background elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-200 to-primary-100 rounded-full blur-[120px] opacity-60 z-0 transform translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-100 to-amber-50 rounded-full blur-[100px] opacity-70 z-0 transform -translate-x-1/4 translate-y-1/4"></div>
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-50 z-0 transform -translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 mb-8 shadow-sm tracking-wide">
                                <span className="flex h-2.5 w-2.5 rounded-full bg-primary-500 animate-pulse"></span>
                                <span className="text-sm font-bold text-primary-700 uppercase">Next-Gen Agricultural AI</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
                                Grow Smarter <br />With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">KrashiAI</span>
                            </h1>

                            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-xl">
                                Empower your farm with instant disease detection, precise soil analysis, and predictive market insights to grow healthier crops and maximize your profits.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link
                                    to="/register"
                                    className="bg-primary-600 text-white hover:bg-primary-700 px-8 py-4.5 rounded-2xl text-lg font-bold shadow-xl shadow-primary-500/30 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Get Started Free <ArrowRight className="h-5 w-5" />
                                </Link>
                                <button
                                    className="bg-white text-slate-700 hover:text-primary-600 border border-slate-200 px-8 py-4.5 rounded-2xl text-lg font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
                                >
                                    <Play className="h-5 w-5 text-primary-500" /> Watch Demo
                                </button>
                            </div>

                            <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
                                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary-500" /> No Credit Card Needed</div>
                                <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary-500" /> Free Forever Tier</div>
                            </div>
                        </motion.div>

                        {/* Beautiful Floating Interactive UI Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block relative"
                        >
                            <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/60 shadow-2xl shadow-primary-500/10 relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                                    <div>
                                        <h3 className="text-slate-900 font-black text-xl">AI Assistant Accuracy</h3>
                                        <p className="text-slate-500 text-sm font-medium mt-1">Based on last 10,000 scans</p>
                                    </div>
                                    <div className="bg-primary-50 text-primary-600 px-4 py-2 rounded-xl text-sm font-bold border border-primary-100">
                                        +4.2% Growth
                                    </div>
                                </div>

                                <div className="flex items-end gap-3 mb-10">
                                    <span className="text-7xl font-black text-slate-900 tracking-tighter">99.2<span className="text-4xl text-slate-400">%</span></span>
                                    <span className="text-primary-500 mb-2 font-bold flex items-center bg-primary-50 px-2 py-1 rounded-lg"><TrendingUp className="h-5 w-5 mr-1" /> High</span>
                                </div>

                                <div className="space-y-4">
                                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-5 rounded-2xl flex items-center gap-5 border border-slate-100 shadow-sm cursor-pointer hover:border-primary-200 transition-colors">
                                        <div className="bg-gradient-to-br from-green-400 to-green-500 p-4 rounded-xl shadow-lg shadow-green-500/20"><Leaf className="h-6 w-6 text-white" /></div>
                                        <div>
                                            <p className="text-slate-900 font-bold text-lg">Crop Scanner</p>
                                            <p className="text-slate-500 text-sm font-medium">Analyzed 1.2k+ plants today</p>
                                        </div>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-5 rounded-2xl flex items-center gap-5 border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-colors">
                                        <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-xl shadow-lg shadow-blue-500/20"><MapPin className="h-6 w-6 text-white" /></div>
                                        <div>
                                            <p className="text-slate-900 font-bold text-lg">Soil Health Analysis</p>
                                            <p className="text-slate-500 text-sm font-medium">Perfect conditions for Wheat</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Accent graphics */}
                            <div className="absolute top-10 -right-10 w-24 h-24 bg-primary-100 rounded-full border border-primary-200 flex items-center justify-center animate-bounce shadow-xl" style={{ animationDuration: '3s' }}>
                                <Leaf className="h-10 w-10 text-primary-500" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-base text-primary-600 font-bold tracking-widest uppercase mb-2">Powerful Capabilities</h2>
                        <p className="text-4xl leading-tight font-black tracking-tight text-slate-900 sm:text-5xl">
                            Everything your farm needs.
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto font-medium">
                            Our AI tools are built to protect your crops and maximize your yields effortlessly.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                variants={itemVariants}
                                key={index}
                                className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative cursor-pointer"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform opacity-50 z-0"></div>

                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg text-white group-hover:rotate-6 transition-transform relative z-10`}>
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary-600 transition-colors relative z-10">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 mb-8 leading-relaxed font-medium relative z-10">
                                    {feature.description}
                                </p>
                                <Link to={feature.link} className="inline-flex text-primary-600 font-bold items-center gap-2 hover:text-primary-700 bg-primary-50 px-5 py-2.5 rounded-full transition-all group-hover:bg-primary-100 relative z-10">
                                    Try Now <ArrowRight className="h-4 w-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-40 -left-40 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-70"></div>
                    <div className="absolute bottom-40 -right-40 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-70"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-black text-slate-900 sm:text-5xl">
                            How It Works
                        </h2>
                        <p className="mt-4 text-xl text-slate-500 font-medium">Three simple steps to revolutionary farming.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting dashed line */}
                        <div className="hidden md:block absolute top-12 left-20 right-20 border-t-4 border-dashed border-primary-100 z-0 content-['']"></div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
                        >
                            {[
                                { step: "1", title: "Sign Up", desc: "Create your free account and set up your farm profile in seconds." },
                                { step: "2", title: "Analyze", desc: "Upload crop photos or enter soil data for instant, accurate AI analysis." },
                                { step: "3", title: "Act & Grow", desc: "Get actionable advice and see your farm's productivity and profits soar." }
                            ].map((item, idx) => (
                                <motion.div variants={itemVariants} key={idx} className="flex flex-col items-center text-center group">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-24 h-24 bg-white border-4 border-primary-100 rounded-3xl flex items-center justify-center text-4xl font-black text-primary-600 shadow-xl mb-8 shadow-primary-500/10 group-hover:border-primary-500 group-hover:bg-primary-50 transition-all"
                                    >
                                        {item.step}
                                    </motion.div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Beautiful Light CTA Section */}
            <section className="py-24 relative overflow-hidden mt-auto">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2940&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-10 mix-blend-multiply"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 flex via-primary-600 to-green-700 opacity-95"></div>
                </div>

                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] opacity-20 z-0"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300 rounded-full blur-[120px] opacity-20 z-0"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
                >
                    <h2 className="text-4xl font-black text-white sm:text-6xl mb-6 leading-tight tracking-tight drop-shadow-md">
                        Ready to transform your harvest?
                    </h2>
                    <p className="text-xl text-primary-50 mb-10 font-bold max-w-2xl mx-auto drop-shadow-sm">
                        Join thousands of successful farmers already using KrashiAI to protect crops, enrich soil, and boost profits.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-white text-primary-700 hover:text-primary-800 px-10 py-5 rounded-2xl text-xl font-black shadow-2xl transition-all transform hover:-translate-y-2 hover:shadow-primary-900/40"
                    >
                        Create Free Account
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default HomePage;

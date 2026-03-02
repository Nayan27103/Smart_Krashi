import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full blur-[100px] opacity-40"></div>
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-200 rounded-full blur-[100px] opacity-40"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 font-bold text-sm tracking-wider uppercase mb-4 border border-primary-100">Our Story</span>
                    <h1 className="text-5xl font-black text-slate-900 mb-6 drop-shadow-sm">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">KrashiAI</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass rounded-3xl shadow-2xl p-8 lg:p-14 space-y-8 text-xl text-slate-600 border border-white relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary-100 to-transparent rounded-full opacity-50 blur-xl"></div>

                    <p className="leading-relaxed relative z-10 font-medium text-slate-700">
                        <strong className="text-primary-600 font-black text-2xl">KrashiAI</strong> is a revolutionary smart farming platform designed to empower farmers with the latest advancements in Artificial Intelligence.
                        Our mission is to bring accessible, easy-to-understand, and highly effective technological tools directly to rural communities.
                    </p>
                    <p className="leading-relaxed font-medium">
                        By analyzing crop images, soil data, and live market prices, we provide actionable insights that help farmers increase yield, reduce disease losses, and maximize profits using predictive intelligence.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 shadow-xl mt-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 -mr-10 -mt-10 blur-2xl"></div>
                        <h3 className="text-2xl font-black text-white mb-3 relative z-10 flex items-center gap-2">
                            <span className="bg-white/20 p-2 rounded-lg">🎯</span> Our Vision
                        </h3>
                        <p className="text-primary-50 font-medium text-lg relative z-10 leading-relaxed">
                            A future where every farmer, regardless of their location, has a personal AI advisor in their pocket to make data-driven, profitable decisions.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;

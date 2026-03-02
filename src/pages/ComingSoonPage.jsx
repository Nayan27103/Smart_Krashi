import { Link } from 'react-router-dom';
import { Home, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ComingSoonPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[120px] opacity-30 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl w-full text-center space-y-8 relative z-10 bg-white/60 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/80"
            >
                <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                    className="mx-auto w-24 h-24 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary-500/30 mb-8"
                >
                    <Rocket className="h-12 w-12 text-white" />
                </motion.div>

                <div className="space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3"
                    >
                        Coming Soon <Sparkles className="h-8 w-8 text-amber-400" />
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-slate-500 font-medium leading-relaxed"
                    >
                        We're working hard to bring this feature to life. It will be available shortly to help enhance your farming experience.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-slate-900/20 transition-all transform hover:-translate-y-1 hover:scale-105"
                    >
                        <Home className="h-5 w-5" />
                        Back to Dashboard
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ComingSoonPage;

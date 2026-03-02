import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Leaf, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
    };

    const navLinks = [
        { name: t('home'), path: '/' },
        { name: t('about'), path: '/about' },
        { name: t('services'), path: '/services' },
        { name: t('contact'), path: '/contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-primary-100/50 py-2' : 'bg-transparent py-4'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2.5 rounded-xl text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300">
                                <Leaf className="h-5 w-5" />
                            </div>
                            <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${scrolled || location.pathname !== '/' ? 'text-slate-800' : 'text-slate-900 group-hover:text-primary-600'}`}>
                                Krashi<span className="text-primary-600">AI</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                        <div className={`flex space-x-1 p-1 rounded-full ${scrolled ? 'bg-slate-100/80' : 'bg-white/80 shadow-sm border border-slate-100'}`}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${location.pathname === link.path
                                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                                            : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                            <button
                                onClick={toggleLang}
                                className={`flex items-center gap-1 text-slate-600 hover:text-primary-600 transition-colors p-2 rounded-full shadow-sm hover:shadow ${scrolled ? 'bg-white' : 'bg-white/80'}`}
                                title="Switch Language"
                            >
                                <Globe className="h-5 w-5" />
                            </button>

                            <Link
                                to="/login"
                                className={`font-bold hover:text-primary-600 transition-colors px-3 ${scrolled ? 'text-slate-700' : 'text-slate-800'}`}>
                                {t('login')}
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-primary-600 hover:to-primary-500 text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-slate-700 hover:border-primary-400">
                                {t('register')}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={toggleLang}
                            className={`flex items-center gap-1 text-slate-600 ${scrolled ? 'bg-slate-100' : 'bg-white/90'} p-2 rounded-full shadow-sm`}
                        >
                            <Globe className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-2.5 rounded-full shadow-md"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white border-b border-slate-100 shadow-2xl absolute w-full top-full"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`block px-4 py-3 rounded-2xl text-base font-bold transition-colors ${location.pathname === link.path
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex gap-3 px-2 border-t border-slate-100 mt-4">
                                <Link
                                    to="/login"
                                    className="flex-1 text-center bg-slate-50 text-slate-900 font-bold py-3 rounded-2xl shadow-sm border border-slate-200"
                                    onClick={() => setIsOpen(false)}>
                                    {t('login')}
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex-1 text-center bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold py-3 rounded-2xl shadow-md"
                                    onClick={() => setIsOpen(false)}>
                                    {t('register')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;

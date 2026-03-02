import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-primary-500 p-1.5 rounded-lg text-white">
                                <Leaf className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                {t('app_name')}
                            </span>
                        </Link>
                        <p className="text-slate-500 max-w-xs">
                            Empowering farmers with AI-driven insights for crop disease, soil fertility, and market prices.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
                            Platform
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className="text-slate-500 hover:text-primary-600">
                                    {t('about')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-500 hover:text-primary-600">
                                    {t('services')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/privacy" className="text-slate-500 hover:text-primary-600">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-slate-500 hover:text-primary-600">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-slate-400">
                        &copy; {new Date().getFullYear()} {t('app_name')}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

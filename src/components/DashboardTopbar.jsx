import { useState } from 'react';
import { Menu, Bell, User as UserIcon, Search, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DashboardTopbar = ({ isAdmin }) => {
    const { t, i18n } = useTranslation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
    };

    return (
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm relative z-30">
            <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <button className="md:hidden text-slate-500 hover:text-primary-600 focus:outline-none p-2 rounded-full hover:bg-slate-50 transition">
                    <Menu className="h-6 w-6" />
                </button>

                {/* Search Bar (Hidden on small screens) */}
                <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 md:w-80 group hover:ring-2 hover:ring-primary-200 focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                    <Search className="h-4 w-4 text-slate-400 group-hover:text-primary-500 group-focus-within:text-primary-600 transition" />
                    <input
                        type="text"
                        placeholder="Search crops, prices, diseases..."
                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm ml-2 w-full text-slate-700 placeholder-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 relative">
                {/* Notification Bell */}
                <button className="text-slate-500 hover:text-primary-600 focus:outline-none p-2 rounded-full hover:bg-slate-50 transition relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                {/* Language Toggle */}
                <button
                    onClick={toggleLang}
                    className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-primary-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200 hover:border-primary-200"
                >
                    <Globe className="h-4 w-4" />
                    <span>{i18n.language === 'en' ? 'हिन्दी' : 'En'}</span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 focus:outline-none bg-slate-50 hover:bg-slate-100 p-1 pr-3 rounded-full border border-slate-200 transition-all"
                    >
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                            <UserIcon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 hidden sm:block">
                            {isAdmin ? 'Admin User' : 'Kisan Bhai'}
                        </span>
                        <ChevronDown className="h-4 w-4 text-slate-400 hidden sm:block" />
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-slate-100 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-3 sm:hidden">
                                <p className="text-sm font-medium text-slate-900">{isAdmin ? 'Admin User' : 'Kisan Bhai'}</p>
                                <p className="text-xs text-slate-500 truncate">farmer@krashiai.com</p>
                            </div>

                            <div className="py-1">
                                <a href="#profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600">Your Profile</a>
                                <a href="#settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600">Settings</a>
                            </div>

                            <div className="py-1">
                                <a href="/" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashboardTopbar;

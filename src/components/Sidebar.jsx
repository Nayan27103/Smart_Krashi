import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
    Leaf, Home, Search, MapPin, SearchCheck, User, Shield,
    Settings, LogOut, Sun, CloudRain, Droplets
} from 'lucide-react';

const Sidebar = ({ isAdmin }) => {
    const navigate = useNavigate();
    const farmerLinks = [
        { to: "/dashboard", icon: Home, label: "Overview" },
        { to: "/dashboard/crop-disease", icon: SearchCheck, label: "Crop Disease" },
        { to: "/dashboard/soil-fertility", icon: MapPin, label: "Soil Fertility" },
        { to: "/dashboard/weather", icon: CloudRain, label: "Weather" },
        { to: "/dashboard/pesticide", icon: Shield, label: "Pesticide" },
        { to: "/dashboard/mandi-prices", icon: Search, label: "Mandi Prices" },
        { to: "/dashboard/price-forecast", icon: Leaf, label: "Price Forecast" },
    ];

    const adminLinks = [
        { to: "/admin", icon: Home, label: "Dashboard" },
        { to: "/admin/crops", icon: Leaf, label: "Manage Crops" },
        { to: "/admin/users", icon: User, label: "Users" },
        { to: "/admin/settings", icon: Settings, label: "Settings" }
    ];

    const links = isAdmin ? adminLinks : farmerLinks;

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full shadow-sm relative z-20">
            <div className="p-6 border-b border-slate-100">
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-primary-500 p-2 rounded-xl text-white shadow-md">
                        <Leaf className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                        KrashiAI
                    </span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
                    {isAdmin ? 'Admin Menu' : 'Farm Tools'}
                </div>

                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === "/dashboard" || link.to === "/admin"}
                        className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
              ${isActive
                                ? 'bg-primary-50 text-primary-700 font-medium'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                            }
            `}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary-500 rounded-r-full" />
                                )}
                                <link.icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'}`} />
                                <span>{link.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors group text-left"
                >
                    <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

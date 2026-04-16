import { useState, useEffect } from 'react';
import { Leaf, Droplets, CloudRain, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

const data = [
    { name: 'Mon', price: 4000 },
    { name: 'Tue', price: 3000 },
    { name: 'Wed', price: 2000 },
    { name: 'Thu', price: 2780 },
    { name: 'Fri', price: 1890 },
    { name: 'Sat', price: 2390 },
    { name: 'Sun', price: 3490 },
];

const iconMap = {
    Leaf,
    Droplets,
    CloudRain,
    TrendingUp
};

const StatCard = ({ title, value, status, iconName, color }) => {
    const Icon = iconMap[iconName] || Leaf;
    return (
        <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-2xl ${color} shadow-inner`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-green-600 bg-green-50 w-max px-2.5 py-1 rounded-full">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>{status}</span>
            </div>
        </motion.div>
    )
};

const DashboardOverview = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/auth/dashboard/', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await response.json();
                setSummary(data);
            } catch (error) {
                console.error("Dashboard fetch failed", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading || !summary) return <div className="p-8 text-center animate-pulse text-slate-500 font-bold">Refreshing Farm Status...</div>;
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl font-bold text-slate-900">Welcome back, Kisan Bhai! 👋</h1>
                <p className="text-slate-500">Here's what is happening on your farm today.</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {summary.stats.map((stat, i) => (
                    <motion.div key={i} variants={itemVariants}>
                        <StatCard 
                            title={stat.title} 
                            value={stat.value} 
                            status={stat.status} 
                            iconName={stat.icon} 
                            color={stat.color} 
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Wheat Price Trend Chart */}
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Wheat Price Trend</h3>
                            <p className="text-sm text-slate-500">Past 7 days market price</p>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium">
                            <span className="sr-only">Select Crop</span>
                            <option>Wheat</option>
                            <option>Rice</option>
                        </select>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={summary.price_trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={['auto', 'auto']} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                                    />
                                    <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Rain Forecast Chart */}
                <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Rain Forecast</h3>
                            <p className="text-sm text-slate-500">Probability of rain (%)</p>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={summary.rain_forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="rain" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
                                </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </motion.div>

            {/* Action Items */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" /> Action Items for Today
                </h3>
                <ul className="space-y-4">
                    {summary.action_items.map((item, i) => (
                        <motion.li
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            className={`flex items-center justify-between p-4 rounded-2xl border ${item.type === 'warning' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-xl ${item.type === 'warning' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {item.type === 'warning' ? <AlertTriangle className="h-5 w-5" /> : <Leaf className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{item.title}</p>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default DashboardOverview;

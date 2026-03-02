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

const rainData = [
    { name: 'Mon', rain: 20 },
    { name: 'Tue', rain: 35 },
    { name: 'Wed', rain: 10 },
    { name: 'Thu', rain: 0 },
    { name: 'Fri', rain: 60 },
    { name: 'Sat', rain: 45 },
    { name: 'Sun', rain: 15 },
];

const StatCard = ({ title, value, status, icon: Icon, color }) => (
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
);

const DashboardOverview = () => {
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
                <motion.div variants={itemVariants}>
                    <StatCard title="Healthy Crops" value="85%" status="+5% this week" icon={Leaf} color="bg-green-100 text-green-600" />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard title="Soil Moisture" value="Good" status="Optimal Level" icon={Droplets} color="bg-blue-100 text-blue-600" />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard title="Weather Alert" value="Rain Expected" status="Tomorrow, 2pm" icon={CloudRain} color="bg-indigo-100 text-indigo-600" />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard title="Wheat Avg Price" value="₹2,450/q" status="+₹50 since yday" icon={TrendingUp} color="bg-amber-100 text-amber-600" />
                </motion.div>
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
                            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
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
                            <BarChart data={rainData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    <motion.li
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-red-100 p-2 rounded-xl text-red-600">
                                <Leaf className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Check tomato plants</p>
                                <p className="text-sm text-slate-600">Possible early blight detected via recent image upload.</p>
                            </div>
                        </div>
                        <button className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition">
                            View Details
                        </button>
                    </motion.li>
                    {/* Add more items naturally */}
                </ul>
            </motion.div>
        </motion.div>
    );
};

export default DashboardOverview;

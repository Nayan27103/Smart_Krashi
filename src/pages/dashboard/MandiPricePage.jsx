import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Search, ArrowRight, MapPin } from 'lucide-react';

const mockData = [
    { date: '1 Mar', price: 2100 },
    { date: '2 Mar', price: 2150 },
    { date: '3 Mar', price: 2130 },
    { date: '4 Mar', price: 2180 },
    { date: '5 Mar', price: 2200 },
    { date: '6 Mar', price: 2250 },
    { date: '7 Mar', price: 2280 },
];

const MandiPricePage = () => {
    const [selectedCrop, setSelectedCrop] = useState('wheat');
    const [selectedMandi, setSelectedMandi] = useState('indore');
    const [showData, setShowData] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setShowData(true);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Mandi Price Tracking</h1>
                <p className="text-slate-500 mt-2 text-lg">Live market prices from trusted mandis to help you sell at the right time.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row gap-4 relative z-10 w-full">
                    <div className="flex-1 relative">
                        <select
                            value={selectedCrop}
                            onChange={(e) => setSelectedCrop(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 flex pl-5 pr-10 text-slate-900 font-bold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm appearance-none transition"
                        >
                            <option value="wheat">🌾 Wheat (Gehu)</option>
                            <option value="rice">🍚 Rice (Dhan)</option>
                            <option value="soyabean">🌱 Soyabean</option>
                            <option value="cotton">☁️ Cotton (Kapas)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <span className="text-xs font-medium uppercase tracking-wider">Crop</span>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <select
                            value={selectedMandi}
                            onChange={(e) => setSelectedMandi(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 flex pl-5 pr-10 text-slate-900 font-bold focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm appearance-none transition"
                        >
                            <option value="indore">Indore Mandi</option>
                            <option value="ujjain">Ujjain Mandi</option>
                            <option value="bhopal">Bhopal Mandi</option>
                            <option value="mandsaur">Mandsaur Mandi</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                            <span className="text-xs font-medium uppercase tracking-wider">Market</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-primary-600 text-white rounded-2xl px-10 py-4 font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        Check Prices
                    </button>
                </form>
            </div>

            {showData && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-500">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none transform translate-x-4 -translate-y-4">
                                <TrendingUp className="h-32 w-32" />
                            </div>
                            <h3 className="text-green-100 font-semibold uppercase tracking-wider mb-2 relative z-10">Current Live Price</h3>
                            <p className="text-5xl font-extrabold mb-1 relative z-10">₹2,280</p>
                            <p className="text-green-200 font-medium mb-8 relative z-10">Per Quintal (100kg)</p>

                            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md w-max relative z-10">
                                <TrendingUp className="h-5 w-5" />
                                <span className="font-bold">+₹30 (+1.3%)</span>
                                <span className="text-xs ml-1 opacity-80">vs yesterday</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                            <h3 className="text-slate-800 font-bold text-xl mb-6">Price Details</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500 font-medium">Minimum Price</span>
                                    <span className="font-bold text-slate-900">₹2,100</span>
                                </li>
                                <li className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500 font-medium">Maximum Price</span>
                                    <span className="font-bold text-slate-900">₹2,350</span>
                                </li>
                                <li className="flex justify-between items-center py-2 border-b border-slate-100">
                                    <span className="text-slate-500 font-medium">Arrival Volume</span>
                                    <span className="font-bold text-slate-900">1,240 Tonnes</span>
                                </li>
                                <li className="flex justify-between items-center py-2">
                                    <span className="text-slate-500 font-medium">Quality Grade</span>
                                    <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">A (Premium)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-50 rounded-[2.5rem] p-8 border border-amber-100 shadow-sm relative overflow-hidden">
                            <h3 className="text-amber-900 font-bold text-xl mb-3 flex items-center gap-2">
                                AI Suggestion
                            </h3>
                            <p className="text-amber-800 leading-relaxed font-medium mb-6">
                                Prices are showing an upward trend. Holding your stock for another 3-5 days could yield a 5% higher return based on historical arrival patterns.
                            </p>
                            <button className="flex items-center gap-2 font-bold text-amber-700 hover:text-amber-800 group">
                                View detailed forecast <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Historical Price Trend</h3>
                                <p className="text-slate-500 font-medium mt-1">Past 7 Days - {selectedMandi.toUpperCase()}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 text-sm font-bold bg-primary-50 text-primary-600 border border-primary-100 rounded-xl hover:bg-primary-100 transition">7D</button>
                                <button className="px-4 py-2 text-sm font-bold bg-white text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">1M</button>
                                <button className="px-4 py-2 text-sm font-bold bg-white text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">1Y</button>
                            </div>
                        </div>
                        <div className="h-[400px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorMandiPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} domain={['dataMin - 100', 'dataMax + 100']} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}
                                        itemStyle={{ fontWeight: '600', color: '#16a34a' }}
                                        formatter={(value) => [`₹${value}`, 'Price']}
                                    />
                                    <Area type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={4} fillOpacity={1} fill="url(#colorMandiPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MandiPricePage;

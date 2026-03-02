import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, Bar } from 'recharts';
import { Cpu, Calendar, TrendingUp, Filter } from 'lucide-react';

const forecastData = [
    { date: '1 Apr', actual: 2200, predicted: null },
    { date: '8 Apr', actual: 2350, predicted: null },
    { date: '15 Apr', actual: 2400, predicted: null },
    { date: '22 Apr', actual: 2420, predicted: 2420 },
    { date: '29 Apr', actual: null, predicted: 2480 },
    { date: '6 May', actual: null, predicted: 2550 },
    { date: '13 May', actual: null, predicted: 2600 },
];

const PriceForecastPage = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                        AI Price Forecasting <Cpu className="h-6 w-6 text-primary-500" />
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Predict future crop prices up to 30 days in advance.</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 shadow-sm">
                        <Filter className="h-4 w-4" /> Filters
                    </button>
                    <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30">
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-xl border border-slate-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="flex gap-4">
                        <div>
                            <label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1 block">Commodity</label>
                            <select className="bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 shadow-sm min-w-[150px]">
                                <option>Wheat (Gehu)</option>
                                <option>Rice</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1 block">Region</label>
                            <select className="bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 shadow-sm min-w-[150px]">
                                <option>Madhya Pradesh</option>
                                <option>Punjab</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-primary-50 border border-primary-100 p-4 rounded-2xl flex items-center gap-4 shadow-inner">
                        <div className="bg-primary-500 p-2 rounded-full text-white">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-primary-900 mb-0.5">30-Day Trend</p>
                            <p className="text-xs text-primary-700 font-medium">Expected +12% increase</p>
                        </div>
                    </div>
                </div>

                <div className="h-[450px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={forecastData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={15} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} domain={[2000, 2800]} />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}
                            />
                            <Area type="monotone" dataKey="actual" name="Historical Price" stroke="#64748b" strokeWidth={3} fill="url(#colorActual)" />
                            <Area type="monotone" dataKey="predicted" name="AI Forecast" stroke="#8b5cf6" strokeWidth={4} strokeDasharray="5 5" fill="url(#colorPredicted)" />
                            <Line type="monotone" dataKey="actual" stroke="#475569" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={4} strokeDasharray="5 5" dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-8 flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-500"></div>
                        <span className="text-sm font-bold text-slate-700">Historical Price</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                        <span className="text-sm font-bold text-slate-700">AI Projected Price</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceForecastPage;

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { Cpu, Calendar, TrendingUp, Filter } from 'lucide-react';

const PriceForecastPage = () => {
    const [commodity, setCommodity] = useState('Wheat');
    const [region, setRegion] = useState('Madhya Pradesh');
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trend, setTrend] = useState({ percent: 12, direction: 'increase' });

    useEffect(() => {
        fetchPriceData();
    }, [commodity, region]);

    const fetchPriceData = async () => {
        setLoading(true);
        try {
            // Simulated historic + fetching predicted from backend
            const response = await fetch('http://127.0.0.1:8000/api/predict-price/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    crop_name: commodity,
                    mandi_location: region,
                    price: commodity === 'Wheat' ? 2420 : 2100
                })
            });

            if (!response.ok) return;
            const data = await response.json();

            // Format data for chart
            const historical = [
                { date: '1 Apr', actual: data.current_price - 200, predicted: null },
                { date: '8 Apr', actual: data.current_price - 100, predicted: null },
                { date: '15 Apr', actual: data.current_price - 50, predicted: null },
                { date: '22 Apr', actual: data.current_price, predicted: data.current_price },
            ];

            const forecast = data.forecast_trend.map((item, i) => ({
                date: `${22 + item.day} Apr`, // simple labeling
                actual: null,
                predicted: item.price
            }));

            setChartData([...historical, ...forecast]);
            
            const diff = ((data.predicted_price - data.current_price) / data.current_price * 100).toFixed(1);
            setTrend({ 
                percent: diff, 
                direction: diff > 0 ? 'increase' : 'decrease' 
            });

        } catch (error) {
            console.error("Forecast fetch failed", error);
        } finally {
            setLoading(false);
        }
    };
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
                            <select 
                                value={commodity}
                                onChange={(e) => setCommodity(e.target.value)}
                                className="bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 shadow-sm min-w-[150px]"
                            >
                                <option value="Wheat">Wheat (Gehu)</option>
                                <option value="Rice">Rice</option>
                                <option value="Cotton">Cotton</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1 block">Region</label>
                            <select 
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 shadow-sm min-w-[150px]"
                            >
                                <option>Madhya Pradesh</option>
                                <option>Punjab</option>
                                <option>Haryana</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-primary-50 border border-primary-100 p-4 rounded-2xl flex items-center gap-4 shadow-inner">
                        <div className="bg-primary-500 p-2 rounded-full text-white">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-primary-900 mb-0.5">30-Day Trend</p>
                            <p className="text-xs text-primary-700 font-medium">Expected {trend.percent}% {trend.direction}</p>
                        </div>
                    </div>
                </div>

                <div className="h-[450px] w-full relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-[2.5rem]">
                            <div className="flex flex-col items-center gap-3">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                                <span className="font-bold text-primary-700">AI Forecasting...</span>
                            </div>
                        </div>
                    )}
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} domain={['auto', 'auto']} />
                            <Tooltip
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}
                            />
                            <Area type="monotone" dataKey="actual" name="Historical Price" stroke="#64748b" strokeWidth={3} fill="url(#colorActual)" connectNulls />
                            <Area type="monotone" dataKey="predicted" name="AI Forecast" stroke="#8b5cf6" strokeWidth={4} strokeDasharray="5 5" fill="url(#colorPredicted)" connectNulls />
                            <Line type="monotone" dataKey="actual" stroke="#475569" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} connectNulls />
                            <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={4} strokeDasharray="5 5" dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} connectNulls />
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

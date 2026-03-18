import { useState, useEffect } from 'react';
import { CloudRain, Sun, Wind, Droplets, MapPin, Search, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../api/axios';

const WeatherPage = () => {
    const [location, setLocation] = useState('Indore');
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async (city) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await api.get(`/weather/?location=${city}`);
            setWeather(response.data);
            setLocation(response.data.name);
        } catch (err) {
            setError('Could not find weather data for that location.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather('Indore');
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            fetchWeather(search);
            setSearch('');
        }
    };

    // Helper for dummy chart data based on current temp
    const getChartData = (temp) => [
        { time: '06:00', temp: temp - 4 },
        { time: '09:00', temp: temp - 2 },
        { time: '12:00', temp: temp },
        { time: '15:00', temp: temp + 2 },
        { time: '18:00', temp: temp - 1 },
        { time: '21:00', temp: temp - 3 },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Weather Forecast</h1>
                    <p className="text-slate-500 mt-2 text-lg">Real-time weather data to plan your farming activities.</p>
                </div>

                <form onSubmit={handleSearch} className="relative w-full md:w-80 group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-slate-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
                        placeholder="Search city or village..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Weather Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

                    {isLoading ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 py-20">
                            <Loader2 className="h-12 w-12 animate-spin text-blue-100" />
                            <p className="font-bold text-blue-100">Fetching Weather...</p>
                        </div>
                    ) : weather ? (
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-8 bg-white/10 w-max px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                                <MapPin className="h-4 w-4" />
                                <span className="font-semibold text-sm uppercase">{weather.name}, {weather.sys.country}</span>
                            </div>

                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <span className="text-7xl font-extrabold tracking-tighter">{Math.round(weather.main.temp)}°</span>
                                    <span className="text-2xl text-blue-200 align-top">C</span>
                                    <p className="text-xl font-medium mt-2 text-blue-100 capitalize">{weather.weather[0].description}</p>
                                </div>
                                <img 
                                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                                    alt="Weather Icon" 
                                    className="h-32 w-32 drop-shadow-xl"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-12 bg-white/10 rounded-3xl p-6 border border-white/20 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <Wind className="h-8 w-8 text-blue-200" />
                                    <div>
                                        <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Wind</p>
                                        <p className="text-lg font-bold">{weather.wind.speed} km/h</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Droplets className="h-8 w-8 text-blue-200" />
                                    <div>
                                        <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Humidity</p>
                                        <p className="text-lg font-bold">{weather.main.humidity}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Chart & Advice */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Temperature Chart */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 h-[350px]">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 font-primary">Temperature Trend</h3>
                        <div className="h-[230px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={getChartData(weather?.main.temp || 26)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}
                                        itemStyle={{ fontWeight: '600' }}
                                    />
                                    <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorTemp)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Farming Advice */}
                    <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Sun className="h-32 w-32 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                            <span className="bg-white text-blue-600 p-2.5 rounded-2xl shadow-sm"><Sun className="h-6 w-6" /></span>
                            Farming Advice
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                    {weather?.main.temp > 30 ? "High temperature detected. Ensure adequate irrigation for water-sensitive crops." : "Temperature is optimal for most farming operations."}
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                    {weather?.main.humidity > 80 ? "High humidity may lead to fungal growth. Monitor crops closely for early signs of disease." : "Humidity levels are within a safe range for spraying pesticides."}
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                    {weather?.wind.speed > 15 ? "Strong winds detected. Avoid spraying pesticides or fertilizers today." : "Moderate wind speeds. Safe for general farm maintenance."}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherPage;

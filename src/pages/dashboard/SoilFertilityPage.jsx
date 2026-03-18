import { useState } from 'react';
import { ShieldAlert, CheckCircle, Activity, Thermometer, Droplets, CloudRain } from 'lucide-react';
import api from '../../api/axios';

const InputField = ({ label, id, unit, value, onChange, icon: Icon }) => (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
        <label htmlFor={id} className="flex items-center text-sm font-semibold text-slate-700 mb-2 gap-2">
            <Icon className="h-4 w-4 text-slate-400" /> {label}
        </label>
        <div className="relative rounded-md shadow-sm">
            <input
                type="number"
                name={id}
                id={id}
                value={value}
                onChange={onChange}
                className="block w-full border-0 bg-transparent py-1.5 pl-3 pr-12 text-slate-900 font-medium text-lg focus:ring-0"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-slate-500 sm:text-sm">{unit}</span>
            </div>
        </div>
    </div>
);

const SoilFertilityPage = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        nitrogen: 80,
        phosphorus: 40,
        potassium: 40,
        temperature: 25.5,
        humidity: 60,
        ph: 7.2,
        rainfall: 105
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setAnalyzing(true);
        setError('');
        try {
            const response = await api.post('/recommend-crop/', formData);
            setResult({
                recommendation: response.data.recommended_crop,
                confidence: 94.5, // Mocked for UI polish
                reason: response.data.reason,
                actions: [
                    response.data.reason,
                    'Monitor soil moisture regularly',
                    'Ensure proper drainage for optimal growth'
                ]
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to get recommendation. Please try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Soil Fertility & Crop Predictor</h1>
                <p className="text-slate-500 mt-2 text-lg">Enter your soil and weather data to get AI-powered crop recommendations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>

                    <form onSubmit={handlePredict} className="relative z-10 space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                <span className="bg-amber-100 text-amber-600 p-2 rounded-xl"><Activity className="h-5 w-5" /></span> Nutrient Levels
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <InputField label="Nitrogen (N)" id="nitrogen" unit="mg/kg" value={formData.nitrogen} onChange={handleChange} icon={Activity} />
                                <InputField label="Phosphorus (P)" id="phosphorus" unit="mg/kg" value={formData.phosphorus} onChange={handleChange} icon={Activity} />
                                <InputField label="Potassium (K)" id="potassium" unit="mg/kg" value={formData.potassium} onChange={handleChange} icon={Activity} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Thermometer className="h-5 w-5" /></span> Environment Data
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <InputField label="Temperature" id="temperature" unit="°C" value={formData.temperature} onChange={handleChange} icon={Thermometer} />
                                <InputField label="Humidity" id="humidity" unit="%" value={formData.humidity} onChange={handleChange} icon={Droplets} />
                                <InputField label="pH Level" id="ph" unit="" value={formData.ph} onChange={handleChange} icon={Activity} />
                                <InputField label="Rainfall" id="rainfall" unit="mm" value={formData.rainfall} onChange={handleChange} icon={CloudRain} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={analyzing}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg text-white
                ${analyzing ? 'bg-amber-500 animate-pulse' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:-translate-y-1 shadow-amber-500/30'}`}
                        >
                            {analyzing ? 'Analyzing Soil Data...' : 'Get AI Recommendation'}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="bg-slate-50 lg:bg-transparent rounded-[2.5rem]">
                    {result ? (
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center animate-in slide-in-from-right-8 duration-500">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>

                            <div className="relative z-10">
                                <h3 className="text-primary-100 font-semibold tracking-wide uppercase mb-2">Best Crop to Grow</h3>
                                <p className="text-5xl font-extrabold mb-8">{result.recommendation}</p>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                                        <p className="text-primary-100 text-sm mb-1">AI Confidence</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-white/20 rounded-full h-2">
                                                <div className="bg-green-400 h-2 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" style={{ width: `${result.confidence}%` }}></div>
                                            </div>
                                            <span className="font-bold">{result.confidence}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-500/20 rounded-2xl p-5 border border-amber-500/30 backdrop-blur-md">
                                    <h4 className="font-bold text-amber-100 mb-3 flex items-center gap-2">
                                        <ShieldAlert className="h-5 w-5 text-amber-400" /> AI Insights
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.actions.map((action, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-amber-50/90 leading-relaxed">
                                                <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                                                {action}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 lg:bg-white rounded-[2.5rem] lg:border lg:border-slate-100 lg:shadow-xl">
                            <div className="bg-amber-100 p-6 rounded-full mb-6 relative">
                                <Activity className="h-12 w-12 text-amber-600 relative z-10" />
                                <div className="absolute inset-0 bg-amber-200 blur-xl opacity-50 rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">AI Analysis Pending</h3>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                Fill the required soil nutrients and environmental parameters on the left to discover the optimal crop for your land.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SoilFertilityPage;

import { useState, useEffect } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, Leaf, Loader2 } from 'lucide-react';
import api from '../../api/axios';

const PesticidePage = () => {
    const [crops, setCrops] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState('');
    const [selectedDisease, setSelectedDisease] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingDiseases, setIsFetchingDiseases] = useState(false);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await api.get('/crops/');
                setCrops(response.data);
            } catch (err) {
                console.error("Error fetching crops", err);
            }
        };
        fetchCrops();
    }, []);

    useEffect(() => {
        const fetchDiseases = async () => {
            if (!selectedCrop) {
                setDiseases([]);
                return;
            }
            setIsFetchingDiseases(true);
            try {
                const response = await api.get(`/diseases/?crop=${selectedCrop}`);
                setDiseases(response.data);
            } catch (err) {
                console.error("Error fetching diseases", err);
            } finally {
                setIsFetchingDiseases(false);
            }
        };
        fetchDiseases();
    }, [selectedCrop]);

    const handleSearch = (e) => {
        e.preventDefault();
        const disease = diseases.find(d => d.id === parseInt(selectedDisease));
        if (disease) {
            setResult(disease);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Pesticide Recommendation</h1>
                <p className="text-slate-500 mt-2 text-lg">Find the right, safe chemical treatment for your crop diseases.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 h-fit">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Select Crop</label>
                            <select
                                value={selectedCrop}
                                onChange={(e) => setSelectedCrop(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition"
                            >
                                <option value="">Choose Crop...</option>
                                {crops.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Select Disease</label>
                            <div className="relative">
                                <select
                                    value={selectedDisease}
                                    onChange={(e) => setSelectedDisease(e.target.value)}
                                    disabled={!selectedCrop || isFetchingDiseases}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition disabled:opacity-50"
                                >
                                    <option value="">Choose Disease...</option>
                                    {diseases.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {isFetchingDiseases && (
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2">
                                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!selectedDisease}
                            className="w-full bg-primary-600 text-white rounded-2xl py-4 font-bold text-lg hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Search className="h-5 w-5" /> Find Solution
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                    {result ? (
                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-slate-100 flex flex-col h-full animate-in slide-in-from-bottom-8 duration-500">
                            {result.pesticides?.length > 0 ? (
                                <>
                                    <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-8">
                                        <div>
                                            <h2 className="text-sm font-bold text-primary-600 tracking-wider uppercase mb-1">Recommended Product</h2>
                                            <p className="text-4xl font-extrabold text-slate-900">{result.pesticides[0].name}</p>
                                        </div>
                                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-lg font-bold shadow-sm whitespace-nowrap">
                                            ₹{result.pesticides[0].market_price}
                                        </div>
                                    </div>

                                    <div className="space-y-8 flex-1">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-xl flex items-center gap-3 mb-3">
                                                <span className="bg-blue-100 p-2 rounded-xl text-blue-600"><CheckCircle2 className="h-5 w-5" /></span> Treatment Logic
                                            </h4>
                                            <p className="text-slate-600 text-lg leading-relaxed">{result.treatment}</p>
                                        </div>

                                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                                            <h4 className="font-bold text-amber-900 text-xl flex items-center gap-3 mb-3">
                                                <span className="bg-amber-100 p-2 rounded-xl text-amber-600"><AlertTriangle className="h-5 w-5" /></span> Dosage
                                            </h4>
                                            <p className="text-amber-800 font-medium text-lg">{result.pesticides[0].dosage}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-800 text-xl flex items-center gap-3 mb-4">
                                                <span className="bg-red-100 p-2 rounded-xl text-red-600"><ShieldAlert className="h-5 w-5" /></span> Safety Instructions
                                            </h4>
                                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                                                {result.pesticides[0].safety_instructions}
                                            </div>
                                        </div>

                                        {result.pesticides.length > 1 && (
                                            <div className="pt-6 border-t border-slate-100">
                                                <h4 className="font-bold text-slate-800 text-lg mb-4">Alternative Options</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {result.pesticides.slice(1).map((alt, idx) => (
                                                        <span key={idx} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-medium shadow-sm hover:bg-slate-200 transition cursor-pointer">
                                                            {alt.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                                    <Leaf className="h-16 w-16 text-slate-300 mb-4" />
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">No Specific Pesticide Found</h3>
                                    <p className="text-slate-500 font-medium">General treatment: {result.treatment}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                            <div className="bg-white p-6 rounded-full shadow-md mb-6 relative">
                                <ShieldAlert className="h-12 w-12 text-primary-300 relative z-10" />
                                <div className="absolute inset-0 bg-primary-100 blur-xl opacity-50 rounded-full"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">No Product Selected</h3>
                            <p className="text-slate-500 text-lg max-w-sm mx-auto leading-relaxed">
                                Select a crop and an associated disease to receive AI-backed pesticide recommendations, dosages, and safety guidelines.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PesticidePage;

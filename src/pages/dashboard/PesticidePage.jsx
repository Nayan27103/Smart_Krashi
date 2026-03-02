import { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, Leaf } from 'lucide-react';

const PesticidePage = () => {
    const [crop, setCrop] = useState('');
    const [disease, setDisease] = useState('');
    const [result, setResult] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (crop && disease) {
            setResult({
                name: 'Mancozeb 75% WP',
                price: '₹350 / 500g',
                why: 'Effective contact fungicide for broad-spectrum disease control like Late Blight.',
                dosage: '2-2.5 grams per liter of water.',
                safety: [
                    'Wear protective clothing and mask.',
                    'Do not spray during high winds.',
                    'Keep away from children and pets.',
                ],
                alternatives: ['Chlorothalonil 75% WP', 'Copper Oxychloride 50% WP']
            });
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
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition"
                            >
                                <option value="">Choose Crop...</option>
                                <option value="wheat">Wheat</option>
                                <option value="rice">Rice</option>
                                <option value="potato">Potato</option>
                                <option value="tomato">Tomato</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Select Disease</label>
                            <select
                                value={disease}
                                onChange={(e) => setDisease(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition"
                            >
                                <option value="">Choose Disease...</option>
                                <option value="late-blight">Late Blight</option>
                                <option value="early-blight">Early Blight</option>
                                <option value="rust">Rust</option>
                                <option value="leaf-spot">Leaf Spot</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-600 text-white rounded-2xl py-4 font-bold text-lg hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <Search className="h-5 w-5" /> Find Solution
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                    {result ? (
                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-xl border border-slate-100 flex flex-col h-full animate-in slide-in-from-bottom-8 duration-500">
                            <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-8">
                                <div>
                                    <h2 className="text-sm font-bold text-primary-600 tracking-wider uppercase mb-1">Recommended Product</h2>
                                    <p className="text-4xl font-extrabold text-slate-900">{result.name}</p>
                                </div>
                                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-lg font-bold shadow-sm whitespace-nowrap">
                                    {result.price}
                                </div>
                            </div>

                            <div className="space-y-8 flex-1">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-xl flex items-center gap-3 mb-3">
                                        <span className="bg-blue-100 p-2 rounded-xl text-blue-600"><CheckCircle2 className="h-5 w-5" /></span> Why to use
                                    </h4>
                                    <p className="text-slate-600 text-lg leading-relaxed">{result.why}</p>
                                </div>

                                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                                    <h4 className="font-bold text-amber-900 text-xl flex items-center gap-3 mb-3">
                                        <span className="bg-amber-100 p-2 rounded-xl text-amber-600"><AlertTriangle className="h-5 w-5" /></span> Dosage
                                    </h4>
                                    <p className="text-amber-800 font-medium text-lg">{result.dosage}</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 text-xl flex items-center gap-3 mb-4">
                                        <span className="bg-red-100 p-2 rounded-xl text-red-600"><ShieldAlert className="h-5 w-5" /></span> Safety Instructions
                                    </h4>
                                    <ul className="space-y-3">
                                        {result.safety.map((rule, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 justify-start">
                                                <div className="w-2 h-2 rounded-full bg-red-400 shrink-0"></div>
                                                {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <h4 className="font-bold text-slate-800 text-lg mb-4">Alternative Options</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {result.alternatives.map((alt, idx) => (
                                            <span key={idx} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-medium shadow-sm hover:bg-slate-200 transition cursor-pointer">
                                                {alt}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
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

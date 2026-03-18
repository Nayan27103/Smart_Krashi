import { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, X, Microscope, Loader2 } from 'lucide-react';
import api from '../../api/axios';

const CropDiseasePage = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const analyzeImage = async () => {
        if (!file) return;
        setAnalyzing(true);
        setError('');
        
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await api.post('/predict-disease/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            setResult({
                disease: response.data.disease || 'Healthy',
                confidence: (response.data.confidence * 100).toFixed(1),
                cause: 'Analysis based on visual symptoms identified by AI.',
                treatment: response.data.recommended_pesticides?.length > 0 
                    ? `Recommended treatment using ${response.data.recommended_pesticides[0].name}. ${response.data.recommended_pesticides[0].dosage}`
                    : 'No specific disease detected or treatment required.',
                recommendedPesticides: response.data.recommended_pesticides || []
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Error analyzing image. Please try a clearer photo.');
            setResult(null);
        } finally {
            setAnalyzing(false);
        }
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setError('');
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Crop Disease Detection</h1>
                    <p className="text-slate-500 mt-1">Upload a photo of your crop leaf for instant AI analysis.</p>
                </div>
                <div className="bg-primary-50 rounded-2xl flex items-center p-3 text-sm font-medium text-primary-700 border border-primary-100 shadow-sm">
                    <Microscope className="h-5 w-5 mr-2" /> Powered by Vision AI
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-fit">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 font-primary">Upload Image</h2>

                    {!file ? (
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`border-3 border-dashed rounded-[2rem] p-12 text-center transition-all flex flex-col items-center justify-center min-h-[300px]
                ${dragActive ? 'border-primary-500 bg-primary-50 scale-[1.02]' : 'border-slate-300 hover:border-primary-400 bg-slate-50/50'}`}
                        >
                            <div className="bg-primary-100 p-4 rounded-full mb-4">
                                <UploadCloud className="h-10 w-10 text-primary-600" />
                            </div>
                            <p className="text-lg font-semibold text-slate-700 mb-1">Drag and drop your image here</p>
                            <p className="text-slate-500 text-sm mb-6">or click to browse from your device</p>

                            <label className="cursor-pointer bg-primary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition transform hover:-translate-y-0.5">
                                Browse Files
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                            </label>
                        </div>
                    ) : (
                        <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-inner group">
                            <img src={URL.createObjectURL(file)} alt="Crop preview" className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105" />
                            <button onClick={reset} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm shadow-md p-2 rounded-full text-slate-600 hover:text-red-500 hover:bg-white transition-all transform hover:scale-110">
                                <X className="h-5 w-5" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                <p className="font-semibold truncate">{file.name}</p>
                                <p className="text-sm opacity-80">Ready for analysis</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-6">
                        <button
                            onClick={analyzeImage}
                            disabled={!file || analyzing}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2
                ${!file ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' :
                                    analyzing ? 'bg-primary-500 text-white animate-pulse' :
                                        'bg-primary-600 text-white hover:bg-primary-700 hover:-translate-y-1 shadow-primary-500/30'}`}
                        >
                            {analyzing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Analyzing Image...
                                </>
                            ) : 'Analyze with AI'}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className={`transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden lg:block lg:opacity-50'}`}>
                    {result ? (
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 h-full flex flex-col">
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className={`${result.disease === 'Healthy' ? 'bg-green-100' : 'bg-red-100'} p-4 rounded-2xl flex-shrink-0`}>
                                    {result.disease === 'Healthy' ? <CheckCircle2 className="h-8 w-8 text-green-600" /> : <AlertCircle className="h-8 w-8 text-red-600" />}
                                </div>
                                <div>
                                    <h2 className={`text-sm font-bold tracking-wider uppercase mb-1 ${result.disease === 'Healthy' ? 'text-green-600' : 'text-red-600'}`}>
                                        {result.disease === 'Healthy' ? 'Analysis Complete' : 'Disease Detected'}
                                    </h2>
                                    <p className="text-3xl font-extrabold text-slate-900">{result.disease}</p>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-semibold text-slate-700">AI Confidence</span>
                                        <span className="font-bold text-green-600">{result.confidence}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                                        <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-400"></div> Why it happens
                                    </h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{result.cause}</p>
                                </div>

                                <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" /> Suggested Treatment
                                    </h4>
                                    <p className="text-green-800 text-sm leading-relaxed font-primary">{result.treatment}</p>
                                </div>

                                {result.recommendedPesticides.length > 0 && result.recommendedPesticides.map((p, idx) => (
                                    <div key={idx} className="bg-blue-50 rounded-2xl p-5 border border-blue-100 border-dashed">
                                        <h4 className="font-bold text-blue-900 mb-1">Recommended Product</h4>
                                        <div className="flex justify-between items-center mt-3">
                                            <div>
                                                <p className="text-blue-800 font-semibold text-lg">{p.name}</p>
                                                <p className="text-blue-600 text-sm font-medium">₹{p.market_price} / unit</p>
                                            </div>
                                            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition">
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-[2rem] p-8 border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center text-center">
                            <div className="bg-slate-200/50 p-6 rounded-full mb-4">
                                <Microscope className="h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Awaiting Image</h3>
                            <p className="text-slate-500 max-w-sm">Upload an image of a damaged leaf and artificial intelligence will rapidly identify the disease.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropDiseasePage;

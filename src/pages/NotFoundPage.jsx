import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">
                <div>
                    <h1 className="text-9xl font-extrabold text-primary-200 tracking-widest">404</h1>
                    <div className="bg-primary-600 px-2 text-sm rounded rotate-12 absolute text-white shadow-lg mx-auto inline-block -mt-16 ml-10">
                        Page Not Found
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900">Oops! You seem to be lost.</h2>
                    <p className="text-lg text-slate-500">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700 px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary-500/30 transition-all transform hover:-translate-y-1"
                    >
                        <Home className="h-5 w-5" />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;

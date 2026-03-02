import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import ChatbotWidget from '../components/ChatbotWidget';

const DashboardLayout = ({ isAdmin = false }) => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar isAdmin={isAdmin} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTopbar isAdmin={isAdmin} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
            <ChatbotWidget />
        </div>
    );
};

export default DashboardLayout;

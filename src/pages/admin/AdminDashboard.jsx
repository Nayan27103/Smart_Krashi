import { Users, FileText, Database, TrendingUp, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { title: "Total Farmers", value: "1,245", growth: "+12%", icon: Users, color: "bg-blue-100 text-blue-600" },
        { title: "Analysis Run", value: "8,590", growth: "+24%", icon: FileText, color: "bg-green-100 text-green-600" },
        { title: "Crop Models", value: "45", growth: "Active", icon: Database, color: "bg-purple-100 text-purple-600" },
        { title: "Active Mandis", value: "128", growth: "+3", icon: TrendingUp, color: "bg-amber-100 text-amber-600" }
    ];

    const recentUsers = [
        { id: 1, name: "Ramesh Kumar", location: "Punjab", joined: "2 hours ago", status: "Active" },
        { id: 2, name: "Sita Devi", location: "Haryana", joined: "5 hours ago", status: "Active" },
        { id: 3, name: "Mohan Singh", location: "Madhya Pradesh", joined: "1 day ago", status: "Inactive" },
        { id: 4, name: "Anita Patil", location: "Maharashtra", joined: "2 days ago", status: "Active" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Admin Overview</h1>
                <p className="text-slate-500 mt-2 text-lg">System analytics and user management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl ${stat.color} shadow-inner`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${stat.growth.includes('+') ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                                {stat.growth}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-extrabold text-slate-900">{stat.value}</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 overflow-hidden relative">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Recent Registrations</h2>
                    <button className="text-primary-600 hover:text-primary-700 font-bold text-sm bg-primary-50 px-4 py-2 rounded-xl transition">
                        View All Users
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-100">
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Farmer Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-slate-600 font-medium">{user.location}</td>
                                    <td className="py-4 px-6 text-slate-500">{user.joined}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 bg-white shadow-sm border border-slate-100 rounded-lg transition">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 bg-white shadow-sm border border-slate-100 rounded-lg transition">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

import { useEffect, useState } from 'react'
import { Footer, SidebarItem } from '../components';
import { BarChart3, CreditCard, LayoutDashboard, Link2, LogOut, Search, Settings, Menu } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { user, linkValues } from '../userValue';

const APP_NAME = import.meta.env.VITE_APP_NAME;

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [links, setLinks] = useState<any[]>([]);
    const activePath = useLocation();
    
    useEffect(() => {
        setLinks(linkValues);
    }, []);

  return (
    <div className="flex flex-1 min-h-screen bg-zinc-950">
        {sidebarOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`fixed inset-y-0 left-0 w-72 flex flex-col border-r border-zinc-900 pt-16 bg-zinc-950 z-60 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-1 px-6 py-8 flex flex-col gap-1">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activePath.pathname === '/dashboard'} to='/dashboard' />
            <SidebarItem icon={Link2} label="My Links" active={activePath.pathname === '/links'} to='/links' />
            <SidebarItem icon={BarChart3} label="Global Analytics" active={activePath.pathname === '/analytics'} to='/analytics' />
            <SidebarItem icon={Settings} label="Settings" active={activePath.pathname === '/settings'} to='/settings' />
            
            <div className="mt-8 pt-8 border-t border-zinc-900">
            <h4 className="px-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Account</h4>
            <SidebarItem icon={CreditCard} label="Billing" active={activePath.pathname === '/billing'} to='/billing' />
            {/* <SidebarItem icon={Users} label="Team" active={activePath.pathname === '/team'} to='/team' /> */}
            </div>

            <div className="mt-auto pb-6">
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Plan</span>
                <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full capitalize">{user?.plan}</span>
                </div>
                <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-emerald-600 h-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: user?.plan === 'free' ? `${(links.length / 5) * 100}%` : '10%' }}></div>
                </div>
                <p className="text-[10px] text-zinc-600 mb-3">{links.length} / {user?.plan === 'free' ? '5' : '∞'} used</p>
                {user?.plan === 'free' && (
                <Link to="/billing" className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20">Upgrade</Link>
                )}
            </div>
            </div>
        </div>
        <div className="p-6 border-t border-zinc-900">
            <button onClick={() => null} className="flex items-center gap-3 text-sm font-bold text-rose-500 hover:text-rose-400 transition w-full">
            <LogOut className="w-4 h-4" /> Sign Out
            </button>
        </div>
        </aside>

        <div className="flex-1 flex flex-col lg:ml-72 min-h-screen">
        <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-6 lg:px-8 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4">
            <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
            >
                <Menu size={20} />
            </button>
            <div className="text-xs font-black text-zinc-600 tracking-widest uppercase">
                {APP_NAME} / <span className="text-emerald-500">{activePath.pathname.replace(/\//g, ' ').replace(/-/g, ' ').trim()}</span>
            </div>
            </div>
            <div className="flex items-center gap-4">
            {/* <button className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white transition">
                <Mail className="w-4 h-4" />
            </button> */}
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-black text-[10px]">{user.name.trim().split(/\s+/).map(n => n[0]).join("").toUpperCase()}</div>
            </div>
        </header>

        <main className="flex-1 pt-12 pb-12 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
            {!/^\/links\/[^/]+$/.test(activePath.pathname) && (
                <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight capitalize">{activePath.pathname.replace(/\//g, ' ').replace(/-/g, ' ').trim()}</h1>
                    <p className="text-zinc-500 font-medium tracking-tight uppercase text-[10px]">Control center for {APP_NAME}.</p>
                </div>
                {activePath.pathname === '/links' && (
                    <div className="relative w-full sm:w-auto">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                    <input 
                        type="text" 
                        placeholder="Search system..."
                        className="w-full sm:w-64 pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:ring-1 focus:ring-emerald-500 outline-none transition"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    </div>
                )}
                </div>
            )}

            <Outlet />
            
            </div>
        </main>
        <Footer isDashboard={true}/>
        </div>
    </div>
  )
}

export default Dashboard

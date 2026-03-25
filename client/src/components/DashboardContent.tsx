import { Link2, MousePointer2, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { LinkTable, StatCard } from ".";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const DashboardContent = () => {
    const [newUrl, setNewUrl] = useState<string>('');
    const [alias, setAlias] = useState<string>('');
    const [dashboardStats, setDashboardStats] = useState({
        activeLinks: 0,
        customLinks: 0,
        totalClicks: 0,
        totalLinks: 0
    });
    const { user, dashboardData } = useAuthStore();
    
    useEffect(() => {
        setDashboardStats(dashboardData.stats);
      console.log("Dashboard Data Updated:", dashboardData);
    }, [dashboardData.stats]);

    const isAliasValid = (plan: string, aliasCount: number) => {
      if (plan === 'free') {
        return aliasCount < 2;
      }
      else if (plan === 'pro') {
        return aliasCount < 20;
      }
      else if (plan === 'enterprise') {
        return aliasCount < 200;
      }
      return false;
    }
  
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Creating short link for:", newUrl, "with alias:", alias);
    };

    return (
      <div className="space-y-10">
        <div className="bg-zinc-900 p-5 md:p-8 rounded-[2.5rem] border border-zinc-800 shadow-xl">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-zinc-300 mb-2">Destination URL</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/very/long/path"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-zinc-300">Custom Alias</label>
                  {!isAliasValid(user?.plan || 'free', dashboardStats.customLinks) && (
                    <Link to="/billing" className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      UNLOCK MORE
                    </Link>
                  )}
                </div>
                <div className="flex w-full min-w-0">
                  <span className="inline-flex shrink-0 items-center px-4 rounded-l-xl border border-r-0 border-zinc-800 bg-zinc-950 text-zinc-600 text-sm font-medium">{DOMAIN}/</span>
                  <input 
                    type="text" 
                    disabled={!isAliasValid(user?.plan || 'free', dashboardStats.customLinks)}
                    placeholder={isAliasValid(user?.plan || 'free', dashboardStats.customLinks) ? "your-alias" : "You've reached your alias limit. Upgrade to create more!"}
                    className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded-r-xl px-4 py-3 text-sm text-zinc-100 focus:ring-2 focus:ring-emerald-500 outline-none transition disabled:bg-zinc-900 disabled:text-zinc-700"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value.toLowerCase())}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="w-full md:w-auto bg-emerald-600 text-white px-10 py-3.5 rounded-2xl font-black text-sm hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Create Short Link
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard label="Total Clicks" val={dashboardStats.totalClicks.toLocaleString()} icon={MousePointer2} color="text-emerald-500" />
          <StatCard label="Active Links" val={dashboardStats.activeLinks} icon={Link2} color="text-emerald-400" />
          <StatCard label="Custom Links" val={dashboardStats.customLinks} icon={Star} color="text-emerald-600" />
        </div>

        <div className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="font-black text-white">Recent Links</h3>
            <Link to="/links" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition">View All</Link>
          </div>
          <LinkTable />
        </div>
      </div>
    );
};

export default DashboardContent;
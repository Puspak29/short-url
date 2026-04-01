import { Globe, MapPin, MousePointer2, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAnalyticsStore } from "../stores/useAnalyticsStore";
import { useToastStore } from "../stores/useToastStore";
import { getGlobalStats } from "../actions/linkAction";

  const GlobalAnalyticsView = () => {
    
    const { globalStats, setGlobalStats } = useAnalyticsStore();
    const { addToast } = useToastStore();
    const fetchRef = useRef(false);

    useEffect(() => {
      if(fetchRef.current) return;
      fetchRef.current = true;
      if(globalStats) return;
      const fetchAnalytics = async () => {
        try{
          const response = await getGlobalStats();
          if(response.success){
            setGlobalStats(response.data.stats);
            addToast({
              type: 'success',
              message: 'Global analytics data loaded successfully!'
            });
          }
        }
        catch(error){
          addToast({
            type: 'error',
            message: 'Failed to fetch analytics data. Please try again later.'
          })
        }
      }
      fetchAnalytics();
    },[]);

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-zinc-900 p-6 rounded-4xl border border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-emerald-500">
                 <MousePointer2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Total Network Clicks</p>
                <h4 className="text-xl font-black text-white">{globalStats?.totalClicks}</h4>
              </div>
           </div>
           <div className="bg-zinc-900 p-6 rounded-4xl border border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-emerald-400">
                 <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Unique Visitors</p>
                <h4 className="text-xl font-black text-white">{globalStats?.uniqueVisitors}</h4>
              </div>
           </div>
           <div className="bg-zinc-900 p-6 rounded-4xl border border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-emerald-300">
                 <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Global Reach</p>
                <h4 className="text-xl font-black text-white">{globalStats?.globalReach} Countries</h4>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {globalStats && globalStats.topCountry && (
            <div className="lg:col-span-5 bg-emerald-600 p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/20 text-white relative overflow-hidden min-h-85">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
                    <TrendingUp className="w-3 h-3" /> Leading Region
                  </div>
                <h2 className="text-4xl font-black mb-1">{globalStats?.topCountry?.country}</h2>
                <p className="text-emerald-100 font-medium">Contributes {globalStats?.topCountry?.percentage}% of total traffic</p>
              </div>

              <div className="mt-12">
                <div className="text-6xl font-black tracking-tighter mb-2">{globalStats?.topCountry?.clicks}</div>
                <p className="text-emerald-200 text-sm font-bold">Clicks recorded in the last 30 days</p>
              </div>
            </div>
            <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-500/20 rotate-12" />
          </div>)}

          { globalStats && globalStats.countryDistribution && (
          <div className="lg:col-span-7 bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" /> Regional Performance
              </h3>
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sort by: Volume</span>
            </div>

            <div className="space-y-5">
              {globalStats?.countryDistribution?.map((c, i) => (
                <div key={c.country} className="group flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-zinc-700 w-4">0{i+1}</span>
                      <span className="text-sm font-black text-zinc-300 group-hover:text-emerald-400 transition-colors">{c.country}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-zinc-500">{c.clicks?.toLocaleString()}</span>
                      <span className="text-xs font-black text-zinc-100 w-10 text-right">{c.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? 'bg-emerald-500' : 'bg-emerald-600'}`} 
                      style={{ width: `${c.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>)}
        </div>
      </div>
    );
  };

  export default GlobalAnalyticsView;
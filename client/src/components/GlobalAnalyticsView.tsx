import { Globe, MapPin, MousePointer2, TrendingUp, Users } from "lucide-react";
import { useMemo } from "react";
import { linkValues } from "../userValue";

  const GlobalAnalyticsView = () => {
    const countries = [
      { name: 'United States', code: 'US', val: 4820, percentage: 38, color: 'bg-emerald-600' },
      { name: 'United Kingdom', code: 'GB', val: 2240, percentage: 18, color: 'bg-emerald-500' },
      { name: 'Germany', code: 'DE', val: 1715, percentage: 14, color: 'bg-emerald-400' },
      { name: 'India', code: 'IN', val: 1480, percentage: 12, color: 'bg-emerald-300' },
      { name: 'Japan', code: 'JP', val: 990, percentage: 8, color: 'bg-emerald-200' },
      { name: 'Others', code: '??', val: 1237, percentage: 10, color: 'bg-zinc-800' }
    ];

    const topCountry = countries[0];

    const totalClicks = useMemo(() => linkValues.reduce((acc, curr) => acc + curr.clicks, 0), [linkValues]);

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-zinc-900 p-6 rounded-4xl border border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-emerald-500">
                 <MousePointer2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Total Network Clicks</p>
                <h4 className="text-xl font-black text-white">{totalClicks + 12482}</h4>
              </div>
           </div>
           <div className="bg-zinc-900 p-6 rounded-4xl border border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-emerald-400">
                 <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Unique Visitors</p>
                <h4 className="text-xl font-black text-white">8,921</h4>
              </div>
           </div>
           <div className="bg-zinc-900 p-6 rounded-4xl border border-zinc-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center text-emerald-300">
                 <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Global Reach</p>
                <h4 className="text-xl font-black text-white">142 Countries</h4>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-emerald-600 p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/20 text-white relative overflow-hidden min-h-85">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6">
                  <TrendingUp className="w-3 h-3" /> Leading Region
                </div>
                <h2 className="text-4xl font-black mb-1">{topCountry.name}</h2>
                <p className="text-emerald-100 font-medium">Contributes {topCountry.percentage}% of total traffic</p>
              </div>

              <div className="mt-12">
                <div className="text-6xl font-black tracking-tighter mb-2">{topCountry.val.toLocaleString()}</div>
                <p className="text-emerald-200 text-sm font-bold">Clicks recorded in the last 30 days</p>
              </div>
            </div>
            <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-500/20 rotate-12" />
          </div>

          <div className="lg:col-span-7 bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" /> Regional Performance
              </h3>
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sort by: Volume</span>
            </div>

            <div className="space-y-5">
              {countries.map((c, i) => (
                <div key={c.name} className="group flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-zinc-700 w-4">0{i+1}</span>
                      <span className="text-sm font-black text-zinc-300 group-hover:text-emerald-400 transition-colors">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-zinc-500">{c.val.toLocaleString()}</span>
                      <span className="text-xs font-black text-zinc-100 w-10 text-right">{c.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${c.color}`} 
                      style={{ width: `${c.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default GlobalAnalyticsView;
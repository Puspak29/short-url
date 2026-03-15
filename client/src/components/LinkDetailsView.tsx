import { ArrowLeft, Clock, Copy, ExternalLink, MapPin, MousePointer2, Users } from "lucide-react";
import StatCard from "./StatCard";
import { linkValues } from "../userValue";
import { useParams } from "react-router-dom";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const LinkDetailsView = () => {
    const { slug } = useParams();
    const link = linkValues.find((l) => l.slug === slug) || linkValues[0];

    const onViewLinks = () => {
        window.history.back();
    };

    const onCopy = (text: string) => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        // showToast("Copied to clipboard", "success");
    };
    const onTrack = (id: number) => {
        console.log("Tracking link with id:", id);
    }
    
    return(
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <button 
      onClick={onViewLinks}
      className="flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 hover:gap-3 transition-all"
    >
      <ArrowLeft className="w-4 h-4" /> Back to My Links
    </button>

    <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          {DOMAIN}/{link.slug}
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${link.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
            {link.status.toUpperCase()}
          </span>
        </h2>
        <p className="text-zinc-500 font-medium truncate max-w-md font-mono text-xs">{link.original}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onCopy(`${DOMAIN}/${link.slug}`)} className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-bold text-zinc-300 hover:bg-zinc-900 transition">
          <Copy className="w-4 h-4 text-emerald-500" /> Copy
        </button>
        <button onClick={() => onTrack(link.id)} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition">
          <ExternalLink className="w-4 h-4" /> Visit
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard label="Total Clicks" val={link.clicks.toLocaleString()} icon={MousePointer2} color="text-emerald-500" />
      <StatCard label="Unique Users" val={Math.floor(link.clicks * 0.82).toLocaleString()} icon={Users} color="text-emerald-400" />
      <StatCard label="Top Region" val="United States" icon={MapPin} color="text-emerald-300" />
      <StatCard label="Avg. Time" val="1.4s" icon={Clock} color="text-emerald-200" />
    </div>
  </div>
);
}

export default LinkDetailsView;
const StatCard = ({ label, val, icon: Icon, color } : { label: string, val: any, icon: React.ComponentType<any>, color: string }) => (
  <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-800 flex items-center gap-5 shadow-sm">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-950 ${color}`}><Icon className="w-6 h-6" /></div>
    <div>
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-black text-white">{val}</h4>
    </div>
  </div>
);

export default StatCard;
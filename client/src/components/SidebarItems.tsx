import { Link } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, active, to } : { icon: React.ComponentType<{ className?: string }>; label: string; active: boolean; to: string }) => (
  <Link to={to} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${active ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`}>
    <Icon className={`w-5 h-5 ${active ? 'text-emerald-500' : 'text-zinc-600'}`} />
    {label}
  </Link>
);

export default SidebarItem;
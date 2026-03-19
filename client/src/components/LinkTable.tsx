import { BarChart3, ChevronLeft, ChevronRight, Copy, Lock, Power, PowerOff, Trash2 } from "lucide-react";
import { user, linkValues } from '../userValue';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const LinkTable = () => {
  const links = linkValues;
  const userPlan = user?.plan || 'free';
  const navigate = useNavigate();
  const activePath = useLocation();
  const onCopy = (text: string) => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        // showToast("Copied to clipboard", "success");
    };
  const onDelete = (id: number) => {
    console.log("Deleting link with id:", id);
  };

  const onToggle = (id: number) => {
    console.log("Toggling status for link with id:", id);
  };
  const onView = (link: any) => {
    navigate(`/links/${link.slug}`);
  };

   const totalPages = Math.ceil(links.length / 10);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (pageNum: number) => {
        if (pageNum < 1 || pageNum > totalPages) return;
        setCurrentPage(pageNum);
    }
    
    const getPageNumbers = () => {
      const pages = [];
      const showMax = 5;
      
      if (totalPages <= showMax) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        if (currentPage > 3) pages.push('...');
        
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = start; i <= end; i++) {
          if (!pages.includes(i)) pages.push(i);
        }
        
        if (currentPage < totalPages - 2) pages.push('...');
        if (!pages.includes(totalPages)) pages.push(totalPages);
      }
      return pages;
    };

  return (
  <div className="overflow-x-auto">
  {/* Desktop Table */}
    <table className="w-full text-left hidden md:table">
      <thead className="bg-zinc-950/50">
        <tr>
          <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Link Identity</th>
          <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Engagement</th>
          <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Status</th>
          <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-right">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800">
        {links.map((link) => (
          <tr key={link.id} className={`group hover:bg-emerald-500/5 transition-all ${link.status === 'inactive' ? 'opacity-40 bg-zinc-950/30' : ''}`}>
            <td className="px-8 py-5">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-black cursor-pointer hover:underline transition-colors ${link.status === 'inactive' ? 'text-zinc-700 line-through' : 'text-emerald-500'}`}
                    onClick={() => onView(link)}
                  >
                    {DOMAIN}/{link.slug}
                  </span>
                  <button onClick={() => onCopy(`${DOMAIN}/${link.slug}`)} className="text-zinc-700 hover:text-emerald-500"><Copy className="w-3 h-3" /></button>
                </div>
                <span className="text-sm text-zinc-600 font-mono truncate max-w-50">{link.original}</span>
              </div>
            </td>
            <td className="px-8 py-5">
              <div className="flex items-center gap-2">
                <span className={`text-lg font-black ${link.status === 'inactive' ? 'text-zinc-700' : 'text-white'}`}>{link.clicks.toLocaleString()}</span>
                {link.status === 'active' && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded border border-emerald-500/10">+2%</span>}
              </div>
            </td>
            <td className="px-8 py-5">
              <button
                onClick={() => onToggle(link.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-tight transition-all border ${
                  link.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-600 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                {link.status === 'active' ? (
                  <><Power className="w-3 h-3" /> ACTIVE</>
                ) : (
                  <><PowerOff className="w-3 h-3" /> INACTIVE</>
                )}
              </button>
            </td>
            <td className="px-8 py-5 text-right">
              <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onView(link)}
                  className="p-2 text-zinc-600 hover:text-emerald-500 transition flex items-center gap-1 text-xs font-bold"
                >
                  {userPlan === 'free' ? <Lock className="w-3 h-3" /> : <BarChart3 className="w-3 h-3" />}
                  Stats
                </button>
                <button onClick={() => onDelete(link.id)} className="p-2 text-zinc-700 hover:text-rose-500 transition">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Mobile Cards */}
    <div className="md:hidden divide-y divide-zinc-800">
      {links.map((link) => (
        <div
          key={link.id}
          className={`px-4 py-4 transition-all ${link.status === 'inactive' ? 'opacity-40 bg-zinc-950/30' : 'hover:bg-emerald-500/5'}`}
        >
          {/* Row 1: Link + Copy + Actions */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-black cursor-pointer hover:underline transition-colors break-all ${link.status === 'inactive' ? 'text-zinc-700 line-through' : 'text-emerald-500'}`}
                  onClick={() => onView(link)}
                >
                  {DOMAIN}/{link.slug}
                </span>
                <button onClick={() => onCopy(`${DOMAIN}/${link.slug}`)} className="text-zinc-700 hover:text-emerald-500 shrink-0">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono break-all">{link.original}</span>
            </div>
            {/* Actions always visible on mobile */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onView(link)}
                className="p-2 text-zinc-600 hover:text-emerald-500 transition flex items-center gap-1 text-xs font-bold"
              >
                {userPlan === 'free' ? <Lock className="w-3 h-3" /> : <BarChart3 className="w-3 h-3" />}
                Stats
              </button>
              <button onClick={() => onDelete(link.id)} className="p-2 text-zinc-700 hover:text-rose-500 transition">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Row 2: Clicks + Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Engagement</span>
              <span className={`text-sm font-black ${link.status === 'inactive' ? 'text-zinc-700' : 'text-white'}`}>
                {link.clicks.toLocaleString()}
              </span>
              {link.status === 'active' && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded border border-emerald-500/10">+2%</span>
              )}
            </div>
            <button
              onClick={() => onToggle(link.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-tight transition-all border ${
                link.status === 'active'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-zinc-800 text-zinc-600 border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              {link.status === 'active' ? (
                <><Power className="w-3 h-3" /> ACTIVE</>
              ) : (
                <><PowerOff className="w-3 h-3" /> INACTIVE</>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>

    {(activePath.pathname === '/links' && totalPages > 1) && (
      <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-t border-zinc-800 bg-zinc-900/20 gap-4">
        <div className="order-2 sm:order-1">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-center sm:text-left">
            Showing <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-white">{Math.min(currentPage * itemsPerPage, links.length)}</span> of <span className="text-white">{links.length}</span> links
            </p>
        </div>
        
        <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-zinc-800 text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
            >
            <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum: number | any, idx: number) => (
                pageNum === '...' ? (
                <span key={`ellipsis-${idx}`} className="text-zinc-700 px-2 text-[10px] font-black">
                    •••
                </span>
                ) : (
                <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-8 h-8 text-[10px] font-black rounded-lg transition-all border ${
                    currentPage === pageNum
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/40'
                        : 'text-zinc-600 border-transparent hover:border-zinc-800 hover:text-zinc-400'
                    }`}
                >
                    {pageNum}
                </button>
                )
            ))}
            </div>

            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-zinc-800 text-zinc-600 hover:text-emerald-500 hover:border-emerald-500/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
            >
            <ChevronRight className="w-4 h-4" />
            </button>
        </div>
        </div>
    )}
  </div>
  );
}

export default LinkTable;
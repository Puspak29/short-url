import { AlertTriangle, BarChart3, ChevronLeft, ChevronRight, Copy, Lock, Power, PowerOff, Trash2, X } from "lucide-react";
// import { user, linkValues } from '../userValue';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { deleteLink, getLinks, toggleLinkStatus } from "../actions/linkAction";
import { useLinkStore } from "../stores/useLinkStore";
import { useToastStore } from "../stores/useToastStore";

const DOMAIN = import.meta.env.VITE_DOMAIN;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const LinkTable = () => {
  const { user, dashboardData } = useAuthStore();
  const [links, setLinks] = useState<any[]>([]);
  const userPlan = user?.plan || 'free';
  const navigate = useNavigate();
  const activePath = useLocation();
  const query = useQuery();
  const pageNum = parseInt(query.get('page') || '1');
  const { hasPage, getPageLinks, setPageLinks, clearCache, toggleUpdate } = useLinkStore();
  const { addToast } = useToastStore();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [totalLinks, setTotalLinks] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const fetchRef = useRef(false);

  useEffect(() => {
    if(fetchRef.current) return;
    fetchRef.current = true;
    const fetchLinks = async () => {
      if(activePath.pathname === '/dashboard') {
        setLinks(dashboardData.lastFiveLinks);
      }
      else if(activePath.pathname === '/links') {
        // Fetch all links with pagination
        if(hasPage(pageNum)) {
          setLinks(getPageLinks(pageNum) || []);
        }
        else{
          try{
            const response = await getLinks(pageNum);
            if(response.success){
              setLinks(response.data.urls);
              setPageLinks(pageNum, response.data.urls);
              setTotalPages(response.data.pagination.totalPages); 
              setCurrentPage(response.data.pagination.page);      
              setItemsPerPage(response.data.pagination.limit);    
              setTotalLinks(response.data.pagination.total);
              addToast({
                type: 'success',
                message: 'Links fetched successfully!'
              });
            }
          }
          catch(error){
            addToast({
              type: 'error',
              message: 'Failed to fetch links.'
            })
          }
        }
      }
    }
    
    fetchLinks();
  }, [activePath.pathname, dashboardData.lastFiveLinks, pageNum]);


  const onCopy = (text: string) => {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        addToast({
          type: 'success',
          message: 'Link copied to clipboard!'
        })
    };
  const onDelete = (id: string) => {
    setSelectedLinkId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if(!selectedLinkId) return;
    try{
      const response = await deleteLink(selectedLinkId);
      if(response.success){
        clearCache();
        if(activePath.pathname === '/dashboard'){
          dashboardData.lastFiveLinks = dashboardData.lastFiveLinks.filter(link => link._id !== selectedLinkId);
          setLinks(prev => prev.filter(link => link._id !== selectedLinkId));
        }
        setShowDeleteModal(false);
        setSelectedLinkId(null);
        addToast({
          type: 'success',
          message: 'Link deleted successfully!'
        });
      }
      else{
        setShowDeleteModal(false);
        setSelectedLinkId(null);
        addToast({
          type: 'error',
          message: 'Failed to delete link.'
        });
      }
    }
    catch(error){
      setSelectedLinkId(null);
      setShowDeleteModal(false);
      addToast({
        type: 'error',
        message: 'Failed to delete link.'
      });
    }
  }

  const onToggle = async (id: string) => {
    try{
      const response = await toggleLinkStatus(id);
      if(response.success){
        if(activePath.pathname === '/dashboard'){
          dashboardData.lastFiveLinks = dashboardData.lastFiveLinks.map(link => {
            if(link._id === id){
              return { ...link, isActive: !link.isActive };
            }
            return link;
          });
          if(hasPage(1)){
            toggleUpdate(1, id);
          }
        }
        else if(activePath.pathname === '/links' && hasPage(pageNum)){
          toggleUpdate(pageNum, id);
        }
        addToast({
          type: 'success',
          message: response.message
        });
      }
    }
    catch(error){
        addToast({
          type: 'error',
          message: 'Failed to toggle link status.'
        });
    }   
  };
  const onView = (link: any) => {
    navigate(`/links/${link.id}`);
  };

    const handlePageChange = (pageNum: number) => {
      if (pageNum < 1 || pageNum > totalPages) return;
      setCurrentPage(pageNum);
      navigate(`/links?page=${pageNum}`);
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
  {showDeleteModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          setShowDeleteModal(false);
          setSelectedLinkId(null);
        }}
      />
      
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="h-1.5 bg-rose-500 w-full" />

        <div className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="shrink-0 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
              <AlertTriangle size={24} />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-zinc-100 leading-tight">
                Permanently delete link?
              </h2>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                This will remove the link from your dashboard and all associated analytics. 
                <span className="block mt-1 font-medium text-rose-400/80">
                  This action cannot be undone.
                </span>
              </p>
            </div>

            <button 
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedLinkId(null);
              }}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-2">
            <button
              onClick={confirmDelete}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-rose-900/20"
            >
              <Trash2 size={16} />
              Delete Link
            </button>

            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedLinkId(null);
              }}
              className="flex-1 px-5 py-2.5 text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700/50 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
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
          <tr key={link._id} className={`group hover:bg-emerald-500/5 transition-all ${link.isActive === false ? 'opacity-40 bg-zinc-950/30' : ''}`}>
            <td className="px-8 py-5">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-black cursor-pointer hover:underline transition-colors ${link.isActive === false ? 'text-zinc-700 line-through' : link.isCustom ? 'text-amber-500' : 'text-emerald-500'}`}
                    onClick={() => user?.plan === 'free' ? null : onView(link)}
                  >
                    {DOMAIN}/{link.shortUrl}
                  </span>
                  <button onClick={() => onCopy(`${DOMAIN}/${link.shortUrl}`)} className="text-zinc-700 hover:text-emerald-500"><Copy className="w-3 h-3" /></button>
                </div>
                <span className="text-sm text-zinc-600 font-mono truncate max-w-50">{link.originalUrl}</span>
              </div>
            </td>
            <td className="px-8 py-5">
              <div className="flex items-center gap-2">
                <span className={`text-lg font-black ${link.isActive === false ? 'text-zinc-700' : 'text-white'}`}>{user?.plan === 'free' ? 'Unlock Pro' : (link?.clicks?.toLocaleString() || '0')}</span>
                {/* {link.isActive === true && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded border border-emerald-500/10">+2%</span>} */}
              </div>
            </td>
            
            <td className="px-8 py-5">
              <button
                onClick={() => onToggle(link._id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-tight transition-all border ${
                  link.isActive === true
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                    : 'bg-zinc-800 text-zinc-600 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                {link.isActive === true ? (
                  <><Power className="w-3 h-3" /> ACTIVE</>
                ) : (
                  <><PowerOff className="w-3 h-3" /> INACTIVE</>
                )}
              </button>
            </td>
            <td className="px-8 py-5 text-right">
              <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  disabled={userPlan === 'free'}
                  onClick={() => onView(link)}
                  className="p-2 text-zinc-600 hover:text-emerald-500 transition flex items-center gap-1 text-xs font-bold"
                >
                  {userPlan === 'free' ? <Lock className="w-3 h-3" /> : <BarChart3 className="w-3 h-3" />}
                  Stats
                </button>
                <button onClick={() => onDelete(link._id)} className="p-2 text-zinc-700 hover:text-rose-500 transition">
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
          key={link._id}
          className={`px-4 py-4 transition-all ${link.isActive === false ? 'opacity-40 bg-zinc-950/30' : 'hover:bg-emerald-500/5'}`}
        >
          {/* Row 1: Link + Copy + Actions */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-black cursor-pointer hover:underline transition-colors break-all ${link.isActive === false ? 'text-zinc-700 line-through' : link.isCustom ? 'text-amber-500' : 'text-emerald-500'}`}
                  onClick={() => onView(link)}
                >
                  {DOMAIN}/{link.shortUrl}
                </span>
                <button onClick={() => onCopy(`${DOMAIN}/${link.shortUrl}`)} className="text-zinc-700 hover:text-emerald-500 shrink-0">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono break-all">{link.originalUrl}</span>
            </div>
            {/* Actions always visible on mobile */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                disabled={user?.plan === 'free'}
                onClick={() => onView(link)}
                className="p-2 text-zinc-600 hover:text-emerald-500 transition flex items-center gap-1 text-xs font-bold"
              >
                {userPlan === 'free' ? <Lock className="w-3 h-3" /> : <BarChart3 className="w-3 h-3" />}
                Stats
              </button>
              <button onClick={() => onDelete(link._id)} className="p-2 text-zinc-700 hover:text-rose-500 transition">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Row 2: Clicks + Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Engagement</span>
              <span className={`text-sm font-black ${link.isActive === false ? 'text-zinc-700' : 'text-white'}`}>
                {user?.plan === 'free' ? 'Unlock Pro' : (link.clicks?.toLocaleString() || '0')}
              </span>
            </div>
            <button
              onClick={() => onToggle(link.id)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-tight transition-all border ${
                link.isActive === true
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-zinc-800 text-zinc-600 border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              {link.isActive === true ? (
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
            Showing <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-white">{Math.min(currentPage * itemsPerPage, totalLinks)}</span> of <span className="text-white">{links.length}</span> links
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
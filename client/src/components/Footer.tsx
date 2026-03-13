import { Github, Globe, Link2, Linkedin, Twitter } from "lucide-react";

const APP_NAME = import.meta.env.VITE_APP_NAME;
const Footer = ({ isDashboard }: { isDashboard: boolean }) => {
  const currentYear = new Date().getFullYear();
  
  if (isDashboard) {
    return (
      <footer className="mt-auto py-6 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <Link2 className="w-3 h-3 text-emerald-500" />
            {APP_NAME} &copy; {currentYear}
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[10px] font-black text-zinc-500 hover:text-emerald-400 uppercase tracking-widest">Status</button>
            <button className="text-[10px] font-black text-zinc-500 hover:text-emerald-400 uppercase tracking-widest">API Docs</button>
            <button className="text-[10px] font-black text-zinc-500 hover:text-emerald-400 uppercase tracking-widest">Help Center</button>
            <button className="text-[10px] font-black text-zinc-500 hover:text-emerald-400 uppercase tracking-widest">Privacy</button>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-20 pb-10 border-t border-zinc-900">
      <div className="max-w-11/12 mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-black text-2xl text-white mb-6">
              <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-900/20">
                <Link2 className="text-white w-6 h-6" />
              </div> 
              {APP_NAME}
            </div>
            <p className="text-zinc-500 max-w-xs mb-8 font-medium leading-relaxed">
              The modern standard for link management. Built for creators, developers, and global marketing teams.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-emerald-600 transition-colors text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">URL Shortener</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">QR Codes</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">API Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Brand Assets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-zinc-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-zinc-600">
          <p>© {currentYear} {APP_NAME} Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Globe size={14} className="text-emerald-500" /> English (IN)</span>
            <span>Uptime: 99.99%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
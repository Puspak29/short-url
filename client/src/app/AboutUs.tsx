import { ArrowLeft, Target, Shield, Zap, Globe } from "lucide-react";

const APP_NAME = import.meta.env.VITE_APP_NAME;

const AboutUs = () => {
  return (
    <div className="bg-zinc-950 pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 text-sm font-bold text-emerald-500 mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">
          About {APP_NAME}
        </h1>
        <p className="text-zinc-500 font-medium mb-12 text-xl">
          Building the future of digital infrastructure, one connection at a time.
        </p>

        <div className="prose prose-invert max-w-none text-zinc-400 font-medium leading-relaxed space-y-16">
          {/* Mission Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Target className="text-emerald-500" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white m-0">Our Mission</h2>
            </div>
            <p className="text-lg">
              At {APP_NAME}, we believe that digital tools should be powerful yet invisible. 
              Our mission is to provide developers and creators with the most reliable, 
              high-performance infrastructure for link management and analytics, 
              allowing them to focus on what truly matters: their content and their users.
            </p>
          </section>

          {/* Core Values Grid */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-white border-b border-zinc-800 pb-4">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Zap size={18} className="text-emerald-500" />
                  <span>Performance First</span>
                </div>
                <p className="text-sm">We optimize every millisecond. Our global edge network ensures your links resolve instantly, anywhere in the world.</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Shield size={18} className="text-emerald-500" />
                  <span>Privacy by Design</span>
                </div>
                <p className="text-sm">Data integrity is our priority. We collect only what's necessary and protect it with enterprise-grade encryption.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Globe size={18} className="text-emerald-500" />
                  <span>Open Connectivity</span>
                </div>
                <p className="text-sm">The web is for everyone. We build tools that bridge gaps and make the internet more accessible and trackable.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <div className="w-4.5 h-4.5 border-2 border-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  </div>
                  <span>Radical Simplicity</span>
                </div>
                <p className="text-sm">Complexity is the enemy of scale. We distill powerful features into intuitive interfaces that anyone can use.</p>
              </div>
            </div>
          </section>

          {/* Infrastructure Section */}
          <section className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 space-y-4">
            <h2 className="text-2xl font-black text-white">The Infrastructure</h2>
            <p>
              Started in 2026, {APP_NAME} was born out of a need for a link management platform that didn't compromise on speed or aesthetics.
            </p>
            <div className="pt-4 flex gap-8">
              <div>
                <div className="text-white font-black text-2xl">99.9%</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">Uptime</div>
              </div>
              <div>
                <div className="text-white font-black text-2xl">&lt;50ms</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500">Latency</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
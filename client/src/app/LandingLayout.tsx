import { CheckCircle2, Link2, Sparkles } from "lucide-react";


const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    limit: 5,
    description: 'Perfect for side projects.',
    features: ['5 links/mo', 'Basic analytics', '7-day history'],
    cta: 'Get Started',
    popular: false
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$19',
    limit: Infinity,
    description: 'Advanced features for creators.',
    features: ['Unlimited links', 'Individual Analytics', 'Custom back-halves', 'QR Codes'],
    cta: 'Upgrade to Pro',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    limit: Infinity,
    description: 'Security and scale for teams.',
    features: ['Custom domains', 'API access', 'Team roles', 'SLA uptime'],
    cta: 'Contact Sales',
    popular: false
  }
];
const APP_NAME = import.meta.env.VITE_APP_NAME;

const LandingLayout = ({ setView, user, onLogin }: { setView: (view: 'landing' | 'auth' | 'dashboard') => void; user: any; onLogin: () => void }) => (
  <div className="bg-zinc-950">
    <nav className="fixed w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center gap-2 font-black text-xl text-white">
          <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-900/20">
            <Link2 className="text-white w-5 h-5" />
          </div> 
          {APP_NAME}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-zinc-500 hover:text-emerald-400">Pricing</button>
          {user ? (
            <button onClick={() => setView('dashboard')} className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-800">Dashboard</button>
          ) : (
            <button onClick={onLogin} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition">Sign In</button>
          )}
        </div>
      </div>
    </nav>
    
    <section className="relative pt-40 pb-24 px-6 overflow-hidden text-center">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-sm font-bold mb-8 border border-emerald-500/20">
          <Sparkles className="w-4 h-4" /> v4.0 is now live
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
          Shorten links, <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">grow brands.</span>
        </h1>
        <p className="text-xl text-zinc-500 mb-12 max-w-xl mx-auto font-medium">Scale your marketing with enterprise-grade short links and real-time analytics.</p>
        <button onClick={onLogin} className="bg-emerald-600 text-white px-10 py-5 rounded-2xl text-lg font-black shadow-xl shadow-emerald-900/40 hover:-translate-y-1 transition">Get Started for Free</button>
      </div>
    </section>

    <section id="pricing" className="py-24 bg-zinc-900 px-6 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {PLANS.map(p => (
          <div key={p.id} className={`p-10 bg-zinc-950 rounded-[2.5rem] border-2 transition-all ${p.popular ? 'border-emerald-600 scale-105 shadow-2xl z-10' : 'border-zinc-800'}`}>
            <h3 className="text-xl font-black text-white mb-2">{p.name}</h3>
            <div className="text-5xl font-black text-emerald-500 mb-8">{p.price}<span className="text-lg text-zinc-700">/mo</span></div>
            <ul className="space-y-4 mb-10">
              {p.features.map((f, i) => <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-400"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> {f}</li>)}
            </ul>
            <button onClick={onLogin} className={`w-full py-4 rounded-2xl font-black transition ${p.popular ? 'bg-emerald-600 text-white shadow-xl hover:bg-emerald-500' : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800'}`}>{p.cta}</button>
          </div>
        ))}
      </div>
    </section>

    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-6">Ready to maximize your reach?</h2>
        <p className="text-zinc-500 font-medium mb-10">Join over 10,000+ teams using {APP_NAME} to track their digital growth.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={onLogin} className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-zinc-200 transition">Start Pro Trial</button>
          <button className="bg-zinc-900 border border-zinc-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition">Contact Sales</button>
        </div>
      </div>
    </section>
  </div>
);

export default LandingLayout;
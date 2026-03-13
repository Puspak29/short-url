import { CheckCircle2, Link2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";


const SERVICE_TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    billing: 'Per month',
    description: 'Basic infrastructure for individual use and hobby projects.',
    features: [
      '10 links monthly capacity',
      '2 lifetime custom aliases',
      'Standard analytics dashboard',
      'Overall URL stats (Total clicks, Unique visitors, Global reach)',
      'Community support'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    billing: 'Per month',
    description: 'Extended capabilities for power users and growing brands.',
    features: [
      '100 links monthly capacity',
      '20 lifetime custom aliases',
      'Standard analytics dashboard',
      'Overall URL stats (Free tier features + Top country, Country distribution, Device analytics)',
      'Individual URL analytics (Same metrics as overall stats)',
      'Dynamic QR code generator',
      'Community support'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$59',
    billing: 'Per month',
    description: 'High-availability systems for global organizations and teams.',
    features: [
      '1000 links monthly capacity',
      '200 lifetime custom aliases',
      'Advanced analytics dashboard',
      'Overall URL stats (Pro tier features + Browser analytics, OS analytics, Referrer tracking, Last 30-day click history)',
      'Individual URL analytics (All available metrics)',
      'Dynamic QR code generator',
      'Dedicated account support'
    ],
    popular: false
  }
];


const APP_NAME = import.meta.env.VITE_APP_NAME;

const LandingLayout = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  return (
  <div className="bg-zinc-950">
      <nav className="fixed w-full z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-11/12 mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl text-white">
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-900/20">
              <Link2 className="text-white w-5 h-5" />
            </div> 
            {APP_NAME}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-zinc-500 hover:text-emerald-400">Pricing</button>
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-800">Dashboard</button>
            ) : (
              <button onClick={() => navigate('/auth/signin')} className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition">Signin</button>
            )}
          </div>
        </div>
      </nav>
      
      <section className="relative pt-40 pb-24 px-6 overflow-hidden text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-sm font-bold mb-8 border border-emerald-500/20">
          <Sparkles className="w-4 h-4" /> v1.0 is now live
        </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            Shorten links, <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">grow brands.</span>
          </h1>
          <p className="text-xl text-zinc-500 mb-12 max-w-xl mx-auto font-medium">Reliable link infrastructure and real-time analytics for the modern web.</p>
          <button onClick={() => navigate('/auth/signup')} className="bg-emerald-600 text-white px-10 py-5 rounded-2xl text-lg font-black shadow-xl shadow-emerald-900/40 hover:-translate-y-1 transition">Let's Get Started</button>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-zinc-900 px-6 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-4">Infrastructure Tiers</h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto">A transparent breakdown of our feature allocations and resource tiers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICE_TIERS.map(tier => (
              <div key={tier.id} className={`flex flex-col p-10 bg-zinc-950 rounded-[2.5rem] border-2 transition-all ${tier.popular ? 'border-emerald-600 shadow-2xl scale-[1.02]' : 'border-zinc-800'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">{tier.name}</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{tier.description.split(' ')[0]} focused</p>
                  </div>
                  {tier.popular && <span className="bg-emerald-600 text-[10px] font-black uppercase text-white px-2 py-1 rounded-lg">Recomended</span>}
                </div>

                <div className="mb-8">
                   <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-white tracking-tighter">{tier.price}</span>
                      <span className="text-zinc-500 font-bold text-sm tracking-tight">/ month</span>
                   </div>
                </div>

                <p className="text-sm text-zinc-400 mb-8 font-medium leading-relaxed">{tier.description}</p>
                
                <div className="h-px bg-zinc-900 mb-8" />
                
                <ul className="space-y-4 mb-auto">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-zinc-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Visual anchor replacing the button to maintain spacing and structure */}
                <div className="mt-12 pt-6 border-t border-zinc-900 text-center">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Feature set verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Built for scale.</h2>
          <p className="text-zinc-500 font-medium mb-10">From individual creators to global enterprises, {APP_NAME} provides the stability you need for every click.</p>
        </div>
      </section>
    </div>
);
}

export default LandingLayout;
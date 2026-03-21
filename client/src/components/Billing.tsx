import { user } from '../userValue'

const PLANS = [
    { id: 'free', name: 'Free Plan', price: '$0/mo' },
    { id: 'pro', name: 'Pro Plan', price: '$19/mo' },
    { id: 'enterprise', name: 'Enterprise Plan', price: '$59/mo' },
]

function Billing() {
  return (
    <div className="max-w-4xl mx-auto py-8">
        <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map(p => (
        <div key={p.id} className={`p-8 bg-zinc-900 rounded-3xl border-2 transition-all ${user?.plan === p.id ? 'border-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-zinc-800'}`}>
            <h4 className="font-black text-white mb-1">{p.name}</h4>
            <div className="text-3xl font-black text-emerald-500 mb-6">{p.price}</div>
            <button 
            onClick={() => null}
            disabled={user?.plan === p.id}
            className={`w-full py-3 rounded-xl font-bold text-sm transition ${user?.plan === p.id ? 'bg-zinc-950 text-zinc-600' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500'}`}
            >
            {user?.plan === p.id ? 'Current Plan' : 'Switch'}
            </button>
        </div>
        ))}
        </div>
    </div>
  )
}

export default Billing

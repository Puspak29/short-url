import { user } from "../userValue"


function Settings() {
  return (
    <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-zinc-800 shadow-sm">
        <h3 className="font-black text-xl text-white mb-6">Profile Settings</h3>
        <div className="space-y-6 max-w-md">
            <div>
            <label className="block text-xs font-black text-zinc-600 uppercase mb-2">Display Name</label>
            <input type="text" defaultValue={user?.name} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:ring-1 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
            <label className="block text-xs font-black text-zinc-600 uppercase mb-2">Email Address</label>
            <input type="email" placeholder="owner@links.ap" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:ring-1 focus:ring-emerald-500 outline-none" />
            </div>
            <button onClick={() => null} className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20">Save Changes</button>
        </div>
    </div>
  )
}

export default Settings

import { useState } from 'react';
import LandingLayout from './app/LandingLayout';
import { Footer, AuthView } from './components';

function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [user, setUser] = useState<any | null>(null);

  return (
    <div className='min-h-screen font-sans antialiased text-zinc-100 selection:bg-emerald-600 selection:text-white flex flex-col bg-zinc-950'>
      {view === 'landing' && (
        <>
          <div className="flex-1">
            <LandingLayout setView={setView} user={user} onLogin={() => setView('auth')} />
          </div>
          <Footer isDashboard={false} />
        </>
      )}
      {view === 'auth' && (
        <AuthView 
          onSuccess={() => null} 
          onBack={() => setView('landing')} 
        />
      )}
    </div>
  )
}

export default App

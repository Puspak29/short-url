import { useState } from 'react';
import { LandingLayout, LegalLayout } from './app/index';
import { Footer, AuthView } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<any | null>(null);

  return (
    <BrowserRouter>
    <div className='min-h-screen font-sans antialiased text-zinc-100 selection:bg-emerald-600 selection:text-white flex flex-col bg-zinc-950'>

      <Routes>
      <Route
        path="/"
        element={
        <>
          <div className="flex-1">
            <LandingLayout user={user} />
          </div>
          <Footer isDashboard={false} />
        </>
      }
      />
      <Route
        path="/auth/signin"
        element={
          <AuthView 
            onSuccess={() => null} 
            mode="signin" 
          />
        }
      />
      <Route
        path="/auth/signup"
        element={
          <AuthView 
            onSuccess={() => null} 
            mode="signup" 
          />
        }
      />
      <Route 
        path="/terms"
        element={<LegalLayout type="terms" />}
      />
      <Route 
        path="/privacy"
        element={<LegalLayout type="privacy" />}
      />
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

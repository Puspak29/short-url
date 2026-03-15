import { Dashboard, LandingLayout, LegalLayout } from './app/index';
import { Footer, AuthView, DashboardContent, LinkTable, Settings, Billing, GlobalAnalyticsView, LinkDetailsView } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { user } from './userValue';

function App() {

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
      <Route element={<Dashboard />}>
        <Route path="/dashboard" element={<DashboardContent />} />
        <Route path="/links" element={(
          <div className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-sm overflow-hidden">
            <LinkTable />
          </div>
        )} />
        <Route path="/analytics" element={<GlobalAnalyticsView />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/links/:slug" element={<LinkDetailsView />}/>
      </Route>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

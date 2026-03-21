import { ArrowLeft, Eye, EyeOff, Link2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignup } from "../actions/userAction";
import { useToastStore } from "../stores/useToastStore";
import { useAuthStore } from "../stores/useAuthStore";

const APP_NAME = import.meta.env.VITE_APP_NAME;

const AuthView = ({ mode }: { mode: 'signin' | 'signup' }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [isSame, setIsSame] = useState<boolean>(true);

  const { addToast } = useToastStore();
  const { setIsAuthenticated } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = email && password && (mode === 'signin' || (mode === 'signup' && fullName && confirmPassword && password === confirmPassword));
    if (!isValid) {
      addToast({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }
    setLoading(true);

    try {
      if (mode === 'signup'){
        const res = await userSignup({ email, password, fullName });
        if (res.success) {
          addToast({
            type: 'success',
            message: 'Account created successfully!'
          });
          setIsAuthenticated(true);
          navigate('/dashboard');
        }
        else {
          addToast({
            type: 'error',
            message: res.message || 'Signup failed. Please try again.'
          });
        }
      }
      else {
        const res = await userLogin({ email, password });
        if (res.success) {
          addToast({
            type: 'success',
            message: 'Logged in successfully!'
          });
          setIsAuthenticated(true);
          navigate('/dashboard');
        } else {
          addToast({
            type: 'error',
            message: res.message || 'Login failed. Please try again.'
          });
        }
      }
    }
    catch (error) {
      addToast({
        type: 'error',
        message: 'An error occurred. Please try again.'
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-emerald-600 p-2.5 rounded-2xl shadow-xl shadow-emerald-900/20 mb-6">
            <Link2 className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Join the Network'}
          </h2>
          <p className="text-zinc-500 font-medium">
            {mode === 'signin' ? 'Manage your global link infrastructure.' : 'Create your LinkSnap ecosystem today.'}
          </p>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <label className="text-xs font-black text-zinc-600 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-zinc-600 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-zinc-600 uppercase tracking-widest">Password</label>
                {mode === 'signin' && (
                  <button type="button" className="text-[10px] font-black text-emerald-500 hover:text-emerald-400">Forgot Password?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
            <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-black text-zinc-600 uppercase tracking-widest">Confirm Password</label>
                </div>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white focus:ring-2 ${isSame ? 'focus:ring-emerald-500/50' : 'focus:ring-red-500/50'} outline-none transition`}
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value); setIsSame(password === e.target.value);}}
                    required
                    />
                    <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition"
                    >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-900/30 hover:bg-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>{mode === 'signin' ? 'Sign In to Account' : 'Create Free Account'}</>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-500 font-medium">
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => navigate(`/auth/${mode === 'signin' ? 'signup' : 'signin'}`)}
                className="ml-2 text-emerald-500 font-black hover:text-emerald-400 transition"
              >
                {mode === 'signin' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-zinc-700 font-bold uppercase tracking-widest px-6">
          By continuing, you agree to {APP_NAME}'s Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthView;
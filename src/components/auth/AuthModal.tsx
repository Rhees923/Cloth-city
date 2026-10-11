import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    showToast,
    navigateTo
  } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (authModalMode === 'login') {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      login(email, email.toLowerCase().includes('admin') ? 'admin' : 'customer');
      setIsAuthModalOpen(false);
    } else if (authModalMode === 'register') {
      if (!name || !email || !password) {
        setError('Please fill in all mandatory fields.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreeTerms) {
        setError('You must accept the Terms and Privacy Policy to proceed.');
        return;
      }
      login(email, 'customer');
      setIsAuthModalOpen(false);
      showToast('Account created successfully! Welcome to ClothCity.');
    } else if (authModalMode === 'forgot') {
      if (!email) {
        setError('Please enter your email.');
        return;
      }
      showToast(`Password reset link sent to ${email}. Check your inbox.`);
      setAuthModalMode('login');
    }
  };

  const handleQuickDemoLogin = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      login('admin@clothcity.in', 'admin');
      setIsAuthModalOpen(false);
      navigateTo('admin');
    } else {
      login('anandhu.mohan@example.com', 'customer');
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div>
              <h3 className="font-display font-extrabold text-xl text-zinc-900">
                {authModalMode === 'login' && 'Sign in to ClothCity'}
                {authModalMode === 'register' && 'Create your Account'}
                {authModalMode === 'forgot' && 'Reset your Password'}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {authModalMode === 'login' && 'Access saved addresses, order tracking & wishlist'}
                {authModalMode === 'register' && 'Get 10% off your first Kerala order with code CLOTH10'}
                {authModalMode === 'forgot' && 'Enter your email to receive recovery instructions'}
              </p>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Demo Login Bar */}
          <div className="mt-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs">
            <span className="font-bold text-zinc-700 block mb-1.5 text-[11px] uppercase tracking-wider">
              Fast Demo Switcher:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('customer')}
                className="py-1.5 px-2.5 bg-white border border-zinc-300 hover:border-black rounded-lg text-zinc-800 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Customer Account
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="py-1.5 px-2.5 bg-zinc-900 text-[#B4F724] hover:bg-black rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
              >
                Store Admin Portal
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            {authModalMode === 'register' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anandhu Mohan"
                      className="w-full bg-zinc-50 text-xs text-zinc-900 pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                      required
                    />
                    <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Mobile Number (Kerala / India)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98471 23456"
                      className="w-full bg-zinc-50 text-xs text-zinc-900 pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                    />
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-50 text-xs text-zinc-900 pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                  required
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authModalMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                    Password
                  </label>
                  {authModalMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthModalMode('forgot')}
                      className="text-[11px] text-zinc-500 hover:text-black font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 text-xs text-zinc-900 pl-9 pr-10 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                    required
                  />
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {authModalMode === 'register' && (
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 text-xs text-zinc-900 pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900"
                    required
                  />
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            {authModalMode === 'register' && (
              <label className="flex items-start gap-2 text-xs text-zinc-600 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded mt-0.5 text-zinc-900 focus:ring-black"
                />
                <span>
                  I accept the ClothCity{' '}
                  <button type="button" onClick={() => { setIsAuthModalOpen(false); navigateTo('terms'); }} className="underline font-semibold text-black">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" onClick={() => { setIsAuthModalOpen(false); navigateTo('privacy'); }} className="underline font-semibold text-black">Privacy Policy</button>.
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-zinc-950 hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer mt-2"
            >
              {authModalMode === 'login' && 'Sign In'}
              {authModalMode === 'register' && 'Create Account'}
              {authModalMode === 'forgot' && 'Send Recovery Email'}
            </button>
          </form>

          {/* Social Sign In */}
          {authModalMode !== 'forgot' && (
            <div className="mt-4 pt-4 border-t border-zinc-100 text-center">
              <button
                type="button"
                onClick={() => {
                  login('google.user@example.com', 'customer');
                  setIsAuthModalOpen(false);
                  showToast('Signed in with Google successfully!');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          )}

          {/* Toggle between Login and Register */}
          <div className="mt-4 text-center text-xs text-zinc-500">
            {authModalMode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('register')}
                  className="font-bold text-black hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="font-bold text-black hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AuthUser } from '../types';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Building,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  KeyRound,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);

  // Form states
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up states
  const [name, setName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AuthUser['role']>('Store Manager');
  const [businessName, setBusinessName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Validation helpers
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const validatePhone = (val: string) => /^[6-9]\d{9}$/.test(val.trim().replace(/\D/g, ''));

  const calculatePasswordStrength = (pass: string): { score: number; label: string; color: string } => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-stone-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Good', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const newErrors: Record<string, string> = {};

    if (!signInEmail.trim()) {
      newErrors.signInEmail = 'Email address is required';
    } else if (!validateEmail(signInEmail)) {
      newErrors.signInEmail = 'Please enter a valid email address';
    }

    if (!signInPassword) {
      newErrors.signInPassword = 'Password is required';
    } else if (signInPassword.length < 6) {
      newErrors.signInPassword = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success login
    const user: AuthUser = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      name: signInEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'PosBytz User',
      email: signInEmail.trim(),
      role: 'Store Manager',
      businessName: 'Bengaluru Flagship Outlet',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      signedAt: new Date().toISOString(),
    };

    onLoginSuccess(user);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters';
    }

    if (!signUpEmail.trim()) {
      newErrors.signUpEmail = 'Email is required';
    } else if (!validateEmail(signUpEmail)) {
      newErrors.signUpEmail = 'Enter a valid email address';
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Enter valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    if (role === 'Student / Customer' && !rollNo.trim()) {
      newErrors.rollNo = 'Roll No / ID is required for student/cafeteria accounts';
    }

    if (signUpPassword.length < 8) {
      newErrors.signUpPassword = 'Password must be at least 8 characters';
    } else if (!/\d/.test(signUpPassword)) {
      newErrors.signUpPassword = 'Password must include at least one number';
    }

    if (confirmPassword !== signUpPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms & privacy policy to continue';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success registration
    const user: AuthUser = {
      id: `usr_${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      email: signUpEmail.trim(),
      phone: `+91 ${cleanPhone}`,
      role: role,
      businessName: businessName.trim() || (role === 'Student / Customer' ? 'Campus Cafeteria' : 'PosBytz Partner Outlet'),
      rollNo: rollNo.trim() || undefined,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      signedAt: new Date().toISOString(),
    };

    onLoginSuccess(user);
  };

  const handleQuickLogin = (demoUser: AuthUser) => {
    onLoginSuccess(demoUser);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !validateEmail(forgotEmail)) {
      setErrors({ forgotEmail: 'Please provide a valid registered email' });
      return;
    }
    setErrors({});
    setForgotSent(true);
  };

  const pwdStrength = calculatePasswordStrength(signUpPassword);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="auth-modal-dialog"
      >
        {/* Modal Top Header */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-orange-50/70 to-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F97316] text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-stone-900 font-heading">
                {mode === 'signin' && 'Sign In to PosBytz ERP'}
                {mode === 'signup' && 'Create Your ERP Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-xs text-stone-500">
                {mode === 'signin' && 'Access Cloud POS, Kitchen KDS & live inventory'}
                {mode === 'signup' && 'Instant setup • 14-day full feature access'}
                {mode === 'forgot' && 'We will send a secure recovery link'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
            id="auth-modal-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector (Sign In vs Create Account) */}
        {mode !== 'forgot' && (
          <div className="flex p-1.5 mx-6 mt-4 bg-stone-100 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrors({});
                setGeneralError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              id="auth-tab-signin"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrors({});
                setGeneralError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              id="auth-tab-signup"
            >
              Create Account
            </button>
          </div>
        )}

        {/* Modal Body Container with Scroll */}
        <div className="p-6 overflow-y-auto no-scrollbar space-y-4">
          {generalError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{generalError}</span>
            </div>
          )}

          {/* ===================== SIGN IN VIEW ===================== */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4" noValidate id="signin-form">
              {/* Email field */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => {
                      setSignInEmail(e.target.value);
                      if (errors.signInEmail) setErrors({ ...errors, signInEmail: '' });
                    }}
                    placeholder="name@business.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 rounded-xl text-sm text-stone-900 border ${
                      errors.signInEmail
                        ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-200'
                        : 'border-stone-200 focus:border-[#F97316] focus:ring-orange-100'
                    } focus:outline-none focus:ring-4 transition-all`}
                    id="signin-email-input"
                  />
                </div>
                {errors.signInEmail && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.signInEmail}</span>
                  </p>
                )}
              </div>

              {/* Password field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrors({});
                    }}
                    className="text-xs font-semibold text-[#F97316] hover:underline"
                    id="signin-forgot-btn"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => {
                      setSignInPassword(e.target.value);
                      if (errors.signInPassword) setErrors({ ...errors, signInPassword: '' });
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-2.5 bg-stone-50 rounded-xl text-sm text-stone-900 border ${
                      errors.signInPassword
                        ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-200'
                        : 'border-stone-200 focus:border-[#F97316] focus:ring-orange-100'
                    } focus:outline-none focus:ring-4 transition-all`}
                    id="signin-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.signInPassword && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.signInPassword}</span>
                  </p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="signin-remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-stone-300 text-[#F97316] focus:ring-orange-200 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="signin-remember-me" className="text-xs text-stone-600 cursor-pointer select-none">
                  Keep me logged in on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F97316] text-white font-bold text-sm shadow-[0_8px_20px_-2px_rgba(249,115,22,0.35)] hover:bg-[#EA580C] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                id="signin-submit-btn"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Click Quick Demo Sign-Ins */}
              <div className="pt-3 border-t border-stone-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 text-center mb-2.5">
                  Instant Evaluator 1-Click Test Logins
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickLogin({
                        id: 'usr_pawan_01',
                        name: 'Pawan Patil',
                        email: 'pawan.patil@codex.dev',
                        phone: '+91 9876543210',
                        role: 'Store Manager',
                        businessName: 'Team CodeX Flagship Cafe',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
                        signedAt: new Date().toISOString(),
                      })
                    }
                    className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-left transition-colors flex flex-col"
                    id="quick-login-manager"
                  >
                    <span className="text-[10px] font-bold text-orange-800">Manager</span>
                    <span className="text-[11px] font-bold text-stone-900 truncate">Pawan Patil</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleQuickLogin({
                        id: 'usr_cashier_02',
                        name: 'Aarav Sharma',
                        email: 'aarav@posbytz.in',
                        phone: '+91 9820011223',
                        role: 'Cashier',
                        businessName: 'Counter 1 (Main Hall)',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
                        signedAt: new Date().toISOString(),
                      })
                    }
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-colors flex flex-col"
                    id="quick-login-cashier"
                  >
                    <span className="text-[10px] font-bold text-emerald-800">Cashier POS</span>
                    <span className="text-[11px] font-bold text-stone-900 truncate">Aarav Sharma</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleQuickLogin({
                        id: 'usr_student_03',
                        name: 'Rahul Verma',
                        email: 'rahul.v@campus.edu',
                        phone: '+91 9988776655',
                        role: 'Student / Customer',
                        rollNo: '2024CS104',
                        businessName: 'Campus Cafeteria',
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
                        signedAt: new Date().toISOString(),
                      })
                    }
                    className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left transition-colors flex flex-col"
                    id="quick-login-student"
                  >
                    <span className="text-[10px] font-bold text-blue-800">Customer</span>
                    <span className="text-[11px] font-bold text-stone-900 truncate">Roll 2024CS104</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ===================== SIGN UP VIEW ===================== */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5" noValidate id="signup-form">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Pawan Patil"
                    className={`w-full pl-10 pr-4 py-2 bg-stone-50 rounded-xl text-sm text-stone-900 border ${
                      errors.name ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200'
                    } focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 transition-all`}
                    id="signup-name-input"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
              </div>

              {/* Email and Mobile Number Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => {
                        setSignUpEmail(e.target.value);
                        if (errors.signUpEmail) setErrors({ ...errors, signUpEmail: '' });
                      }}
                      placeholder="pawan@example.com"
                      className={`w-full pl-8 pr-3 py-2 bg-stone-50 rounded-xl text-xs text-stone-900 border ${
                        errors.signUpEmail ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200'
                      } focus:outline-none focus:border-[#F97316] transition-all`}
                      id="signup-email-input"
                    />
                  </div>
                  {errors.signUpEmail && <p className="mt-1 text-[11px] text-rose-500">{errors.signUpEmail}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mobile (+91) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="9876543210"
                      maxLength={10}
                      className={`w-full pl-8 pr-3 py-2 bg-stone-50 rounded-xl text-xs text-stone-900 border ${
                        errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200'
                      } focus:outline-none focus:border-[#F97316] transition-all`}
                      id="signup-phone-input"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-[11px] text-rose-500">{errors.phone}</p>}
                </div>
              </div>

              {/* Role & Business Type Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Account Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as AuthUser['role'])}
                    className="w-full px-3 py-2 bg-stone-50 rounded-xl text-xs font-semibold text-stone-900 border border-stone-200 focus:outline-none focus:border-[#F97316]"
                    id="signup-role-select"
                  >
                    <option value="Store Manager">Store Manager</option>
                    <option value="Cashier">Cashier POS</option>
                    <option value="Admin">Headquarters Admin</option>
                    <option value="Chef">Kitchen KDS Chef</option>
                    <option value="Student / Customer">Student / Customer</option>
                  </select>
                </div>

                {role === 'Student / Customer' ? (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Roll No / Student ID <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => {
                        setRollNo(e.target.value);
                        if (errors.rollNo) setErrors({ ...errors, rollNo: '' });
                      }}
                      placeholder="e.g. 2024CS104"
                      className={`w-full px-3 py-2 bg-stone-50 rounded-xl text-xs text-stone-900 border ${
                        errors.rollNo ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200'
                      } focus:outline-none focus:border-[#F97316]`}
                      id="signup-rollno-input"
                    />
                    {errors.rollNo && <p className="mt-1 text-[11px] text-rose-500">{errors.rollNo}</p>}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Outlet / Business Name</label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Bengaluru Cafe"
                        className="w-full pl-8 pr-3 py-2 bg-stone-50 rounded-xl text-xs text-stone-900 border border-stone-200 focus:outline-none focus:border-[#F97316]"
                        id="signup-business-input"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signUpPassword}
                      onChange={(e) => {
                        setSignUpPassword(e.target.value);
                        if (errors.signUpPassword) setErrors({ ...errors, signUpPassword: '' });
                      }}
                      placeholder="Min 8 characters"
                      className={`w-full pl-8 pr-3 py-2 bg-stone-50 rounded-xl text-xs text-stone-900 border ${
                        errors.signUpPassword ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200'
                      } focus:outline-none focus:border-[#F97316]`}
                      id="signup-password-input"
                    />
                  </div>
                  {errors.signUpPassword && <p className="mt-1 text-[11px] text-rose-500">{errors.signUpPassword}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                      }}
                      placeholder="Re-enter password"
                      className={`w-full pl-8 pr-3 py-2 bg-stone-50 rounded-xl text-xs text-stone-900 border ${
                        errors.confirmPassword ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200'
                      } focus:outline-none focus:border-[#F97316]`}
                      id="signup-confirmpassword-input"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-[11px] text-rose-500">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Password Strength Indicator */}
              {signUpPassword && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-medium">Password Strength:</span>
                    <span className={`font-bold ${pwdStrength.score >= 2 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {pwdStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 rounded-full ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'}`} />
                    <div className={`h-full flex-1 rounded-full ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'}`} />
                  </div>
                </div>
              )}

              {/* Terms Checkbox */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (errors.acceptTerms) setErrors({ ...errors, acceptTerms: '' });
                    }}
                    className="mt-0.5 rounded border-stone-300 text-[#F97316] focus:ring-orange-200 w-4 h-4"
                    id="signup-terms-checkbox"
                  />
                  <span className="text-[11px] text-stone-600 leading-tight">
                    I agree to PosBytz ERP Terms of Service, Privacy Policy & GST compliance rules.
                  </span>
                </label>
                {errors.acceptTerms && <p className="mt-1 text-[11px] text-rose-500">{errors.acceptTerms}</p>}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F97316] text-white font-bold text-sm shadow-[0_8px_20px_-2px_rgba(249,115,22,0.35)] hover:bg-[#EA580C] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                id="signup-submit-btn"
              >
                <span>Create ERP Account</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ===================== FORGOT PASSWORD VIEW ===================== */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              {forgotSent ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-emerald-900 text-sm">Recovery Instructions Dispatched</h3>
                  <p className="text-xs text-emerald-700">
                    We sent password reset steps to <strong className="font-mono">{forgotEmail}</strong>. Please check your inbox and spam folder.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setForgotSent(false);
                      setForgotEmail('');
                    }}
                    className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4" noValidate>
                  <p className="text-xs text-stone-600">
                    Enter the email registered with your PosBytz Cloud ERP account. We will send a one-time reset code to set up a new password.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Account Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value);
                          if (errors.forgotEmail) setErrors({ ...errors, forgotEmail: '' });
                        }}
                        placeholder="yourname@domain.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 rounded-xl text-sm text-stone-900 border ${
                          errors.forgotEmail ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200'
                        } focus:outline-none focus:border-[#F97316]`}
                        id="forgot-email-input"
                      />
                    </div>
                    {errors.forgotEmail && <p className="mt-1 text-xs text-rose-500">{errors.forgotEmail}</p>}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signin');
                        setErrors({});
                      }}
                      className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#F97316] text-white text-xs font-bold hover:bg-[#EA580C]"
                      id="forgot-submit-btn"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Banner */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </span>
          <span>Engineered by Pawan Patil</span>
        </div>
      </div>
    </div>
  );
};

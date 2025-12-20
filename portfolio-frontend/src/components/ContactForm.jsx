import React, { useState } from 'react';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MessageSquare, Send, 
  Loader2, CheckCircle2, AlertTriangle, XCircle, ShieldCheck 
} from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  // --- 🛡️ SECURITY & VALIDATION LOGIC ---
  const validateField = (name, value) => {
    // 1. Check Empty
    if (!value || value.trim() === '') return 'REQUIRED FIELD';

    switch (name) {
      case 'name':
        // Allow letters, spaces, and simple accents. No numbers or symbols.
        return /^[a-zA-Z\s\u00C0-\u00FF]+$/.test(value) 
          ? null 
          : 'ALPHABETS ONLY';

      case 'email':
        // Strict Email Regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? null 
          : 'INVALID EMAIL FORMAT';

      case 'phone':
        // 🌍 INTERNATIONAL FORMAT ENFORCEMENT
        // 1. Must contain a '+'
        if (!value.includes('+')) return 'MISSING COUNTRY CODE (e.g. +91)';
        
        // 2. Strip formatting (spaces, dashes) to check digits
        const cleanNumber = value.replace(/[\s\-\(\)]/g, '');
        
        // 3. Check for E.164 Standard (e.g., +919876543210)
        // \+ followed by 10 to 15 digits
        return /^\+[0-9]{10,15}$/.test(cleanNumber) 
          ? null 
          : 'INVALID NUMBER (+CODE REQUIRED)';

      case 'message':
        // Security: Prevent script tags
        if (/<script/i.test(value)) return 'ILLEGAL CHARACTERS DETECTED';
        return value.length >= 10 
          ? null 
          : `MIN 10 CHARS (${value.length}/10)`;

      default: 
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    // Validate ALL fields strictly
    ['name', 'email', 'phone', 'message'].forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (!isValid) return;

    setStatus({ loading: true, success: false, error: null });

    // 🛡️ SANITIZATION BEFORE SENDING
    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim().replace(/\s+/g, ' '), // Normalize spaces
      message: formData.message.trim()
    };

    try {
      await api.post('/messages', sanitizedData);
      
      // Artificial delay for UX "Processing" feel
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTouched({});
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'SERVER UPLINK REFUSED' });
    }
  };

  // --- RENDER HELPERS ---
  const renderInput = (name, icon, placeholder, type = 'text', isArea = false) => {
    const hasError = touched[name] && errors[name];
    const isValid = touched[name] && !errors[name] && formData[name] !== '';
    
    const baseBorder = hasError ? "border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.25)]" : 
                       isValid ? "border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.25)]" : 
                       "border-slate-700 hover:border-blue-500/50";

    const IconComp = icon;

    return (
      <div className="space-y-1.5 relative group">
        {/* Label Row */}
        <div className="flex items-end justify-between px-1">
          <label className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${hasError ? 'text-red-400' : isValid ? 'text-emerald-400' : 'text-slate-500'}`}>
            {name}
          </label>
          
          {/* Error / Status Text on Right */}
          <span className={`text-[9px] font-mono tracking-wider uppercase ${hasError ? 'text-red-400' : 'text-slate-600'}`}>
            {hasError ? errors[name] : isValid ? 'VERIFIED' : 'REQUIRED'}
          </span>
        </div>
        
        <div className="relative">
          {/* Input Icon */}
          <IconComp className={`absolute left-4 ${isArea ? 'top-4' : 'top-1/2 -translate-y-1/2'} w-5 h-5 transition-colors duration-300 ${hasError ? 'text-red-400' : isValid ? 'text-emerald-400' : 'text-slate-500 group-focus-within:text-blue-400'}`} />
          
          {isArea ? (
            <textarea
              name={name}
              rows="4"
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-[#0B1120] border ${baseBorder} rounded-lg pl-12 pr-10 py-4 text-sm font-mono text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all duration-300`}
            />
          ) : (
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-[#0B1120] border ${baseBorder} rounded-lg pl-12 pr-10 py-3.5 text-sm font-mono text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all duration-300`}
            />
          )}

          {/* Right-Side Status Icon */}
          <div className={`absolute right-4 ${isArea ? 'top-4' : 'top-1/2 -translate-y-1/2'} transition-all duration-300`}>
            <AnimatePresence>
              {hasError && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <XCircle className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
              {isValid && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status.success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center bg-[#0B1120] border border-emerald-500/30 rounded-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.1)_50%,transparent_100%)] opacity-20 animate-pulse" />
            
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="mb-2 text-2xl font-black tracking-tight text-white">DATA SECURED</h3>
            <p className="mb-8 font-mono text-xs uppercase text-slate-400">Packet sent successfully to server.</p>
            <button 
              onClick={() => setStatus({ ...status, success: false })}
              className="px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all border rounded-md bg-emerald-900/30 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-400"
            >
              New Transmission
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative space-y-6" noValidate>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {renderInput('name', User, 'FULL NAME')}
              {renderInput('email', Mail, 'EMAIL ADDRESS', 'email')}
            </div>

            {/* Phone Input with enhanced placeholder guidance */}
            {renderInput('phone', Phone, '+91 98765 43210 (Code Required)', 'tel')}
            
            {renderInput('message', MessageSquare, 'PROJECT SPECS / DETAILS...', 'text', true)}

            {/* System Alert Banner */}
            <AnimatePresence>
              {Object.keys(errors).some(k => errors[k]) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-3 border-l-2 border-red-500 rounded-r-lg bg-red-950/30"
                >
                  <p className="text-[10px] text-red-400 font-mono font-bold tracking-widest flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> 
                    VALIDATION ERROR: CHECK FIELDS FOR RED INDICATORS
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={status.loading}
              className={`
                group w-full py-4 font-bold rounded-lg shadow-lg transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-3
                ${Object.keys(errors).some(k => errors[k]) 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transform hover:-translate-y-0.5'}
              `}
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                  <span className="tracking-[0.2em] text-xs">ENCRYPTING & SENDING...</span>
                </>
              ) : (
                <>
                  <Send className={`w-5 h-5 ${Object.keys(errors).some(k => errors[k]) ? 'text-slate-500' : 'text-blue-200 group-hover:text-white'} transition-colors`} />
                  <span className="tracking-[0.2em] text-xs">INITIATE SECURE LINK</span>
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
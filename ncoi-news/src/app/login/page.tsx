'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Loading...');

    if (isSignUp) {
      // Register a new volunteer
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage('Registration successful! Waiting for Admin approval.');
    } else {
      // Log in an existing user
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else {
        setMessage('Login successful!');
        window.location.href = '/dashboard';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-black">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6 uppercase tracking-wider">
          {isSignUp ? 'Volunteer Portal' : 'Staff Login'}
        </h2>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-gray-400 rounded-md p-2"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-gray-400 rounded-md p-2"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-900 text-white font-bold py-3 px-4 rounded hover:bg-blue-800 transition uppercase tracking-wide"
          >
            {isSignUp ? 'Apply to Write' : 'Sign In'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-center text-sm font-bold text-blue-900 rounded">
            {message}
          </div>
        )}

        <div className="mt-6 text-center border-t pt-4">
          <button 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="text-sm text-blue-600 hover:underline font-bold"
          >
            {isSignUp ? 'Already have an account? Log in' : 'Want to volunteer? Register here'}
          </button>
        </div>
      </div>
    </div>
  );
}
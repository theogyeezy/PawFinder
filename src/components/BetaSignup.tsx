import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Mail } from 'lucide-react';

export function BetaSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Add email to beta-signups collection with server timestamp
      await addDoc(collection(db, 'beta-signups'), {
        email,
        signupDate: serverTimestamp(),
        source: window.location.hostname,
        status: 'pending'
      });

      setStatus('success');
      setMessage('Thanks for signing up! We\'ll notify you when the beta starts.');
      setEmail('');
    } catch (error) {
      console.error('Beta signup error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-blue-700 text-white py-3 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-blue-300" />
          </div>
          <input
            type="email"
            placeholder="Enter your email for beta access"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-blue-500 rounded-md leading-5 bg-blue-600 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-white"
            disabled={status === 'loading' || status === 'success'}
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
        >
          {status === 'loading' ? 'Signing up...' : 'Join Beta'}
        </button>
      </form>
      {message && (
        <p className={`text-sm text-center mt-2 ${status === 'error' ? 'text-red-300' : 'text-blue-200'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
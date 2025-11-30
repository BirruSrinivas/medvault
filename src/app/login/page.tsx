'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const userData = localStorage.getItem(`user_${id.toUpperCase()}`);
    
    if (!userData) {
      setMessage('Invalid ID! Register first or try demo IDs: PAT123 / DOC456');
      return;
    }

    const user = JSON.parse(userData);

    if (user.role !== role) {
      setMessage(`This ID is registered as ${user.role}. Please select correct role.`);
      return;
    }

    // Smart matching
    if (role === 'patient') {
      const doctors = ['Cardiologist', 'Endocrinologist', 'Oncologist'].filter(spec => {
        for (let key in localStorage) {
          if (key.startsWith('user_')) {
            const u = JSON.parse(localStorage.getItem(key) || '{}');
            if (u.role === 'doctor' && u.specialty === getSpecialist(user.disease)) return true;
          }
        }
        return false;
      });
      setMessage(`Welcome ${user.name}! Recommended: ${getSpecialist(user.disease)}`);
      setTimeout(() => router.push('/patient-dashboard'), 1500);
    } else {
      setMessage(`Welcome Dr. ${user.name}! Specialty: ${user.specialty}`);
      setTimeout(() => router.push('/doctor-dashboard'), 1500);
    }
  };

  const getSpecialist = (disease: string) => {
    const map: any = { 'Heart Disease': 'Cardiologist', 'Diabetes': 'Endocrinologist', 'Lung Cancer': 'Oncologist' };
    return map[disease] || 'General Physician';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-purple-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-10 shadow-2xl bg-white/10 backdrop-blur">
        <h1 className="text-5xl font-black text-center mb-8 text-cyan-300">MedVault Login</h1>

        <div className="flex justify-center gap-6 mb-8">
          <Button variant={role === 'patient' ? 'default' : 'outline'} onClick={() => setRole('patient')}>Patient</Button>
          <Button variant={role === 'doctor' ? 'default' : 'outline'} onClick={() => setRole('doctor')}>Doctor</Button>
        </div>

        <input
          type="text"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-4 rounded-lg text-lg mb-6 bg-black/50 text-white"
        />

        {message && <p className={`text-center font-bold text-lg mb-4 ${message.includes('Welcome') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}

        <Button onClick={handleLogin} size="lg" className="w-full text-2xl mb-4">
          Login Securely
        </Button>

        <div className="text-center text-cyan-300">
          <p>New user? <a href="/register" className="underline font-bold">Register here</a></p>
          <p className="mt-4 text-sm">Demo: Register → Login with your ID</p>
        </div>
      </Card>
    </div>
  );
}
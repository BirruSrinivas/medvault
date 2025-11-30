'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [disease, setDisease] = useState('');
  const [specialty, setSpecialty] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (!name || !id) return alert('Fill all fields');

    const user = {
      name,
      id: id.toUpperCase(),
      role,
      [role === 'patient' ? 'disease' : 'specialty']: role === 'patient' ? disease : specialty,
      registeredAt: new Date().toLocaleString()
    };

    localStorage.setItem(`user_${id.toUpperCase()}`, JSON.stringify(user));
    alert(`${role.toUpperCase()} registered successfully! Login with ID: ${id.toUpperCase()}`);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-teal-900 to-cyan-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-12 shadow-2xl bg-white/10 backdrop-blur-xl border border-cyan-500/50">
        <h1 className="text-5xl font-black text-center mb-10 text-cyan-300">Register to MedVault</h1>

        <div className="flex justify-center gap-8 mb-10">
          <Button variant f={role === 'patient' ? 'default' : 'outline'} onClick={() => setRole('patient')} size="lg">
            Patient Registration
          </Button>
          <Button variant={role === 'doctor' ? 'default' : 'outline'} onClick={() => setRole('doctor')} size="lg">
            Doctor Registration
          </Button>
        </div>

        <div className="space-y-6">
          <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 rounded-lg text-lg bg-black/50 text-white" />
          <input placeholder="ID (e.g. RAHUL123)" value={id} onChange={e => setId(e.target.value)} className="w-full p-4 rounded-lg text-lg bg-black/50 text-white" />

          {role === 'patient' ? (
            <select value={disease} onChange={e => setDisease(e.target.value)} className="w-full p-4 rounded-lg text-lg bg-black/50 text-white">
              <option value="">Select Your Disease</option>
              <option>Diabetes</option>
              <option>Hypertension</option>
              <option>Lung Cancer</option>
              <option>Heart Disease</option>
              <option>Thyroid</option>
            </select>
          ) : (
            <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="w-full p-4 rounded-lg text-lg bg-black/50 text-white">
              <option value="">Your Specialty</option>
              <option>Cardiologist</option>
              <option>Endocrinologist</option>
              <option>Oncologist</option>
              <option>General Physician</option>
            </select>
          )}

          <Button onClick={handleRegister} size="lg" className="w-full text-2xl py-8 bg-gradient-to-r from-cyan-600 to-teal-600">
            Register Now
          </Button>
        </div>

        <p className="text-center mt-8 text-cyan-300">
          Already registered? <a href="/login" className="underline font-bold">Login here</a>
        </p>
      </Card>
    </div>
  );
}
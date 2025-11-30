'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Lock, Unlock, User, Stethoscope, Shield, ArrowRight } from 'lucide-react';
import CryptoJS from 'crypto-js';

export default function Home() {
  const [input, setInput] = useState('Name: Rahul Sharma | BP: 120/80 | Sugar: 95 | Allergy: None');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const secretKey = 'MedVaultSecret2025';

  const encrypt = () => {
    const enc = CryptoJS.AES.encrypt(input, secretKey).toString();
    setEncrypted(enc);
    setDecrypted('');
  };

  const decrypt = () => {
    try {
      const dec = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
      setDecrypted(dec);
    } catch {
      setDecrypted('Wrong key! Access Denied');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-purple-900 text-white overflow-x-hidden">
      {/* Hero */}
      <motion.div className="text-center pt-20 pb-16 px-6">
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl md:text-9xl font-black bg-gradient-to-r from-cyan-400 via-lime-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl"
        >
          MedVault
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-3xl md:text-5xl font-bold mt-8 text-cyan-300"
        >
          Your Health Data. Locked. Safe. Private.
        </motion.p>
      </motion.div>

      {/* Patient → Encryption → Doctor */}
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-16 items-center my-24">
        <motion.div initial={{ x: -300 }} animate={{ x: 0 }} className="text-center">
          <div className="w-56 h-56 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-2xl">
            <User className="w-36 h-36" />
          </div>
          <h3 className="text-5xl font-black mt-8 text-pink-400">PATIENT</h3>
        </motion.div>

        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} className="text-center">
          <ArrowRight className="w-32 h-32 mx-auto text-cyan-400 animate-pulse" />
          <Lock className="w-28 h-28 mx-auto -mt-10 text-yellow-400" />
          <p className="text-4xl font-black text-yellow-300 mt-8">AES-256<br/>ENCRYPTION</p>
        </motion.div>

        <motion.div initial={{ x: 300 }} animate={{ x: 0 }} className="text-center">
          <div className="w-56 h-56 mx-auto bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
            <Stethoscope className="w-36 h-36" />
          </div>
          <h3 className="text-5xl font-black mt-8 text-blue-400">DOCTOR</h3>
        </motion.div>
      </div>

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-8 pb-32">
        <h2 className="text-6xl font-black text-center mb-20 text-cyan-300">
          Live Demo – Watch Privacy in Action
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <Card className="p-10 bg-white/10 backdrop-blur-xl border border-cyan-500/50">
            <h3 className="text-3xl font-bold text-cyan-300 text-center mb-8">Patient Types Data</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-6 rounded-xl bg-black/50 text-white text-lg border border-cyan-600 focus:ring-4 focus:ring-cyan-500"
              rows={6}
            />
            <Button onClick={encrypt} size="lg" className="w-full mt-8 text-2xl py-8 bg-gradient-to-r from-cyan-600 to-teal-600">
              <Lock className="mr-4" /> Encrypt & Send
            </Button>
          </Card>

          <Card className={`p-10 backdrop-blur-xl border-4 ${encrypted ? 'border-yellow-500 shadow-yellow-500/60' : 'border-gray-600'}`}>
            <h3 className="text-3xl font-bold text-yellow-300 text-center mb-8">Encrypted (Safe)</h3>
            <div className="bg-black/70 p-6 rounded-xl font-mono text-xs h-48 overflow-y-auto">
              {encrypted || 'Click Encrypt to see...'}
            </div>
            {encrypted && <Shield className="w-28 h-28 mx-auto mt-10 text-green-400 animate-pulse" />}
          </Card>

          <Card className="p-10 bg-white/10 backdrop-blur-xl border border-pink-500/50">
            <h3 className="text-3xl font-bold text-pink-300 text-center mb-8">Doctor Decrypts</h3>
            <Button onClick={decrypt} size="lg" className="w-full text-2xl py-8" disabled={!encrypted}>
              <Unlock className="mr-4" /> Decrypt Now
            </Button>
            {decrypted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 p-8 bg-green-900/70 rounded-2xl text-2xl font-bold text-center"
              >
                {decrypted}
              </motion.div>
            )}
          </Card>
        </div>

        {/* Buttons at bottom */}
        <div className="text-center mt-24 space-x-10">
          <Button asChild size="lg" className="text-3xl px-16 py-10">
            <Link href="/register">New User? Register</Link>
          </Button>
          <Button asChild size="lg" className="text-3xl px-16 py-10 bg-gradient-to-r from-cyan-600 to-teal-600">
            <Link href="/login">Login to Portal</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
// src/app/encryption-demo/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CryptoJS from 'crypto-js';

export default function EncryptionDemo() {
  const [data, setData] = useState('Blood Sugar: 95 mg/dL');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const secretKey = 'MedVaultSecret2025';

  const encrypt = () => {
    const enc = CryptoJS.AES.encrypt(data, secretKey).toString();
    setEncrypted(enc);
  };

  const decrypt = () => {
    const dec = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
    setDecrypted(dec);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-teal-900 p-10 text-white">
      <h1 className="text-5xl font-black text-center mb-10">Encryption Demo</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8">
          <textarea value={data} onChange={e => setData(e.target.value)} className="w-full p-4 rounded bg-black/50" rows={3} />
          <Button onClick={encrypt} className="mt-4">Encrypt</Button>
        </Card>
        {encrypted && (
          <Card className="p-8 bg-yellow-900/50">
            <p className="text-xs break-all">{encrypted}</p>
            <Button onClick={decrypt} className="mt-4">Decrypt</Button>
          </Card>
        )}
        {decrypted && <Card className="p-8 bg-green-900/50 text-2xl">{decrypted}</Card>}
      </div>
    </div>
  );
}
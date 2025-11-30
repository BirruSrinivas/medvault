'use client';

import { useState } from 'react';
import { Button } from '@componentsuibutton';
import { Card } from '@componentsuicard';
import CryptoJS from 'crypto-js';

export default function EncryptionDemo() {
  const [data, setData] = useState('Blood Report BP 12080, Sugar 95');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const secretKey = 'MedVaultSecret2025';

  const encrypt = () = {
    const enc = CryptoJS.AES.encrypt(data, secretKey).toString();
    setEncrypted(enc);
  };

  const decrypt = () = {
    const dec = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
    setDecrypted(dec);
  };

  return (
    div className=min-h-screen bg-gradient-to-br from-purple-900 to-teal-900 p-8
      h1 className=text-6xl font-black text-center text-white mb-12Live Encryption Demoh1
      div className=max-w-4xl mx-auto space-y-8
        Card className=p-8
          h2 className=text-2xl font-bold mb-4Original Patient Datah2
          textarea value={data} onChange={(e) = setData(e.target.value)} className=w-full p-4 rounded-lg text-lg rows={3} 
          Button onClick={encrypt} className=mt-4Encrypt DataButton
        Card

        {encrypted && (
          Card className=p-8 bg-red-90050 text-white
            h2 className=text-2xl font-bold mb-4Encrypted (Safe to Share)h2
            p className=break-all text-sm{encrypted}p
            Button onClick={decrypt} variant=secondary className=mt-4Decrypt (Doctor Only)Button
          Card
        )}

        {decrypted && (
          Card className=p-8 bg-green-90050 text-white
            h2 className=text-2xl font-bold mb-4Decrypted Successfullyh2
            p className=text-xl{decrypted}p
          Card
        )}
      div
    div
  );
}
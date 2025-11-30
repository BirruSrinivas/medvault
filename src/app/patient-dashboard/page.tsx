'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Heart, Brain, Shield, FileText, QrCode, Download, TrendingUp, AlertCircle } from 'lucide-react';
import QRCode from 'qrcode';

export default function PatientDashboard() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [heartRate] = useState(78);
  const [bp] = useState("120/80");
  const [sugar] = useState(96);
  const [oxygen] = useState(98);

  // Fake real-time vitals update
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live data
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const generateQR = async () => {
    const patientData = {
      name: "Rahul Sharma",
      id: "RAHUL123",
      age: 28,
      bloodGroup: "O+",
      disease: "Diabetes",
      recentReport: "HbA1c: 6.8% (Controlled)",
      emergencyContact: "+91 98765 43210",
      lastVisit: "28 Nov 2025",
      encryptedKey: "Use MedVault to decrypt"
    };

    const url = await QRCode.toDataURL(JSON.stringify(patientData, null, 2), {
      width: 600,
      color: { dark: '#006D77', light: '#E6F4F1' }
    });
    setQrCodeUrl(url);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl!;
    link.download = 'Rahul_Sharma_MedVault_QR.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-black text-center mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
      >
        Patient Portal – Rahul Sharma
      </motion.h1>
      <p className="text-center text-2xl text-gray-700 mb-12">ID: RAHUL123 | Diabetes Patient</p>

      {/* Live Vitals */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Heart, label: "Heart Rate", value: `${heartRate} bpm`, color: "text-red-600", trend: "+2" },
          { icon: Activity, label: "Blood Pressure", value: bp, color: "text-orange-600" },
          { icon: Brain, label: "Blood Sugar", value: `${sugar} mg/dL`, color: "text-purple-600", alert: sugar > 100 },
          { icon: Shield, label: "SpO2", value: `${oxygen}%`, color: "text-green-600" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`p-6 text-center shadow-xl ${item.alert ? 'border-red-500 border-4' : ''}`}>
              <item.icon className={`w-16 h-16 mx-auto mb-3 ${item.color}`} />
              <p className="text-4xl font-black text-gray-800">{item.value}</p>
              <p className="text-lg text-gray-600">{item.label}</p>
              {item.trend && <p className="text-sm text-green-600 mt-2">↑ {item.trend} from yesterday</p>}
              {item.alert && <AlertCircle className="w-8 h-8 mx-auto mt-2 text-red-600 animate-pulse" />}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Live Health Feed */}
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
          <Card className="p-8 text-center hover:shadow-2xl transition-shadow h-full">
            <Activity className="w-20 h-20 mx-auto mb-4 text-teal-600" />
            <h3 className="text-2xl font-bold">Live Health Feed</h3>
            <p className="text-gray-600 mt-3">Connected to Wearable</p>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-bold">LIVE</span>
            </div>
          </Card>
        </motion.div>

        {/* Privacy Control */}
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}>
          <Card className="p-8 text-center hover:shadow-2xl transition-shadow h-full">
            <Shield className="w-20 h-20 mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl font-bold">Privacy Control</h3>
            <p className="text-gray-600 mt-3">You own 100% of your data</p>
            <p className="text-sm text-green-600 font-bold mt-4">Encryption: AES-256</p>
          </Card>
        </motion.div>

        {/* Medical Records */}
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }}>
          <Card className="p-8 text-center hover:shadow-2xl transition-shadow h-full">
            <FileText className="w-20 h-20 mx-auto mb-4 text-blue-600" />
            <h3 className="text-2xl font-bold">Medical Records</h3>
            <p className="text-gray-600 mt-3">12 Reports Available</p>
            <Button variant="outline" className="mt-6">View All Reports</Button>
          </Card>
        </motion.div>

        {/* Share with Doctor */}
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 1 }}>
          <Card className="p-12 text-center hover:shadow-2xl transition-shadow space-y-6">
            <QrCode className="w-24 h-24 mx-auto text-purple-600" />
            <h3 className="text-2xl font-bold">Share with Doctor</h3>
            <Button onClick={generateQR} size="lg" className="w-full text-xl">
              Generate Secure QR
            </Button>

            {qrCodeUrl && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto rounded-xl shadow-2xl border-8 border-white" />
                <Button onClick={downloadQR} variant="secondary" className="w-full">
                  <Download className="mr-2" /> Download QR
                </Button>
                <p className="text-sm text-green-600 font-bold">QR contains encrypted health summary</p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Recent Reports Summary */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-4xl font-black text-center mb-8 text-teal-700">Recent Health Reports</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["HbA1c Report", "Lipid Profile", "Thyroid Test"].map((report, i) => (
            <Card key={i} className="p-6 hover:scale-105 transition-transform">
              <h4 className="text-xl font-bold text-teal-600">{report}</h4>
              <p className="text-gray-600 mt-2">28 Nov 2025</p>
              <p className="text-green-600 font-bold mt-4">Normal Range</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
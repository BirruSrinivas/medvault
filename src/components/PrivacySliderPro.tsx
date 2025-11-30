'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { Brain, Heart, Activity, Download, Copy } from 'lucide-react';

export default function PrivacySliderPro() {
  const [privacy, setPrivacy] = useState([65]);

  const models = {
    cancer: { name: 'Lung Cancer Detection', base: 99.2, drop: 0.20 },
    diabetes: { name: 'Diabetes Risk Prediction', base: 96.8, drop: 0.15 },
    cardio: { name: 'Cardiovascular Forecast', base: 94.5, drop: 0.12 },
  };

  const accuracy = (base: number, drop: number) => +(base - privacy[0] * drop).toFixed(1);
  const epsilon = (8.0 - privacy[0] * 0.07).toFixed(2);

  const chartData = Array.from({ length: 101 }, (_, i) => ({
    privacy: i,
    cancer: +(models.cancer.base - i * models.cancer.drop).toFixed(1),
    diabetes: +(models.diabetes.base - i * models.diabetes.drop).toFixed(1),
    cardio: +(models.cardio.base - i * models.cardio.drop).toFixed(1),
  }));

  const exportConfig = () => {
    const config = {
      privacy_percent: privacy[0],
      epsilon: +epsilon,
      accuracy: {
        cancer: accuracy(models.cancer.base, models.cancer.drop),
        diabetes: accuracy(models.diabetes.base, models.diabetes.drop),
        cardio: accuracy(models.cardio.base, models.cardio.drop),
      },
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medvault-config-${privacy[0]}pct.json`;
    a.click();
  };

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-5xl md:text-7xl font-black mb-16 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent"
        >
          Privacy vs Accuracy Control
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-8 shadow-2xl">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="privacy" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cancer" stroke="#ef4444" strokeWidth={4} name="Lung Cancer" />
                <Line type="monotone" dataKey="diabetes" stroke="#8b5cf6" strokeWidth={4} name="Diabetes" />
                <Line type="monotone" dataKey="cardio" stroke="#3b82f6" strokeWidth={4} name="Cardiology" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="space-y-8">
            <Card className="p-10 bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
              <h3 className="text-4xl font-black mb-8">Privacy Level</h3>
              <div className="flex justify-between text-lg mb-6">
                <span>Max Accuracy</span>
                <span className="text-6xl font-black">{privacy[0]}%</span>
                <span>Max Privacy</span>
              </div>
              <Slider value={privacy} onValueChange={setPrivacy} max={100} step={1} className="h-12" />
              
              <div className="grid grid-cols-3 gap-6 mt-10">
                {Object.values(models).map((m, i) => (
                  <div key={i} className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur">
                    {i === 0 && <Brain className="w-12 h-12 mx-auto mb-3" />}
                    {i === 1 && <Heart className="w-12 h-12 mx-auto mb-3" />}
                    {i === 2 && <Activity className="w-12 h-12 mx-auto mb-3" />}
                    <p className="text-sm opacity-90">{m.name}</p>
                    <p className="text-4xl font-black mt-2">
                      {accuracy(m.base, m.drop)}%
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10 pt-8 border-t border-white/30">
                <p className="text-xl opacity-90">Privacy Budget (ε)</p>
                <p className="text-7xl font-black">{epsilon}</p>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button variant="secondary" size="lg" className="flex-1" onClick={() => navigator.clipboard.writeText(JSON.stringify({ privacy: privacy[0], epsilon }, null, 2))}>
                <Copy className="mr-2" /> Copy JSON
              </Button>
              <Button size="lg" className="flex-1 bg-teal-600" onClick={exportConfig}>
                <Download className="mr-2" /> Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
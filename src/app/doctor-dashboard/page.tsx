'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Stethoscope, Users, Brain, Clock } from 'lucide-react';

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 p-8">
      <motion.h1 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-6xl font-black text-center mb-12 text-indigo-800 dark:text-indigo-300"
      >
        Doctor Console
      </motion.h1>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <motion.div whileHover={{ scale: 1.05 }} className="col-span-1">
          <Card className="p-10 text-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
            <Users className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold">42</h2>
            <p className="text-xl">Patients Today</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="col-span-1">
          <Card className="p-10 text-center bg-gradient-to-br from-pink-600 to-rose-700 text-white">
            <Brain className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold">98.7%</h2>
            <p className="text-xl">AI Confidence</p>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="col-span-1">
          <Card className="p-10 text-center bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
            <Clock className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-4xl font-bold">7 min</h2>
            <p className="text-xl">Avg. Diagnosis Time</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
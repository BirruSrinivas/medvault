'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Hospital, Activity, Users, AlertCircle } from 'lucide-react';

export default function HospitalDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-7xl font-black text-gray-800 dark:text-white">Hospital Command Center</h1>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {['ICU', 'Emergency', 'OPD', 'Pharmacy'].map((dept, i) => (
          <motion.div
            key={dept}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
          >
            <Card className="p-12 text-center bg-white shadow-2xl">
              {i === 0 && <AlertCircle className="w-20 h-20 mx-auto text-red-600" />}
              {i === 1 && <Activity className="w-20 h-20 mx-auto text-orange-600" />}
              {i === 2 && <Users className="w-20 h-20 mx-auto text-blue-600" />}
              {i === 3 && <Hospital className="w-20 h-20 mx-auto text-green-600" />}
              <h3 className="text-3xl font-bold mt-6">{dept}</h3>
              <p className="text-5xl font-black mt-4 text-gray-800">
                {i === 0 ? '12' : i === 1 ? '28' : i === 2 ? '156' : '89'}
              </p>
              <p className="text-gray-600">Active Cases</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Pill, Truck, Clock, CheckCircle } from 'lucide-react';

export default function PharmacyDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 p-8">
      <motion.h1 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-6xl font-black text-center mb-12 text-emerald-800"
      >
        Pharmacy Hub
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Pill, label: "Prescriptions", value: "284", color: "text-emerald-600" },
          { icon: Truck, label: "Delivery", value: "67", color: "text-blue-600" },
          { icon: Clock, label: "Pending", value: "23", color: "text-orange-600" },
          { icon: CheckCircle, label: "Completed", value: "1,892", color: "text-green-600" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="bg-white rounded-3xl p-10 text-center shadow-2xl">
              <item.icon className={`w-20 h-20 mx-auto mb-4 ${item.color}`} />
              <p className="text-5xl font-black text-gray-800">{item.value}</p>
              <p className="text-xl text-gray-600 mt-2">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
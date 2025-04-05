import { motion } from 'framer-motion';

const creditPackages = [
  { credits: 100, price: 9.99 },
  { credits: 500, price: 39.99 },
  { credits: 1000, price: 69.99 }
];

export default function Credits() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Buy Credits</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {creditPackages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              {pkg.credits} Credits
            </h2>
            <p className="text-3xl font-bold mb-6">${pkg.price}</p>
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition">
              Purchase
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
import { motion } from "framer-motion";

export default function StatCard({ title, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow ${color}`}
    >
      <h3 className="text-sm">{title}</h3>
      <p className="text-3xl mt-2 font-bold">{value}</p>
    </motion.div>
  );
}
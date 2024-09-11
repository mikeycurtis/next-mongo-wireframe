import React from 'react';
import { motion } from 'framer-motion';

interface RecentProps {
  title: string;
  date: string;
  group: string;
  color1: string;
  color2: string;
  onClick: () => void;
}

const Recent: React.FC<RecentProps> = ({
  title,
  date,
  group,
  color1,
  color2,
  onClick,
}) => {
  return (
    <motion.div
      className="rounded-lg p-4 cursor-pointer"
      style={{
        background: `linear-gradient(to right, ${color1}, ${color2})`,
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 8px rgba(0,0,0,0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-sm text-white opacity-80">{date}</span>
      </div>
      <div className="mt-2">
        <span className="inline-block bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold text-white">
          {group}
        </span>
      </div>
    </motion.div>
  );
};

export default Recent;

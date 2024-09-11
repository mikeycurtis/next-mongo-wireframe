import { motion } from 'framer-motion';

interface CardProps {
  count: number;
  title: string;
  color1: string;
  color2: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  count,
  title,
  color1,
  color2,
  onClick,
}) => {
  return (
    <motion.div
      className="w-full h-30 sm:h-64 rounded-lg p-4 flex flex-col justify-between cursor-pointer"
      style={{
        background: `linear-gradient(to bottom right, ${color1}, ${color2})`,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(255,255,255,0.5)',
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <h2 className="text-sm sm:text-lg font-semibold text-white">{title}</h2>
      <p className="text-3xl sm:text-6xl font-bold text-white self-end">
        {count}
      </p>
    </motion.div>
  );
};

export default Card;

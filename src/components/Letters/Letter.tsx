import { motion, MotionStyle } from 'framer-motion';
import { useState } from 'react';

export default function Letter({
  sender,
  receiver,
  message,
}: {
  sender: string;
  receiver: string;
  message: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCard = () => setIsOpen(!isOpen);

  const sharedStyles: MotionStyle = {
    position: 'absolute',
    width: '5.5in',
    height: '4.25in',
    left: '50%',
    top: '85%',
    x: '-50%',
    y: '-85%',
    borderWidth: '2px',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    borderBottomLeftRadius: '1rem',
    borderBottomRightRadius: '1rem',
  };

  return (
    <motion.div
      animate={{ translateY: isOpen ? 0 : -200 }}
      transition={{
        delay: isOpen ? 0 : 2,
      }}
      className="pt-40 relative w-full h-full flex justify-center items-center"
      onClick={toggleCard}
    >
      {/* The "front" of the card */}
      <motion.div
        animate={{ rotateX: isOpen ? 90 : 0 }}
        transition={{
          duration: 1,
          ease: 'circInOut',
          delay: isOpen ? 0 : 1, // Delay the closing animation
        }}
        style={{
          ...sharedStyles,
          transformOrigin: 'top',
          zIndex: 20,
          backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToUzXImsyOgwZSOJ__coUTpD-Kj0DnNrbZUw&s)`,
          backgroundColor: '#3B82F6', // Tailwind's blue-500
        }}
      ></motion.div>

      {/* The "Inside" of the top part of the card */}
      <motion.div
        initial={{ rotateX: 90 }}
        animate={{ rotateX: isOpen ? 180 : 90 }}
        transition={{
          duration: 1,
          ease: 'circInOut',
          delay: isOpen ? 1 : 0, // Delay the opening animation, but not the closing
        }}
        style={{
          ...sharedStyles,
          transformOrigin: 'top',
          zIndex: 19,
          background: '#FFFFFF',
        }}
      ></motion.div>

      {/* The main part of the card */}
      <motion.div
        style={{
          ...sharedStyles,
          zIndex: 10,
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="m-8">
          <div className="greeting">Dear {receiver},</div>
          <div className="body">{message}</div>
          <div className="signature">Sincerely, {sender}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

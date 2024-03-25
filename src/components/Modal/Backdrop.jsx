import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 h-full w-full bg-gray-500 bg-opacity-75 flex items-center justify-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity:1 }}
      exit={{ opacity:0}}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;

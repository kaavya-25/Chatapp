import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import RoomForm from "../RoomForm";

const Modal = ({ handleClose }) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative transform overflow-hidden rounded-2xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-8 z-40 ">
          <div className="mb-4">
            <h3 className="font-semibold text-2xl text-gray-800">
              Create New Room
            </h3>
          </div>
          <RoomForm handleClose={handleClose} />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;

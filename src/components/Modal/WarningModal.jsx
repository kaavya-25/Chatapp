import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

const WarningModal = ({ handleClose }) => {
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
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="text-red-400"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
                ></path>
                <path
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
                ></path>
                <path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"></path>
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Warning
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Your message contains inappropriate or toxic content. Such
                  behavior is not tolerated and may result in a ban.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default WarningModal;

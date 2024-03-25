import { motion } from "framer-motion";

const Alert = (props) => {
  const classNames = {
    border: `border-l-4 ${
      props.type === "success" ? "border-green-400" : props.type === "warning" ? "border-yellow-400" : "border-red-400"
    } rounded-lg`,
    background: props.type === "success" ? "bg-green-50" : props.type === "warning" ? "bg-yellow-50" : "bg-red-50",
    position: "fixed top-0 right-0 m-4 p-4",
    icon: `h-5 w-5 ${
      props.type === "success" ? "text-green-400" : props.type === "warning" ? "text-yellow-400" : "text-red-400"
    }`,
    text: `text-sm ${
      props.type === "success" ? "text-green-800" : props.type === "warning" ? "text-yellow-800" : "text-red-800"
    }`,
  };
  return (
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: "100vh" }}
        exit={{ x: "150vh" }}
        transition={{ type: "spring" }}
        className={`${classNames.border} ${classNames.background} ${classNames.position}`}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className={classNames.icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d={
                  props.type == "success"
                    ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    : "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                }
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className={classNames.text}>{props.message}</p>
          </div>
        </div>
      </motion.div>
  );
};

export default Alert;

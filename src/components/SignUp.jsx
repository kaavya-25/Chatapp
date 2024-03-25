import { useContext, useRef } from "react";
import { AppContext } from "../custom_hooks/context";
import { AnimatePresence } from "framer-motion";

import Alert from "./Alert";
import FilePondInput from "./FilePondInput";
import LoadingSpinner from "./LoadingSpinner";

const SignUp = () => {
  const {
    createUserAccount,
    currentAccount,
    useForm,
    motion,
    alert,
    navigate,
  } = useContext(AppContext);
  const filePondRef = useRef();
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const submitForm = (data) => {
    const image = filePondRef.current.getFile().file;
    return createUserAccount(currentAccount, data.userName, image);
  }

  return (
    <>
      <AnimatePresence
        onExitComplete={() => alert.type == "success" && navigate("chat")}
      >
        {alert.show && <Alert message={alert.message} type={alert.type} />}
      </AnimatePresence>
      <motion.div
        animate={{ x: 0 }}
        initial={{ x: 100 }}
        transition={{ type: "spring" }}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">
              Username
            </label>
            <input
              className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
              placeholder="e.g. John02"
              required
              {...register("userName")}
            />
          </div>
          <div className="space-y-2">
            <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
              Avatar
            </label>
            <FilePondInput refData={filePondRef} />
          </div>
          <div className="pt-2">
            <button
              disabled={isSubmitting}
              className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            >
              {isSubmitting ? <LoadingSpinner text="Loading..."/> : "Start Now 🚀"}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default SignUp;

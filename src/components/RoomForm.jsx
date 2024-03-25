import { useContext, useRef } from "react";
import { AppContext } from "../custom_hooks/context";
import FilePondInput from "./FilePondInput";
import LoadingSpinner from "./LoadingSpinner";

const RoomForm = ({ handleClose }) => {
  const {
    createRoom,
    currentAccount,
    useForm
  } = useContext(AppContext);

  const filePondRef = useRef();
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const submitForm = (data) => {
    const image = filePondRef.current.getFile().file;
    return createRoom(currentAccount, data.roomName, image);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 tracking-wide">
          Room Name
        </label>
        <input
          className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
          placeholder="e.g. Student Club"
          required
          {...register("roomName")}
        />
      </div>
      <div className="space-y-2">
        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
          Room Avatar
        </label>
        <FilePondInput  refData={filePondRef} />
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`inline-flex w-full justify-center rounded-full border border-transparent bg-green-400 px-4 py-2 text-base font-semibold text-gray-100 shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:col-start-2 sm:text-sm`}
        >
          {isSubmitting ?  <LoadingSpinner text="Creating..."/> : "Create"} 
        </button>
        <button
          onClick={handleClose}
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RoomForm;

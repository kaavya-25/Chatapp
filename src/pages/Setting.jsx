import { useContext,useRef } from "react";
import { AppContext } from "../custom_hooks/context";
import FilePondInput from "../components/FilePondInput";
import LoadingSpinner from "../components/LoadingSpinner";

const Setting = () => {
  const { currentUser, useForm, editUser } = useContext(AppContext);

  const filePondRef = useRef();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      userName : currentUser.name,
    }
  });
  const { isSubmitting } = formState;

  const submitForm = (data) => {
    const image = filePondRef.current.getFile().file;
    return editUser(currentUser.wallet_address, data.userName, image);
  }


  return (
    <div className="main flex-1 flex flex-col">
      <div className="hidden lg:block heading flex-2">
        <h1 className="text-3xl text-gray-700 mb-4">Settings</h1>
      </div>
      <div className="flex-1 flex h-full">
        <form
          className="space-y-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">
              User Name
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
              User Avatar
            </label>
            <FilePondInput refData={filePondRef} file={currentUser.avatar}  />
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
              disabled={isSubmitting}
              type="submit"
              className="inline-flex w-full justify-center rounded-full border border-transparent bg-green-400 px-4 py-2 text-base font-semibold text-gray-100 shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
            >
              {isSubmitting ? <LoadingSpinner text="Loading..." /> : "Update"}   
            </button>
            <button
              onClick={()=> reset()}
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;

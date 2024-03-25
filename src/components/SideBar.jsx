import { AppContext } from "../custom_hooks/context";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const { currentUser, urlFor ,disconnectWallet } = useContext(AppContext);
  return (
    <div className="hidden xl:block sm:flex-2 w-64 bg-gray-200">
      <div className="user-profile text-center">
        <div className="w-32 h-32 rounded-full m-auto mt-16 border-2 border-white bg-white shadow-lg">
          <img
            src={urlFor(currentUser.avatar)
              .width(200)
              .height(200)
              .quality(100)
              .format("webp")
              .url()}
            alt="user"
            className="rounded-full"
          />
        </div>
        <div className="text-gray-800 mt-8">{currentUser.name}</div>
      </div>

      <div className="menu mt-8">
        <NavLink
          className="block py-4 px-12 border-l-4 text-gray-600 hover:bg-gray-300 hover:text-black"
          to="chat"
        >
          <span className="inline-block align-text-bottom mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </span>
          Chat
        </NavLink>
        <NavLink
          className="block py-4 px-12 border-l-4 text-gray-600 hover:bg-gray-300 hover:text-black"
          to="setting"
        >
          <span className="inline-block align-text-bottom mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </span>
          Settings
        </NavLink>
        <button
          className="block w-full text-left py-4 px-12 border-l-4 text-gray-600 hover:bg-gray-300 hover:text-black"
          onClick={()=>disconnectWallet()}
        >
          <span className="inline-block align-text-bottom mr-2">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.002 3h-14c-1.103 0-2 .897-2 2v4h2V5h14v14h-14v-4h-2v4c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.898-2-2-2z"></path>
              <path d="m11 16 5-4-5-4v3.001H3v2h8z"></path>
            </svg>
          </span>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;

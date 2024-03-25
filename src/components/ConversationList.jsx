import DmCard from "./DmCard";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../custom_hooks/context";
import { AnimatePresence } from "framer-motion";

const ConversationList = () => {
  const [query, setQuery] = useState("");
  const { alert,setModalOpen, modalOpen, motion, channels, fetchAllRooms } =
    useContext(AppContext);

  const filteredItems = channels.filter((channel) => {
    return channel["room_name"].toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    fetchAllRooms();
  }, [alert]);

  const item = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -100,
      opacity: 0,
    },
  };

  return (
    <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
      <div className="search flex flex-row pb-6 px-2">
        <input
          type="text"
          className="outline-none py-2 w-full bg-transparent border-b-2 border-gray-200"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="ml-2" onClick={() => (modalOpen ? setModalOpen(false) : setModalOpen(true))}>
          <span className="flex justify-center h-8 w-8 rounded-full hover:bg-gray-400  items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z"></path>
              <path d="M13 6h-2v3H8v2h3v3h2v-3h3V9h-3z"></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="flex-1 h-full overflow-auto px-2">
        <AnimatePresence>
          {filteredItems.map((channel, index) => (
            <motion.div
              variants={item}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              key={channel.room_id}
            >
              <DmCard data={channel} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConversationList;

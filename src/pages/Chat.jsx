import ConversationList from "../components/ConversationList";
import ChatView from "../components/ChatView";
import Alert from "../components/Alert";
import Modal from "../components/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../custom_hooks/context";
import WarningModal from "../components/Modal/WarningModal";

const Chat = () => {
  const { alert, modalOpen, setModalOpen ,warningModalOpen, setWarningModalOpen } =
    useContext(AppContext);
  return (
    <div className="main flex-1 flex flex-col">
      <div className="hidden lg:block heading flex-2">
        <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
      </div>

      <div className="flex-1 flex h-full">
        <ConversationList />
        <ChatView />
      </div>
      <AnimatePresence mode="wait">
        {warningModalOpen && <WarningModal handleClose={() =>setWarningModalOpen(false)} />}
        {modalOpen && <Modal handleClose={() =>setModalOpen(false)} />}
        {alert.show && <Alert message={alert.message} type={alert.type} />}
      </AnimatePresence>
    </div>
  );
};

export default Chat;

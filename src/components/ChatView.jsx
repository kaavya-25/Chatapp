import { useContext } from "react";
import { AppContext } from "../custom_hooks/context";
import MessageForm from "./MessageForm";

const ChatView = () => {
  const { roomName, currentAccount, urlFor, lang, state, dummy, motion } =
    useContext(AppContext);

  const formattedMessagesArray = () => {
    return [...new Set(state.messages.map(JSON.stringify))]
      .map(JSON.parse)
      .sort((a, b) => a.messageId - b.messageId);
  };
  const item = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="chat-area flex-1 flex flex-col h-[80vh]">
      <div className="flex-3">
        <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
          Chatting with <b>{roomName}</b>
        </h2>
        
      </div>
      <div className="messages flex-1 overflow-auto">
        {formattedMessagesArray().map((message, index) => {
          return (
            <motion.div
              variants={item}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`message ${
                message.senderWalletAddress === currentAccount ? "me" : ""
              } mb-4 flex ${
                message.senderWalletAddress === currentAccount
                  ? "text-right"
                  : ""
              }`}
              key={message.messageId}
            >
              {message.senderWalletAddress !== currentAccount && (
                <div className="flex-2">
                  <div className="w-12 h-12 relative">
                    <img
                      className="w-12 h-12 rounded-full mx-auto"
                      src={urlFor(message.avatar)
                        .width(50)
                        .height(50)
                        .quality(100)
                        .format("webp")
                        .url()}
                      alt="chat-user"
                    />
                  </div>
                </div>
              )}
              <div
                className={`flex-1 px-2 ${
                  message.senderWalletAddress === currentAccount
                    ? "text-right"
                    : ""
                }`}
              >
                <div
                  className={`inline-block p-2 px-6 rounded-full ${
                    message.senderWalletAddress === currentAccount
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  <span>{message.content[lang]}</span>
                </div>
                <div
                  className={`${
                    message.senderWalletAddress === currentAccount
                      ? "pr-4"
                      : "pl-4"
                  }`}
                >
                  <small className="text-gray-500">{message.createdAt}</small>
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={dummy}></div>
      </div>
      <div className="flex-2 pt-4 pb-10">
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatView;

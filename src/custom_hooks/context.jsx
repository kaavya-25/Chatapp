import { createContext, useState, useEffect, useReducer, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import Perspective from "perspective-api-client";
import Filter from "bad-words";
import moment from "moment/moment";

/**  Constant Variables **/
const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_CREDENTIALS;
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const GOOGLE_PERSPECTIVE_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_CREDENTIALS;
const ONBOARD_TEXT = "Click here to install MetaMask!";
const CONNECT_TEXT = "Connect with MetaMask";


//** Detect Bad Words */
const filter = new Filter();
const perspective = new Perspective({ apiKey: GOOGLE_PERSPECTIVE_API_KEY });

/** MetaMask **/
import MetaMaskOnboarding from "@metamask/onboarding";
const onboarding = new MetaMaskOnboarding();

/** Sanity **/
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

const fetchData = async (query) => {
  let sanityResponse;

  try {
    sanityResponse = await sanityClient.fetch(query);
  } catch (error) {
    console.error(error);
    return [];
  }

  return sanityResponse;
};

/** Gun JS **/
import Gun from "gun";
import "gun/sea";

const gun = Gun('https://gunserver2.onrender.com/gun');

const encryption = async (message, action) => {
  try {
    console.log(`Received message for ${action}ion:`, message);

    if (!ENCRYPTION_KEY) {
      throw new Error("ENCRYPTION_KEY is not set.");
    }

    let result;
    switch (action) {
      case "encrypt":
        result = await SEA.encrypt(message, ENCRYPTION_KEY);
        break;
      case "decrypt":
        result = await SEA.decrypt(message, ENCRYPTION_KEY);
        break;
      default:
        throw new Error("Invalid action provided.");
    }

    console.log(`Successfully ${action}ed message:`, result);
    return result;
  } catch (error) {
    console.error(`Error during ${action}ion:`, error);
    throw error; // Rethrow the error to propagate it to the calling function
  }
};


/** TO DISABLE PRINTS WHIT PrtScr **/
document.addEventListener("keyup", (e) => {
  if (e.key == "PrintScreen") {
    navigator.clipboard.writeText("");
    alert("Screenshots disabled!");
  }
});

/** TO DISABLE PRINTS WHIT CTRL+P **/
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "p") {
    alert("This section is not allowed to print or export to PDF");
    e.cancelBubble = true;
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

export const AppContext = createContext();

const initialState = { messages: [] };

const reducer = (state, action) => {
  try {
    let result;
    switch (action.type) {
      case "add":
        result = { messages: [...state.messages, action.data] };
        break;
      case "clear":
        result = { messages: [] };
        break;
      case "update":
        result = { messages: action.data };
        break;
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [roomName, setRoomName] = useState("");
  const [lang, setLang] = useState("original");
  const [alert, setAlert] = useState({
    message: "",
    type: "",
    show: false,
  });
  const [behaviorScore, setBehaviorScore] = useState(100);
  const [modalOpen, setModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dummy = useRef();
  const messageTextRef = useRef();

  const fetchAllRooms = async () => {
    try {
      // const query = `*[_type=="users" && wallet_address == '${currentUser.wallet_address}']{
      //   "all_rooms": *[_type=='conversations' && references(^._id)]{ 
      //     room_name,
      //     room_id,
      //     "avatar": image.asset->url
      //   }
      // }`;
      const query = ` *[_type == "conversations" ]{
        room_name,
        room_id,
        "avatar": image.asset->url
      }`
      const res = await fetchData(query);
      //const data = res[0].all_rooms;
      const data = res;
      setChannels(data);
      data.length > 0 &&
        navigate(`/chat?channel=${data[0].room_name}&id=${data[0].room_id}`, {
          state: { channel: data[0].room_name, id: data[0].room_id },
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.state) {
      setRoomName(location.state["channel"]);
      dispatch({ type: "clear", data: {} });
      messageTextRef.current.value = "";
      getMessages();
    }
  }, [location.state]);

  const getMessages = async () => {
    try {
      const _roomId = location.state["id"];
      const messagesRef = gun.get(_roomId);
  
      messagesRef.map().once(async (message) => {
        try {
          const decryptMessage = await encryption(message, "decrypt");
  
          // Ensure decryptMessage is defined before accessing its properties
          if (decryptMessage) {
            dispatch({
              type: "add",
              data: {
                sender: decryptMessage.sender,
                senderWalletAddress: decryptMessage.senderWalletAddress,
                avatar: decryptMessage.avatar,
                content: decryptMessage.content,
                createdAt: decryptMessage.createdAt,
                messageId: decryptMessage.messageId,
              },
            });
          }
        } catch (error) {
          console.error("Error decrypting message:", error);
        }
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (currentAccount.length > 0) {
        onboarding.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
      }
    }
  }, []);

  const translate = async (lang) => {
    if (lang == "original") {
      setLang(lang);
    } else {
      const translatedMessages = await Promise.all(
        state.messages.map(async (message) => {
          try {
            const response = await fetch(
              `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}&q=${encodeURI(
                message.content["original"]
              )}&target=${lang}`
            );
            const json = await response.json();
            message.content[lang] = json.data.translations[0].translatedText;
            return message;
          } catch (error) {
            console.error(error);
          }
        })
      );
      dispatch({
        type: "update",
        data: translatedMessages,
      });
      setLang(lang);
    }
  };

  useEffect(() => {
    if (alert.show == true) {
      const timeoutId = setTimeout(() => {
        setAlert((prev) => {
          return { ...prev, show: false };
        });
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [alert]);

  const uploadImage = async (image) => {
    try {
      const imageAsset = await sanityClient.assets.upload("image", image, {
        filename: "image",
      });
      return imageAsset;
    } catch (error) {
      setAlert({
        message: `Error uploading image. (Error ${error.statusCode})`,
        type: "error",
        show: true,
      });
      return;
    }
  };

  const createUserAccount = async (userAddress, userName, image) => {
    const imageAsset = await uploadImage(image);
    try {
      const userDoc = {
        _type: "users",
        _id: `${userAddress}-user`,
        name: userName,
        wallet_address: userAddress,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      };

      const res = await sanityClient.createIfNotExists(userDoc);

      setCurrentUser({
        avatar: imageAsset.url,
        name: res.name,
        wallet_address: res.wallet_address,
      });
      setAlert({
        message: "Successfully uploaded.",
        type: "success",
        show: true,
      });
    } catch (error) {
      setAlert({
        message: `Error creating user account. (Error ${error.statusCode})`,
        type: "error",
        show: true,
      });
    }
  };

  const editUser = async (userAddress, userName, image) => {
    const imageAsset = await uploadImage(image);
    try {
      const userDoc = {
        _type: "users",
        _id: `${userAddress}-user`,
        name: userName,
        wallet_address: userAddress,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      };

      const res = await sanityClient.createOrReplace(userDoc);
      setCurrentUser({
        avatar: imageAsset.url,
        name: res.name,
        wallet_address: res.wallet_address,
      });
      setAlert({
        message: "Successfully uploaded.",
        type: "success",
        show: true,
      });
    } catch (error) {
      setAlert({
        message: `Error updating user account. (Error ${error.statusCode})`,
        type: "error",
        show: true,
      });
    }
  }


  const connectWallet = async () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      onboarding.startOnboarding();
      return;
    }
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!addressArray.length) {
        alert("No accounts found");
        return;
      }

      const walletAddress = addressArray[0];
      setCurrentAccount(walletAddress);

      const query = `*[_type == "users" && wallet_address == "${walletAddress}"]{
        name,
        wallet_address,
        "avatar": image.asset->url
      }`;

      const result = await fetchData(query);
      if (result.length > 0) {
        setCurrentUser(result[0]);
        navigate("chat");
      } else {
        navigate("signup");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [{}],
      });
      setCurrentAccount("");
      setCurrentUser("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const createRoom = async (userAddress, roomName, image) => {
    const imageAsset = await uploadImage(image);
    try {
      const roomDoc = {
        _type: "conversations",
        _id: `${Date.now()}-room`,
        room_id: `${Date.now()}-${roomName.toLowerCase().trim()}`,
        room_name: roomName,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        all_users: [
          {
            _key: userAddress,
            _ref: `${userAddress}-user`,
            _type: "reference",
          },
        ],
      };

      await sanityClient.createIfNotExists(roomDoc);
      setAlert({
        message: "Successfully created.",
        type: "success",
        show: true,
      });
    } catch (error) {
      setAlert({
        message: `Error creating new room. (Error ${error.statusCode})`,
        type: "error",
        show: true,
      });
    }
    setModalOpen(false);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const value = messageTextRef.current.value;
    if (value.trim() === "") return;

    const _roomId = location.state["id"];
    const messagesRef = gun.get(_roomId);
    let count = 0
    messagesRef.map().once(()=> count++)
  
    try {
      const detectProfanity = await perspective.analyze(value.trim());
      const probability = detectProfanity.attributeScores['TOXICITY']['summaryScore']['value'];
      if (probability > 0.5) {
        setBehaviorScore((prev)=> prev-10)
        setWarningModalOpen(true)
      }
    } catch (error) {
      console.error(error)
    }
    const newMessage = {
      sender: currentUser.name,
      senderWalletAddress: currentUser.wallet_address,
      avatar: currentUser.avatar,
      content: {
        original: filter.clean(value),
      },
      createdAt: moment().format("MMM DD hh:mm A"),
      messageId: count,
    };
    messageTextRef.current.value = "";
    messagesRef.set(await encryption(newMessage, "encrypt"));

    setLang("original");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <AppContext.Provider
      value={{
        buttonText,
        currentAccount,
        connectWallet,
        disconnectWallet,
        createUserAccount,
        roomName,
        messageTextRef,
        state,
        currentUser,
        urlFor,
        translate,
        lang,
        setLang,
        useForm,
        motion,
        alert,
        navigate,
        location,
        dummy,
        createRoom,
        behaviorScore,
        filter,
        modalOpen,
        setModalOpen,
        warningModalOpen,
        setWarningModalOpen,
        sendMessage,
        channels,
        fetchAllRooms,
        editUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

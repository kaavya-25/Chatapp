import { useContext } from "react";
import { AppContext } from "../custom_hooks/context";

const DmCard = ({ data }) => {
  const { urlFor, navigate, location, setLang } = useContext(AppContext);

  const changeUrl = () => {
    setLang("original");
    navigate(`/chat?channel=${data.room_name}&id=${data.room_id}`, {
      state: { channel: data.room_name, id: data.room_id },
    });
  };
  let active;
  if (location.state) {
    active =
      location.state["id"] === data.room_id
        ? "border-l-4 border-green-500"
        : "";
  }

  return (
    <div
      className={`entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md ${active}`}
      onClick={changeUrl}
    >
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          <img
            className="w-12 h-12 rounded-full mx-auto"
            src={urlFor(data.avatar)
              .width(50)
              .height(50)
              .quality(100)
              .format("webp")
              .url()}
            alt={data.room_name}
          />
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="truncate w-32">
          <span className="text-gray-800">{data.room_name}</span>
        </div>
        <div>
          <small className="text-gray-600">Yea, Sure!</small>
        </div>
      </div>
      <div className="flex-2 text-right">
        <div>
          <small className="text-gray-500">16 April</small>
        </div>
      </div>
    </div>
  );
};

export default DmCard;

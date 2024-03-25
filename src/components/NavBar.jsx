import { useContext } from "react";
import { AppContext } from "../custom_hooks/context";
const NavBar = () => {
  const { translate, lang, behaviorScore } = useContext(AppContext);
  let status 
  if (behaviorScore >= 80) {
    status = 'bg-green-400';
  } else if (behaviorScore >= 50) {
    status = 'bg-yellow-400';
  } else {
    status = 'bg-red-400';
  }

  return (
    <div className="py-4 flex-2 flex flex-row">
      <div className="flex-1">
        <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
          <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </span>
        </span>
        <span className="lg:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
          <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
            <svg
              className="h-4 w-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </span>
        </span>
      </div>
      <div className="flex-1 text-right">
        <span className="inline-block text-gray-700">
          Text Lang:{" "}
          <select
            name="lang"
            value={lang}
            onChange={(e) => translate(e.target.value)}
          >
            <option value="original">Original Text</option>
            <option value="zh">Chinese</option>
            <option value="en">English</option>
        <option value="id">Indonesian</option>
  <option value="ja">Japanese</option>
  <option value="ko">Korean</option>
  <option value="ms">Malay</option>
  <option value="my">Myanmar</option>
  <option value="pl">Polish</option>
  <option value="ta">Tamil</option>
  <option value="th">Thai</option>
  <option value="vi">Vietnamese</option>
  <option value="ar">Arabic</option>
  <option value="es">Spanish</option>
  <option value="fr">French</option>
  <option value="de">German</option>
  <option value="hi">Hindi</option>
  <option value="it">Italian</option>
  <option value="nl">Dutch</option>
  <option value="pt">Portuguese</option>
  <option value="te">Telugu</option>
  <option value="kn">Kannada</option>
  <option value="ml">Malayalam</option>
          </select>
        </span>
        <span className="inline-block ml-8 text-gray-700">
          Behavior Score: <b>{behaviorScore}</b>

          <span className="inline-block align-text-bottom ml-2">
            <span className={`inline-block align-text-bottom w-4 h-4 ${status} rounded-full border-2 border-white`}></span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default NavBar;

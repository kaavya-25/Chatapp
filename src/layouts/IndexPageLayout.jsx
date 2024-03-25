import { Outlet } from "react-router-dom";

const IndexPageLayout = () => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80)",
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen flex flex-row mx-0 justify-center">
        <div className="hidden lg:flex flex-col self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10 text-white">
          <h1 className="mb-3 font-bold text-5xl">
            Welcome to our messaging app!
          </h1>
          <p className="pr-3">
            Say goodbye to centralized servers and hello to secure, private
            chats. Our decentralized messaging app requires no personal details
            for sign-up. Upgrade to true privacy. Sign-in now.
          </p>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <Outlet />
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 
                <a
                  href="#"
                  rel=""
                  target="_blank"
                  title="Phyo Pyae Sone Han"
                  className="text-green hover:text-green-500 ml-1"
                >
                  2023FC12058
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPageLayout;

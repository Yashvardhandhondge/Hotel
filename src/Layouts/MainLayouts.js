import { Outlet } from "react-router-dom";
import { Header } from "../Components/Header";
import FloatingChat from "../Components/Chatbot/chatbot";

export const MainLayouts = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <Outlet />
      <FloatingChat />
    </div>
  );
};

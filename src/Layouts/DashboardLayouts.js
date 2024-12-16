import { Outlet } from "react-router-dom";
import { SideBar } from "../Components/SideBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConnectModal } from "../ReduxSlices/ModalSlice";
import { api } from "../Components/functions/Api";
import { setProfile } from "../ReduxSlices/AuthSlice";
import FloatingChat from "../Components/Chatbot/chatbot";


export const setCurrentProfile = async (account, dispatch) => {
  const profile = await api("profile/getProfile", {
    walletAddress: account,
  });
  dispatch(setProfile(profile));
};

export const DashboardLayouts = () => {
  const account = useSelector((state) => state.auth.account);

  const dispatch = useDispatch();
  const tryConnect = () => {
    dispatch(setConnectModal(true));
  };

  useEffect(() => {
    if (account) setCurrentProfile(account, dispatch);
    else tryConnect();
  }, [account]);

  return (
    <div className="flex w-full h-full">
      <SideBar />
      <Outlet />
      <FloatingChat/>
    </div>
  );
};

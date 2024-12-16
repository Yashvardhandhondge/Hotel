import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePerpsData } from "../ReduxSlices/PerpSlice";
import FloatingChat from "../Components/Chatbot/chatbot";

export const PerpsLayouts = () => {
  const dispatch = useDispatch();

  const updateOpenPrice = async () => {
    const res = (
      await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        {
          headers: {
            Accept: "application/json",
            "x-cg-demo-api-key": "CG-QxQpsAygS84aHmRFdBU8XnFV",
          },
        }
      )
    ).data;
    dispatch(
      updatePerpsData({
        path: "crypto.btc",
        data: res.bitcoin.usd,
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateOpenPrice();
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
  <>  <Outlet />
    <FloatingChat/>
    </>

  );
};

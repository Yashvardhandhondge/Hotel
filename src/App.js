import {
  Route,
  Routes,
  BrowserRouter as Router,
  redirect,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Rent } from "./Pages/Rent/Rent";
import { MainLayouts } from "./Layouts/MainLayouts";
import { Details } from "./Pages/Rent/Details";
import { Confirm } from "./Pages/Rent/Confirm";
import { ConnectModal, TransactionModal } from "./Components/Modal/Modal";
import { DashboardLayouts } from "./Layouts/DashboardLayouts";
import { HostDashboard } from "./Pages/Dashboard/HostDashboard/Dashboard";
import { Profile } from "./Pages/Dashboard/Profile/Profile";
import { Mint } from "./Pages/Dashboard/HostDashboard/Mint";
import { Inbox } from "./Pages/Dashboard/Inbox/Inbox";
import { HostNFTs } from "./Pages/Dashboard/HostNFTs/HostNFTs";
import { Reservations } from "./Pages/Dashboard/HostReservations/Reservations";
import { ReserveDetails } from "./Pages/Dashboard/HostReservations/ReserveDetails";
import { TravelerDashboard } from "./Pages/Dashboard/TravelerDashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  setMessageToSend,
  setReceivedMessage,
  setTokenUpdate,
} from "./ReduxSlices/CommunicationSlice";
import { queryContract } from "./Components/functions/Contract";
import { Mainnet, Testnet } from "@nibiruchain/nibijs";
import { updateNFTStore } from "./ReduxSlices/NFTSlice";
import { Markets } from "./Pages/Perps/Markets";
import { Trading } from "./Pages/Perps/Trading";
import { EditNFT } from "./Pages/Dashboard/HostNFTs/EditNFT";
import { updateToken } from "./Components/functions/Functions";
import { setDiffToUTC } from "./ReduxSlices/TimeSlice";
import { Trips } from "./Pages/Dashboard/TravelerTrips/Trips";
import { Transactions } from "./Pages/Dashboard/Transaction/Transactions";
import { setEventToEmit } from "./ReduxSlices/NotificationSlice";
import { addItem } from "./ReduxSlices/NotificationSlice";
import { api } from "./Components/functions/Api";
import { setCurrentProfile } from "./Layouts/DashboardLayouts";
import { Tooltip } from "react-tooltip";
import { Vaults } from "./Pages/Perps/Vaults";
import { Deposit } from "./Pages/Perps/Deposit";
import { LockDrop } from "./Pages/Lockdrop/Lockdrop";
import { getTokens } from "./Components/functions/Functions";
import { YieldEstate } from "./Pages/YieldEstate/YieldEstate";
import { YieldEstateDetails } from "./Pages/YieldEstate/YieldEstateDetails";
import axios from "axios";
import { updateYield } from "./ReduxSlices/PropertySlice";
import { PerpsLayouts } from "./Layouts/PerpsLayouts";


function App() {
  const account = useSelector((state) => state.auth.account);
  const tokenUpdate = useSelector((state) => state.communication.tokenUpdate);
  const messageToSend = useSelector(
    (state) => state.communication.messageToSend
  );
  const eventToEmit = useSelector((state) => state.notification.eventToEmit);

  const [socket, setSocket] = useState(null);
  const [tryConnect, setTryConnect] = useState(false);
  const dispatch = useDispatch();
  // const testNet = Testnet(1);
  const mainnet = Mainnet();

  // const updateMyNFTs = async () => {
  //   const message = {
  //     tokens: {
  //       owner: account,
  //     },
  //   };
  //   const tokens = (
  //     await queryContract(
  //       process.env.REACT_APP_RENTAL_SMART_CONTRACT,
  //       message,
  //       mainnet.endptTm
  //     )
  //   ).tokens;
  //   for (let i = 0; i < tokens.length; i++) {
  //     await updateToken(
  //       {
  //         token_id: tokens[i],
  //         contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
  //       },
  //       mainnet.endptTm,
  //       dispatch
  //     );
  //   }
  // };
  // useEffect(() => {
  //   if (account) {
  //     updateMyNFTs();
  //   }
  // }, [account]);

  const getCurrentUTCTime = async () => {
    try {
      const utcTimeStamp = await (
        await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
      ).json();
      return utcTimeStamp?.utc_datetime;
    } catch (error) {
      console.log(error);
      return new Date();
    }
  };

  const diffToUTC = async () => {
    const utc = new Date(await getCurrentUTCTime());
    const diffSec =
      Math.floor(utc.getTime() / 1000) -
      Math.floor(new Date().getTime() / 1000);
    dispatch(setDiffToUTC(diffSec));
  };

  const updateNFTs = async (account) => {
    const message = {
      tokens: { owner: account },
    };
    const tokens = (
      await queryContract(
        process.env.REACT_APP_RENTAL_SMART_CONTRACT,
        message,
        mainnet.endptTm
      )
    ).tokens;
    for (let i = 0; i < tokens.length; i++) {
      await updateToken(
        {
          token_id: tokens[i],
          contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
        },
        mainnet.endptTm,
        dispatch
      );
    }
  };

  const setNotificationContent = async () => {
    const res = await api("user/inbox", {
      account: account,
    });
    for (let i = 0; i < res.length; i++) {
      if (res[i].unreadMessages) {
        const r = await api("chat/getChattingInfo", {
          id: res[i].chatId,
          reader: account,
        });

        dispatch(
          addItem({
            type: "message",
            data: {
              id: res[i].chatId,
              message: {
                sender: r.receiver,
                generatedTime: r.latestMessageTime,
                text: null,
              },
              nftId: r.nftId,
              mode: r.mode,
            },
          })
        );
      }
    }
    const events = await api("user/unreadTxLogs", {
      account: account,
    });
    for (let i = 0; i < events.length; i++) {
      dispatch(
        addItem({
          type: "event",
          data: events[i],
        })
      );
    }
  };

  useEffect(() => {
    if (account) {
      updateNFTs(account);
      getTokens(account, mainnet.endptTm, dispatch);
      setNotificationContent();
    }
  }, [account]);

  useEffect(() => {
    if (socket) socket.disconnect();
    //
    const tempSocket = io(process.env.REACT_APP_BACKEND_SERVER);
    tempSocket.on("connect", () => {
      tempSocket.emit("connectedAccount", account);
      console.log("connected to the server...");
    });
    tempSocket.on("disconnect", () => {
      console.log("disconnected from server, trying to reconnect..");
      setTryConnect(!tryConnect);
    });
    tempSocket.on("tokenUpdated", (data) => {
      if (data.sender === account)
        updateToken(data, mainnet.endptTm, dispatch, true);
      else updateToken(data, mainnet.endptTm, dispatch);
    });
    tempSocket.on("event", (res) => {
      dispatch(
        addItem({
          type: "event",
          data: res,
        })
      );
    });
    tempSocket.on("messageReceived", (res) => {
      dispatch(setReceivedMessage(res));
      dispatch(
        addItem({
          type: "message",
          data: res,
        })
      );
    });
    setSocket(tempSocket);
  }, [account, tryConnect]);

  useEffect(() => {
    if (tokenUpdate) {
      socket.emit("tokenUpdated", tokenUpdate);
      dispatch(setTokenUpdate(null));
    }
  }, [tokenUpdate]);

  useEffect(() => {
    if (messageToSend) {
      socket.emit("sendMessage", messageToSend);
      dispatch(setMessageToSend(null));
    }
  }, [messageToSend]);

  useEffect(() => {
    if (eventToEmit) {
      socket.emit("event", eventToEmit);
      dispatch(setEventToEmit(null));
    }
  }, [eventToEmit]);

  useEffect(() => {
    diffToUTC();
  }, []);

  useEffect(() => {
    if (account) setCurrentProfile(account, dispatch);
  }, [account]);

  const getMetadata = async (token_uri) => {
    try {
      const metadata = (await axios.get(token_uri)).data;
      return metadata;
    } catch (error) {
      console.log(error);
    }
  };

  const getFractionalizedNFTs = async () => {
    const tokenIds = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      //   "9",
      //   "10",
      //   "11",
      //   "12",
      //   "13",
      //   "14",
    ];

    for (let i = 0; i < tokenIds.length; i++) {
      const messageForItem = {
        all_nft_info: {
          token_id: tokenIds[i],
        },
      };

      const res = await queryContract(
        process.env.REACT_APP_FRACTIONALIZED_SMART_CONTRACT,
        messageForItem,
        Mainnet().endptTm
      );
      let totalCounts = 0;

      // for (let j = 0; j < res.investors.length; j++) {
      //   totalCounts += res.investors[j].allocations;
      // }

      const metaData = await getMetadata(res.token_uri);
      if (res.investors.length > 1750)
        dispatch(
          updateYield({
            token_id: tokenIds[i],
            ...res,
            value: totalCounts * 100000000,
            metaData: metaData,
          })
        );
      else
        dispatch(
          updateYield({
            token_id: tokenIds[i],
            ...res,
            metaData: metaData,
          })
        );
    }
  };

  useEffect(() => {
    getFractionalizedNFTs();
  }, []);

  return (
    <div
      style={{ fontFamily: "General Sans" }}
      className="w-[100vw] h-screen bg-[#fafafa] font-medium select-none"
    >
      <Router>
        <Routes>
          <Route path="*" element={<MainLayouts />}>
            {/* <Route path="" element={<Navigate to="rent/short" />} /> */}
            <Route path="yieldestate" element={<YieldEstate />} />
            <Route path="yieldestate/:id/*" element={<YieldEstateDetails />} />
            {/*<Route path="rent/*" element={<Rent />} />*/}
            {/* <Route path="rent/short/:id/*" element={<Details />} /> */}
            {/* <Route path="rent/long/:id/*" element={<Details />} /> */}

            {/* <Route path="rent/short/:id/Confirm" element={<Confirm />} /> */}
            {/* <Route path="rent/long/:id/Confirm" element={<Confirm />} /> */}

            <Route path="perps/*" element={<PerpsLayouts />}>
              <Route path="markets/*" element={<Markets />} />
              <Route path="markets/realestate/trading" element={<Trading />} />
              <Route path="markets/crypto/trading" element={<Trading />} />
              <Route path="markets/forex/trading" element={<Trading />} />
              <Route path="markets/commodities/trading" element={<Trading />} />
              <Route path="vaults/*" element={<Vaults />} />
              <Route path="vaults/detail" element={<Deposit />} />
            </Route>

            <Route path="earn" element={<LockDrop />} />

            <Route path="dashboard/*" element={<DashboardLayouts />}>
              <Route path="profile" element={<Profile />} />
              <Route path="profile/:address" element={<Profile />} />
              <Route path="host/dashboard" element={<HostDashboard />} />
              <Route path="host/inbox" element={<Inbox mode="host" />} />
              <Route path="host/reservations" element={<Reservations />} />
              <Route path="traveler/trips" element={<Trips />} />
              <Route
                path="host/reservations/:id"
                element={<ReserveDetails />}
              />
              <Route path="traveler/trips/:id" element={<ReserveDetails />} />
              <Route path="host/nfts/:id/edit" element={<EditNFT />} />
              <Route path="host/nfts/:id" element={<Details />} />
              <Route path="host/nfts" element={<HostNFTs />} />
              <Route
                path="traveler/inbox"
                element={<Inbox mode="traveler" />}
              />
              <Route
                path="traveler/dashboard"
                element={<TravelerDashboard />}
              />
              <Route
                path="traveler/transactions"
                element={<Transactions mode="traveler" />}
              />
              <Route
                path="host/transactions"
                element={<Transactions mode="host" />}
              />
              <Route path="host/mint" element={<Mint />} />
            </Route>
          </Route>
        </Routes>
        <TransactionModal />
        <ConnectModal />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      <Tooltip
        id="my-tooltip"
        content="Coming soon"
        style={{ borderRadius: "4px", padding: "6px" }}
      />
      <Tooltip
        id="addToWishlist"
        content="Add to Wishlist"
        style={{ borderRadius: "4px", fontSize: "12px", padding: "6px" }}
      />
      <Tooltip
        id="removeFromWishlist"
        content="Remove from Wishlist"
        style={{ borderRadius: "4px", fontSize: "12px", padding: "6px" }}
      />
    </div>
  );
}

export default App;

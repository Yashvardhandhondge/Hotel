import {
  MessagesInboxIcon,
  FavoriteIconRent,
  GuestsIcon,
  BathRoomIconRent,
  BedIconRent,
  NUSDIcon,
} from "../../../AssetComponents/Images";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import { ChatItem, ReceivedMessage, SentMessage } from "./ChatItem";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { api } from "../../../Components/functions/Api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setMessageToSend,
  setReceivedMessage,
} from "../../../ReduxSlices/CommunicationSlice";
import { getTime, getDay } from "../../../Components/functions/Functions";
import { HostAction } from "../HostReservations/HostAction";
import { TravelerAction } from "../TravelerTrips/TravelerAction";
import { getProfileFromWallet } from "../../../Components/functions/Functions";
import { removeItem } from "../../../ReduxSlices/NotificationSlice";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";
import { RentalItem } from "../../../Components/RealEstateProperty/RentalItem";
import { Mainnet } from "@nibiruchain/nibijs";
import { updateToken } from "../../../Components/functions/Functions";

export const Inbox = ({ mode }) => {
  const ref = useRef(null);
  const [text, setText] = useState(null);
  const [time, setTime] = useState(null);
  const location = useLocation();
  const account = useSelector((state) => state.auth.account);
  const myProfile = useSelector((state) => state.auth.profile);
  const notificationItems = useSelector((state) => state.notification.items);
  const diff = useSelector((state) => state.time.diffToUTC);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState();
  const [receiver, setReceiver] = useState();
  const [receiverProfile, setReceiverProfile] = useState();
  const [nftId, setNftId] = useState();

  const [avgRate, setAvgReviews] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [travelerAddress, setTravelerAddress] = useState();
  const [firstPeriod, setFirstPeriod] = useState();

  const nft = useSelector((state) => state.nft.nfts[nftId]);
  const mainnet = Mainnet();
  const getToken = async () => {
    console.log(nftId, "1");
    if (!nft)
      await updateToken(
        {
          token_id: nftId,
          contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
        },
        mainnet.endptTm,
        dispatch
      );
  };

  useEffect(() => {
    getToken();
  }, [nftId]);
  const receivedMessage = useSelector(
    (state) => state.communication.receivedMessage
  );

  // useEffect(() => {

  // }, [nft]);

  useEffect(() => {
    let flag = false;
    for (let i = 0; i < nft?.rentals?.rentals?.length; i++) {
      const reservation = nft?.rentals?.rentals[i];
      if (reservation.address === account && mode === "traveler") {
        setTravelerAddress(account);
        setFirstPeriod(reservation.renting_period);
        flag = true;
        break;
      }
      if (reservation.address === receiver && mode === "host") {
        setTravelerAddress(receiver);
        setFirstPeriod(reservation.renting_period);
        flag = true;
        break;
      }
    }
    if (!flag) {
      setTravelerAddress(null);
      setFirstPeriod([]);
    }
  }, [chat, nft, account, receiver]);

  useEffect(() => {
    if (!receivedMessage) return;
    const isMatching = chats.some((item) => item.chatId === receivedMessage.id);
    if (isMatching) {
      if (receivedMessage.id === chat) {
        if (receivedMessage.message.sender !== account) {
          setMessages([...messages, receivedMessage.message]);
          setTime(receivedMessage.message.generatedTime);
        }
      }
    } else {
      setChats([
        { chatId: receivedMessage.id, unreadMessages: 1, mode: mode },
        ...chats,
      ]);
    }
    dispatch(setReceivedMessage(null));
  }, [receivedMessage]);

  const goToChat = (id) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("id");
    searchParams.delete("receiver");
    searchParams.set("chat", id);
    navigate(location.pathname + `?${searchParams.toString()}`);
  };

  const sendMessage = async () => {
    if (!myProfile) {
      toast.error("Please upload your profile to send messages");
      return;
    }

    if (!receiver) return;
    if (!text || text === "") return;
    if (!nftId) return;
    let textTosend = text;
    const generatedTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );
    const MessageObj = {
      sender: account,
      generatedTime: generatedTime,
      text: textTosend,
    };
    const sendingData = {
      id: chat,
      newMessage: MessageObj,
      sender: account,
      receiver: receiver,
      owner: nft?.access.owner,
      nftId: nftId,
      mode: mode === "traveler" || mode === "host" ? "short" : "long",
    };
    dispatch(setMessageToSend(sendingData));
    setMessages([...messages, MessageObj]);
    setTime(generatedTime);
    setText("");

    const res = await api("chat/sendMessage", sendingData);
    if (res.isCreat) {
      setChats([{ chatId: res.id, unreadMessages: 0, mode: mode }, ...chats]);
      goToChat(res.id);
    }
  };

  const getChats = async () => {
    if (!account) return;
    const res = await api("user/inbox", {
      account: account,
    });
    if (res) setChats(res);
  };

  useEffect(() => {
    getChats();
  }, [account]);

  useEffect(() => {
    if (ref) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setTime(null);

    if (searchParams.get("chat")) setChat(searchParams.get("chat"));
    if (searchParams.get("id")) setNftId(searchParams.get("id"));
    if (searchParams.get("receiver")) setReceiver(searchParams.get("receiver"));
  }, [location.search]);

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getReview = async () => {
    const res = await api("review/get", {
      token_id: nftId,
    });
    if (!res) return;
    let avgRate = 0;
    for (let i = 0; i < res.length; i++) {
      avgRate += res[i].rate;
    }
    setAvgReviews(avgRate / res.length);
  };

  useEffect(() => {
    if (nftId) getReview();
  }, [nftId]);

  const getMessages = async () => {
    if (!chat) return;
    const res = await api("chat/getMessages", {
      id: chat,
      reader: account,
    });
    if (res) {
      if (
        res.chattingSession.mode === "short" &&
        (mode === "traveler" || mode === "host")
      ) {
        setMessages(res.chattingSession.messages);
        // setReceiverReadingState(res.data.readingState);
      } else {
      }
    }
  };

  useEffect(() => {
    if (chat) {
      for (let i = 0; i < notificationItems.length; i++) {
        if (
          notificationItems[i].type === "message" &&
          notificationItems[i].data.id === chat
        ) {
          dispatch(removeItem(i));
        }
      }
    } else {
    }
  }, [notificationItems, chat]);

  useEffect(() => {
    getMessages();
  }, [chat]);

  const getProfile = async () => {
    const profile = await getProfileFromWallet(receiver);
    setReceiverProfile(profile);
  };

  useEffect(() => {
    if (receiver) getProfile();
  }, [receiver]);

  return (
    <div className="w-full h-full p-[8px] flex gap-[8px]">
      <div className="border-[2px] p-[8px] gap-[8px] w-full h-full rounded-[10px] bg-white flex">
        <div className="w-[400px] h-full">
          <div className="flex items-center">
            <MessagesInboxIcon />
            <div className="text-[20px]">Messages</div>
          </div>
          <div className="mb-[20px] mt-[10px] flex gap-[10px] items-center border-[#E3E3E3] border-[1px] rounded-[12px] pl-[16px] pr-[8px] py-[9px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.25 12.25L8.75 8.75M1.75 5.83333C1.75 6.36956 1.85562 6.90054 2.06083 7.39596C2.26603 7.89137 2.56681 8.34151 2.94598 8.72069C3.32515 9.09986 3.7753 9.40063 4.27071 9.60584C4.76612 9.81105 5.2971 9.91667 5.83333 9.91667C6.36956 9.91667 6.90054 9.81105 7.39596 9.60584C7.89137 9.40063 8.34151 9.09986 8.72069 8.72069C9.09986 8.34151 9.40063 7.89137 9.60584 7.39596C9.81105 6.90054 9.91667 6.36956 9.91667 5.83333C9.91667 5.2971 9.81105 4.76612 9.60584 4.27071C9.40063 3.7753 9.09986 3.32515 8.72069 2.94598C8.34151 2.56681 7.89137 2.26603 7.39596 2.06083C6.90054 1.85562 6.36956 1.75 5.83333 1.75C5.2971 1.75 4.76612 1.85562 4.27071 2.06083C3.7753 2.26603 3.32515 2.56681 2.94598 2.94598C2.56681 3.32515 2.26603 3.7753 2.06083 4.27071C1.85562 4.76612 1.75 5.2971 1.75 5.83333Z"
                stroke="#202020"
                stroke-width="1.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input placeholder="Search" className="w-full outline-none" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" rx="4" fill="#E3E3E3" />
              <path
                d="M11.4837 6.38636L9.13991 15.0938H8.19176L10.5355 6.38636H11.4837Z"
                fill="#202020"
              />
            </svg>
          </div>
          <div className="w-full h-[calc(100vh-230px)] space-y-[10px] pr-[4px] overflow-auto scrollbarwidth">
            <Fade cascade damping={0.2}>
              {chats?.map((item) => {
                if (item.mode === mode)
                  return (
                    <ChatItem
                      myChatId={item.chatId}
                      mode={mode}
                      time={item.chatId === chat ? time : null}
                      setNft={setNftId}
                      setReceiver={setReceiver}
                      setReceiverProfile={setReceiverProfile}
                    />
                  );
                else return <></>;
              })}
            </Fade>
          </div>
        </div>
        <div className="border-[2px] border-[#E3e3e3] w-full h-full rounded-[10px] bg-[#F6F6F6] relative">
          <div className="gap-3 border-b-[2px] rounded-t-[10px] border-[#e3e3e3] px-[12px] py-[6px] bg-white flex items-center">
            {receiverProfile && (
              <div className="p-[2px] w-[50px] h-[50px] rounded-full bg-gradient-to-b from-[#5b1deec0] from-0% to-70% to-[#5b1dee00]">
                <img
                  alt=""
                  className="w-full h-full rounded-full"
                  src={receiverProfile?.Avatar}
                />
              </div>
            )}
            <div className="text-[20px]">
              {receiverProfile?.Name?.replace("/", " ")}
            </div>
          </div>

          <div
            ref={ref}
            className="p-[8px] h-[calc(100vh-250px)] overflow-auto scrollbarwidth"
          >
            {messages.map((message, i) => {
              return (
                <>
                  <div className="w-full text-center text-[#B6B6B6] my-[10px]">
                    {i === 0 ? (
                      getDay(
                        new Date(
                          (Math.floor(
                            new Date(message.generatedTime).getTime() / 1000
                          ) -
                            diff) *
                            1000
                        )
                      )
                    ) : (
                      <></>
                    )}
                    {i > 0 &&
                    getDay(
                      new Date(
                        (Math.floor(
                          new Date(message.generatedTime).getTime() / 1000
                        ) -
                          diff) *
                          1000
                      )
                    ) !==
                      getDay(
                        new Date(
                          (Math.floor(
                            new Date(messages[i - 1].generatedTime).getTime() /
                              1000
                          ) -
                            diff) *
                            1000
                        )
                      ) ? (
                      getDay(
                        new Date(
                          (Math.floor(
                            new Date(message.generatedTime).getTime() / 1000
                          ) -
                            diff) *
                            1000
                        )
                      )
                    ) : (
                      <></>
                    )}
                  </div>

                  {message.sender === account ? (
                    <SentMessage
                      text={message.text}
                      time={getTime(
                        new Date(
                          (Math.floor(
                            new Date(message.generatedTime).getTime() / 1000
                          ) -
                            diff) *
                            1000
                        )
                      )}

                      // isRead={i == messages.length - 1 - readingState}
                    />
                  ) : (
                    <ReceivedMessage
                      text={message.text}
                      time={getTime(
                        new Date(
                          (Math.floor(
                            new Date(message.generatedTime).getTime() / 1000
                          ) -
                            diff) *
                            1000
                        )
                      )}

                      // isRead={i == messages.length - 1 - readingState}
                    />
                  )}
                </>
              );
            })}
            {receiver && messages.length === 0 && (
              <div className="absolute top-0 left-0 w-full h-full bg-[#B2B2B2A0] flex flex-col items-center justify-center">
                <div className="rounded-md bg-white p-3">
                  <div>No messages here yet...</div>
                  <div className="font-normal">
                    Send a message to chat with{" "}
                    <div className="font-medium">
                      {receiverProfile?.Name?.replace("/", " ")}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex w-full px-[20px] gap-[16px] absolute bottom-[20px]">
            <div className="gap-[10px] rounded-[12px] flex items-center px-[12px] py-[10px] w-full bg-white shadow-md shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <svg
                className="cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3639 5.63604C21.8787 9.15076 21.8787 14.8492 18.3639 18.3639C14.8492 21.8787 9.15074 21.8787 5.63604 18.3639C2.12132 14.8492 2.12132 9.15074 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.3639 5.63604"
                  stroke="#959595"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 17C13.667 17 15 15.667 15 14H9C9 15.667 10.333 17 12 17V17Z"
                  stroke="#959595"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 9V10"
                  stroke="#959595"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.5 9V10"
                  stroke="#959595"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <input
                placeholder="Type Message.."
                className="w-full outline-none"
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={handleEnterKey}
              />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V16"
                  stroke="#959595"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 12H8"
                  stroke="#959595"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z"
                  stroke="#959595"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              className="bg-gradient-to-b from-[#5b1deec0] from-0% to-70% to-[#5b1dee] p-[16px] cursor-pointer text-white shadow-[-1px_3px_3px_0_rgba(80,80,80,0.2)] rounded-[12px] font-semibold hover:shadow-[-1px_6px_10px_0_rgba(93,0,207,0.5)] hover:-translate-y-[3px]"
              onClick={() => {
                sendMessage();
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.75106 10.2839L8.19459 16.2261C8.35453 16.8845 8.89708 17.3805 9.56709 17.4809C10.2371 17.5814 10.9012 17.2662 11.2472 16.6837L17.6798 5.85101C17.9857 5.33589 17.9916 4.69622 17.6953 4.17555C17.3989 3.65488 16.8459 3.33333 16.2468 3.33334H3.75269C3.07595 3.33332 2.46639 3.74252 2.21012 4.36886C1.95384 4.99519 2.10174 5.71431 2.5844 6.18868L6.75106 10.2839Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.6922 4.17303L6.75 10.2839"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {nft && (
        <div className="p-[8px] border-[2px] min-w-[300px] w-[400px] scrollbarwidth h-full max-h-[calc(100vh-90px)] overflow-y-auto rounded-l-[10px] bg-white">
          <div className="flex gap-[10px] items-center mb-[4px]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.07669 15.9976C7.05136 15.9976 7.03084 16.0182 7.03084 16.0435C7.03084 16.0688 7.05136 16.0893 7.07669 16.0893C7.10201 16.0893 7.12254 16.0688 7.12254 16.0435C7.12254 16.0182 7.10201 15.9976 7.07669 15.9976"
                stroke="#202020"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.83457 15.9976C4.82249 15.9976 4.81092 16.0025 4.80246 16.0111C4.79401 16.0197 4.78938 16.0314 4.78963 16.0435C4.78963 16.0688 4.81016 16.0893 4.83548 16.0893C4.86081 16.0893 4.88133 16.0688 4.88133 16.0435C4.88133 16.0182 4.86081 15.9976 4.83548 15.9976"
                stroke="#202020"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="5.95582"
                cy="16.0437"
                r="4.12672"
                stroke="#202020"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.00148 12.4082C2.93369 8.78141 4.46194 4.89235 7.71315 2.96279C10.9644 1.03323 15.1102 1.55476 17.7823 4.22942C20.4543 6.90409 20.9718 11.0505 19.039 14.2998C17.1062 17.5491 13.2157 19.0735 9.58997 18.0022"
                stroke="#202020"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.4848 10.4409H11.458V5.49707"
                stroke="#202020"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="text-[20px] font-semibold">Rental Request</div>
          </div>
          <div className="rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <div className="rounded-t-[8px] bg-[#dddddd] w-full h-[160px] relative">
              <RentalItem
                token_id={nft.token_id}
                onlyImages
                borderNone
                rentingPeriod={firstPeriod}
                traveler={travelerAddress}
              />
            </div>
            <div className="py-[10px] mx-auto px-[8px] space-y-[6px] flex flex-col items-center">
              <div className="flex justify-between w-full">
                <div>{nft?.metaData.buildingName}</div>
                <div className="flex items-center gap-[10px]">
                  <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                    <FavoriteIconRent />
                  </div>
                  <div className="text-[#959595]">{avgRate}</div>
                </div>
              </div>
              {/* <div className="flex justify-between w-full items-center">
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_837_49349"
                        // style="mask-type:alpha"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="16"
                        height="17"
                      >
                        <rect y="0.5" width="16" height="16" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_837_49349)">
                        <path
                          d="M7.99837 8.49967C8.36504 8.49967 8.67893 8.36912 8.94004 8.10801C9.20115 7.8469 9.33171 7.53301 9.33171 7.16634C9.33171 6.79967 9.20115 6.48579 8.94004 6.22467C8.67893 5.96356 8.36504 5.83301 7.99837 5.83301C7.63171 5.83301 7.31782 5.96356 7.05671 6.22467C6.79559 6.48579 6.66504 6.79967 6.66504 7.16634C6.66504 7.53301 6.79559 7.8469 7.05671 8.10801C7.31782 8.36912 7.63171 8.49967 7.99837 8.49967ZM7.99837 13.3997C9.35393 12.1552 10.3595 11.0247 11.015 10.008C11.6706 8.99134 11.9984 8.08856 11.9984 7.29967C11.9984 6.08856 11.6123 5.0969 10.84 4.32467C10.0678 3.55245 9.12059 3.16634 7.99837 3.16634C6.87615 3.16634 5.92893 3.55245 5.15671 4.32467C4.38448 5.0969 3.99837 6.08856 3.99837 7.29967C3.99837 8.08856 4.32615 8.99134 4.98171 10.008C5.63726 11.0247 6.64282 12.1552 7.99837 13.3997ZM7.99837 15.1663C6.20948 13.6441 4.87337 12.2302 3.99004 10.9247C3.10671 9.61912 2.66504 8.41079 2.66504 7.29967C2.66504 5.63301 3.20115 4.30523 4.27337 3.31634C5.34559 2.32745 6.58726 1.83301 7.99837 1.83301C9.40948 1.83301 10.6512 2.32745 11.7234 3.31634C12.7956 4.30523 13.3317 5.63301 13.3317 7.29967C13.3317 8.41079 12.89 9.61912 12.0067 10.9247C11.1234 12.2302 9.78726 13.6441 7.99837 15.1663Z"
                          fill="#959595"
                        />
                      </g>
                    </svg>
                    <div className="text-[#959595]">Location</div>
                  </div>
                  {nft?.rentals?.rentals?.some(
                    (item) => item.address === account
                  ) ? (
                    <div
                      className="underline text-[#6B349A] cursor-pointer"
                      onClick={() => {
                        if (nft?.access.owner === account)
                          navigate(`/dashboard/host/reservations/${nftId}`);
                        else navigate(`/dashboard/traveler/trips/${nftId}`);
                      }}
                    >
                      See on Maps
                    </div>
                  ) : (
                    <></>
                  )}
                </div> */}
              <div className="flex w-full gap-[4px] items-center">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 3.83333V13.086C14 13.8667 13.3667 14.5 12.586 14.5H3.414C2.63333 14.5 2 13.8667 2 13.086V3.914C2 3.13333 2.63333 2.5 3.414 2.5H12.6667C13.4033 2.5 14 3.09667 14 3.83333Z"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.66634 2.5V14.5"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.33402 9.84311C8.78135 9.84311 8.33402 9.39511 8.33402 8.84311C8.33402 8.29111 8.78202 7.84311 9.33402 7.84311V7.84311C9.88668 7.84311 10.334 8.29111 10.334 8.84311V9.28711C10.334 9.74645 10.7073 10.1204 11.1673 10.1204C11.6273 10.1204 12.0007 9.74778 12.0007 9.28711V8.84311C12.0007 7.37045 10.8067 6.17578 9.33335 6.17578C7.86002 6.17578 6.66602 7.36978 6.66602 8.84245C6.66602 10.3151 7.86002 11.5098 9.33268 11.5098C9.67335 11.5098 10.0193 11.4451 10.354 11.3071"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.334 8.84375C10.334 9.39642 9.88598 9.84375 9.33398 9.84375"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="w-full truncate">
                  {nft?.metaData.address.street} {nft?.metaData.address.city}{" "}
                  {nft?.metaData.address.state}
                </div>
              </div>
              <div className="w-full h-[2px] bg-[#E3E3E3]" />
              <div className="flex w-full items-center gap-[4px]">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.68421 6.58008H7.64887C7.19354 6.58008 6.87221 6.13408 7.01621 5.70274V5.70274C7.23954 5.03208 7.86687 4.58008 8.57354 4.58008H8.75887C9.46554 4.58008 10.0929 5.03208 10.3162 5.70274V5.70274C10.4602 6.13408 10.1389 6.58008 9.68421 6.58008V6.58008Z"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.66218 9.3418H2.66684C2.25751 9.3418 1.94484 9.70713 2.00818 10.1111L2.23751 11.5778C2.44018 12.8765 3.55818 13.8331 4.87218 13.8331H11.1282C12.4422 13.8331 13.5602 12.8765 13.7628 11.5785L13.9922 10.1118C14.0555 9.7078 13.7428 9.34246 13.3335 9.34246H8.17551"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.66699 4.58V4.5C8.66699 3.39533 9.56233 2.5 10.667 2.5V2.5C11.7717 2.5 12.667 3.39533 12.667 4.5V9.342"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.77233 12.0087H6.07033C5.29566 12.0087 4.66699 11.3807 4.66699 10.6053V9.26867C4.66699 8.844 5.01099 8.5 5.43566 8.5H7.40699C7.83166 8.5 8.17566 8.844 8.17566 9.26867V10.6053C8.17566 11.3807 7.54766 12.0087 6.77233 12.0087Z"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.02634 13.7002L3.33301 14.5002"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.667 14.5002L11.9736 13.7002"
                    stroke="#959595"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-[#A4A4A4]">Essentials</div>
              </div>
              <div className="flex items-center gap-[10px]">
                <div className="flex items-center gap-[10px]">
                  <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                    <GuestsIcon />
                  </div>
                  <div className="text-[#959595]">
                    {nft?.metaData.essentials.guests}
                  </div>
                </div>
                <div className="w-[1px] h-[20px] bg-[#959595]"></div>
                <div className="flex items-center gap-[10px]">
                  <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                    <BathRoomIconRent />
                  </div>
                  <div className="text-[#959595]">
                    {nft?.metaData.essentials.bathrooms}
                  </div>
                </div>
                <div className="w-[1px] h-[20px] bg-[#959595]"></div>

                <div className="flex items-center gap-[10px]">
                  <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                    <BedIconRent />
                  </div>
                  <div className="text-[#959595]">
                    {nft?.metaData.essentials.beds}
                  </div>
                </div>
              </div>
              {nft?.rentals?.rentals?.some(
                (item) => item.address === account
              ) ? (
                <>
                  <div className="flex gap-[10px] items-center">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.00012 4.42188V4.42188C11.8051 4.42188 14.0784 6.69512 14.0784 9.50012V9.50012C14.0784 12.3051 11.8051 14.5784 9.00012 14.5784V14.5784C6.19512 14.5784 3.92188 12.3051 3.92188 9.50012V9.50012C3.92188 6.69512 6.19512 4.42188 9.00012 4.42188Z"
                        stroke="#321083"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 9.78169V6.96094"
                        stroke="#321083"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.99925 11.785C8.937 11.785 8.88675 11.8352 8.8875 11.8975C8.8875 11.9597 8.93775 12.01 9 12.01C9.06225 12.01 9.1125 11.9597 9.1125 11.8975C9.1125 11.836 9.06225 11.785 8.99925 11.785"
                        stroke="#321083"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.2441 4.81836C17.3276 7.58736 17.3276 11.4131 15.2441 14.1821"
                        stroke="#321083"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.75012 14.1821C0.666625 11.4131 0.666625 7.58736 2.75012 4.81836"
                        stroke="#321083"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="text-[#321083]">
                      Renting is still active
                    </div>
                  </div>
                  <div className="w-full">
                    <PurpleButton
                      onClick={() =>
                        navigate(
                          `/dashboard/traveler/trips/${nft.token_id}?from=${firstPeriod[0]}&to=${firstPeriod[1]}`
                        )
                      }
                      text={
                        <div className="w-full text-center">Rental Details</div>
                      }
                    />
                  </div>
                  <div className="w-full h-[2px] bg-[#E3E3E3]" />
                  <div className="flex w-full items-center gap-[4px]">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.003 5.8325H1.99805"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.6682 9.16699C13.3258 9.16699 14.6695 10.5107 14.6695 12.1682C14.6695 13.8258 13.3258 15.1695 11.6682 15.1695C10.0107 15.1695 8.66699 13.8258 8.66699 12.1682C8.66699 10.5107 10.0107 9.16699 11.6682 9.16699"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.78329 14.503H3.99888C2.89385 14.503 1.99805 13.6072 1.99805 12.5022V4.49888C1.99805 3.39385 2.89385 2.49805 3.99888 2.49805H12.0022C13.1072 2.49805 14.003 3.39385 14.003 4.49888V10.2833"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.8169 10.6943V12.2893"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.5176 12.2895H11.8167"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.53186 8.16648C4.53186 8.1849 4.51693 8.19983 4.49851 8.19983C4.48009 8.19983 4.46516 8.1849 4.46516 8.16648C4.46516 8.14806 4.48009 8.13313 4.49851 8.13313"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.49844 8.1332C4.51686 8.1332 4.53179 8.14813 4.53179 8.16655"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.86682 8.16648C6.86682 8.1849 6.85189 8.19983 6.83347 8.19983C6.81506 8.19983 6.80013 8.1849 6.80013 8.16648C6.80013 8.14806 6.81506 8.13313 6.83347 8.13313"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.8334 8.1332C6.85182 8.1332 6.86675 8.14813 6.86675 8.16655"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.53186 10.1675C4.53186 10.1859 4.51693 10.2008 4.49851 10.2008C4.48009 10.2008 4.46516 10.1859 4.46516 10.1675C4.46516 10.149 4.48009 10.1341 4.49851 10.1341"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.49844 10.1342C4.51686 10.1342 4.53179 10.1491 4.53179 10.1675"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.86682 10.1675C6.86682 10.1859 6.85189 10.2008 6.83347 10.2008C6.81506 10.2008 6.80013 10.1859 6.80013 10.1675C6.80013 10.149 6.81506 10.1341 6.83347 10.1341"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.8334 10.1342C6.85182 10.1342 6.86675 10.1491 6.86675 10.1675"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.19983 8.16648C9.19983 8.1849 9.1849 8.19983 9.16648 8.19983C9.14806 8.19983 9.13313 8.1849 9.13313 8.16648C9.13313 8.14806 9.14806 8.13313 9.16648 8.13313"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.16641 8.1332C9.18483 8.1332 9.19976 8.14813 9.19976 8.16655"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.53186 12.1684C4.53186 12.1869 4.51693 12.2018 4.49851 12.2018C4.48009 12.2018 4.46516 12.1869 4.46516 12.1684C4.46516 12.15 4.48009 12.1351 4.49851 12.1351"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.49844 12.1352C4.51686 12.1352 4.53179 12.1501 4.53179 12.1685"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.86682 12.1684C6.86682 12.1869 6.85189 12.2018 6.83347 12.2018C6.81506 12.2018 6.80013 12.1869 6.80013 12.1684C6.80013 12.15 6.81506 12.1351 6.83347 12.1351"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.8334 12.1352C6.85182 12.1352 6.86675 12.1501 6.86675 12.1685"
                        stroke="#959595"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <div className="text-[#A4A4A4]">Rental Period</div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {nft?.rentals?.rentals?.map((reservation) => {
                if (
                  (reservation.address === account && mode === "traveler") ||
                  (reservation.address === receiver && mode === "host")
                )
                  return (
                    <div className="w-full justify-between flex items-center">
                      <div className="py-[4px] px-[12px] w-max bg-[#F6F6F6] rounded-[8px]">
                        {new Date(
                          (reservation.renting_period[0] - diff) * 1000
                        )?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="w-[16px] h-[2px] bg-[#B6B6B6]"></div>
                      <div className="py-[4px] px-[12px] w-max bg-[#F6F6F6] rounded-[8px]">
                        {new Date(
                          (reservation.renting_period[1] - diff) * 1000
                        )?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  );
                else return <></>;
              })}

              <div className="w-full h-[2px] bg-[#E3E3E3]" />
              <div className="flex gap-[4px] w-full items-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.002 7.25977V11.5314"
                    stroke="#A4A4A4"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.1895 14.0527C11.1895 14.1563 11.1055 14.2402 11.002 14.2402C10.8984 14.2402 10.8145 14.1563 10.8145 14.0527C10.8145 13.9492 10.8984 13.8652 11.002 13.8652C11.1055 13.8652 11.1895 13.9492 11.1895 14.0527Z"
                    fill="#202020"
                    stroke="#A4A4A4"
                  />
                  <path
                    d="M11.0016 19.4788C15.6845 19.4788 19.4808 15.6826 19.4808 10.9997C19.4808 6.31676 15.6845 2.52051 11.0016 2.52051C6.31871 2.52051 2.52246 6.31676 2.52246 10.9997C2.52246 15.6826 6.31871 19.4788 11.0016 19.4788Z"
                    stroke="#A4A4A4"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-[#A4A4A4]">
                  {mode === "host" && "Traveler"}
                  {mode === "traveler" && "Host"}
                </div>
              </div>
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-[10px] items-center">
                  <img
                    alt="Avatar"
                    className="w-[40px] rounded-full"
                    src={receiverProfile?.Avatar}
                  />
                  <div>{receiverProfile?.Name?.replace("/", " ")}</div>
                </div>
                {receiverProfile?.ID && (
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_dd_1245_86717)">
                      <rect
                        x="11"
                        y="11"
                        width="32"
                        height="32"
                        rx="16"
                        fill="#5B1DEE"
                      />
                      <rect
                        x="11"
                        y="11"
                        width="32"
                        height="32"
                        rx="16"
                        fill="url(#paint0_linear_1245_86717)"
                        fill-opacity="0.18"
                      />
                      <g filter="url(#filter1_d_1245_86717)">
                        <path
                          d="M33.0248 25.1083C32.7767 24.8748 32.52 24.6341 32.4165 24.4161C32.3209 24.2165 32.2982 23.8784 32.2761 23.551C32.2348 22.9423 32.1886 22.2526 31.6835 21.7978C31.1784 21.3429 30.4875 21.3691 29.8779 21.3917C29.55 21.4039 29.2114 21.4166 29.0029 21.3424C28.7759 21.2623 28.5091 21.0322 28.2508 20.8098C27.7985 20.4186 27.2846 19.9755 26.633 20.0096C25.9814 20.0438 25.5172 20.5381 25.1076 20.9745C24.8741 21.2227 24.6334 21.4794 24.4154 21.5828C24.217 21.6784 23.8777 21.7011 23.5503 21.7233C22.9416 21.7646 22.2519 21.8108 21.7971 22.3159C21.3422 22.821 21.3716 23.5117 21.391 24.1215C21.4032 24.4494 21.4159 24.788 21.3417 24.9965C21.2616 25.2235 21.0315 25.4903 20.8091 25.7485C20.4179 26.2009 19.9748 26.7148 20.0089 27.3664C20.0431 28.018 20.5374 28.4821 20.9738 28.8917C21.222 29.1253 21.4787 29.366 21.5821 29.584C21.6777 29.7836 21.7004 30.1216 21.7226 30.449C21.7639 31.0577 21.8101 31.7475 22.3152 32.2023C22.8203 32.6571 23.5111 32.6309 24.1208 32.6084C24.4487 32.5962 24.7873 32.5835 24.9958 32.6576C25.2228 32.7377 25.4896 32.9678 25.7478 33.1903C26.2002 33.5815 26.7141 34.0246 27.3657 33.9904C28.0173 33.9563 28.4814 33.4619 28.891 33.0255C29.1246 32.7773 29.3653 32.5206 29.5833 32.4172C29.7829 32.3216 30.1209 32.2989 30.4484 32.2768C31.057 32.2355 31.7468 32.1893 32.2016 31.6842C32.6564 31.1791 32.6302 30.4882 32.6077 29.8786C32.5955 29.5506 32.5828 29.2121 32.6569 29.0036C32.7371 28.7766 32.9672 28.5098 33.1896 28.2515C33.5808 27.7992 34.0239 27.2853 33.9897 26.6337C33.9556 25.9821 33.4613 25.5179 33.0248 25.1083ZM29.7892 25.706L26.4772 29.3844C26.4332 29.4332 26.3801 29.4729 26.3208 29.5013C26.2615 29.5296 26.1972 29.5459 26.1316 29.5493C26.0659 29.5528 26.0003 29.5432 25.9384 29.5213C25.8764 29.4993 25.8194 29.4654 25.7706 29.4214L24.1942 28.002C24.0956 27.9132 24.0363 27.7889 24.0293 27.6564C24.0224 27.5239 24.0684 27.394 24.1572 27.2954C24.2459 27.1968 24.3702 27.1375 24.5027 27.1306C24.6352 27.1236 24.7651 27.1696 24.8637 27.2584L26.0684 28.3437L29.0456 25.0365C29.0896 24.9877 29.1427 24.948 29.202 24.9197C29.2613 24.8914 29.3256 24.8751 29.3912 24.8717C29.4568 24.8682 29.5225 24.8777 29.5844 24.8997C29.6463 24.9216 29.7033 24.9555 29.7522 24.9995C29.801 25.0434 29.8407 25.0966 29.8689 25.1559C29.8972 25.2152 29.9136 25.2795 29.917 25.3451C29.9204 25.4107 29.9109 25.4763 29.889 25.5382C29.8671 25.6002 29.8331 25.6572 29.7892 25.706Z"
                          fill="white"
                        />
                        <path
                          d="M32.9222 25.2177L32.922 25.2176L32.9145 25.2105C32.7936 25.0967 32.6664 24.977 32.5564 24.8584C32.4453 24.7386 32.3428 24.6106 32.2812 24.4807M32.9222 25.2177L28.2531 20.8117C28.5106 21.0335 28.7765 21.2625 29.0029 21.3424L28.9526 21.4837C28.9526 21.4838 28.9527 21.4838 28.9528 21.4838C29.0797 21.5289 29.2356 21.5447 29.3911 21.5494C29.5473 21.5541 29.7174 21.5478 29.8787 21.5418L29.8834 21.5416C30.5066 21.5185 31.1307 21.5019 31.5831 21.9092C32.0355 22.3166 32.0842 22.939 32.1264 23.5612L32.1267 23.5659C32.1376 23.727 32.1491 23.8968 32.1701 24.0516C32.191 24.2058 32.223 24.3592 32.2812 24.4807M32.9222 25.2177C33.369 25.637 33.8095 26.0605 33.8399 26.6415C33.8704 27.2226 33.4765 27.6905 33.0761 28.1534L33.0759 28.1536L33.0722 28.158C32.9629 28.2849 32.8477 28.4186 32.7498 28.5494C32.6519 28.6802 32.5633 28.8182 32.5155 28.9535M32.9222 25.2177L32.5155 28.9535M32.2812 24.4807C32.2812 24.4808 32.2812 24.4808 32.2812 24.4809L32.4165 24.4161L32.281 24.4804C32.2811 24.4805 32.2811 24.4806 32.2812 24.4807ZM29.5186 32.2819C29.3888 32.3435 29.2608 32.446 29.141 32.5571C29.0224 32.6671 28.9027 32.7943 28.7889 32.9152L28.7818 32.9227L28.7817 32.9229C28.3623 33.3697 27.9389 33.8102 27.3578 33.8406C26.7768 33.8711 26.3089 33.4772 25.846 33.0768L25.8457 33.0766L25.8414 33.0729C25.7145 32.9636 25.5808 32.8484 25.45 32.7505C25.3192 32.6526 25.1812 32.564 25.046 32.5163C24.919 32.4711 24.7631 32.4554 24.6076 32.4507C24.4514 32.446 24.2813 32.4523 24.1199 32.4583L24.1152 32.4585C23.492 32.4815 22.868 32.4982 22.4156 32.0908C21.9631 31.6835 21.9145 31.0611 21.8723 30.4389L21.8719 30.4342C21.861 30.2731 21.8495 30.1033 21.8285 29.9484C21.8076 29.7943 21.7757 29.641 21.7176 29.5195C21.6559 29.3896 21.5534 29.2615 21.4423 29.1417C21.3323 29.0231 21.2051 28.9034 21.0842 28.7896L21.0766 28.7825L21.0765 28.7824C20.6297 28.363 20.1892 27.9396 20.1587 27.3585C20.1283 26.7775 20.5222 26.3096 20.9226 25.8467L20.9228 25.8464L20.9265 25.8421C21.0358 25.7152 21.151 25.5815 21.2489 25.4507C21.3468 25.3199 21.4353 25.1819 21.4831 25.0466C21.5282 24.9196 21.544 24.7638 21.5487 24.6083C21.5534 24.4521 21.5471 24.282 21.5411 24.1206L21.5409 24.1167C21.5409 24.1166 21.5409 24.1164 21.5409 24.1163C21.521 23.4916 21.5013 22.8685 21.9085 22.4162C22.3159 21.9638 22.9383 21.9152 23.5605 21.873L23.5654 21.8726C23.7264 21.8617 23.8965 21.8502 24.0514 21.8292C24.2053 21.8084 24.3587 21.7765 24.4797 21.7184L29.519 32.2817C29.5189 32.2818 29.5188 32.2818 29.5186 32.2819ZM29.5186 32.2819C29.6402 32.2237 29.7936 32.1917 29.9477 32.1708C30.1026 32.1498 30.2724 32.1383 30.4335 32.1274L30.4382 32.1271M29.5186 32.2819L30.4382 32.1271M30.4382 32.1271C31.0604 32.0849 31.6828 32.0362 32.0901 31.5838C32.4975 31.1314 32.4808 30.5073 32.4578 29.8841L32.4576 29.8794C32.4516 29.7181 32.4453 29.548 32.45 29.3918C32.4547 29.2363 32.4704 29.0805 32.5155 28.9535M30.4382 32.1271L32.5156 28.9533C32.5156 28.9534 32.5156 28.9534 32.5155 28.9535M24.9641 27.147L24.9641 27.1469C24.8359 27.0315 24.6671 26.9718 24.4949 26.9808C24.3227 26.9898 24.1611 27.0669 24.0457 27.1951C23.9303 27.3232 23.8705 27.492 23.8795 27.6642C23.8886 27.8364 23.9656 27.998 24.0938 28.1134L25.6702 29.5328C25.7336 29.59 25.8077 29.6341 25.8883 29.6627C25.9688 29.6912 26.0541 29.7036 26.1394 29.6991C26.2247 29.6947 26.3083 29.6734 26.3854 29.6366C26.4625 29.5998 26.5316 29.5482 26.5887 29.4847L29.9007 25.8064C29.9578 25.7429 30.0019 25.6688 30.0304 25.5883C30.0589 25.5078 30.0713 25.4225 30.0668 25.3372C30.0623 25.2519 30.0411 25.1684 30.0043 25.0913C29.9676 25.0142 29.916 24.9451 29.8525 24.888C29.7891 24.8309 29.715 24.7868 29.6345 24.7583C29.554 24.7298 29.4687 24.7174 29.3834 24.7219C29.2981 24.7263 29.2145 24.7476 29.1375 24.7843C29.0604 24.8211 28.9913 24.8727 28.9342 24.9361L28.9341 24.9361L26.0573 28.1318L24.9641 27.147Z"
                          stroke="#202020"
                          stroke-width="0.3"
                        />
                      </g>
                    </g>
                    <defs>
                      <filter
                        id="filter0_dd_1245_86717"
                        x="0.333331"
                        y="0.333331"
                        width="53.3333"
                        height="53.3333"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="2.66667" dy="2.66667" />
                        <feGaussianBlur stdDeviation="4" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1245_86717"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="-2.66667" dy="-2.66667" />
                        <feGaussianBlur stdDeviation="4" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="effect1_dropShadow_1245_86717"
                          result="effect2_dropShadow_1245_86717"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect2_dropShadow_1245_86717"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_d_1245_86717"
                        x="20.0068"
                        y="20.0078"
                        width="14.9844"
                        height="14.9844"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dx="1" dy="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1245_86717"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1245_86717"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_1245_86717"
                        x1="27"
                        y1="11"
                        x2="27"
                        y2="31.6667"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>
              <div className="w-full space-y-2">
                <PurpleButton
                  onClick={() => navigate(`/dashboard/profile/${receiver}`)}
                  text={<div className="w-full text-center">See Profile</div>}
                />
                {mode === "traveler" && (
                  <BlackButton
                    text="View Listing"
                    // <div className="flex gap-[10px] justify-center items-center">
                    //   <FavoriteIconRent />
                    //   <div className="">Review now</div>
                    // </div>
                    onClick={() => navigate(`/rent/short/${nftId}`)}
                  />
                )}
              </div>
            </div>
          </div>
          <Fade cascade damping={0.2}>
            {nft?.rentals?.rentals?.map((reservation) => {
              if (
                (reservation.address === account && mode === "traveler") ||
                (reservation.address === receiver && mode === "host")
              )
                return (
                  <>
                    <div className="my-[10px] flex gap-[6px] items-center text-[18px] pl-[4px]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.75 8.25033H19.25"
                          stroke="#202020"
                          stroke-width="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.41699 13.7503H8.25033"
                          stroke="#202020"
                          stroke-width="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <rect
                          x="2.75"
                          y="3.66699"
                          width="16.5"
                          height="13.75"
                          rx="3"
                          stroke="#202020"
                          stroke-width="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div>Billing Details</div>
                    </div>
                    <div className="space-y-[10px] p-[16px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="w-full flex justify-between">
                        <div className="text-[#959595]">Guest</div>
                        <div className="text-[#959595]">
                          {reservation.guests} guest
                        </div>
                      </div>
                      <hr />
                      <div className="w-full flex justify-between">
                        <div className="text-[#959595]">Daily Cost</div>
                        <div className="flex items-center gap-[10px]">
                          <NUSDIcon />
                          <div className="text-[#959595]">
                            {nft?.short.price_per_day} USDC
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="w-full flex justify-between">
                        <div className="">Total Payment</div>
                        <div className="flex items-center gap-[10px]">
                          <NUSDIcon />
                          <div className="text-[#959595]">
                            {(
                              Number(reservation.deposit_amount) /
                              10 ** process.env.REACT_APP_USDC_DECIMALS
                            ).toString()}{" "}
                            USDC
                          </div>
                        </div>
                      </div>
                    </div>
                    {account === nft?.access.owner ? (
                      <HostAction
                        token_id={nft.token_id}
                        approved={reservation.approved}
                        cancelled={reservation.cancelled}
                        rentingPeriod={reservation.renting_period}
                        traveler={reservation.address}
                        fundedAmount={(
                          Number(reservation.deposit_amount) /
                          10 ** process.env.REACT_APP_USDC_DECIMALS
                        ).toString()}
                      />
                    ) : (
                      <TravelerAction
                        token_id={nft.token_id}
                        approved={reservation.approved}
                        cancelled={reservation.cancelled}
                        rentingPeriod={reservation.renting_period}
                        fundedAmount={(
                          Number(reservation.deposit_amount) /
                          10 ** process.env.REACT_APP_USDC_DECIMALS
                        ).toString()}
                      />
                    )}
                  </>
                );
              else return <></>;
            })}
          </Fade>
        </div>
      )}
    </div>
  );
};

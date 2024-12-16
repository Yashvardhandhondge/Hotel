import { NUSDIcon, WhiteCheckMarkIcon } from "../../../AssetComponents/Images";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { api } from "../../../Components/functions/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { getTime, getDay } from "../../../Components/functions/Functions";
import { getProfileFromWallet } from "../../../Components/functions/Functions";
import Skeleton from "react-loading-skeleton";
import { updateToken } from "../../../Components/functions/Functions";
import { Mainnet } from "@nibiruchain/nibijs";

export const ChatItem = ({
  myChatId,
  time,
  mode,
  setReceiver = () => {},
  setNft = () => {},
  setReceiverProfile = () => {},
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const account = useSelector((state) => state.auth.account);
  const dispatch = useDispatch();
  const [receiver, setReceiverAccount] = useState(null);
  const [latestMessageTime, setLatestTime] = useState(time);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [nftId, setNftId] = useState(null);
  const diff = useSelector((state) => state.time.diffToUTC);
  const [profile, setProfile] = useState();
  const nft = useSelector((state) => state.nft.nfts[nftId]);

  const mainnet = Mainnet();
  const getToken = async () => {
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

  const getProfile = async () => {
    const profile = await getProfileFromWallet(receiver);
    setProfile(profile);
  };

  useEffect(() => {
    if (time !== null) setLatestTime(time);
  }, [time]);

  const setToActive = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("id");
    searchParams.delete("receiver");
    searchParams.set("chat", myChatId);
    navigate(location.pathname + `?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setActive(searchParams.get("chat") === myChatId);
  }, [location.search, myChatId]);

  const getChattingInfo = async () => {
    if (!account) return;
    const res = await api("chat/getChattingInfo", {
      id: myChatId,
      reader: account,
    });
    setUnreadMessages(res.unreadMessages);
    setLatestTime(res.latestMessageTime);
    setReceiverAccount(res.receiver);
    setNftId(res.nftId);
  };

  useEffect(() => {
    if (active) {
      setReceiver(receiver);
      setNft(nftId);
      setReceiverProfile(profile);
    }
  }, [active, receiver, nftId, profile]);

  useEffect(() => {
    if (receiver) {
      getProfile();
    }
  }, [receiver]);

  useEffect(() => {
    getChattingInfo();
  }, [account, myChatId]);

  return (
    <div
      onClick={setToActive}
      className={
        active
          ? "cursor-pointer bg-gradient-to-b from-[#6B349A] from-0% to-70% to-[#4C37C3] p-[2px] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          : "cursor-pointer bg-white p-[2px] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
      }
    >
      <div className="bg-white hover:bg-[#f6f6f6] rounded-[10px] w-full h-full p-[12px]">
        <div className="w-full justify-between flex">
          <div className="flex items-center gap-[4px] w-max py-[4px] px-[8px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <>
              <div className="p-[4px] rounded-full bg-[#5DBE89] w-max">
                <WhiteCheckMarkIcon className="w-[12px]" />
              </div>
              <div className="text-[#5DBE89] text-[14px]">Inquiry</div>
            </>
          </div>
          {/* <div className="bg-[#38A56920] text-[#38A569] px-[12px] py-[4px] border-[2px] border-[#38A569] rounded-[8px]">
            Inquiry
          </div> */}
          <div className="flex items-center gap-[4px]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.41768 2.76525C9.86093 1.33875 13.8082 2.9745 15.2347 6.41775C16.6612 9.861 15.0254 13.8083 11.5822 15.2348C8.13893 16.6613 4.19168 15.0255 2.76518 11.5823C1.33943 8.139 2.97443 4.19175 6.41768 2.76525"
                stroke="url(#paint0_linear_457_25163)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.78906 5.98874V9.47699L11.5311 11.1487"
                stroke="url(#paint1_linear_457_25163)"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_457_25163"
                  x1="9.00009"
                  y1="2.24976"
                  x2="9.00009"
                  y2="15.7502"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B349A" />
                  <stop offset="1" stop-color="#4C37C3" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_457_25163"
                  x1="10.1601"
                  y1="5.98874"
                  x2="10.1601"
                  y2="11.1487"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B349A" />
                  <stop offset="1" stop-color="#4C37C3" />
                </linearGradient>
              </defs>
            </svg>

            <div>
              {latestMessageTime ? (
                getDay(
                  new Date(
                    (Math.floor(new Date(latestMessageTime).getTime() / 1000) -
                      diff) *
                      1000
                  )
                ) +
                " " +
                getTime(
                  new Date(
                    (Math.floor(new Date(latestMessageTime).getTime() / 1000) -
                      diff) *
                      1000
                  )
                )
              ) : (
                <Skeleton count={1} height={20} width={100} />
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] items-center">
          {profile?.Avatar ? (
            <div className="my-3 p-[2px] w-[40px] h-[40px] rounded-full bg-gradient-to-b from-[#5b1deec0] from-0% to-70% to-[#5b1dee00]">
              <img
                alt="Avatar"
                className="w-[50px] rounded-full"
                src={profile?.Avatar}
              />
            </div>
          ) : (
            <Skeleton
              width={40}
              height={40}
              style={{ borderRadius: "100px" }}
            />
          )}
          {profile?.Name ? (
            <div>{profile?.Name?.replace("/", " ")}</div>
          ) : (
            <Skeleton count={1} height={20} width={100} />
          )}
        </div>

        <div className="flex justify-between w-full items-end">
          <div>
            {nft?.metaData?.buildingName ? (
              <div className="font-normal text-[14px]">
                {nft?.metaData?.buildingName}
              </div>
            ) : (
              <>
                <Skeleton height={10} width={200} />
                <Skeleton height={10} width={100} />
              </>
            )}

            <div className="flex items-center gap-[4px] mt-2">
              <NUSDIcon />
              {nft?.short.price_per_day ? (
                <div>{nft?.short.price_per_day} USDC</div>
              ) : (
                <Skeleton height={20} width={40} />
              )}
            </div>
          </div>
          {nft?.metaData?.images[0] ? (
            <img
              alt=""
              src={nft?.metaData?.images[0]}
              className="rounded-[12px] w-[60px] h-[44px]"
            />
          ) : (
            <Skeleton height={44} width={60} style={{ borderRadius: "12px" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export const SentMessage = ({ text, time }) => {
  return (
    <div className="space-y-[5px] my-[10px] w-full">
      <div className="w-full flex justify-end">
        <div className="px-[12px] py-[8px] rounded-[12px] rounded-br-[0px] text-white bg-gradient-to-b from-[#5b1deec0] from-0% to-70% to-[#5b1dee] break-words max-w-[600px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          {text}
        </div>
      </div>
      <div className="w-full flex justify-end gap-[4px] items-center">
        <div className="text-[#B6B6B6]">{time}</div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 10.7209L6.18327 12.9605C6.49151 13.2442 6.96906 13.2328 7.26341 12.9347L13.2879 6.83392"
            stroke="#B6B6B6"
            stroke-width="1.3"
            stroke-linecap="round"
          />
          <path
            d="M16.2474 6.83392L10.3828 12.6986"
            stroke="#B6B6B6"
            stroke-width="1.3"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const ReceivedMessage = ({ text, time }) => {
  return (
    <div className="space-y-[5px] my-[10px] w-full">
      <div className="w-full flex justify-start">
        <div className="px-[12px] py-[8px] rounded-[12px] rounded-bl-[0px] bg-white break-words max-w-[600px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          {text}
        </div>
      </div>
      <div className="w-full flex justify-start gap-[10px] items-center">
        <div className="text-[#B6B6B6]">{time}</div>
      </div>
    </div>
  );
};

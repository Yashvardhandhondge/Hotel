import { useEffect, useState } from "react";
import {
  Airplane,
  ArrowToDownHeader,
  CheckMarkIcon,
  CopyIcon,
  HandKey,
  LightIcon,
  Logo,
  NotificationBingIconHeader,
  SwapIconHeader,
  UnVerified,
  UserBoxIcon,
  VerifyUserIcon,
} from "../AssetComponents/Images";
import { PurpleButton } from "./Buttons/PurpleButton";
import { Popover } from "react-tiny-popover";
import { SelectionGroup, SelectionItem } from "./Selection/Selection";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setConnectModal } from "../ReduxSlices/ModalSlice";
import { truncateWalletAddress } from "./functions/Functions";
import { BlackButton } from "./Buttons/BlackButton";
import CopyToClipboard from "react-copy-to-clipboard";
import { setDisconnect } from "../ReduxSlices/AuthSlice";
import { Testnet, Mainnet } from "@nibiruchain/nibijs";
import { getProfileFromWallet } from "./functions/Functions";
import { setEthereum } from "../ReduxSlices/AuthSlice";
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { thiredWebClient } from "./functions/Functions";
import { api } from "./functions/Api";

export const Header = () => {
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const [showTradeMenu, setShowTradeMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const isConnected = useSelector((state) => state.auth.isConnected);
  const account = useSelector((state) => state.auth.account);
  const diff = useSelector((state) => state.time.diffToUTC);
  const ethereum = useSelector((state) => state.auth.ethereum);
  const profile = useSelector((state) => state.auth.profile);
  const nfts = useSelector((state) => state.nft.nfts);
  const notificationContent = useSelector((state) => state.notification.items);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState();
  const [maskString, setMaskString] = useState("shadow-md rounded-[10px]");
  // const testNet = Testnet(1);
  const mainnet = Mainnet();
  const tryConnect = () => {
    if (current === 4) {
      if (!ethereum) dispatch(setConnectModal(true));
      else {
        dispatch(setEthereum(null));
      }
    } else dispatch(setConnectModal(true));
  };
  const [profiles, setProfiles] = useState({});
  // window.addEventListener("leap_keystorechange", () => {
  //   alert("d");
  // });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const initiateCopy = async () => {
    await delay(2000);
    setCopied(false);
  };

  const handleDisconnect = async () => {
    dispatch(setDisconnect());
    const r = await window.leap.disconnect(mainnet.chainId);
    console.log(r);
  };

  useEffect(() => {
    if (isConnected) setShowConnect(false);
  }, [isConnected]);

  useEffect(() => {
    if (copied) initiateCopy();
  }, [copied]);

  useEffect(() => {
    setMaskString("shadow-md rounded-[10px]");
    switch (location.pathname.split("/")[1]) {
      case "rent":
        setCurrent(0);
        break;
      case "perps":
        setCurrent(2);
        break;
      case "yieldestate":
        setCurrent(3);
        break;
      case "earn":
        setCurrent(4);
        break;
      case "dashboard":
        setCurrent(5);
        break;

      default:
        setCurrent(-1);
        setMaskString("");
        break;
    }
  }, [location]);

  const getProfile = async (address, profiles) => {
    if (profiles[address] || profiles[address] === false) return;
    const profile = await getProfileFromWallet(address);
    profiles[address] = profile;
  };

  const getProfiles = async () => {
    let tempProfiles = {};
    for (let i = 0; i < notificationContent.length; i++) {
      if (notificationContent[i].type === "message") {
        getProfile(notificationContent[i].data.message.sender, tempProfiles);
      } else {
        getProfile(notificationContent[i].data.sender, tempProfiles);
      }
    }
    setProfiles(tempProfiles);
  };

  useEffect(() => {
    getProfiles();
  }, [notificationContent]);
  const activeAccount = useActiveAccount();

  useEffect(() => {
    if (activeAccount?.address) {
      dispatch(setEthereum(activeAccount.address));
    } else {
      dispatch(setEthereum(null));
    }
  }, [activeAccount]);

  const parseAction = (action) => {
    switch (action) {
      case "finalize_short_term_rental":
        return (
          <div className="flex items-center">
            <div className="text-[#38A569]">Completed</div>
          </div>
        );
        break;
      case "set_reservation_for_short_term":
        return (
          <div className="flex items-center">
            <div className="text-[#38A569]">Reserved</div>
          </div>
        );
        break;
      case "cancel_reservation_for_shortterm":
        return (
          <div className="flex items-center">
            <div className="text-[#DB1F22]">Canceled</div>
          </div>
        );
        break;

      case "cancel_rental_for_shortterm":
        return (
          <div className="flex items-center">
            <div className="text-[#DB1F22]">Canceled</div>
          </div>
        );
        break;

      case "reject_reservation_for_shortterm":
        return (
          <div className="flex items-center">
            <div className="text-[#DB1F22]">Rejected</div>
          </div>
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      {current !== 4 ? (
        <div className="bg-white flex w-full items-center  grid-cols-3 justify-items-center py-[14px] px-[16px]">
          <Logo className="justify-self-start" />

          <div>
            <SelectionGroup
              className="px-[6px] py-[4px] gap-[8px] flex items-center rounded-[14px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              defaultItem={current}
              // SelectedItemMask={maskString}
            >
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div className="text-black font-semibold">Rent</div>
                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => {
                      navigate("/rent/short");
                      setCurrent(0);
                    }}
                    className="cursor-pointer hover:bg-white rounded-[10px] w-[120px] flex justify-center"
                  >
                    <div className="text-[#959595]">Rent</div>
                  </div>
                }
              />
              <SelectionItem
                disabled
                UnselectedItem={
                  <div
                    className="cursor-pointer hover:bg-[#ffffff] rounded-[10px] w-[120px] flex justify-center"
                    data-tooltip-id="my-tooltip"
                  >
                    <div className="text-[#959595]">Buy</div>
                  </div>
                }
              />

              <SelectionItem
                disabled
                UnselectedItem={
                  <Popover
                    isOpen={showTradeMenu}
                    positions={"bottom"}
                    onClickOutside={() => setShowTradeMenu(false)}
                    content={
                      <div
                        onClick={() => {
                          setShowTradeMenu(false);
                          setCurrent(2);
                        }}
                        className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                      >
                        <div
                          onClick={() => navigate("/perps/markets/realestate")}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <HandKey />
                          <div className="text-[#666666]">Markets</div>
                        </div>
                        <div
                          onClick={() => navigate("/perps/vaults")}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <Airplane />
                          <div className="text-[#666666]">Vaults</div>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[120px] flex justify-center gap-[4px]"
                      onClick={() => setShowTradeMenu(true)}
                    >
                      <div className="text-[#959595]">Trade</div>
                      <ArrowToDownHeader />
                    </div>
                  </Popover>
                }
                SelectedItem={
                  <Popover
                    isOpen={showTradeMenu}
                    positions={"bottom"}
                    onClickOutside={() => setShowTradeMenu(false)}
                    content={
                      <div
                        onClick={() => {
                          setShowTradeMenu(false);
                          setCurrent(2);
                        }}
                        className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                      >
                        <div
                          onClick={() => navigate("/perps/markets/realestate")}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <HandKey />
                          <div className="text-[#666666]">Markets</div>
                        </div>
                        <div
                          onClick={() => navigate("/perps/vaults")}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <Airplane />
                          <div className="text-[#666666]">Vaults</div>
                        </div>
                      </div>
                    }
                  >
                    <div
                      onClick={() => setShowTradeMenu(true)}
                      className="cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                    >
                      <div className="text-black font-semibold">Trade</div>
                      <LightIcon />
                    </div>
                  </Popover>
                }
              />

              <SelectionItem
                // disabled
                SelectedItem={
                  <div
                    // data-tooltip-id="my-tooltip"
                    className="cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                  >
                    <div className="text-black font-semibold">YieldEstate</div>
                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => {
                      navigate("/yieldestate");
                      setCurrent(3);
                    }}
                    // data-tooltip-id="my-tooltip"
                    className="cursor-pointer hover:bg-white rounded-[10px] w-[120px] flex justify-center"
                  >
                    <div className="text-[#959595]">YieldEstate</div>
                  </div>
                }
              />
              {/* <SelectionItem
                // disabled
                SelectedItem={
                  <div
                    // data-tooltip-id="my-tooltip"
                    className="cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                  >
                    <div className="text-black font-semibold">LockDrop</div>
                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => {
                      navigate("/earn");
                      setCurrent(4);
                    }}
                    // data-tooltip-id="my-tooltip"
                    className="cursor-pointer hover:bg-white rounded-[10px] w-[120px] flex justify-center"
                  >
                    <div className="text-[#959595]">LockDrop</div>
                  </div>
                }
              /> */}
              <SelectionItem
                disabled
                UnselectedItem={
                  <Popover
                    isOpen={showDashboardMenu}
                    positions={"bottom"}
                    onClickOutside={() => setShowDashboardMenu(false)}
                    content={
                      <div
                        onClick={() => {
                          setShowDashboardMenu(false);
                          setCurrent(5);
                        }}
                        className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                      >
                        <div
                          onClick={() => navigate("/dashboard/host/dashboard")}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <HandKey />
                          <div className="text-[#666666]">Host mode</div>
                        </div>
                        <div
                          onClick={() =>
                            navigate("/dashboard/traveler/dashboard")
                          }
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-max"
                        >
                          <Airplane />
                          <div className="text-[#666666]">Traveler mode</div>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[120px] flex justify-center gap-[4px]"
                      onClick={() => setShowDashboardMenu(true)}
                    >
                      <div className="text-[#959595]">Dashboard</div>
                      <ArrowToDownHeader />
                    </div>
                  </Popover>
                }
                SelectedItem={
                  <Popover
                    isOpen={showDashboardMenu}
                    positions={"bottom"}
                    onClickOutside={() => setShowDashboardMenu(false)}
                    content={
                      <div
                        onClick={() => {
                          setShowDashboardMenu(false);
                          setCurrent(5);
                        }}
                        className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                      >
                        <div
                          onClick={() => navigate("/dashboard/host/dashboard")}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <HandKey />
                          <div className="text-[#666666]">Host mode</div>
                        </div>
                        <div
                          onClick={() =>
                            navigate("/dashboard/traveler/dashboard")
                          }
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-max"
                        >
                          <Airplane />
                          <div className="text-[#666666]">Traveler mode</div>
                        </div>
                      </div>
                    }
                  >
                    <div
                      onClick={() => setShowDashboardMenu(true)}
                      className="cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                    >
                      <div className="text-black font-semibold">Dashboard</div>
                      <LightIcon />
                    </div>
                  </Popover>
                }
              />
            </SelectionGroup>
          </div>
          <div className="flex items-center justify-self-end">
            <div
              data-tooltip-id="my-tooltip"
              className="mr-[20px] hover:bg-[#f6f6f6] hover:translate-y-[-4px] cursor-pointer bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] p-[10px] rounded-full"
            >
              <SwapIconHeader />
            </div>
            <Popover
              isOpen={showNotification}
              positions={"bottom"}
              onClickOutside={() => setShowNotification(false)}
              content={
                <div className="p-[10px] bg-white mt-[10px] w-[300px] h-[500px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-[20px] h-[20px]"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 14V14C4.686 14 2 11.314 2 8V8C2 4.686 4.686 2 8 2V2C11.314 2 14 4.686 14 8V8C14 11.314 11.314 14 8 14Z"
                        stroke="#505050"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.9987 11.3333V8H7.33203"
                        stroke="#505050"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.83267 5.33333C7.74067 5.33333 7.666 5.408 7.66667 5.5C7.66667 5.592 7.74134 5.66667 7.83334 5.66667C7.92534 5.66667 8 5.592 8 5.5C8 5.408 7.92534 5.33333 7.83267 5.33333"
                        stroke="#505050"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="font-semibold text-[18px]">
                      Notifications
                    </div>
                  </div>

                  {notificationContent.length > 0 ? (
                    <div className="space-y-[4px] h-[90%] w-full overflow-auto scrollbarwidth">
                      {notificationContent
                        .slice()
                        .reverse()
                        .map((item, i) => {
                          if (item.type === "event")
                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  setShowNotification(false);
                                  if (
                                    nfts[item.data.token_id]?.access.owner ===
                                    account
                                  )
                                    navigate(`/dashboard/host/transactions`);
                                  else
                                    navigate(
                                      `/dashboard/traveler/transactions`
                                    );
                                }}
                                className="hover:bg-[#f0f0f0] rounded-[4px] cursor-pointer p-[6px] w-full flex items-center justify-between"
                              >
                                {profiles[item.data.sender]?.Avatar ? (
                                  <img
                                    alt=""
                                    src={profiles[item.data.sender]?.Avatar}
                                    className="w-[44px] h-[44px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                                  />
                                ) : (
                                  <div className="w-[44px] h-[44px] flex bg-[#f0f0f0] rounded-full">
                                    <UserBoxIcon className="m-auto" />
                                  </div>
                                )}

                                <div>
                                  <div>
                                    {profiles[item.data.sender]?.Name
                                      ? profiles[
                                          item.data.sender
                                        ]?.Name?.replace("/", " ")
                                      : truncateWalletAddress(item.data.sender)}
                                  </div>
                                  <div className="flex gap-2 w-[150px] truncate">
                                    <span className="font-semibold">
                                      {parseAction(item.data.action)}
                                    </span>
                                    <span className="truncate">
                                      {
                                        nfts[item.data.token_id]?.metaData
                                          .buildingName
                                      }
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <div className="text-[12px] text-end">
                                    {new Intl.DateTimeFormat("en-US", {
                                      day: "numeric",
                                      month: "short",
                                    }).format(
                                      (Math.round(
                                        new Date(item.data.timeUTC).getTime() /
                                          1000
                                      ) -
                                        diff) *
                                        1000
                                    )}
                                  </div>
                                  <div className="text-[12px] text-end">
                                    {new Intl.DateTimeFormat("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    }).format(
                                      (Math.round(
                                        new Date(item.data.timeUTC).getTime() /
                                          1000
                                      ) -
                                        diff) *
                                        1000
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          else
                            return (
                              <div
                                onClick={() => {
                                  setShowNotification(false);
                                  if (
                                    nfts[item.data.nftId]?.access.owner ===
                                    account
                                  )
                                    navigate(
                                      `/dashboard/host/inbox?chat=${item.data.id}`
                                    );
                                  else
                                    navigate(
                                      `/dashboard/traveler/inbox?chat=${item.data.id}`
                                    );
                                }}
                                className="hover:bg-[#f0f0f0] rounded-[4px] cursor-pointer p-[6px] w-full flex items-center justify-between"
                              >
                                {profiles[item.data.message.sender]?.Avatar ? (
                                  <img
                                    alt=""
                                    src={
                                      profiles[item.data.message.sender]?.Avatar
                                    }
                                    className="w-[44px] h-[44px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                                  />
                                ) : (
                                  <div className="w-[44px] h-[44px] flex bg-[#f0f0f0] rounded-full">
                                    <UserBoxIcon className="m-auto" />
                                  </div>
                                )}

                                <div>
                                  <div>
                                    {profiles[item.data.message.sender]?.Name
                                      ? profiles[
                                          item.data.message.sender
                                        ]?.Name?.replace("/", " ")
                                      : truncateWalletAddress(
                                          item.data.message.sender
                                        )}
                                  </div>

                                  <div className="flex gap-2 w-[150px] truncate">
                                    <span className="truncate">
                                      Sent new message
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <div className="text-[12px] text-end">
                                    {new Intl.DateTimeFormat("en-US", {
                                      day: "numeric",
                                      month: "short",
                                    }).format(
                                      (Math.round(
                                        new Date(
                                          item.data.message.generatedTime
                                        ).getTime() / 1000
                                      ) -
                                        diff) *
                                        1000
                                    )}
                                  </div>
                                  <div className="text-[12px] text-end">
                                    {new Intl.DateTimeFormat("en-US", {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    }).format(
                                      (Math.round(
                                        new Date(
                                          item.data.message.generatedTime
                                        ).getTime() / 1000
                                      ) -
                                        diff) *
                                        1000
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                        })}
                    </div>
                  ) : (
                    <div className="w-full h-[80%] flex">
                      <div className="m-auto">No contents</div>
                    </div>
                  )}
                </div>
              }
            >
              <div
                onClick={() => setShowNotification(true)}
                className="mr-[40px] hover:bg-[#f6f6f6] hover:translate-y-[-4px] relative cursor-pointer bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] p-[10px] rounded-full"
              >
                {notificationContent.length ? (
                  <div className="absolute top-0 right-[6px] bg-red-500 rounded-full w-[10px] h-[10px]"></div>
                ) : (
                  <></>
                )}
                <NotificationBingIconHeader />
              </div>
            </Popover>

            <Popover
              isOpen={showConnect && isConnected}
              onClickOutside={() => setShowConnect(false)}
              positions={"bottom"}
              content={
                <div className="mr-[16px] flex flex-col items-center p-[20px] mt-[10px] bg-white rounded-[10px] w-[300px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="flex items-center">
                    {profile?.Avatar ? (
                      <img
                        alt=""
                        src={profile?.Avatar}
                        className="w-[100px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                      />
                    ) : (
                      <VerifyUserIcon className="w-[120px]" />
                    )}

                    <svg
                      className="w-[60px] h-[40px]"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5 16L17.5 12L13.5 8"
                        stroke="#38A569"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.5 17L11.5 12L6.5 7"
                        stroke="#38A569"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <img
                      alt=""
                      src={
                        "https://assets.leapwallet.io/logos/leap-cosmos-logo.svg"
                      }
                      className="w-[80px] h-[80px]"
                    />
                  </div>
                  <CopyToClipboard
                    text={account}
                    onCopy={() => setCopied(true)}
                  >
                    <div className="w-full mt-3">
                      <PurpleButton
                        text={
                          <div className="flex items-center gap-3 justify-center">
                            <span>
                              {truncateWalletAddress(account)?.toUpperCase()}
                            </span>
                            {copied && <CheckMarkIcon />}
                          </div>
                        }
                      />
                    </div>
                  </CopyToClipboard>
                  <div className="w-full mt-3">
                    <BlackButton text="Disconnect" onClick={handleDisconnect} />
                  </div>
                </div>
              }
            >
              <div
                className="w-max h-max"
                onClick={() => {
                  if (isConnected) setShowConnect(!showConnect);
                  else tryConnect();
                }}
              >
                <PurpleButton
                  text={
                    isConnected
                      ? truncateWalletAddress(account)
                      : "Connect Wallet"
                  }
                />
              </div>
            </Popover>
          </div>
        </div>
      ) : (
        <div className="fixed w-full bg-white">
          <div className="flex items-center justify-between py-[14px] px-[16px]">
            <Logo className="justify-self-start" />
            <ConnectButton
              theme="light"
              connectButton={{
                label: "Connect wallet",
                className:
                  "thirdwebbutton hover:shadow-[-1px_6px_10px_0_rgba(93,0,207,0.5)] hover:translate-y-[-3px]",
              }}
              detailsButton={{
                render() {
                  return (
                    <PurpleButton text={truncateWalletAddress(ethereum)} />
                  );
                },
              }}
              client={thiredWebClient}
              // chain={ethereum}
              wallets={[createWallet("com.bybit"), createWallet("io.metamask")]}
            />
          </div>
        </div>
      )}
    </>
  );
};

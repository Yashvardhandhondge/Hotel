import { useEffect, useState } from "react";
import {
  ArrowToLeft,
  ArrowToRightIcon,
  DashboardActive,
  DashboardInActive,
  HostActiveIcon,
  HostInActiveIcon,
  InboxActive,
  InboxInActive,
  LightIcon,
  NftsActive,
  NftsInActive,
  ReservationActive,
  ReservationInactive,
  TransactionsActive,
  TransactionsInActive,
  TravlerActive,
  TravlerInActive,
  TripsActive,
  TripsInActive,
} from "../AssetComponents/Images";
import { SelectionGroup, SelectionItem } from "./Selection/Selection";
import { useLocation, useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

export const SideBar = () => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const [mode, setMode] = useState();
  const [submode, setSubMode] = useState();
  useEffect(() => {
    setMode(location.pathname.split("/")[2]);
    setSubMode(location.pathname.split("/")[3]);
  }, [location]);

  return (
    <div
      className={
        mode === "profile"
          ? "hidden"
          : expanded
          ? "min-w-[300px] bg-white h-full p-[10px] flex flex-col"
          : "w-max bg-white h-full p-[10px] flex flex-col"
      }
    >
      <>
        {mode === "host" && (
          <div
            className={
              expanded
                ? "flex items-center w-full justify-between"
                : "flex items-center w-full justify-center"
            }
          >
            {expanded && (
              <div className="flex items-center gap-[10px]">
                <HostActiveIcon />
                <div>Host's Dashboard</div>
              </div>
            )}

            <div
              onClick={() => setExpanded(!expanded)}
              className={
                expanded
                  ? "cursor-pointer hover:translate-x-[-4px] p-[4px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]"
                  : "cursor-pointer hover:translate-x-[4px] p-[4px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]"
              }
            >
              {expanded ? <ArrowToLeft /> : <ArrowToRightIcon />}
            </div>
          </div>
        )}

        {mode === "traveler" && (
          <div
            className={
              expanded
                ? "flex items-center w-full justify-between"
                : "flex items-center w-full justify-center"
            }
          >
            {expanded && (
              <div className="flex items-center gap-[10px]">
                <TravlerActive />
                <div>Traveler's Dashboard</div>
              </div>
            )}

            <div
              onClick={() => setExpanded(!expanded)}
              className={
                expanded
                  ? "cursor-pointer hover:translate-x-[-4px] p-[4px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]"
                  : "cursor-pointer hover:translate-x-[4px] p-[4px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]"
              }
            >
              {expanded ? <ArrowToLeft /> : <ArrowToRightIcon />}
            </div>
          </div>
        )}

        <div className="h-full justify-between flex flex-col">
          {mode === "host" && (
            <SelectionGroup
              defaultItem={
                submode === "dashboard"
                  ? 0
                  : submode === "reservations"
                  ? 1
                  : submode === "nfts"
                  ? 2
                  : submode === "transactions"
                  ? 3
                  : submode === "inbox"
                  ? 4
                  : 0
              }
              className="space-y-[4px] mt-[20px]"
            >
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <DashboardActive />
                      {expanded && <div>Dashboard</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/host/dashboard")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <DashboardInActive />
                      {expanded && (
                        <div className="text-[#959595]">Dashboard</div>
                      )}
                    </div>
                  </div>
                }
              />

              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <ReservationActive />
                      {expanded && <div>Reservations</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/host/reservations")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <ReservationInactive />
                      {expanded && (
                        <div className="text-[#959595]">Reservations</div>
                      )}
                    </div>
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <NftsActive />
                      {expanded && <div>My Real Estate NFTs</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/host/nfts")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <NftsInActive />
                      {expanded && (
                        <div className="text-[#959595]">
                          My Real Estate NFTs
                        </div>
                      )}
                    </div>
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <TransactionsActive />
                      {expanded && <div>Transactions</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/host/transactions")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <TransactionsInActive />
                      {expanded && (
                        <div className="text-[#959595]">Transactions</div>
                      )}
                    </div>
                  </div>
                }
              />

              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <InboxActive />
                      {expanded && <div>Inbox</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/host/inbox")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <InboxInActive />
                      {expanded && <div className="text-[#959595]">Inbox</div>}
                    </div>
                  </div>
                }
              />
            </SelectionGroup>
          )}
          {mode === "traveler" && (
            <SelectionGroup
              defaultItem={
                submode === "dashboard"
                  ? 0
                  : submode === "trips"
                  ? 1
                  : submode === "transactions"
                  ? 2
                  : submode === "inbox"
                  ? 3
                  : 0
              }
              className="space-y-[4px] mt-[20px]"
            >
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <DashboardActive />
                      {expanded && <div>Dashboard</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/traveler/dashboard")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <DashboardInActive />
                      {expanded && (
                        <div className="text-[#959595]">Dashboard</div>
                      )}
                    </div>
                  </div>
                }
              />

              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <TripsActive />
                      {expanded && <div>Trips</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/traveler/trips")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <TripsInActive />
                      {expanded && <div className="text-[#959595]">Trips</div>}
                    </div>
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <TransactionsActive />
                      {expanded && <div>Transactions</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/traveler/transactions")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <TransactionsInActive />
                      {expanded && (
                        <div className="text-[#959595]">Transactions</div>
                      )}
                    </div>
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer rounded-[16px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.80),0px_1px_2px_0px_rgba(0,0,0,0.11)] flex items-center justify-between  p-[6px] py-[8px] bg-[#F6F6F6]">
                    <div className="flex items-center">
                      <InboxActive />
                      {expanded && <div>Inbox</div>}
                    </div>
                    {expanded && <LightIcon className="mr-[6px]" />}
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/traveler/inbox")}
                    className="hover:bg-[#F6F6F6] cursor-pointer rounded-[16px] flex items-center justify-between  p-[6px] py-[8px] bg-white"
                  >
                    <div className="flex items-center">
                      <InboxInActive />
                      {expanded && <div className="text-[#959595]">Inbox</div>}
                    </div>
                  </div>
                }
              />
            </SelectionGroup>
          )}
          {(mode === "host" || mode === "traveler") && (
            <SelectionGroup
              defaultItem={mode === "host" ? 0 : 1}
              className={
                expanded
                  ? "w-full px-[6px] py-[4px] gap-[8px] flex items-center rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                  : "w-full px-[6px] py-[4px] space-y-[8px] items-center rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              }
            >
              <SelectionItem
                SelectedItem={
                  <div
                    className={
                      expanded
                        ? "py-[4px] cursor-pointer bg-[#f6f6f6] rounded-[10px] w-[130px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                        : "py-[4px] cursor-pointer bg-[#f6f6f6] rounded-[10px] w-max flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                    }
                  >
                    <HostActiveIcon />
                    {expanded && (
                      <div className="text-black font-semibold">Host</div>
                    )}

                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/host/dashboard")}
                    className={
                      expanded
                        ? "py-[4px] gap-[10px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[130px] flex justify-center"
                        : "py-[4px] gap-[10px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-max flex justify-center"
                    }
                  >
                    <HostInActiveIcon />
                    {expanded && <div className="text-[#959595]">Host</div>}
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div
                    className={
                      expanded
                        ? "py-[4px] cursor-pointer bg-[#f6f6f6] rounded-[10px] w-[130px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                        : "py-[4px] cursor-pointer bg-[#f6f6f6] rounded-[10px] w-max flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                    }
                  >
                    <TravlerActive />
                    {expanded && (
                      <div className="text-black font-semibold">Traveler</div>
                    )}

                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => navigate("/dashboard/traveler/dashboard")}
                    className={
                      expanded
                        ? "py-[4px] gap-[10px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[130px] flex justify-center"
                        : "py-[4px] gap-[10px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-max flex justify-center"
                    }
                  >
                    <TravlerInActive />
                    {expanded && <div className="text-[#959595]">Traveler</div>}
                  </div>
                }
              />
            </SelectionGroup>
          )}
        </div>
      </>
    </div>
  );
};

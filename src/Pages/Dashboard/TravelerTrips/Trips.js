import {
  SelectionGroup,
  SelectionItem,
} from "../../../Components/Selection/Selection";
import { LightIcon } from "../../../AssetComponents/Images";
import { RentalItem } from "../../../Components/RealEstateProperty/RentalItem";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

export const Trips = () => {
  const account = useSelector((state) => state.auth.account);
  const nfts = useSelector((state) => state.nft.nfts);
  const diffToUTC = useSelector((state) => state.time.diffToUTC);
  const location = useLocation();
  const navigate = useNavigate();
  let flags = [false, false, false, false];
  const [flag, setFlag] = useState(0);
  const setPeriodParams = (token_id, from, to) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("from", from);
    searchParams.set("to", to);
    navigate(location.pathname + `/${token_id}?${searchParams.toString()}`);
  };
  const [trips, setTrips] = useState(false);

  useEffect(() => {
    // Object.values(nfts).map((nft) => {
    //   return nft.rentals?.rentals?.map((reservation)
    for (let i = 0; i < Object.values(nfts).length; i++) {
      for (
        let j = 0;
        j < Object.values(nfts)[i].rentals?.rentals?.length;
        j++
      ) {
        if (Object.values(nfts)[i].rentals?.rentals[j].address === account) {
          setTrips(true);
          return;
        }
      }
    }
  }, [nfts]);

  return (
    <div className="w-full overflow-auto max-h-[calc(100vh-80px)] h-full p-[10px]">
      <div className="w-full h-full space-y-[20px] rounded-[10px] p-[8px] flex flex-col">
        <div className="h-max p-[24px] rounded-[10px]">
          <div className="flex items-center gap-[10px]">
            <div className="p-[8px] w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#5b1dee]">
              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_672_35088)">
                  <path
                    d="M13.2492 11.8125C13.2492 11.9285 13.2031 12.0398 13.1211 12.1219C13.039 12.2039 12.9277 12.25 12.8117 12.25H4.93671C4.82068 12.25 4.7094 12.2039 4.62735 12.1219C4.5453 12.0398 4.49921 11.9285 4.49921 11.8125C4.49921 11.6965 4.5453 11.5852 4.62735 11.5031C4.7094 11.4211 4.82068 11.375 4.93671 11.375H12.8117C12.9277 11.375 13.039 11.4211 13.1211 11.5031C13.2031 11.5852 13.2492 11.6965 13.2492 11.8125ZM12.3742 5.25H9.05577L6.55874 2.75297C6.51808 2.71235 6.46981 2.68015 6.4167 2.65819C6.36359 2.63623 6.30668 2.62495 6.24921 2.625H5.81171C5.6731 2.62508 5.5365 2.65808 5.41314 2.72129C5.28979 2.7845 5.18322 2.87612 5.10221 2.98858C5.02119 3.10105 4.96806 3.23115 4.94718 3.36818C4.92629 3.5052 4.93826 3.64523 4.9821 3.77672L5.47429 5.25H4.24327L3.05874 4.06547C3.01808 4.02485 2.96981 3.99265 2.9167 3.97069C2.86359 3.94873 2.80668 3.93745 2.74921 3.9375H2.31171C2.17536 3.93762 2.04092 3.96961 1.91913 4.03091C1.79733 4.09221 1.69155 4.18112 1.61022 4.29056C1.52888 4.4 1.47425 4.52693 1.45068 4.66122C1.4271 4.79552 1.43524 4.93347 1.47444 5.06406L2.2439 7.62836C2.37707 8.08013 2.65337 8.47642 3.03121 8.75761C3.40905 9.03879 3.86799 9.18966 4.33897 9.1875H14.1242C14.2402 9.1875 14.3515 9.14141 14.4336 9.05936C14.5156 8.97731 14.5617 8.86603 14.5617 8.75V7.4375C14.5617 6.85734 14.3312 6.30094 13.921 5.8907C13.5108 5.48047 12.9544 5.25 12.3742 5.25Z"
                    fill="white"
                  />
                  <path
                    d="M4.9821 3.77672C4.93826 3.64523 4.92629 3.5052 4.94718 3.36818C4.96806 3.23115 5.02119 3.10105 5.10221 2.98858M4.9821 3.77672L5.81171 2.625C5.6731 2.62508 5.5365 2.65808 5.41314 2.72129C5.28979 2.7845 5.18322 2.87612 5.10221 2.98858M4.9821 3.77672L5.39077 5L4.9821 3.77672ZM5.10221 2.98858L4.89935 2.84246C4.79519 2.98706 4.72688 3.15434 4.70003 3.33051C4.67318 3.50669 4.68857 3.68672 4.74493 3.85578L4.74498 3.85593L5.12719 5M5.10221 2.98858L4.89935 2.84246C5.00351 2.69786 5.14053 2.58008 5.29913 2.4988C5.45773 2.41753 5.63336 2.3751 5.81157 2.375L5.81171 2.375L6.24901 2.375L5.12719 5M5.12719 5H4.34682L3.23552 3.88869L3.23542 3.88859C3.17152 3.82477 3.09568 3.77416 3.01222 3.73966C2.92882 3.70518 2.83945 3.68745 2.74921 3.6875C2.7492 3.6875 2.7492 3.6875 2.74919 3.6875C2.74913 3.6875 2.74907 3.6875 2.74901 3.6875L2.31171 3.6875L2.31148 3.6875C2.13617 3.68766 1.96333 3.72879 1.80674 3.8076C1.65014 3.88641 1.51413 4.00073 1.40956 4.14143C1.30499 4.28214 1.23475 4.44533 1.20444 4.618C1.17413 4.79066 1.18459 4.96801 1.23499 5.13591C1.23499 5.13592 1.23499 5.13593 1.235 5.13594L2.0041 7.69905C2.00416 7.69925 2.00422 7.69946 2.00428 7.69967C2.15284 8.20313 2.46083 8.64477 2.88195 8.95816C3.30308 9.27156 3.81455 9.43977 4.33948 9.4375M5.12719 5L6.24921 2.375C6.33945 2.37495 6.42882 2.39268 6.51222 2.42716C6.59568 2.46166 6.67152 2.51227 6.73542 2.57609L6.73552 2.57619L9.15932 5H12.3742C13.0207 5 13.6407 5.25681 14.0978 5.71393C14.5549 6.17105 14.8117 6.79103 14.8117 7.4375V8.75C14.8117 8.93234 14.7393 9.1072 14.6103 9.23614C14.4814 9.36507 14.3065 9.4375 14.1242 9.4375H4.33948M4.33948 9.4375H4.33897V9.1875L4.34012 9.4375C4.3399 9.4375 4.33969 9.4375 4.33948 9.4375ZM13.2978 12.2986C13.4268 12.1697 13.4992 11.9948 13.4992 11.8125C13.4992 11.6302 13.4268 11.4553 13.2978 11.3264C13.1689 11.1974 12.994 11.125 12.8117 11.125H4.93671C4.75437 11.125 4.5795 11.1974 4.45057 11.3264C4.32164 11.4553 4.24921 11.6302 4.24921 11.8125C4.24921 11.9948 4.32164 12.1697 4.45057 12.2986C4.5795 12.4276 4.75437 12.5 4.93671 12.5H12.8117C12.994 12.5 13.1689 12.4276 13.2978 12.2986Z"
                    stroke="#202020"
                    stroke-width="0.5"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_672_35088"
                    x="0.9375"
                    y="2.125"
                    width="15.125"
                    height="11.625"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                      result="effect1_dropShadow_672_35088"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_672_35088"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="font-semibold text-[24px]">My Trips</div>
          </div>
        </div>

        <div className="w-full px-[20px] justify-between flex items-center">
          <SelectionGroup
            defaultItem={flag}
            className="border-[2px] border-[#e3e3e3] w-max px-[6px] py-[4px] gap-[8px] flex items-center rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Upcoming</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setFlag(0)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Upcoming</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Current</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setFlag(1)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Current</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Completed</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setFlag(2)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Completed</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Cancelled</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setFlag(3)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Cancelled</div>
                </div>
              }
            />
          </SelectionGroup>

          <div className="flex gap-[10px] items-center border-[#E3E3E3] border-[1px] rounded-[12px] pl-[16px] pr-[8px] py-[9px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
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
        </div>

        <div className="flex px-[40px] gap-3 flex-wrap max-h-[calc(100vh-200px)] overflow-auto">
          {Object.values(nfts).map((nft, i) => {
            return nft.rentals?.rentals?.map((reservation, j) => {
              if (reservation.address === account)
                if (
                  (reservation.cancelled && flag === 3) ||
                  (!reservation.cancelled &&
                    new Date().getTime() / 1000 <
                      reservation.renting_period[0] - diffToUTC &&
                    flag === 0) ||
                  (!reservation.cancelled &&
                    new Date().getTime() / 1000 >
                      reservation.renting_period[0] - diffToUTC &&
                    flag === 1 &&
                    new Date().getTime() / 1000 <
                      reservation.renting_period[1] - diffToUTC &&
                    flag === 1) ||
                  (!reservation.cancelled &&
                    new Date().getTime() / 1000 >
                      reservation.renting_period[1] - diffToUTC &&
                    flag === 2)
                ) {
                  flags[flag] = true;
                  return (
                    <Fade>
                      <RentalItem
                        traveler={reservation.address}
                        rentingPeriod={reservation.renting_period}
                        token_id={nft.token_id}
                        onClick={() =>
                          setPeriodParams(
                            nft.token_id,
                            reservation.renting_period[0],
                            reservation.renting_period[1]
                          )
                        }
                      />
                    </Fade>
                  );
                } else
                  return (
                    <>
                      {!flags[flag] &&
                        j === nft.rentals?.rentals?.length - 1 &&
                        i === Object.values(nfts).length - 1 && (
                          <div className="flex flex-col items-center w-full justify-center h-[calc(100vh-400px)]">
                            <svg
                              width="73"
                              height="72"
                              viewBox="0 0 73 72"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g filter="url(#filter0_dd_429_37278)">
                                <rect
                                  x="8.5"
                                  y="8"
                                  width="56"
                                  height="56"
                                  rx="28"
                                  fill="white"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M31.6119 38.6166L28.5469 34.5416L30.7969 33.7866C31.2052 33.65 31.6535 33.7133 32.0069 33.9583L33.9602 35.3066L38.6585 33.2383L33.7502 27.02L37.7469 26.17L44.2019 31.225L51.0852 28.4816C52.7702 27.81 54.6302 28.9333 54.8185 30.7366V30.7366C54.9452 31.9333 54.2735 33.0733 53.1635 33.5433L40.8252 38.7666C40.5085 38.9 40.1719 38.9733 39.8285 38.9816L32.7385 39.1583C32.2969 39.1733 31.8769 38.97 31.6119 38.6166Z"
                                  stroke="url(#paint0_linear_429_37278)"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M49.8943 29C47.4859 24.2683 42.5826 21.02 36.9109 21.02C28.8609 21.02 22.3359 27.5483 22.3359 35.6033C22.3359 43.6567 28.8609 50.1867 36.9109 50.1867C44.9609 50.1867 51.4859 43.6583 51.4859 35.6033C51.4859 35.1683 51.4576 34.7417 51.4209 34.3167"
                                  stroke="url(#paint1_linear_429_37278)"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M22.3681 36.5817C19.2614 38.86 17.5797 41.3883 18.3297 43.155C19.3931 45.7883 25.393 45.8467 31.7314 43.285"
                                  stroke="url(#paint2_linear_429_37278)"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                              <defs>
                                <filter
                                  id="filter0_dd_429_37278"
                                  x="0.499999"
                                  y="-9.53674e-07"
                                  width="72"
                                  height="72"
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
                                  <feOffset dx="-2" dy="-2" />
                                  <feGaussianBlur stdDeviation="3" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_429_37278"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dx="2" dy="2" />
                                  <feGaussianBlur stdDeviation="3" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="effect1_dropShadow_429_37278"
                                    result="effect2_dropShadow_429_37278"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect2_dropShadow_429_37278"
                                    result="shape"
                                  />
                                </filter>
                                <linearGradient
                                  id="paint0_linear_429_37278"
                                  x1="41.6903"
                                  y1="26.17"
                                  x2="41.6903"
                                  y2="39.1591"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#6B349A" />
                                  <stop offset="1" stop-color="#4C37C3" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_429_37278"
                                  x1="36.9109"
                                  y1="21.02"
                                  x2="36.9109"
                                  y2="50.1867"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#6B349A" />
                                  <stop offset="1" stop-color="#4C37C3" />
                                </linearGradient>
                                <linearGradient
                                  id="paint2_linear_429_37278"
                                  x1="24.9419"
                                  y1="36.5817"
                                  x2="24.9419"
                                  y2="45.1688"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stop-color="#6B349A" />
                                  <stop offset="1" stop-color="#4C37C3" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div>No Trips yet</div>
                            <div className="text-[#737373]">
                              No upcoming trips yet, explore your trips
                            </div>
                          </div>
                        )}
                    </>
                  );
              else
                return (
                  <>
                    {!flags[flag] &&
                      i === Object.values(nfts).length - 1 &&
                      j === nft.rentals?.rentals?.length - 1 && (
                        <div className="flex flex-col items-center w-full justify-center h-[calc(100vh-400px)]">
                          <svg
                            width="73"
                            height="72"
                            viewBox="0 0 73 72"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g filter="url(#filter0_dd_429_37278)">
                              <rect
                                x="8.5"
                                y="8"
                                width="56"
                                height="56"
                                rx="28"
                                fill="white"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M31.6119 38.6166L28.5469 34.5416L30.7969 33.7866C31.2052 33.65 31.6535 33.7133 32.0069 33.9583L33.9602 35.3066L38.6585 33.2383L33.7502 27.02L37.7469 26.17L44.2019 31.225L51.0852 28.4816C52.7702 27.81 54.6302 28.9333 54.8185 30.7366V30.7366C54.9452 31.9333 54.2735 33.0733 53.1635 33.5433L40.8252 38.7666C40.5085 38.9 40.1719 38.9733 39.8285 38.9816L32.7385 39.1583C32.2969 39.1733 31.8769 38.97 31.6119 38.6166Z"
                                stroke="url(#paint0_linear_429_37278)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M49.8943 29C47.4859 24.2683 42.5826 21.02 36.9109 21.02C28.8609 21.02 22.3359 27.5483 22.3359 35.6033C22.3359 43.6567 28.8609 50.1867 36.9109 50.1867C44.9609 50.1867 51.4859 43.6583 51.4859 35.6033C51.4859 35.1683 51.4576 34.7417 51.4209 34.3167"
                                stroke="url(#paint1_linear_429_37278)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M22.3681 36.5817C19.2614 38.86 17.5797 41.3883 18.3297 43.155C19.3931 45.7883 25.393 45.8467 31.7314 43.285"
                                stroke="url(#paint2_linear_429_37278)"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_dd_429_37278"
                                x="0.499999"
                                y="-9.53674e-07"
                                width="72"
                                height="72"
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
                                <feOffset dx="-2" dy="-2" />
                                <feGaussianBlur stdDeviation="3" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_429_37278"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dx="2" dy="2" />
                                <feGaussianBlur stdDeviation="3" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="effect1_dropShadow_429_37278"
                                  result="effect2_dropShadow_429_37278"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect2_dropShadow_429_37278"
                                  result="shape"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_429_37278"
                                x1="41.6903"
                                y1="26.17"
                                x2="41.6903"
                                y2="39.1591"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#6B349A" />
                                <stop offset="1" stop-color="#4C37C3" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_429_37278"
                                x1="36.9109"
                                y1="21.02"
                                x2="36.9109"
                                y2="50.1867"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#6B349A" />
                                <stop offset="1" stop-color="#4C37C3" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_429_37278"
                                x1="24.9419"
                                y1="36.5817"
                                x2="24.9419"
                                y2="45.1688"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#6B349A" />
                                <stop offset="1" stop-color="#4C37C3" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div>No Trips yet</div>
                          <div className="text-[#737373]">
                            No upcoming trips yet, explore your trips
                          </div>
                        </div>
                      )}
                  </>
                );
            });
          })}
        </div>
      </div>
    </div>
  );
};

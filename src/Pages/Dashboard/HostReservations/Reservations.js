import {
  SelectionGroup,
  SelectionItem,
} from "../../../Components/Selection/Selection";
import { LightIcon } from "../../../AssetComponents/Images";
import { RentalItem } from "../../../Components/RealEstateProperty/RentalItem";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

export const Reservations = () => {
  const account = useSelector((state) => state.auth.account);
  const nfts = useSelector((state) => state.nft.nfts);
  const diffToUTC = useSelector((state) => state.time.diffToUTC);
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(0);
  let flags = [false, false, false, false];
  const setPeriodParams = (token_id, from, to) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("from", from);
    searchParams.set("to", to);
    navigate(location.pathname + `/${token_id}?${searchParams.toString()}`);
  };

  return (
    <div className="w-full overflow-auto max-h-[calc(100vh-80px)] h-full p-[10px]">
      <div className="w-full h-full space-y-[20px] rounded-[10px] p-[8px] flex flex-col">
        <div className="bg-white border-[2px] h-max border-[#E3E3E3] p-[24px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          <div className="flex items-center gap-[10px]">
            <div className="p-[8px] w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#5b1dee]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1108_71791)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.00023 12.2521C6.64237 11.5359 5.91006 11.0839 5.10945 11.0851H2.62306C2.39099 11.0851 2.16843 10.9929 2.00433 10.8288C1.84023 10.6647 1.74805 10.4421 1.74805 10.21V3.20631C1.74805 2.97424 1.84023 2.75168 2.00433 2.58758C2.16843 2.42349 2.39099 2.3313 2.62306 2.3313H4.66616C5.2852 2.3313 5.87888 2.57721 6.3166 3.01493C6.75432 3.45266 7.00023 4.04634 7.00023 4.66537C7.00023 3.3763 8.04523 2.3313 9.33431 2.3313H11.3774C11.6095 2.3313 11.832 2.42349 11.9961 2.58758C12.1602 2.75168 12.2524 2.97424 12.2524 3.20631V10.21C12.2524 10.6925 11.8619 11.0839 11.3795 11.0851H8.89102C8.09041 11.0839 7.3581 11.5359 7.00023 12.2521Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.00023 12.2521C6.64237 11.5359 5.91006 11.0839 5.10945 11.0851H2.62306C2.39099 11.0851 2.16843 10.9929 2.00433 10.8288C1.84023 10.6647 1.74805 10.4421 1.74805 10.21V3.20631C1.74805 2.97424 1.84023 2.75168 2.00433 2.58758C2.16843 2.42349 2.39099 2.3313 2.62306 2.3313H4.66616C5.2852 2.3313 5.87888 2.57721 6.3166 3.01493C6.75432 3.45266 7.00023 4.04634 7.00023 4.66537C7.00023 3.3763 8.04523 2.3313 9.33431 2.3313H11.3774C11.6095 2.3313 11.832 2.42349 11.9961 2.58758C12.1602 2.75168 12.2524 2.97424 12.2524 3.20631V10.21C12.2524 10.6925 11.8619 11.0839 11.3795 11.0851H8.89102C8.09041 11.0839 7.3581 11.5359 7.00023 12.2521Z"
                    stroke="#202020"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <path
                  d="M7.00077 4.66553V12.0234"
                  stroke="#202020"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 4.95756H5.25073"
                  stroke="#202020"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 7.00004H5.25073"
                  stroke="#202020"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 9.04252H5.25073"
                  stroke="#202020"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75195 4.95756H10.5027"
                  stroke="#202020"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75195 7.00004H10.5027"
                  stroke="#202020"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75195 9.04252H10.5027"
                  stroke="#202020"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <defs>
                  <filter
                    id="filter0_d_1108_71791"
                    x="1.24805"
                    y="1.8313"
                    width="12.5039"
                    height="11.9209"
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
                      values="0 0 0 0 0.12549 0 0 0 0 0.12549 0 0 0 0 0.12549 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1108_71791"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1108_71791"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="font-semibold text-[24px]">Reservations</div>
          </div>

          <div className="text-[#666666] font-normal">
            Your Real Estate Status
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

        <div className="flex px-[40px] gap-[10px] w-full flex-wrap max-h-[calc(100vh-200px)] overflow-auto">
          {Object.values(nfts).map((nft, i) => {
            if (nft.access.owner === account && nft.rentals.rentals.length) {
              return nft.rentals.rentals.map((reservation, j) => {
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
                        j === nft.rentals.rentals.length - 1 &&
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
                            <div>No reservations yet</div>
                            <div className="text-[#737373]">
                              No upcoming reservations yet
                            </div>
                          </div>
                        )}
                    </>
                  );
              });
            } else
              return (
                <>
                  {!flags[flag] && i === Object.values(nfts).length - 1 && (
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
                      <div>No reservations yet</div>
                      <div className="text-[#737373]">
                        No upcoming reservations yet
                      </div>
                    </div>
                  )}
                </>
              );
          })}
        </div>
      </div>
    </div>
  );
};

import { Mainnet, Testnet } from "@nibiruchain/nibijs";
import { useDispatch, useSelector } from "react-redux";
import { executeContract } from "../../../Components/functions/Contract";
import { NUSDIcon, WhiteCheckMarkIcon } from "../../../AssetComponents/Images";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import { RedButton } from "../../../Components/Buttons/RedButton";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { updateToken } from "../../../Components/functions/Functions";
import { useEffect } from "react";

export const HostAction = ({
  token_id,
  traveler,
  cancelled,
  fundedAmount,
  rentingPeriod,
  approved,
  setViewDetailFlag = () => {},
}) => {
  const dispatch = useDispatch();
  // const testNet = Testnet(1);
  const mainnet = Mainnet();
  const location = useLocation();
  const account = useSelector((state) => state.auth.account);
  const currentTime = new Date();
  const diff = useSelector((state) => state.time.diffToUTC);
  const token = useSelector((state) => state.nft.nfts[token_id]);

  const getToken = async () => {
    if (!token)
      await updateToken(
        {
          token_id: token_id,
          contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
        },
        mainnet.endptTm,
        dispatch
      );
  };

  useEffect(() => {
    getToken();
  }, []);

  const navigate = useNavigate();
  const approveReservation = async () => {
    const message = {
      set_approve_for_short_term: {
        token_id: token_id,
        traveler: traveler,
        renting_period: [
          rentingPeriod[0].toString(),
          rentingPeriod[1].toString(),
        ],
        // approved_date: "1736639642",
      },
    };
    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );
    const res = await executeContract(
      {
        date:
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(rentingPeriod[0] * 1000)) +
          "~" +
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(rentingPeriod[1] * 1000)),
        checkin: token?.metaData.checkIn,
        checkout: token?.metaData.checkOut,
        image: token?.metaData.images[0],
        buildingName: token?.metaData.buildingName,
        price: Math.round(
          Math.round((rentingPeriod[1] - rentingPeriod[0]) / 86400) *
            token?.short.price_per_day
        ).toString(),
        detail: `https://test.codedestate.com/dashboard/traveler/trips/${token_id}?from=${rentingPeriod[0].toString()}&to=${rentingPeriod[1].toString()}`,
        approved: token?.short.auto_approve,
      },
      null,
      currentTime,
      mainnet.chainId,
      mainnet.endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      token_id,
      traveler,
      message,
      account,
      "leap"
    );
    if (res) navigate(-1);
  };
  const finalizeRental = async () => {
    const message = {
      finalize_short_term_rental: {
        token_id: token_id,
        traveler: traveler,
        renting_period: [
          rentingPeriod[0].toString(),
          rentingPeriod[1].toString(),
        ],
      },
    };
    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );
    const res = await executeContract(
      {},
      {
        type: 0,
        amount:
          new Date((rentingPeriod[1] - diff) * 1000) < new Date() || cancelled
            ? approved
              ? cancelled
                ? fundedAmount
                : Math.floor(fundedAmount * 0.95)
              : 0
            : 0,
      },
      currentTime,
      mainnet.chainId,
      mainnet.endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      token_id,
      traveler,
      message,
      account,
      "leap"
    );
    if (res) navigate(-1);
  };
  const rejectReservation = async () => {
    const message = {
      reject_reservation_for_shortterm: {
        token_id: token_id,
        traveler: traveler,
        renting_period: [
          rentingPeriod[0].toString(),
          rentingPeriod[1].toString(),
        ],
      },
    };
    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );
    const res = await executeContract(
      {
        date:
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(rentingPeriod[0] * 1000)) +
          "~" +
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(rentingPeriod[1] * 1000)),
        checkin: token?.metaData.checkIn,
        checkout: token?.metaData.checkOut,
        image: token?.metaData.images[0],
        buildingName: token?.metaData.buildingName,
        price: Math.round(
          Math.round((rentingPeriod[1] - rentingPeriod[0]) / 86400) *
            token?.short.price_per_day
        ).toString(),
        detail: `https://test.codedestate.com/dashboard/traveler/trips/${token_id}?from=${rentingPeriod[0].toString()}&to=${rentingPeriod[1].toString()}`,
        approved: token?.short.auto_approve,
      },
      null,
      currentTime,
      mainnet.chainId,
      mainnet.endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      token_id,
      traveler,
      message,
      account,
      "leap"
    );
    if (res) navigate(-1);
  };

  // const setReviewMode = () => {
  //   const searchParams = new URLSearchParams(location.search);
  //   searchParams.set("mode", "review");
  //   navigate(location.pathname + `?${searchParams.toString()}`);
  // };

  const setReviewMode = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("mode", "review");
    searchParams.set("from", rentingPeriod[0]);
    searchParams.set("to", rentingPeriod[1]);
    navigate(
      `/dashboard/host/reservations/${token_id}` + `?${searchParams.toString()}`
    );
  };

  return (
    <div className="space-y-2">
      {approved &&
        !cancelled &&
        new Date((rentingPeriod[1] - diff) * 1000) > currentTime && (
          <div className="flex gap-[10px] items-center">
            <div className="p-[2px] bg-[#38A569] rounded-full shadow-md border-[3px] border-[#38A56966]">
              <WhiteCheckMarkIcon className="w-[12px]" />
            </div>
            <div className="text-[18px] font-semibold text-[#38A569]">
              Approved
            </div>
          </div>
        )}
      {approved &&
        !cancelled &&
        new Date((rentingPeriod[1] - diff) * 1000) < currentTime && (
          <div className="flex gap-[10px] items-center">
            <div className="p-[2px] bg-[#38A569] rounded-full shadow-md border-[3px] border-[#38A56966]">
              <WhiteCheckMarkIcon className="w-[12px]" />
            </div>
            <div className="text-[18px] font-semibold text-[#38A569]">
              Completed
            </div>
          </div>
        )}

      {cancelled && (
        <div className="flex items-center">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_dd_959_57956)">
              <rect x="8" y="8" width="18" height="18" rx="9" fill="#DB1F22" />
              <rect
                x="8"
                y="8"
                width="18"
                height="18"
                rx="9"
                fill="url(#paint0_linear_959_57956)"
                fill-opacity="0.18"
              />
              <rect
                x="8.33333"
                y="8.33333"
                width="17.3333"
                height="17.3333"
                rx="8.66667"
                stroke="white"
                stroke-opacity="0.2"
                stroke-width="0.666667"
              />
              <path
                d="M15.125 15.125L18.875 18.875"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.125 18.875L18.875 15.125"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_dd_959_57956"
                x="-9.53674e-07"
                y="-9.53674e-07"
                width="34"
                height="34"
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
                <feOffset dx="2" dy="2" />
                <feGaussianBlur stdDeviation="3" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_959_57956"
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
                  in2="effect1_dropShadow_959_57956"
                  result="effect2_dropShadow_959_57956"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow_959_57956"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_959_57956"
                x1="17"
                y1="8"
                x2="17"
                y2="19.625"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="text-[18px] font-semibold text-[#EB4245]">
            Canceled
          </div>
        </div>
      )}

      {!approved &&
        new Date((rentingPeriod[0] - diff) * 1000) > currentTime && (
          <div className="flex items-center">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_959_57987)">
                <rect
                  x="8"
                  y="8"
                  width="18"
                  height="18"
                  rx="9"
                  fill="#F8BC30"
                />
                <rect
                  x="8"
                  y="8"
                  width="18"
                  height="18"
                  rx="9"
                  fill="url(#paint0_linear_959_57987)"
                  fill-opacity="0.18"
                />
                <rect
                  x="8.33333"
                  y="8.33333"
                  width="17.3333"
                  height="17.3333"
                  rx="8.66667"
                  stroke="white"
                  stroke-opacity="0.2"
                  stroke-width="0.666667"
                />
                <path
                  d="M17.0013 13.25V14.75"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.0013 19.25V20.75"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.3516 14.35L15.4099 15.4083"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.5898 18.5917L19.6482 19.65"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.25 17H14.75"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.25 17H20.75"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.3516 19.65L15.4099 18.5917"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.5898 15.4083L19.6482 14.35"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_959_57987"
                  x="-9.53674e-07"
                  y="-9.53674e-07"
                  width="34"
                  height="34"
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
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="3" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_959_57987"
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
                    in2="effect1_dropShadow_959_57987"
                    result="effect2_dropShadow_959_57987"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_959_57987"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_959_57987"
                  x1="17"
                  y1="8"
                  x2="17"
                  y2="19.625"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[18px] font-semibold text-[#F1B71C]">
              Waiting for approval
            </div>
          </div>
        )}
      {!approved &&
        new Date((rentingPeriod[0] - diff) * 1000) < currentTime && (
          <div className="flex items-center">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_959_57956)">
                <rect
                  x="8"
                  y="8"
                  width="18"
                  height="18"
                  rx="9"
                  fill="#DB1F22"
                />
                <rect
                  x="8"
                  y="8"
                  width="18"
                  height="18"
                  rx="9"
                  fill="url(#paint0_linear_959_57956)"
                  fill-opacity="0.18"
                />
                <rect
                  x="8.33333"
                  y="8.33333"
                  width="17.3333"
                  height="17.3333"
                  rx="8.66667"
                  stroke="white"
                  stroke-opacity="0.2"
                  stroke-width="0.666667"
                />
                <path
                  d="M15.125 15.125L18.875 18.875"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.125 18.875L18.875 15.125"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_959_57956"
                  x="-9.53674e-07"
                  y="-9.53674e-07"
                  width="34"
                  height="34"
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
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="3" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_959_57956"
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
                    in2="effect1_dropShadow_959_57956"
                    result="effect2_dropShadow_959_57956"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_959_57956"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_959_57956"
                  x1="17"
                  y1="8"
                  x2="17"
                  y2="19.625"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[18px] font-semibold text-[#EB4245]">
              Expired
            </div>
          </div>
        )}

      <div className="w-full bg-[#F6F6F6] rounded-[16px] p-[8px] space-y-[8px] mb-2">
        <div className="flex justify-between items-center">
          <div>Period</div>
          <div className="">
            {rentingPeriod?.length &&
              rentingPeriod[0] !== "" &&
              rentingPeriod[1] !== "" &&
              new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
              }).format(new Date((rentingPeriod[0] - diff) * 1000)) +
                "~" +
                new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                }).format(new Date((rentingPeriod[1] - diff) * 1000))}
          </div>
        </div>
        <div className="flex justify-between">
          <div>Funded</div>
          <div className="flex items-center gap-[10px]">
            <NUSDIcon />
            <div className="text-[#5b1dee]">{fundedAmount}</div>
            <div>USDC</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Pending</div>
          <div className="flex items-center gap-[10px]">
            <NUSDIcon />
            <div className="text-[#5b1dee]">
              {new Date((rentingPeriod[1] - diff) * 1000) < currentTime ||
              cancelled
                ? 0
                : approved
                ? cancelled
                  ? fundedAmount
                  : Math.floor(fundedAmount * 0.95)
                : 0}
            </div>
            <div>USDC</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Claimable</div>
          <div className="flex items-center gap-[10px]">
            <NUSDIcon />
            <div className="text-[#5b1dee]">
              {new Date((rentingPeriod[1] - diff) * 1000) < currentTime ||
              cancelled
                ? approved
                  ? cancelled
                    ? fundedAmount
                    : Math.floor(fundedAmount * 0.95)
                  : 0
                : 0}
            </div>
            <div>USDC</div>
          </div>
        </div>
      </div>
      {new Date((rentingPeriod[0] - diff) * 1000) > currentTime &&
        !cancelled && (
          <div className="w-full grid grid-cols-2 gap-[10px]">
            {!approved && (
              <PurpleButton
                onClick={() => {
                  approveReservation();
                }}
                text="Approve"
              />
            )}
            {
              <div className={approved ? "col-span-2" : ""}>
                <RedButton
                  onClick={() => {
                    rejectReservation();
                  }}
                  text="Cancel"
                />
              </div>
            }
          </div>
        )}
      {new Date((rentingPeriod[0] - diff) * 1000) < currentTime &&
        new Date((rentingPeriod[1] - diff) * 1000) > currentTime && (
          <RedButton
            onClick={() => {
              rejectReservation();
            }}
            text="Cancel Approval"
          />
        )}
      {new Date((rentingPeriod[1] - diff) * 1000) < currentTime &&
        approved &&
        !cancelled && (
          <BlackButton
            onClick={() => {
              setReviewMode();
            }}
            text="Write a Review"
          />
        )}

      {(new Date((rentingPeriod[1] - diff) * 1000) < currentTime ||
        cancelled) &&
        approved && (
          <BlackButton
            onClick={() => finalizeRental()}
            text="Finalize Rental"
          />
        )}

      {/* <BlackButton onClick={() => finalizeRental()} text="F" /> */}
    </div>
  );
};

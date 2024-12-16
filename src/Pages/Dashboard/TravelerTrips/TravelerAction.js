import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Mainnet, Testnet } from "@nibiruchain/nibijs";
import { useState, useEffect, useSyncExternalStore } from "react";
import { executeContract } from "../../../Components/functions/Contract";
import { WhiteCheckMarkIcon, NUSDIcon } from "../../../AssetComponents/Images";
import { RedButton } from "../../../Components/Buttons/RedButton";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import { updateToken } from "../../../Components/functions/Functions";

export const TravelerAction = ({
  approved,
  cancelled,
  rentingPeriod,
  fundedAmount,
  token_id,
}) => {
  const location = useLocation();
  const account = useSelector((state) => state.auth.account);
  const dispatch = useDispatch();
  const [refundable, setRefundable] = useState(0);
  // const testNet = Testnet(1);
  const mainnet = Mainnet();
  const nft = useSelector((state) => state.nft.nfts[token_id]);

  const getToken = async () => {
    if (!nft)
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

  const diff = useSelector((state) => state.time.diffToUTC);
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.auth.profile);
  const currentTime = new Date();
  const [modalShow, setModalShow] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [canceled, setCanceled] = useState(false);
  const handleCancelReservation = async () => {
    let message;
    if (!approved)
      message = {
        cancel_reservation_for_shortterm: {
          token_id: token_id,
          renting_period: [
            rentingPeriod[0].toString(),
            rentingPeriod[1].toString(),
          ],
        },
      };
    // message = {
    //   cancel_reservation_for_longterm: {
    //     token_id: token_id,
    //     renting_period: [
    //       rentingPeriod[0].toString(),
    //       rentingPeriod[1].toString(),
    //     ],
    //   },
    // };
    else {
      message = {
        cancel_rental_for_shortterm: {
          token_id: token_id,
          renting_period: [
            rentingPeriod[0].toString(),
            rentingPeriod[1].toString(),
          ],
        },
      };
      // message = {
      //   cancel_rental_for_longterm: {
      //     token_id: token_id,
      //     renting_period: [
      //       rentingPeriod[0].toString(),
      //       rentingPeriod[1].toString(),
      //     ],
      //   },
      // };
    }
    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );
    const res = await executeContract(
      {
        name: myProfile.Name?.replace("/", " "),
        date:
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date((rentingPeriod[0] - diff) * 1000)) +
          "~" +
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date((rentingPeriod[1] - diff) * 1000)),
        checkin: nft?.metaData.checkIn,
        checkout: nft?.metaData.checkOut,
        image: nft?.metaData.images[0],
        buildingName: nft?.metaData.buildingName,
        price: Math.round(
          Math.round((rentingPeriod[1] - rentingPeriod[0]) / 86400) *
            nft?.short.price_per_day
        ).toString(),
        detail: `https://test.codedestate.com/dashboard/traveler/trips/${token_id}?from=${rentingPeriod[0].toString()}&to=${rentingPeriod[1].toString()}`,
      },
      {
        type: 0,
        amount: refundable,
      },

      currentTime,
      mainnet.chainId,
      mainnet.endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      token_id,
      nft?.access?.owner,
      message,
      account,
      "leap"
    );
    if (res) {
      setCanceled(true);
      setModalShow(true);
      navigate(-1);
    }
  };

  const depositForLongterm = async () => {
    let message;

    message = {
      deposit_for_long_term_rental: {
        token_id: token_id,
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
        name: myProfile.Name?.replace("/", " "),
        date:
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date((rentingPeriod[0] - diff) * 1000)) +
          "~" +
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date((rentingPeriod[1] - diff) * 1000)),
        checkin: nft?.metaData.checkIn,
        checkout: nft?.metaData.checkOut,
        image: nft?.metaData.images[0],
        buildingName: nft?.metaData.buildingName,
        price: Math.round(
          Math.round((rentingPeriod[1] - rentingPeriod[0]) / 86400) *
            nft?.short.price_per_day
        ).toString(),
        detail: `https://test.codedestate.com/dashboard/traveler/trips/${token_id}?from=${rentingPeriod[0].toString()}&to=${rentingPeriod[1].toString()}`,
      },
      {
        type: 0,
        amount: refundable,
      },

      currentTime,
      mainnet.chainId,
      mainnet.endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      token_id,
      nft?.access?.owner,
      message,
      account,
      "leap",
      [
        {
          amount: "100",
          denom: process.env.REACT_APP_USDC_DENOM,
        },
      ]
    );
    if (res) {
      setCanceled(true);
      setModalShow(true);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (!approved) {
      setRefundable(fundedAmount);
      return;
    }
    let cancellation = nft?.short?.cancellation.slice();
    if (!cancellation || cancellation?.length === 0) return;
    cancellation.sort((a, b) => {
      return b.percentage - a.percentage;
    });
    const currentTimeSec = Math.floor(currentTime?.getTime() / 1000);
    const diffDays = (rentingPeriod[0] - diff - currentTimeSec) / 86400;
    for (let i = 0; i < cancellation.length; i++) {
      if (cancellation[i].deadline < diffDays) {
        setPercentage(cancellation[i].percentage);
        setRefundable((fundedAmount * cancellation[i].percentage) / 100);
        break;
      }
    }
  }, [nft, fundedAmount, diff, approved]);

  const setReviewMode = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("mode", "review");
    searchParams.set("from", rentingPeriod[0]);
    searchParams.set("to", rentingPeriod[1]);
    navigate(
      `/dashboard/traveler/trips/${token_id}` + `?${searchParams.toString()}`
    );
  };

  return (
    <div className="">
      <Modal
        open={modalShow}
        center
        classNames={{
          modal:
            "w-[380px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
        }}
        onClose={() => setModalShow(false)}
        showCloseIcon={false}
      >
        {canceled ? (
          <div className="flex flex-col items-center text-center">
            <div className="text-[24px] font-semibold mb-2">
              Your booking has been successfully cancelled.
            </div>
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.75"
                y="1.75"
                width="66.5"
                height="66.5"
                rx="33.25"
                fill="#E8FFF2"
              />
              <rect
                x="1.75"
                y="1.75"
                width="66.5"
                height="66.5"
                rx="33.25"
                stroke="#38A569"
                stroke-width="2.5"
              />
              <path
                d="M31.6667 41.6667L25 35"
                stroke="#38A569"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M45.0013 28.3333L31.668 41.6666"
                stroke="#38A569"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div className="mt-2">
              Your cancellation is confirmed. You'll receive a refund of{" "}
              <span className="text-[#5b1dee] font-semibold">
                {refundable} USDC
              </span>{" "}
              (
              <span className="text-[#5b1dee] font-semibold">
                {refundable === fundedAmount ? 100 : percentage} %
              </span>{" "}
              of the total paid amount).
            </div>

            <PurpleButton
              text={<div className="w-[300px] ">Back to Home</div>}
              onClick={() => setModalShow(false)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="text-[24px] font-semibold mb-2">
              Are you sure want to cancel your booking?
            </div>
            <svg
              width="70"
              height="71"
              viewBox="0 0 70 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_469_35210)">
                <rect
                  x="3"
                  y="3.5"
                  width="64"
                  height="64"
                  rx="32"
                  fill="#FFF2F2"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35 47.5V47.5C28.372 47.5 23 42.128 23 35.5V35.5C23 28.872 28.372 23.5 35 23.5V23.5C41.628 23.5 47 28.872 47 35.5V35.5C47 42.128 41.628 47.5 35 47.5Z"
                  stroke="#DB1F22"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M35.0013 42.1667V35.5H33.668"
                  stroke="#DB1F22"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34.6653 30.1666C34.4813 30.1666 34.332 30.3159 34.3333 30.4999C34.3333 30.6839 34.4827 30.8333 34.6667 30.8333C34.8507 30.8333 35 30.6839 35 30.4999C35 30.3159 34.8507 30.1666 34.6653 30.1666"
                  stroke="#DB1F22"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_469_35210"
                  x="0"
                  y="0.5"
                  width="70"
                  height="70"
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
                  <feMorphology
                    radius="3"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_469_35210"
                  />
                  <feOffset />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.922469 0 0 0 0 0.29476 0 0 0 0 0.29476 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_469_35210"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_469_35210"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <div className="mt-2">
              If you cancel the booking, the total payment can refundable to you
              is{" "}
              <span className="text-[#5b1dee] font-semibold">
                {refundable} USDC
              </span>{" "}
              of{" "}
              <span className="text-[#5b1dee] font-semibold">
                {refundable === fundedAmount ? 100 : percentage} %
              </span>
              from total paid is{" "}
              <span className="text-[#5b1dee] font-semibold">
                {fundedAmount} USDC
              </span>{" "}
              will be refundable
            </div>
            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              <RedButton
                text="Cancel"
                onClick={() => {
                  setModalShow(false);
                  handleCancelReservation();
                  // depositForLongterm();
                }}
              />
              <PurpleButton text="Stay" onClick={() => setModalShow(false)} />
            </div>
          </div>
        )}
      </Modal>

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
              rentingPeriod[0] - diff !== "" &&
              rentingPeriod[1] - diff !== "" &&
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

        {/* <div className="w-full justify-between flex items-center">
          <div className="py-[4px] px-[12px] w-max bg-[#F6F6F6] rounded-[8px]">
            {new Date((rentingPeriod[0] - diff) * 1000)?.toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </div>
          <div className="w-[16px] h-[2px] bg-[#B6B6B6]"></div>
          <div className="py-[4px] px-[12px] w-max bg-[#F6F6F6] rounded-[8px]">
            {new Date((rentingPeriod[1] - diff) * 1000)?.toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </div>
        </div> */}
        <div className="flex justify-between">
          <div>Funded</div>
          <div className="flex items-center gap-[10px]">
            <NUSDIcon />
            <div className="text-[#5b1dee]">{fundedAmount}</div>
            <div>USDC</div>
          </div>
        </div>

        {(new Date((rentingPeriod[0] - diff) * 1000) > currentTime ||
          (new Date((rentingPeriod[0] - diff) * 1000) < currentTime &&
            !approved)) &&
          !cancelled && (
            <>
              <div className="flex justify-between">
                <div>Refundable</div>
                <div className="flex items-center gap-[10px]">
                  <NUSDIcon />

                  <div className="text-[#5b1dee]">{refundable}</div>
                  <div>USDC</div>
                </div>
              </div>
            </>
          )}
      </div>
      {(new Date((rentingPeriod[0] - diff) * 1000) > currentTime ||
        (new Date((rentingPeriod[0] - diff) * 1000) < currentTime &&
          !approved)) &&
        !cancelled && (
          <RedButton
            text="Cancel"
            onClick={() => {
              setModalShow(true);
              // handleCancelReservation();
            }}
          />
        )}

      {new Date((rentingPeriod[0] - diff) * 1000) < currentTime &&
        approved &&
        !cancelled && (
          <BlackButton text="Write a Review" onClick={() => setReviewMode()} />
        )}
    </div>
  );
};

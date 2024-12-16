import { useNavigate, useSubmit } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../Components/functions/Api";
import { useEffect, useRef, useState } from "react";
import {
  getIdFromHash,
  getProfileFromWallet,
  truncateWalletAddress,
} from "../../../Components/functions/Functions";
import { Logo, NUSDIcon } from "../../../AssetComponents/Images";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import {
  removeItem,
  removeTxByHash,
} from "../../../ReduxSlices/NotificationSlice";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import Modal from "react-responsive-modal";
import {
  SelectionGroup,
  SelectionItem,
} from "../../../Components/Selection/Selection";
import { LightIcon } from "../../../AssetComponents/Images";
import { NumericFormat } from "react-number-format";
import generatePDF from "react-to-pdf";
import ReactToPrint from "react-to-print";
import { Fade } from "react-awesome-reveal";

export const Transactions = ({ mode }) => {
  const account = useSelector((state) => state.auth.account);
  const nfts = useSelector((state) => state.nft.nfts);
  const diff = useSelector((state) => state.time.diffToUTC);
  const notificationContent = useSelector((state) => state.notification.items);
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const invoiceRef = useRef();
  const [txes, setTxes] = useState([]);
  const [ids, setIds] = useState();
  const [parsedString, setParsedString] = useState();
  const [detailModal, setDetailModal] = useState();
  const [flag, setFlag] = useState(0);
  const [senderName, setSenderName] = useState();
  const getTxes = async (counts = 3) => {
    const events = await api("user/allTxLogs", {
      account: account,
      counts: counts,
    });

    const filtered = events?.filter((tx) => {
      if (
        (tx.action === "finalize_short_term_rental" &&
          ((mode === "host" && tx.sender === account) ||
            (mode === "traveler" && tx.receiver === account))) ||
        (tx.action === "set_reservation_for_short_term" &&
          ((mode === "host" && tx.receiver === account) ||
            (mode === "traveler" && tx.sender === account))) ||
        (tx.action === "cancel_reservation_for_shortterm" &&
          ((mode === "host" && tx.receiver === account) ||
            (mode === "traveler" && tx.sender === account))) ||
        (tx.action === "cancel_rental_for_shortterm" &&
          ((mode === "host" && tx.receiver === account) ||
            (mode === "traveler" && tx.sender === account))) ||
        (tx.action === "reject_reservation_for_shortterm" &&
          ((mode === "host" && tx.sender === account) ||
            (mode === "traveler" && tx.receiver === account)))
      )
        return tx;
    });
    if (filtered) {
      filtered.sort((a, b) => new Date(b.timeUTC) - new Date(a.timeUTC));
      setTxes(filtered);
    }
  };

  const filterNotifications = () => {
    for (let i = 0; i < txes.length; i++) {
      dispatch(removeTxByHash(txes[i].txHash));
    }
  };

  useEffect(() => {
    if (account) getTxes(null);
  }, [account]);

  useEffect(() => {
    filterNotifications();
  }, [notificationContent, txes]);

  const parseAction = (action) => {
    switch (action) {
      case "finalize_short_term_rental":
        return (
          <div className="flex items-center">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_597_40833)">
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="#38A569"
                />
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="url(#paint0_linear_597_40833)"
                  fill-opacity="0.18"
                />
                <rect
                  x="9.03255"
                  y="8.83333"
                  width="17.3333"
                  height="17.3333"
                  rx="8.66667"
                  stroke="white"
                  stroke-opacity="0.2"
                  stroke-width="0.666667"
                />
                <path
                  d="M14.9922 17.0834L17.0755 19.1667L20.8255 15.4167"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_597_40833"
                  x="0.699218"
                  y="0.499999"
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
                    result="effect1_dropShadow_597_40833"
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
                    in2="effect1_dropShadow_597_40833"
                    result="effect2_dropShadow_597_40833"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_597_40833"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_597_40833"
                  x1="17.6992"
                  y1="8.5"
                  x2="17.6992"
                  y2="20.125"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[#38A569]">Completed</div>
          </div>
        );
        break;
      case "set_reservation_for_short_term":
        return (
          <div className="flex items-center">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_597_40833)">
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="#38A569"
                />
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="url(#paint0_linear_597_40833)"
                  fill-opacity="0.18"
                />
                <rect
                  x="9.03255"
                  y="8.83333"
                  width="17.3333"
                  height="17.3333"
                  rx="8.66667"
                  stroke="white"
                  stroke-opacity="0.2"
                  stroke-width="0.666667"
                />
                <path
                  d="M14.9922 17.0834L17.0755 19.1667L20.8255 15.4167"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_597_40833"
                  x="0.699218"
                  y="0.499999"
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
                    result="effect1_dropShadow_597_40833"
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
                    in2="effect1_dropShadow_597_40833"
                    result="effect2_dropShadow_597_40833"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_597_40833"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_597_40833"
                  x1="17.6992"
                  y1="8.5"
                  x2="17.6992"
                  y2="20.125"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[#38A569]">Reserved</div>
          </div>
        );
        break;
      case "cancel_reservation_for_shortterm":
        return (
          <div className="flex items-center">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_597_40913)">
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="#DB1F22"
                />
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="url(#paint0_linear_597_40913)"
                  fill-opacity="0.18"
                />
                <rect
                  x="9.03255"
                  y="8.83333"
                  width="17.3333"
                  height="17.3333"
                  rx="8.66667"
                  stroke="white"
                  stroke-opacity="0.2"
                  stroke-width="0.666667"
                />
                <path
                  d="M15.8242 15.625L19.5742 19.375"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.8242 19.375L19.5742 15.625"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_597_40913"
                  x="0.699218"
                  y="0.499999"
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
                    result="effect1_dropShadow_597_40913"
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
                    in2="effect1_dropShadow_597_40913"
                    result="effect2_dropShadow_597_40913"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_597_40913"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_597_40913"
                  x1="17.6992"
                  y1="8.5"
                  x2="17.6992"
                  y2="20.125"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[#DB1F22]">Canceled</div>
          </div>
        );
        break;
      case "cancel_rental_for_shortterm":
        return (
          <div className="flex items-center">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_597_40913)">
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="#DB1F22"
                />
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="url(#paint0_linear_597_40913)"
                  fill-opacity="0.18"
                />
                <rect
                  x="9.03255"
                  y="8.83333"
                  width="17.3333"
                  height="17.3333"
                  rx="8.66667"
                  stroke="white"
                  stroke-opacity="0.2"
                  stroke-width="0.666667"
                />
                <path
                  d="M15.8242 15.625L19.5742 19.375"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.8242 19.375L19.5742 15.625"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_597_40913"
                  x="0.699218"
                  y="0.499999"
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
                    result="effect1_dropShadow_597_40913"
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
                    in2="effect1_dropShadow_597_40913"
                    result="effect2_dropShadow_597_40913"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_597_40913"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_597_40913"
                  x1="17.6992"
                  y1="8.5"
                  x2="17.6992"
                  y2="20.125"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[#DB1F22]">Canceled</div>
          </div>
        );
        break;
      case "reject_reservation_for_shortterm":
        return (
          <div className="flex items-center">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_597_40913)">
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="#DB1F22"
                />
                <rect
                  x="8.69922"
                  y="8.5"
                  width="18"
                  height="18"
                  rx="9"
                  fill="url(#paint0_linear_597_40913)"
                  fill-opacity="0.18"
                />
                <rect
                  x="9.03255"
                  y="8.83333"
                  width="17.3333"
                  height="17.3333"
                  rx="8.66667"
                  stroke="white"
                  stroke-opacity="0.2"
                  stroke-width="0.666667"
                />
                <path
                  d="M15.8242 15.625L19.5742 19.375"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.8242 19.375L19.5742 15.625"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_597_40913"
                  x="0.699218"
                  y="0.499999"
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
                    result="effect1_dropShadow_597_40913"
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
                    in2="effect1_dropShadow_597_40913"
                    result="effect2_dropShadow_597_40913"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_597_40913"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_597_40913"
                  x1="17.6992"
                  y1="8.5"
                  x2="17.6992"
                  y2="20.125"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[#DB1F22]">Rejected</div>
          </div>
        );
        break;
      default:
        break;
    }
  };

  const parseString = async (tx) => {
    if (!tx) return;
    let value = "";
    if (tx.sender === account) {
      value += "You";
      setSenderName(profile?.Name?.replace("/", " "));
    } else {
      // if (nfts[tx.token_id]?.access.owner === tx.sender) value += "Host ";
      // else value += "Traveler ";
      const sender = await getProfileFromWallet(tx.sender);
      value += sender.Name?.replace("/", " ");
      setSenderName(sender?.Name?.replace("/", " "));
    }
    value += " have ";

    switch (tx.action) {
      case "finalize_short_term_rental":
        value += "completed ";
        break;
      case "set_reservation_for_short_term":
        value += "successfully paid ";
        break;
      case "cancel_reservation_for_shortterm":
        value += "canceled ";
        break;
      case "cancel_rental_for_shortterm":
        value += "canceled ";
        break;
      case "reject_reservation_for_shortterm":
        value += "rejected ";
      default:
        break;
    }
    value += "for Order ";
    value += (tx?.id || "").toUpperCase().slice(-10);
    value += ". ";
    value += "This is receipt from Coded Estate";
    setParsedString(value);
  };

  useEffect(() => {
    if (ids) {
      parseString(ids);
      setDetailModal(true);
    } else setDetailModal(false);
  }, [ids]);

  const downloadPdf = () => {
    const getTargetElement = () => document.getElementById("invoice");
    // console.log(element);
    generatePDF(getTargetElement, {
      filename: "CodedEstate_Invoice.pdf",
      page: {
        margin: 20,
      },
    });
  };

  return (
    <div className="w-full overflow-auto max-h-[calc(100vh-80px)] h-full p-[10px]">
      <Modal
        open={detailModal}
        onClose={() => setIds(null)}
        center
        classNames={{
          modal:
            "w-[500px] p-0 h-max rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
        }}
      >
        <div className="w-full">
          <div
            className="flex flex-col items-center space-y-2 p-4"
            id="invoice"
            ref={invoiceRef}
          >
            <Logo className="w-[120px]" />
            <div className="w-full">
              Hello{" "}
              <span className="font-semibold">
                {profile?.Name?.replace("/", " ")}
              </span>
            </div>
            <div className="w-full">{parsedString}</div>
            <div className="w-full font-semibold text-[20px] text-[#5b1dee]">
              <NumericFormat
                value={ids?.funds?.amount || 0}
                thousandSeparator
                displayType="text"
              />
              <span className="ml-2">USDC</span>
            </div>
            <div className="w-full">
              {ids &&
                new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).format(
                  (Math.round(new Date(ids?.timeUTC).getTime() / 1000) - diff) *
                    1000
                )}
            </div>
            <div className="w-full flex justify-between">
              <div>Confirmation Code</div>
              <div className="font-semibold">
                {(ids?.id || "").toUpperCase().slice(-10)}
              </div>
            </div>

            {ids?.funds?.type ? (
              <>
                <div className="w-full space-y-1">
                  <div className="font-bold">FROM</div>
                  <div className="w-full flex justify-between">
                    <div>Address</div>
                    <div className="text-[#737373]">{ids?.sender}</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>ID</div>
                    <div className="text-[#737373]">{senderName}</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>Token</div>
                    <div className="text-[#737373]">USDC</div>
                  </div>
                </div>
                <div className="w-full h-[1px] border-dashed border-[1px]" />
                <div className="w-full space-y-1">
                  <div className="font-bold">TO</div>
                  <div className="w-full flex justify-between">
                    <div>Contract address</div>
                    <div className="text-[#737373]">
                      {truncateWalletAddress(
                        process.env.REACT_APP_RENTAL_SMART_CONTRACT
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>ID</div>
                    <div className="text-[#737373]">Coded Estate</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>Token</div>
                    <div className="text-[#737373]">USDC</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full space-y-1">
                  <div className="font-bold">FROM</div>
                  <div className="w-full flex justify-between">
                    <div>Contract address</div>
                    <div className="text-[#737373]">
                      {truncateWalletAddress(
                        process.env.REACT_APP_RENTAL_SMART_CONTRACT
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>ID</div>
                    <div className="text-[#737373]">Coded Estate</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>Token</div>
                    <div className="text-[#737373]">USDC</div>
                  </div>
                </div>
                <div className="w-full h-[1px] border-dashed border-[1px]" />
                <div className="w-full space-y-1">
                  <div className="font-bold">TO</div>
                  <div className="w-full flex justify-between">
                    <div>Address</div>
                    <div className="text-[#737373]">{ids?.sender}</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>ID</div>
                    <div className="text-[#737373]">{senderName}</div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div>Token</div>
                    <div className="text-[#737373]">USDC</div>
                  </div>
                </div>
              </>
            )}

            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  alt=""
                  src={nfts[ids?.token_id]?.metaData.images[0]}
                  className="w-[100px] h-[70px] rounded-[4px]"
                />
                <div className="">
                  <div className="font-semibold text-[18px]">
                    {nfts[ids?.token_id]?.metaData.buildingName}
                  </div>
                  <div className="font-normal">
                    {(ids?.id || "").toUpperCase().slice(-10)}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <NUSDIcon />
                  <div className="font-normal">
                    <span
                      className={
                        ids?.funds?.type ? "text-[#38A569]" : "text-[#DB1F22]"
                      }
                    >
                      {ids?.funds?.amount || 0}
                    </span>{" "}
                    USDC
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex items-center justify-between">
                <div className="">
                  {nfts[ids?.token_id]?.metaData.buildingName}
                </div>
                <div className="">
                  <NumericFormat
                    value={ids?.funds?.amount || 0}
                    thousandSeparator
                    displayType="text"
                  />
                  <span className="ml-2">USDC</span>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="">Total</div>
                <div className="text-[#5b1dee]">
                  <NumericFormat
                    value={ids?.funds?.amount || 0}
                    thousandSeparator
                    displayType="text"
                  />
                  <span className="ml-2">USDC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[96%] mx-auto grid grid-cols-2 gap-2 my-2">
            <PurpleButton
              text={
                <div className="flex items-center w-full justify-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 16V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V16C21 15.4477 20.5523 15 20 15H16.6175C16.2388 15 15.8925 15.214 15.7231 15.5528L15.2759 16.4472C15.1065 16.786 14.7602 17 14.3815 17H9.61753C9.2386 17 8.89222 16.7858 8.72291 16.4468L8.27659 15.5532C8.10728 15.2142 7.76092 15 7.382 15H4C3.44772 15 3 15.4477 3 16Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 10L12 12L14 10"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 12V7"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20 12V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V12"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div>Download Invoice</div>
                </div>
              }
              onClick={() => downloadPdf()}
            />
            <ReactToPrint
              trigger={() => {
                return (
                  <BlackButton
                    text={
                      <div className="flex items-center w-full justify-center gap-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 8V4C7 3.448 7.448 3 8 3H16C16.552 3 17 3.448 17 4V8"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 17H5C3.895 17 3 16.105 3 15V10C3 8.895 3.895 8 5 8H19C20.105 8 21 8.895 21 10V15C21 16.105 20.105 17 19 17H17"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7 13.7998H17V19.9998C17 20.5518 16.552 20.9998 16 20.9998H8C7.448 20.9998 7 20.5518 7 19.9998V13.7998Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 11H8"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <div>Print Invoice</div>
                      </div>
                    }
                  />
                );
              }}
              content={() => invoiceRef.current}
            />
          </div>
        </div>
      </Modal>
      <div className="w-full h-full space-y-[20px] rounded-[10px] p-[8px] flex flex-col">
        <div className="bg-white border-[2px] h-max border-[#E3E3E3] p-[8px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          <div className="flex items-center">
            <svg
              width="62"
              height="62"
              viewBox="0 0 62 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_597_41881)">
                <rect
                  x="11"
                  y="11"
                  width="40"
                  height="40"
                  rx="20"
                  fill="#5B1DEE"
                />
                <rect
                  x="11"
                  y="11"
                  width="40"
                  height="40"
                  rx="20"
                  fill="url(#paint0_linear_597_41881)"
                  fill-opacity="0.18"
                />
                <g filter="url(#filter1_d_597_41881)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39 38H23C21.895 38 21 37.105 21 36V26C21 24.895 21.895 24 23 24H39C40.105 24 41 24.895 41 26V36C41 37.105 40.105 38 39 38Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39 38H23C21.895 38 21 37.105 21 36V26C21 24.895 21.895 24 23 24H39C40.105 24 41 24.895 41 26V36C41 37.105 40.105 38 39 38Z"
                    stroke="#202020"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <path
                  d="M24 29V27H26"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M24 33V35H26"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M36 27H38V29"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M36 35H38V33"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M32.7678 29.2322C33.7441 30.2085 33.7441 31.7914 32.7678 32.7677C31.7915 33.744 30.2085 33.744 29.2322 32.7677C28.2559 31.7914 28.2559 30.2085 29.2322 29.2322C30.2085 28.2559 31.7915 28.2559 32.7678 29.2322"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_597_41881"
                  x="0.333331"
                  y="0.333331"
                  width="61.3333"
                  height="61.3333"
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
                  <feOffset dx="2.66667" dy="2.66667" />
                  <feGaussianBlur stdDeviation="4" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_597_41881"
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
                    in2="effect1_dropShadow_597_41881"
                    result="effect2_dropShadow_597_41881"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_597_41881"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_597_41881"
                  x="20.25"
                  y="23.25"
                  width="22.5"
                  height="16.5"
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
                    result="effect1_dropShadow_597_41881"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_597_41881"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_597_41881"
                  x1="31"
                  y1="11"
                  x2="31"
                  y2="36.8333"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="1" stop-color="white" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="font-semibold text-[24px]">Transactions</div>
          </div>
          <div className="ml-[10px] text-[#666666] font-normal">
            Your real estate NFT transactions
          </div>
        </div>
        <div className="w-full justify-between flex items-center">
          <SelectionGroup
            defaultItem={flag}
            className="border-[2px] border-[#e3e3e3] w-max px-[6px] py-[4px] gap-[8px] flex items-center rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[70px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">All</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setFlag(0)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[70px] flex justify-center"
                >
                  <div className="text-[#959595]">All</div>
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
                  onClick={() => setFlag(1)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Completed</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Pending</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setFlag(2)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[100px] flex justify-center"
                >
                  <div className="text-[#959595]">Pending</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[110px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Canceled</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setFlag(3)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[110px] flex justify-center"
                >
                  <div className="text-[#959595]">Canceled</div>
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
        <div className="w-full bg-[#fafafa] max-h-[calc(100vh-200px)] scrollbarwidth overflow-auto border-[#E3E3E3] pb-4 rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          {txes.length === 0 ? (
            <div className="w-full h-[calc(100vh-340px)] flex flex-col items-center justify-center">
              <svg
                width="88"
                height="89"
                viewBox="0 0 88 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_dd_559_60597)">
                  <rect
                    x="8"
                    y="8.5"
                    width="72"
                    height="72"
                    rx="36"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M25.3346 35.1667H62.668C65.2463 35.1667 67.3346 37.255 67.3346 39.8333V63.1667C67.3346 65.745 65.2463 67.8333 62.668 67.8333H25.3346C22.7563 67.8333 20.668 65.745 20.668 63.1667V39.8333C20.668 37.255 22.7563 35.1667 25.3346 35.1667Z"
                    stroke="#531AD9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M48.1261 47.3751C50.4041 49.6532 50.4041 53.3466 48.1261 55.6247C45.848 57.9028 42.1546 57.9028 39.8765 55.6247C37.5985 53.3466 37.5985 49.6532 39.8765 47.3751C42.1546 45.0971 45.848 45.0971 48.1261 47.3751"
                    stroke="#531AD9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M57.9987 57.3333V45.6667"
                    stroke="#531AD9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M29.9987 57.3333V45.6667"
                    stroke="#531AD9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M62.6654 28.1667H25.332"
                    stroke="#531AD9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M60.3346 21.1667H27.668"
                    stroke="#531AD9"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dd_559_60597"
                    x="-9.53674e-07"
                    y="0.499999"
                    width="88"
                    height="88"
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
                    <feOffset dx="-2" dy="-2" />
                    <feGaussianBlur stdDeviation="3" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_559_60597"
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
                      in2="effect1_dropShadow_559_60597"
                      result="effect2_dropShadow_559_60597"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_559_60597"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>

              <div className="font-semibold">No Transaction yet</div>
              <div className="text-[#909090]">Not transaction yet for now</div>
            </div>
          ) : (
            <Fade>
              <table className="w-full border-spacing-y-1 border-separate">
                <tr className="w-full h-[40px]">
                  <td className="pl-3">Property</td>
                  <td>Date</td>
                  <td>ID</td>
                  <td>Amount</td>
                  <td>Status</td>
                  <td>Tx Hash</td>
                  <td>Action</td>
                </tr>
                {txes?.map((tx, i) => {
                  if (
                    (tx.action === "finalize_short_term_rental" &&
                      flag === 1 &&
                      ((mode === "host" && tx.sender === account) ||
                        (mode === "traveler" && tx.receiver === account))) ||
                    (tx.action === "set_reservation_for_short_term" &&
                      flag === 2 &&
                      ((mode === "host" && tx.receiver === account) ||
                        (mode === "traveler" && tx.sender === account))) ||
                    (tx.action === "cancel_reservation_for_shortterm" &&
                      flag === 3 &&
                      ((mode === "host" && tx.receiver === account) ||
                        (mode === "traveler" && tx.sender === account))) ||
                    (tx.action === "cancel_rental_for_shortterm" &&
                      flag === 3 &&
                      ((mode === "host" && tx.receiver === account) ||
                        (mode === "traveler" && tx.sender === account))) ||
                    (tx.action === "reject_reservation_for_shortterm" &&
                      flag === 3 &&
                      ((mode === "host" && tx.sender === account) ||
                        (mode === "traveler" && tx.receiver === account))) ||
                    flag === 0
                  )
                    return (
                      <tr
                        className={
                          i % 2 === 0
                            ? "h-[60px] bg-[#FFFFFF] hover:shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] w-full"
                            : "h-[60px] bg-[#FAFAFA] hover:shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] w-full"
                        }
                      >
                        <td>
                          <div className="pl-3 flex items-center gap-[10px]">
                            <img
                              alt=""
                              src={nfts[tx.token_id]?.metaData.images[0]}
                              className="w-[30px] h-[30px] rounded-[4px]"
                            />
                            <div>
                              <div className="font-normal">
                                {nfts[tx.token_id]?.metaData.buildingName}
                              </div>
                              <div className="text-[14px]">
                                ID: {tx.token_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="font-normal">
                              {new Intl.DateTimeFormat("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(
                                (Math.round(
                                  new Date(tx.timeUTC).getTime() / 1000
                                ) -
                                  diff) *
                                  1000
                              )}
                            </div>
                            <div className="text-[14px]">
                              At{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              }).format(
                                (Math.round(
                                  new Date(tx.timeUTC).getTime() / 1000
                                ) -
                                  diff) *
                                  1000
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-normal">
                            {(tx.id || "").toUpperCase().slice(-10)}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <NUSDIcon />
                            <div className="font-normal">
                              <span
                                className={
                                  tx?.funds?.type
                                    ? "text-[#38A569]"
                                    : "text-[#DB1F22]"
                                }
                              >
                                {tx?.funds?.amount || 0}
                              </span>{" "}
                              USDC
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="shadow-md rounded-[4px] pr-[10px] border-[1px] w-max">
                            {parseAction(tx.action)}
                          </div>
                        </td>
                        <td>
                          <div className="text-[#5b1dee]">
                            {truncateWalletAddress(tx.txHash)}
                          </div>
                        </td>
                        <td>
                          <div className="w-max">
                            <PurpleButton
                              text="Details"
                              onClick={() => setIds(tx)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  else return <></>;
                })}
              </table>
            </Fade>
          )}
        </div>
        {/* {txes.length > 0 && (
          <div className="w-full flex justify-start">
            <BlackButton text="View all" onClick={() => getTxes(null)} />
          </div>
        )} */}
      </div>
    </div>
  );
};

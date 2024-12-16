import {
  SelectionGroup,
  SelectionItem,
} from "../../Components/Selection/Selection";
import {
  ArrowIconRent,
  ArrowToLeft,
  ArrowToRightIcon,
  LightIcon,
} from "../../AssetComponents/Images";

import { Popover } from "react-tiny-popover";
import { useEffect, useState } from "react";
import UAE from "../../assets/images/Perps/UAE.png";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchBox } from "../../Components/Search/SearchBox";
import { useSelector } from "react-redux";

export const Markets = () => {
  const [showOrderMenu, setShowOrderMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [currentMarket, setCurrentMarket] = useState();
  useEffect(() => {
    switch (location.pathname.split("/")[3]) {
      case "realestate":
        setCurrentMarket(0);
        break;
      case "crypto":
        setCurrentMarket(1);
        break;
      case "forex":
        setCurrentMarket(2);
        break;
      case "commodities":
        setCurrentMarket(3);
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div className="my-[20px] mx-auto w-[80vw] p-[20px] rounded-[8px] font-normal">
      <div className="w-full flex items-center justify-between">
        <SelectionGroup
          className="px-[6px] w-max py-[4px] gap-[8px] flex items-center rounded-[14px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          defaultItem={currentMarket}
          // SelectedItemMask={maskString}
        >
          <SelectionItem
            SelectedItem={
              <div className="cursor-pointer bg-white rounded-[10px] w-[130px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div className="text-black font-medium">Real Estate</div>
                <LightIcon />
              </div>
            }
            UnselectedItem={
              <div
                onClick={() => navigate("/perps/markets/realestate")}
                className="cursor-pointer hover:bg-white rounded-[10px] w-[130px] flex justify-center"
              >
                <div className="text-[#959595]">Real Estate</div>
              </div>
            }
          />
          <SelectionItem
            SelectedItem={
              <div className="cursor-pointer bg-white rounded-[10px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div className="text-black font-medium">Crypto</div>
                <LightIcon />
              </div>
            }
            UnselectedItem={
              <div
                onClick={() => navigate("/perps/markets/crypto")}
                className="cursor-pointer hover:bg-white rounded-[10px] w-[100px] flex justify-center"
              >
                <div className="text-[#959595]">Crypto</div>
              </div>
            }
          />
          <SelectionItem
            SelectedItem={
              <div className="cursor-pointer bg-white rounded-[10px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div className="text-black font-medium">Forex</div>
                <LightIcon />
              </div>
            }
            UnselectedItem={
              <div
                onClick={() => navigate("/perps/markets/forex")}
                className="cursor-pointer hover:bg-white rounded-[10px] w-[100px] flex justify-center"
              >
                <div className="text-[#959595]">Forex</div>
              </div>
            }
          />
          <SelectionItem
            SelectedItem={
              <div className="cursor-pointer bg-white rounded-[10px] w-[140px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div className="text-black font-medium">Commodities</div>
                <LightIcon />
              </div>
            }
            UnselectedItem={
              <div
                onClick={() => navigate("/perps/markets/commodities")}
                className="cursor-pointer hover:bg-white rounded-[10px] w-[140px] flex justify-center"
              >
                <div className="text-[#959595]">Commodities</div>
              </div>
            }
          />
        </SelectionGroup>
        <SearchBox />
      </div>

      <div className="w-full bg-white mt-[20px] p-[24px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
        {currentMarket === 0 && (
          <>
            <div className="flex items-center">
              <svg
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_dd_2523_693)">
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
                    fill="url(#paint0_linear_2523_693)"
                    fill-opacity="0.18"
                  />
                  <g filter="url(#filter1_d_2523_693)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22 36V30.1C22 28.733 22.6214 27.4401 23.6889 26.5861L28.1889 22.9861C29.8323 21.6713 32.1677 21.6713 33.8111 22.9861L38.3111 26.5861C39.3786 27.4401 40 28.733 40 30.1V36C40 38.2091 38.2091 40 36 40H26C23.7909 40 22 38.2091 22 36Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22 36V30.1C22 28.733 22.6214 27.4401 23.6889 26.5861L28.1889 22.9861C29.8323 21.6713 32.1677 21.6713 33.8111 22.9861L38.3111 26.5861C39.3786 27.4401 40 28.733 40 30.1V36C40 38.2091 38.2091 40 36 40H26C23.7909 40 22 38.2091 22 36Z"
                      stroke="#202020"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <path
                    d="M27 34L29.5 31.5L32 34L35 31"
                    stroke="#202020"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dd_2523_693"
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
                      result="effect1_dropShadow_2523_693"
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
                      in2="effect1_dropShadow_2523_693"
                      result="effect2_dropShadow_2523_693"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_2523_693"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_2523_693"
                    x="21.25"
                    y="21.25"
                    width="20.5"
                    height="20.5"
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
                      result="effect1_dropShadow_2523_693"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2523_693"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_2523_693"
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

              <div className="text-[24px] font-medium">Real Estate</div>

              <div className="flex ml-2 items-center rounded-[4px] pr-[4px] bg-[#E8FFF2]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.577 8.60812L10.7437 18.7118"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.1026 14.3001L16.5775 8.60836"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.8848 10.1333L16.5765 8.6082"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-[#5DBE89]">4.75 %</div>
              </div>
            </div>
            <div className="text-[#959595] flex gap-[4px] items-center">
              All markets real estate are up in aggregate over the past 3
              months.
            </div>
          </>
        )}
        {currentMarket === 1 && (
          <>
            <div className="flex items-center">
              <svg
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_dd_2523_475)">
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
                    fill="url(#paint0_linear_2523_475)"
                    fill-opacity="0.18"
                  />
                  <g filter="url(#filter1_d_2523_475)">
                    <rect
                      x="21.9962"
                      y="21.9963"
                      width="18.0075"
                      height="18.0075"
                      rx="5.625"
                      fill="white"
                      stroke="#202020"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.3691 31.9882L29.8706 35.9899C30.1555 36.3155 30.5672 36.5023 30.9999 36.5023C31.4326 36.5023 31.8443 36.3155 32.1292 35.9899L35.6307 31.9882C36.1257 31.4224 36.1257 30.5776 35.6307 30.0119L32.1292 26.0102C31.8443 25.6845 31.4326 25.4977 30.9999 25.4977C30.5672 25.4977 30.1555 25.6845 29.8706 26.0102L26.3691 30.0119C25.874 30.5776 25.874 31.4224 26.3691 31.9882Z"
                      fill="white"
                      stroke="#202020"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M36.0021 31.0601L31.6312 32.0003C31.2151 32.0897 30.7849 32.0897 30.3689 32.0003L25.9979 31.0601"
                      fill="white"
                    />
                    <path
                      d="M36.0021 31.0601L31.6312 32.0003C31.2151 32.0897 30.7849 32.0897 30.3689 32.0003L25.9979 31.0601"
                      stroke="#202020"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_dd_2523_475"
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
                      result="effect1_dropShadow_2523_475"
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
                      in2="effect1_dropShadow_2523_475"
                      result="effect2_dropShadow_2523_475"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_2523_475"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_2523_475"
                    x="21.2462"
                    y="21.2463"
                    width="20.5074"
                    height="20.5075"
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
                      result="effect1_dropShadow_2523_475"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2523_475"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_2523_475"
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

              <div className="text-[24px] font-medium">Crypto</div>

              <div className="flex ml-2 items-center rounded-[4px] pr-[4px] bg-[#E8FFF2]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.577 8.60812L10.7437 18.7118"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.1026 14.3001L16.5775 8.60836"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.8848 10.1333L16.5765 8.6082"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-[#5DBE89]">4.75 %</div>
              </div>
            </div>
            <div className="text-[#959595] flex gap-[4px] items-center">
              All markets crypto are up in aggregate over the past 3 months.
            </div>
          </>
        )}
        {currentMarket === 2 && (
          <>
            <div className="flex items-center">
              <svg
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_dd_2523_954)">
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
                    fill="url(#paint0_linear_2523_954)"
                    fill-opacity="0.18"
                  />
                  <g filter="url(#filter1_d_2523_954)">
                    <g filter="url(#filter2_d_2523_954)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.495 32.464L23.69 34.028L23.948 35.975C24.091 37.055 24.94 37.905 26.02 38.049L27.972 38.31L29.535 39.504C30.4 40.165 31.599 40.165 32.464 39.504L34.028 38.309H34.026L35.974 38.051C37.054 37.908 37.904 37.059 38.048 35.979L38.308 34.027C38.308 34.028 38.912 33.237 39.503 32.464C40.164 31.599 40.163 30.4 39.503 29.535L38.31 27.971L38.052 26.024C37.909 24.944 37.06 24.094 35.98 23.95L34.027 23.69L32.464 22.496C31.599 21.835 30.4 21.835 29.535 22.496L27.971 23.69H27.973L26.025 23.949C24.945 24.092 24.095 24.941 23.951 26.021L23.69 27.973C23.69 27.972 23.086 28.763 22.495 29.536C21.835 30.4 21.835 31.6 22.495 32.464Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.495 32.464L23.69 34.028L23.948 35.975C24.091 37.055 24.94 37.905 26.02 38.049L27.972 38.31L29.535 39.504C30.4 40.165 31.599 40.165 32.464 39.504L34.028 38.309H34.026L35.974 38.051C37.054 37.908 37.904 37.059 38.048 35.979L38.308 34.027C38.308 34.028 38.912 33.237 39.503 32.464C40.164 31.599 40.163 30.4 39.503 29.535L38.31 27.971L38.052 26.024C37.909 24.944 37.06 24.094 35.98 23.95L34.027 23.69L32.464 22.496C31.599 21.835 30.4 21.835 29.535 22.496L27.971 23.69H27.973L26.025 23.949C24.945 24.092 24.095 24.941 23.951 26.021L23.69 27.973C23.69 27.972 23.086 28.763 22.495 29.536C21.835 30.4 21.835 31.6 22.495 32.464Z"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M29.266 33.279C29.525 33.703 29.966 33.996 30.5 33.996H31H31.595C32.37 33.996 32.998 33.368 32.998 32.593C32.998 31.95 32.561 31.388 31.936 31.233L30.064 30.763C29.44 30.606 29.002 30.045 29.002 29.403C29.002 28.628 29.63 28 30.405 28H31H31.5C32.032 28 32.473 28.292 32.733 28.713"
                      fill="white"
                    />
                    <path
                      d="M29.266 33.279C29.525 33.703 29.966 33.996 30.5 33.996H31H31.595C32.37 33.996 32.998 33.368 32.998 32.593C32.998 31.95 32.561 31.388 31.936 31.233L30.064 30.763C29.44 30.606 29.002 30.045 29.002 29.403C29.002 28.628 29.63 28 30.405 28H31H31.5C32.032 28 32.473 28.292 32.733 28.713"
                      stroke="#202020"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31 27.995V27V27.995Z"
                      fill="white"
                    />
                    <path
                      d="M31 27.995V27"
                      stroke="#202020"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M31 34.005V35V34.005Z"
                      fill="white"
                    />
                    <path
                      d="M31 34.005V35"
                      stroke="#202020"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_dd_2523_954"
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
                      result="effect1_dropShadow_2523_954"
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
                      in2="effect1_dropShadow_2523_954"
                      result="effect2_dropShadow_2523_954"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_2523_954"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_2523_954"
                    x="21.25"
                    y="21.2502"
                    width="20.4983"
                    height="20.4995"
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
                      result="effect1_dropShadow_2523_954"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2523_954"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter2_d_2523_954"
                    x="21.25"
                    y="21.2502"
                    width="20.4983"
                    height="20.4995"
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
                      result="effect1_dropShadow_2523_954"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2523_954"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_2523_954"
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

              <div className="text-[24px] font-medium">Forex</div>

              <div className="flex ml-2 items-center rounded-[4px] pr-[4px] bg-[#E8FFF2]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.577 8.60812L10.7437 18.7118"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.1026 14.3001L16.5775 8.60836"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.8848 10.1333L16.5765 8.6082"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-[#5DBE89]">4.75 %</div>
              </div>
            </div>
            <div className="text-[#959595] flex gap-[4px] items-center">
              All markets forex are up in aggregate over the past 3 months.
            </div>
          </>
        )}
        {currentMarket === 3 && (
          <>
            <div className="flex items-center">
              <svg
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_dd_2524_509)">
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
                    fill="url(#paint0_linear_2524_509)"
                    fill-opacity="0.18"
                  />
                  <g filter="url(#filter1_d_2524_509)">
                    <path
                      d="M31.1469 37.28L32.3309 31.48C32.3586 31.3445 32.4322 31.2227 32.5393 31.1352C32.6465 31.0477 32.7806 31 32.9189 31H39.0809C39.2192 31 39.3533 31.0477 39.4604 31.1352C39.5676 31.2227 39.6412 31.3445 39.6689 31.48L40.8529 37.28C40.8707 37.3672 40.8689 37.4572 40.8476 37.5436C40.8263 37.63 40.786 37.7106 40.7297 37.7795C40.6734 37.8484 40.6025 37.904 40.5221 37.9421C40.4417 37.9802 40.3539 38 40.2649 38H31.7349C31.6459 38 31.558 37.9802 31.4776 37.9421C31.3972 37.904 31.3263 37.8484 31.27 37.7795C31.2138 37.7106 31.1735 37.63 31.1522 37.5436C31.1309 37.4572 31.1291 37.3672 31.1469 37.28Z"
                      fill="white"
                      stroke="#202020"
                      stroke-linecap="round"
                    />
                    <path
                      d="M26.1469 30.28L27.3309 24.48C27.3585 24.3446 27.432 24.223 27.539 24.1355C27.6459 24.0481 27.7797 24.0002 27.9179 24H34.0819C34.22 24.0002 34.3539 24.0481 34.4608 24.1355C34.5678 24.223 34.6413 24.3446 34.6689 24.48L35.8529 30.28C35.8707 30.3672 35.8689 30.4572 35.8476 30.5436C35.8263 30.63 35.786 30.7106 35.7297 30.7795C35.6734 30.8484 35.6025 30.904 35.5221 30.9421C35.4417 30.9802 35.3539 31 35.2649 31H26.7349C26.6459 31 26.558 30.9802 26.4776 30.9421C26.3972 30.904 26.3263 30.8484 26.27 30.7795C26.2138 30.7106 26.1735 30.63 26.1522 30.5436C26.1309 30.4572 26.1291 30.3672 26.1469 30.28Z"
                      fill="white"
                      stroke="#202020"
                      stroke-linecap="round"
                    />
                    <path
                      d="M21.1469 37.28L22.3309 31.48C22.3585 31.3446 22.432 31.223 22.539 31.1355C22.6459 31.0481 22.7797 31.0002 22.9179 31H29.0809C29.2192 31 29.3533 31.0477 29.4604 31.1352C29.5676 31.2227 29.6412 31.3445 29.6689 31.48L30.8529 37.28C30.8707 37.3672 30.8689 37.4572 30.8476 37.5436C30.8263 37.63 30.786 37.7106 30.7297 37.7795C30.6734 37.8484 30.6025 37.904 30.5221 37.9421C30.4417 37.9802 30.3539 38 30.2649 38H21.7349C21.6459 38 21.558 37.9802 21.4776 37.9421C21.3972 37.904 21.3263 37.8484 21.27 37.7795C21.2138 37.7106 21.1735 37.63 21.1522 37.5436C21.1309 37.4572 21.1291 37.3672 21.1469 37.28Z"
                      fill="white"
                      stroke="#202020"
                      stroke-linecap="round"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_dd_2524_509"
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
                      result="effect1_dropShadow_2524_509"
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
                      in2="effect1_dropShadow_2524_509"
                      result="effect2_dropShadow_2524_509"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_2524_509"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_2524_509"
                    x="20.6348"
                    y="23.5"
                    width="21.7305"
                    height="16"
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
                      result="effect1_dropShadow_2524_509"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_2524_509"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_2524_509"
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

              <div className="text-[24px] font-medium">Commodities</div>

              <div className="flex ml-2 items-center rounded-[4px] pr-[4px] bg-[#E8FFF2]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.577 8.60812L10.7437 18.7118"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.1026 14.3001L16.5775 8.60836"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.8848 10.1333L16.5765 8.6082"
                    stroke="#5DBE89"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-[#5DBE89]">4.75 %</div>
              </div>
            </div>
            <div className="text-[#959595] flex gap-[4px] items-center">
              All markets commodities are up in aggregate over the past 3
              months.
            </div>
          </>
        )}
        <div className="flex items-center justify-between my-[20px]">
          <div className="text-[24px] font-medium">10 markets</div>

          {/* <Popover
            isOpen={showOrderMenu}
            positions={"bottom"}
            onClickOutside={() => setShowOrderMenu(false)}
            content={
              <div
                onClick={() => setShowOrderMenu(false)}
                className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              >
                <div className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full">
                  <div className="text-[#666666]">Price: Low to High</div>
                </div>
                <div className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-max">
                  <div className="text-[#666666]">Price: High to Low</div>
                </div>
                <div className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-full">
                  <div className="text-[#666666]">Rating</div>
                </div>
              </div>
            }
          >
            <div
              onClick={() => setShowOrderMenu(true)}
              className="py-[4px] cursor-pointer bg-white rounded-[10px] px-[14px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
            >
              <div className="text-[#666666]">3 months</div>
              <ArrowIconRent />
            </div>
          </Popover> */}
        </div>
        <div className="w-full">
          <table className="w-full">
            <tr className="text-[#8A8A8A] h-[60px] align-middle border-b-[1px] border-[#E3E3E3]">
              <td className="w-[15%] px-[10px]">Market</td>
              <td className="w-[15%]"></td>
              <td className="w-[25%]"></td>

              <td className="w-[15%]">Open interest</td>
              <td className="w-[15%]">Market Sentiment</td>
              <td className="w-[15%]">1D Funding</td>
            </tr>
            {currentMarket === 0 && (
              <tr
                onClick={() => navigate("/perps/markets/realestate/trading")}
                className="hover:bg-[#dddddd] cursor-pointer align-middle h-[70px] border-b-[1px] border-[#E3E3E3]"
              >
                <td className="px-[10px]">
                  <div className="font-medium">Dubai</div>
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="49"
                      height="29"
                      viewBox="0 0 49 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_1060_12491)">
                        <rect
                          x="2"
                          y="1.32031"
                          width="45"
                          height="24"
                          rx="2"
                          fill="#38A569"
                          fill-opacity="0.3"
                        />
                        <circle cx="9" cy="13.3203" r="3" fill="#38A569" />
                        <path
                          d="M16.8608 17.3203V8.59304H18.4418V15.995H22.2855V17.3203H16.8608ZM25.2386 8.59304V17.3203H23.6577V8.59304H25.2386ZM28.1183 8.59304L30.3896 15.4624H30.479L32.7461 8.59304H34.4847L31.408 17.3203H29.4563L26.3839 8.59304H28.1183ZM35.6342 17.3203V8.59304H41.3104V9.91832H37.2152V12.2876H41.0163V13.6129H37.2152V15.995H41.3445V17.3203H35.6342Z"
                          fill="#38A569"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_1060_12491"
                          x="0"
                          y="0.320312"
                          width="49"
                          height="28"
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
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="1" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_1060_12491"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1060_12491"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                    <img alt="" src={UAE} />
                    <div>UAE</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.577 8.60812L10.7437 18.7118"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.1026 14.3001L16.5775 8.60836"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.8848 10.1333L16.5765 8.6082"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="text-[#5DBE89]">4.75 %</div>
                  </div>
                  <div>$928.27</div>
                </td>
                <td>
                  <svg
                    width="160"
                    height="31"
                    viewBox="0 0 160 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M159.469 16.9885C157.528 16.9885 156.44 19.8115 154.5 19.8115C152.56 19.8115 151.472 19.0416 149.531 19.0416C147.591 19.0416 146.503 25.2008 144.562 25.2008C142.622 25.2008 141.534 21.0947 139.594 21.0947C137.653 21.0947 136.565 23.1477 134.625 23.1477C132.685 23.1477 131.597 13.3955 129.656 13.3955C127.716 13.3955 126.628 20.3247 124.687 20.3247C122.747 20.3247 121.659 25.2008 119.719 25.2008C117.778 25.2008 116.69 22.3778 114.75 22.3778C112.81 22.3778 111.722 18.2716 109.781 18.2716C107.841 18.2716 106.753 16.9885 104.812 16.9885C102.872 16.9885 101.784 14.1654 99.8437 14.1654C97.9033 14.1654 96.8154 16.9885 94.875 16.9885C92.9346 16.9885 91.8467 15.7053 89.9062 15.7053C87.9658 15.7053 86.8779 13.1389 84.9375 13.1389C82.9971 13.1389 81.9092 8.77607 79.9688 8.77607C78.0283 8.77607 76.9404 16.9885 75 16.9885C73.0596 16.9885 71.9717 11.3424 70.0312 11.3424C68.0908 11.3424 67.0029 12.8823 65.0625 12.8823C63.1221 12.8823 62.0342 14.9354 60.0937 14.9354C58.1533 14.9354 57.0654 12.8823 55.125 12.8823C53.1846 12.8823 52.0967 0.820312 50.1562 0.820312C48.2158 0.820312 47.1279 8.26279 45.1875 8.26279C43.2471 8.26279 42.1592 16.2185 40.2187 16.2185C38.2783 16.2185 37.1904 20.3247 35.25 20.3247C33.3096 20.3247 32.2217 18.5283 30.2812 18.5283C28.3408 18.5283 27.2529 23.1477 25.3125 23.1477C23.3721 23.1477 22.2842 29.8203 20.3437 29.8203C18.4033 29.8203 17.3154 24.4309 15.375 24.4309C13.4346 24.4309 12.3467 16.7318 10.4062 16.7318C8.46582 16.7318 7.3779 24.1743 5.43748 24.1743C3.49707 24.1743 2.40917 19.8115 0.46875 19.8115"
                      stroke="#5DBE89"
                      stroke-width="1.5"
                    />
                  </svg>
                </td>

                <td>$38 919 276,39</td>
                <td>
                  <span className="text-[#5DBE89]">50.3%</span>
                  <span className="mx-1">/</span>
                  <span className="text-[#EB4245]">49.7%</span>
                </td>
                <td>-0.0981%</td>
              </tr>
            )}
            {currentMarket === 1 && (
              <tr
                onClick={() => navigate("/perps/markets/crypto/trading")}
                className="hover:bg-[#dddddd] cursor-pointer align-middle h-[70px] border-b-[1px] border-[#E3E3E3]"
              >
                <td className="px-[10px]">
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2523_812)">
                        <path
                          d="M21.6628 13.6653C20.1957 19.5643 14.2203 23.1403 8.33665 21.6732C2.45296 20.2061 -1.13838 14.2307 0.328719 8.34706C1.79582 2.44809 7.7712 -1.12797 13.6549 0.339133C19.5539 1.79095 23.1299 7.76633 21.6628 13.6653Z"
                          fill="#F7931A"
                        />
                        <path
                          d="M15.8402 9.43212C16.0542 7.96501 14.9386 7.18562 13.4256 6.65074L13.9146 4.66404L12.7073 4.35839L12.2336 6.28396C11.9127 6.20755 11.5917 6.13114 11.2708 6.05473L11.7598 4.11387L10.5525 3.80823L10.0635 5.79493C9.8037 5.7338 9.54389 5.67267 9.29938 5.61154L7.63361 5.19892L7.31268 6.48263C7.31268 6.48263 8.21433 6.6813 8.18377 6.69658C8.6728 6.81884 8.7645 7.13977 8.74922 7.39957L8.18377 9.66135C8.21433 9.67663 8.26018 9.67663 8.30603 9.7072C8.26018 9.69191 8.22962 9.69192 8.18377 9.67663L7.38909 12.8401C7.32796 12.9929 7.17514 13.2068 6.83893 13.1304C6.85421 13.1457 5.96784 12.9165 5.96784 12.9165L5.37183 14.2919L6.9459 14.6892C7.23627 14.7656 7.52663 14.8421 7.80171 14.9185L7.2974 16.9204L8.5047 17.2261L8.99373 15.2394C9.32994 15.3311 9.63559 15.4075 9.95652 15.4839L9.46748 17.4553L10.6748 17.761L11.1791 15.759C13.2422 16.141 14.7857 15.9882 15.4429 14.1238C15.9625 12.6261 15.4123 11.755 14.3273 11.1896C15.0914 11.0215 15.6874 10.5019 15.8402 9.43212ZM13.0894 13.2985C12.7226 14.7962 10.1858 13.9862 9.37579 13.7876L10.0329 11.1285C10.8582 11.3271 13.4714 11.7397 13.0894 13.2985ZM13.4562 9.41683C13.12 10.777 11.011 10.0893 10.3386 9.92115L10.9346 7.50654C11.6223 7.67465 13.8229 7.99558 13.4562 9.41683Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2523_812">
                          <rect width="22" height="22" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="font-medium">Bitcoin</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.577 8.60812L10.7437 18.7118"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.1026 14.3001L16.5775 8.60836"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.8848 10.1333L16.5765 8.6082"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="text-[#5DBE89]">4.75 %</div>
                  </div>
                  <div>$928.27</div>
                </td>
                <td>
                  <svg
                    width="160"
                    height="31"
                    viewBox="0 0 160 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M159.469 16.9885C157.528 16.9885 156.44 19.8115 154.5 19.8115C152.56 19.8115 151.472 19.0416 149.531 19.0416C147.591 19.0416 146.503 25.2008 144.562 25.2008C142.622 25.2008 141.534 21.0947 139.594 21.0947C137.653 21.0947 136.565 23.1477 134.625 23.1477C132.685 23.1477 131.597 13.3955 129.656 13.3955C127.716 13.3955 126.628 20.3247 124.687 20.3247C122.747 20.3247 121.659 25.2008 119.719 25.2008C117.778 25.2008 116.69 22.3778 114.75 22.3778C112.81 22.3778 111.722 18.2716 109.781 18.2716C107.841 18.2716 106.753 16.9885 104.812 16.9885C102.872 16.9885 101.784 14.1654 99.8437 14.1654C97.9033 14.1654 96.8154 16.9885 94.875 16.9885C92.9346 16.9885 91.8467 15.7053 89.9062 15.7053C87.9658 15.7053 86.8779 13.1389 84.9375 13.1389C82.9971 13.1389 81.9092 8.77607 79.9688 8.77607C78.0283 8.77607 76.9404 16.9885 75 16.9885C73.0596 16.9885 71.9717 11.3424 70.0312 11.3424C68.0908 11.3424 67.0029 12.8823 65.0625 12.8823C63.1221 12.8823 62.0342 14.9354 60.0937 14.9354C58.1533 14.9354 57.0654 12.8823 55.125 12.8823C53.1846 12.8823 52.0967 0.820312 50.1562 0.820312C48.2158 0.820312 47.1279 8.26279 45.1875 8.26279C43.2471 8.26279 42.1592 16.2185 40.2187 16.2185C38.2783 16.2185 37.1904 20.3247 35.25 20.3247C33.3096 20.3247 32.2217 18.5283 30.2812 18.5283C28.3408 18.5283 27.2529 23.1477 25.3125 23.1477C23.3721 23.1477 22.2842 29.8203 20.3437 29.8203C18.4033 29.8203 17.3154 24.4309 15.375 24.4309C13.4346 24.4309 12.3467 16.7318 10.4062 16.7318C8.46582 16.7318 7.3779 24.1743 5.43748 24.1743C3.49707 24.1743 2.40917 19.8115 0.46875 19.8115"
                      stroke="#5DBE89"
                      stroke-width="1.5"
                    />
                  </svg>
                </td>

                <td>$38 919 276,39</td>
                <td>
                  <span className="text-[#5DBE89]">50.3%</span>
                  <span className="mx-1">/</span>
                  <span className="text-[#EB4245]">49.7%</span>
                </td>
                <td>-0.0981%</td>
              </tr>
            )}
            {currentMarket === 2 && (
              <tr
                onClick={() => navigate("/perps/markets/forex/trading")}
                className="hover:bg-[#dddddd] cursor-pointer align-middle h-[70px] border-b-[1px] border-[#E3E3E3]"
              >
                <td className="px-[10px]">
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="22" height="22" rx="11" fill="#02826B" />
                      <g clip-path="url(#clip0_2524_451)">
                        <path
                          d="M13.9096 12.274C13.9096 12.9001 13.7025 13.4393 13.2884 13.8915C12.8742 14.3437 12.3362 14.623 11.6743 14.7294V15.8036C11.6743 15.8609 11.6556 15.9079 11.6181 15.9448C11.5807 15.9816 11.5328 16 11.4745 16H10.6316C10.5775 16 10.5307 15.9806 10.4911 15.9417C10.4516 15.9028 10.4318 15.8568 10.4318 15.8036V14.7294C10.1571 14.6925 9.89175 14.6291 9.63575 14.5391C9.37976 14.449 9.16851 14.358 9.00201 14.2659C8.83551 14.1738 8.6815 14.0756 8.53997 13.9713C8.39845 13.8669 8.30167 13.7902 8.24964 13.7411C8.19761 13.692 8.16119 13.6551 8.14037 13.6306C8.06961 13.5446 8.06545 13.4608 8.12789 13.3789L8.77099 12.5502C8.80013 12.5093 8.848 12.4847 8.9146 12.4766C8.97704 12.4684 9.02699 12.4868 9.06445 12.5318L9.07694 12.5441C9.5473 12.9492 10.053 13.205 10.5942 13.3114C10.7482 13.3441 10.9022 13.3605 11.0562 13.3605C11.3934 13.3605 11.6899 13.2725 11.9459 13.0965C12.2019 12.9206 12.3299 12.6709 12.3299 12.3477C12.3299 12.2331 12.2987 12.1246 12.2363 12.0223C12.1738 11.92 12.1041 11.8341 12.0271 11.7645C11.9501 11.6949 11.8284 11.6182 11.6619 11.5343C11.4954 11.4504 11.358 11.385 11.2498 11.3379C11.1415 11.2908 10.975 11.2243 10.7503 11.1384C10.5879 11.0729 10.4599 11.0218 10.3663 10.9849C10.2726 10.9481 10.1446 10.8939 9.98228 10.8223C9.81994 10.7507 9.68987 10.6872 9.59205 10.632C9.49423 10.5767 9.37664 10.5041 9.23927 10.4141C9.10191 10.324 8.99056 10.2371 8.90523 10.1532C8.8199 10.0693 8.72937 9.96903 8.63363 9.8524C8.53789 9.73577 8.46401 9.61709 8.41198 9.49637C8.35995 9.37565 8.31624 9.23958 8.28086 9.08817C8.24548 8.93676 8.22779 8.77716 8.22779 8.60938C8.22779 8.04464 8.43175 7.54948 8.83967 7.12388C9.2476 6.69829 9.77832 6.42411 10.4318 6.30134V5.19643C10.4318 5.14323 10.4516 5.09719 10.4911 5.05831C10.5307 5.01944 10.5775 5 10.6316 5H11.4745C11.5328 5 11.5807 5.01842 11.6181 5.05525C11.6556 5.09208 11.6743 5.13914 11.6743 5.19643V6.27679C11.9116 6.30134 12.1416 6.3484 12.3643 6.41797C12.587 6.48754 12.768 6.55608 12.9075 6.6236C13.0469 6.69113 13.1791 6.76786 13.304 6.85379C13.4288 6.93973 13.51 6.99907 13.5475 7.03181C13.5849 7.06455 13.6161 7.09319 13.6411 7.11775C13.7119 7.19141 13.7223 7.26916 13.6723 7.351L13.1666 8.24721C13.1333 8.30859 13.0854 8.34133 13.023 8.34542C12.9647 8.3577 12.9085 8.34338 12.8544 8.30246C12.8419 8.29018 12.8117 8.26562 12.7639 8.22879C12.716 8.19196 12.6348 8.13774 12.5204 8.06613C12.4059 7.99451 12.2841 7.92904 12.1551 7.8697C12.0261 7.81036 11.871 7.75716 11.6899 7.7101C11.5089 7.66304 11.3309 7.63951 11.1561 7.63951C10.7607 7.63951 10.4381 7.72749 10.1883 7.90346C9.93858 8.07943 9.8137 8.30655 9.8137 8.58482C9.8137 8.69122 9.83139 8.78943 9.86677 8.87946C9.90215 8.96949 9.96355 9.05441 10.051 9.13421C10.1384 9.21401 10.2206 9.28153 10.2976 9.33677C10.3746 9.39202 10.4911 9.45545 10.6472 9.52706C10.8033 9.59868 10.9293 9.65392 11.025 9.6928C11.1207 9.73168 11.2664 9.78795 11.4621 9.86161C11.6827 9.94345 11.8512 10.0079 11.9678 10.055C12.0843 10.102 12.2425 10.1736 12.4423 10.2698C12.6421 10.366 12.7993 10.4529 12.9137 10.5307C13.0282 10.6084 13.1572 10.7108 13.3008 10.8376C13.4444 10.9645 13.5548 11.0944 13.6318 11.2274C13.7088 11.3604 13.7743 11.5169 13.8284 11.697C13.8825 11.877 13.9096 12.0694 13.9096 12.274Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2524_451">
                          <rect
                            width="6"
                            height="11"
                            fill="white"
                            transform="translate(8 5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <div className="font-medium">Dollar</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.577 8.60812L10.7437 18.7118"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.1026 14.3001L16.5775 8.60836"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.8848 10.1333L16.5765 8.6082"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="text-[#5DBE89]">4.75 %</div>
                  </div>
                  <div>$928.27</div>
                </td>
                <td>
                  <svg
                    width="160"
                    height="31"
                    viewBox="0 0 160 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M159.469 16.9885C157.528 16.9885 156.44 19.8115 154.5 19.8115C152.56 19.8115 151.472 19.0416 149.531 19.0416C147.591 19.0416 146.503 25.2008 144.562 25.2008C142.622 25.2008 141.534 21.0947 139.594 21.0947C137.653 21.0947 136.565 23.1477 134.625 23.1477C132.685 23.1477 131.597 13.3955 129.656 13.3955C127.716 13.3955 126.628 20.3247 124.687 20.3247C122.747 20.3247 121.659 25.2008 119.719 25.2008C117.778 25.2008 116.69 22.3778 114.75 22.3778C112.81 22.3778 111.722 18.2716 109.781 18.2716C107.841 18.2716 106.753 16.9885 104.812 16.9885C102.872 16.9885 101.784 14.1654 99.8437 14.1654C97.9033 14.1654 96.8154 16.9885 94.875 16.9885C92.9346 16.9885 91.8467 15.7053 89.9062 15.7053C87.9658 15.7053 86.8779 13.1389 84.9375 13.1389C82.9971 13.1389 81.9092 8.77607 79.9688 8.77607C78.0283 8.77607 76.9404 16.9885 75 16.9885C73.0596 16.9885 71.9717 11.3424 70.0312 11.3424C68.0908 11.3424 67.0029 12.8823 65.0625 12.8823C63.1221 12.8823 62.0342 14.9354 60.0937 14.9354C58.1533 14.9354 57.0654 12.8823 55.125 12.8823C53.1846 12.8823 52.0967 0.820312 50.1562 0.820312C48.2158 0.820312 47.1279 8.26279 45.1875 8.26279C43.2471 8.26279 42.1592 16.2185 40.2187 16.2185C38.2783 16.2185 37.1904 20.3247 35.25 20.3247C33.3096 20.3247 32.2217 18.5283 30.2812 18.5283C28.3408 18.5283 27.2529 23.1477 25.3125 23.1477C23.3721 23.1477 22.2842 29.8203 20.3437 29.8203C18.4033 29.8203 17.3154 24.4309 15.375 24.4309C13.4346 24.4309 12.3467 16.7318 10.4062 16.7318C8.46582 16.7318 7.3779 24.1743 5.43748 24.1743C3.49707 24.1743 2.40917 19.8115 0.46875 19.8115"
                      stroke="#5DBE89"
                      stroke-width="1.5"
                    />
                  </svg>
                </td>

                <td>$38 919 276,39</td>
                <td>
                  <span className="text-[#5DBE89]">50.3%</span>
                  <span className="mx-1">/</span>
                  <span className="text-[#EB4245]">49.7%</span>
                </td>
                <td>-0.0981%</td>
              </tr>
            )}
            {currentMarket === 3 && (
              <tr
                onClick={() => navigate("/perps/markets/commodities/trading")}
                className="hover:bg-[#dddddd] cursor-pointer align-middle h-[70px] border-b-[1px] border-[#E3E3E3]"
              >
                <td className="px-[10px]">
                  <div className="flex gap-[4px] items-center">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="22" height="22" rx="11" fill="#F6F6F6" />
                      <path
                        opacity="0.62"
                        d="M18.0636 12.4607C18.0296 12.6822 17.8981 12.8811 17.6981 12.9971C17.5717 13.0711 17.4147 13.1621 17.2417 13.2631C16.6328 13.616 15.8284 14.0805 15.463 14.2824C15.2515 14.3994 15.084 14.4739 14.9551 14.5214C14.8911 14.5449 14.8251 14.5589 14.7586 14.5639C14.7571 14.5644 14.7551 14.5644 14.7531 14.5644C14.7501 14.5649 14.7466 14.5649 14.7431 14.5649C14.7361 14.5654 14.7296 14.5659 14.7226 14.5654C14.6706 14.5674 14.6191 14.5634 14.5681 14.5539C14.5676 14.5534 14.5671 14.5539 14.5671 14.5539C14.5376 14.5484 14.5086 14.5409 14.4806 14.5319C14.4376 14.5184 14.3957 14.5004 14.3552 14.4789C14.3347 14.4679 14.3137 14.4564 14.2907 14.4444C14.2767 14.4364 14.2622 14.4289 14.2472 14.4209C14.2427 14.4184 14.2382 14.4159 14.2332 14.4134V14.4129C14.2327 14.4129 14.2322 14.4124 14.2317 14.4124C14.2012 14.3959 14.1682 14.3784 14.1342 14.3594C14.1227 14.3529 14.1112 14.3464 14.0992 14.3404C14.0642 14.3214 14.0272 14.3014 13.9887 14.2799C13.9372 14.2519 13.8832 14.2225 13.8267 14.1915C13.8217 14.189 13.8167 14.186 13.8117 14.1835C13.7882 14.17 13.7642 14.157 13.7398 14.1435C13.7203 14.133 13.7008 14.122 13.6808 14.1115C13.5793 14.056 13.4713 13.9965 13.3578 13.9335C13.3283 13.917 13.2983 13.9005 13.2678 13.8835C13.2598 13.8795 13.2518 13.875 13.2443 13.8705C13.2183 13.8565 13.1918 13.842 13.1653 13.827C13.1598 13.824 13.1543 13.821 13.1483 13.8175C13.1174 13.8005 13.0854 13.783 13.0534 13.765C12.9089 13.685 12.7579 13.601 12.6014 13.5141V13.5136C12.5934 13.5091 12.5849 13.5046 12.5764 13.5001C12.4785 13.4451 12.3785 13.3891 12.2765 13.3321C12.247 13.3156 12.217 13.2991 12.187 13.2821C12.1755 13.2756 12.164 13.2691 12.1525 13.2626C12.1425 13.2571 12.1325 13.2516 12.1225 13.2461C12.0605 13.2111 11.998 13.1761 11.9355 13.1411C11.9171 13.1306 11.8986 13.1201 11.8801 13.1101V13.1096C11.7096 13.0136 11.5361 12.9162 11.3616 12.8172C11.2967 12.7807 11.2322 12.7442 11.1672 12.7072C11.0957 12.6667 11.0242 12.6262 10.9527 12.5852C10.9052 12.5582 10.8582 12.5312 10.8107 12.5047C10.7677 12.4797 10.7242 12.4552 10.6812 12.4307C10.5843 12.3752 10.4878 12.3198 10.3918 12.2648C10.3273 12.2278 10.2638 12.1913 10.2003 12.1548C10.0863 12.0893 9.97336 12.0243 9.86238 11.9598C9.78139 11.9123 9.7014 11.8658 9.62292 11.8203C9.58342 11.7973 9.54443 11.7748 9.50544 11.7518C9.48994 11.7428 9.47494 11.7338 9.45995 11.7254C9.37046 11.6734 9.28297 11.6219 9.19749 11.5709C9.13999 11.5369 9.0835 11.5034 9.02801 11.4704C9.00051 11.4544 8.97302 11.4379 8.94552 11.4219C8.87603 11.3804 8.80854 11.3399 8.74205 11.2999C8.70906 11.2799 8.67656 11.2604 8.64407 11.2409C8.40261 11.0949 8.18564 10.961 8.00217 10.8435C7.97768 10.8275 7.95418 10.8125 7.93068 10.7975C7.8262 10.73 7.73421 10.6685 7.65622 10.6145C7.53424 10.5295 7.44776 10.462 7.40427 10.4171C7.40077 10.4131 7.39726 10.4096 7.39427 10.4061C7.39127 10.4031 7.38827 10.3996 7.38626 10.3966C7.38176 10.3901 7.37827 10.3846 7.37577 10.3796C7.36327 10.3516 7.36027 10.3166 7.36476 10.2751C7.36576 10.2696 7.36627 10.2636 7.36727 10.2576C7.36827 10.2496 7.36977 10.2411 7.37227 10.2321C7.37377 10.2236 7.37577 10.2146 7.37827 10.2056C7.37927 10.2011 7.38077 10.1961 7.38227 10.1911C7.38577 10.1801 7.38926 10.1686 7.39326 10.1566C7.39426 10.1531 7.39526 10.1496 7.39676 10.1461C7.40076 10.1351 7.40526 10.1236 7.40976 10.1121C7.41476 10.0996 7.41976 10.0866 7.42526 10.0736C7.42626 10.0711 7.42776 10.0681 7.42926 10.0646C7.43625 10.0491 7.44325 10.0336 7.45125 10.0171C7.45875 10.0016 7.46625 9.98562 7.47475 9.96962C7.47525 9.96862 7.47575 9.96762 7.47625 9.96712C7.48325 9.95262 7.49125 9.93812 7.49874 9.92363C7.50224 9.91713 7.50574 9.91113 7.50924 9.90463C7.52674 9.87313 7.54524 9.84064 7.56523 9.80764C7.56623 9.80515 7.56773 9.80215 7.56973 9.79965C7.57923 9.78415 7.58873 9.76815 7.59872 9.75215C7.71171 9.56918 7.85268 9.37221 7.99216 9.18874C7.99966 9.17874 8.00716 9.16874 8.01516 9.15874C8.09365 9.05576 8.17164 8.95728 8.24312 8.86879C8.32261 8.77031 8.3946 8.68432 8.45109 8.61733C8.46009 8.60634 8.46909 8.59634 8.47808 8.58634C8.48558 8.57834 8.49308 8.57034 8.50058 8.56234C8.51208 8.54985 8.52458 8.53835 8.53657 8.52685C8.56707 8.49736 8.59956 8.46986 8.63306 8.44437C8.66755 8.41837 8.70305 8.39438 8.74054 8.37238C9.14648 8.13142 10.2118 7.49802 10.7042 7.19806C11.3191 6.82412 11.5061 6.9711 11.5061 6.9711C11.5061 6.9711 16.7993 9.97863 17.2002 10.2056C17.3062 10.2656 17.3922 10.3311 17.4662 10.4126C17.4707 10.4176 17.4747 10.4221 17.4792 10.4271C17.6781 10.656 17.7891 11.0125 17.9626 11.7159C18.0161 11.9348 18.0486 12.1103 18.0666 12.2513C18.0756 12.3222 18.0746 12.3927 18.0636 12.4607Z"
                        fill="#DFB410"
                      />
                      <path
                        d="M17.4789 10.4271C17.0717 11.3253 15.053 11.9999 14.8345 11.9969C14.6037 11.9937 14.5839 11.9099 14.5839 11.9099L9.15032 8.9025C8.59614 8.57212 8.61439 9.21512 8.33829 9.0228C8.17496 8.90904 7.3935 10.4192 7.3759 10.3795C7.24603 10.0873 8.11571 9.0144 8.45104 8.61736C8.50532 8.55291 8.56629 8.49492 8.63321 8.44461C8.66741 8.41834 8.7031 8.3943 8.74028 8.37224C9.14624 8.13134 10.212 7.49786 10.7042 7.19822C11.3191 6.82398 11.5062 6.97095 11.5062 6.97095C11.5062 6.97095 16.7993 9.9785 17.2004 10.2058C17.3121 10.269 17.4021 10.3386 17.4789 10.4271Z"
                        fill="url(#paint0_linear_2524_1427)"
                      />
                      <path
                        d="M14.8346 11.9969L14.7526 14.2965L14.7431 14.565C14.7361 14.5655 14.7296 14.566 14.7226 14.5655C14.6706 14.5675 14.6191 14.5635 14.5681 14.554C14.5676 14.5535 14.5671 14.554 14.5671 14.554C14.5376 14.548 14.5091 14.541 14.4806 14.532C14.4376 14.5185 14.3957 14.5005 14.3552 14.479C14.3347 14.468 14.3137 14.4565 14.2907 14.4445C14.2767 14.437 14.2622 14.429 14.2472 14.421C14.2427 14.4185 14.2382 14.416 14.2332 14.4135C14.2327 14.413 14.2322 14.413 14.2317 14.4125C14.2012 14.396 14.1682 14.3785 14.1342 14.3595C14.1227 14.353 14.1112 14.3465 14.0992 14.3405C14.0642 14.3215 14.0272 14.3015 13.9887 14.28C13.9372 14.2525 13.8832 14.2225 13.8267 14.1915C13.8217 14.189 13.8167 14.186 13.8117 14.1835C13.7882 14.17 13.7642 14.157 13.7398 14.1435C13.7208 14.1335 13.7008 14.1225 13.6808 14.1115C13.5793 14.0561 13.4713 13.9966 13.3578 13.9336C13.3283 13.9171 13.2983 13.9006 13.2678 13.8836C13.2598 13.8796 13.2518 13.8751 13.2443 13.8706C13.2183 13.8566 13.1918 13.8421 13.1653 13.8271C13.1598 13.8241 13.1543 13.8211 13.1483 13.8176C13.1174 13.8006 13.0854 13.7831 13.0534 13.7651C12.9089 13.6851 12.7579 13.6011 12.6014 13.5141C12.5934 13.5091 12.5849 13.5046 12.5764 13.5001C12.4785 13.4452 12.3785 13.3892 12.2765 13.3322C12.247 13.3157 12.217 13.2992 12.187 13.2822C12.1865 13.2822 12.1865 13.2822 12.1865 13.2822C12.175 13.2757 12.164 13.2692 12.1525 13.2627C12.1425 13.2572 12.1325 13.2517 12.1225 13.2462C12.061 13.2117 11.9985 13.1767 11.9355 13.1412C11.9171 13.1307 11.8986 13.1202 11.8801 13.1102V13.1097C11.7096 13.0137 11.5361 12.9162 11.3616 12.8173C11.2967 12.7808 11.2322 12.7443 11.1672 12.7073C11.0957 12.6668 11.0242 12.6263 10.9527 12.5853C10.9052 12.5583 10.8582 12.5313 10.8107 12.5048C10.7677 12.4798 10.7242 12.4553 10.6812 12.4308C10.5843 12.3753 10.4878 12.3198 10.3918 12.2648C10.3273 12.2279 10.2638 12.1914 10.2003 12.1549C10.0863 12.0894 9.97336 12.0239 9.86238 11.9599C9.78139 11.9124 9.7014 11.8659 9.62292 11.8204C9.58342 11.7974 9.54393 11.7744 9.50544 11.7519C9.48994 11.7429 9.47494 11.7339 9.45995 11.7254C9.37096 11.6729 9.28347 11.6215 9.19749 11.571C9.13999 11.537 9.0835 11.5035 9.02801 11.4705C9.00051 11.454 8.97302 11.438 8.94552 11.4215C8.87603 11.3805 8.80854 11.3395 8.74205 11.3C8.70906 11.28 8.67656 11.2605 8.64407 11.241C8.40261 11.0945 8.18564 10.9606 8.00217 10.8436C7.97768 10.8276 7.95418 10.8126 7.93068 10.7976C7.8262 10.7301 7.73421 10.6686 7.65622 10.6146C7.53424 10.5296 7.44776 10.4621 7.40427 10.4171C7.40077 10.4131 7.39726 10.4096 7.39427 10.4061C7.39127 10.4031 7.38827 10.3996 7.38626 10.3966C7.38176 10.3901 7.37827 10.3846 7.37577 10.3796C7.36327 10.3517 7.36027 10.3167 7.36476 10.2752C7.36576 10.2697 7.36627 10.2637 7.36727 10.2577C7.36827 10.2497 7.36977 10.2412 7.37227 10.2322C7.37377 10.2237 7.37577 10.2147 7.37827 10.2057C7.37927 10.2012 7.38077 10.1962 7.38227 10.1912C7.38577 10.1802 7.38926 10.1687 7.39326 10.1567C7.39426 10.1532 7.39526 10.1497 7.39676 10.1462C7.40076 10.1352 7.40526 10.1237 7.40976 10.1122C7.41476 10.0997 7.41976 10.0867 7.42526 10.0737C7.42626 10.0712 7.42776 10.0682 7.42926 10.0647C7.43625 10.0492 7.44325 10.0337 7.45125 10.0172C7.45875 10.0017 7.46625 9.9857 7.47475 9.9697C7.47525 9.9687 7.47575 9.9677 7.47625 9.9672C7.48325 9.95271 7.49125 9.93821 7.49874 9.92371C7.50224 9.91721 7.50574 9.91121 7.50924 9.90471C7.52674 9.87322 7.54524 9.84072 7.56523 9.80773C7.56623 9.80523 7.56773 9.80223 7.56973 9.79973C7.57923 9.78423 7.58873 9.76823 7.59872 9.75224C7.71171 9.56927 7.85268 9.3723 7.99216 9.18882C7.99966 9.17883 8.00716 9.16883 8.01516 9.15883C8.09365 9.05584 8.17164 8.95736 8.24312 8.86888C8.32261 8.77039 8.3946 8.68441 8.45109 8.61742C8.46009 8.60642 8.46909 8.59642 8.47808 8.58643C8.62856 8.63892 8.78903 8.71041 8.96001 8.80239C9.48092 9.08283 14.8346 11.9969 14.8346 11.9969Z"
                        fill="url(#paint1_linear_2524_1427)"
                      />
                      <path
                        d="M18.0637 12.4608C18.0297 12.6822 17.8982 12.8812 17.6982 12.9972C17.5718 13.0712 17.4148 13.1622 17.2418 13.2631C16.6329 13.6161 15.8285 14.0805 15.4631 14.2825C15.2516 14.3995 15.0841 14.474 14.9552 14.5215C14.8912 14.5449 14.8252 14.5589 14.7587 14.5639C14.7572 14.5644 14.7452 14.5649 14.7432 14.5649C14.7427 14.4905 14.7473 14.3978 14.7473 14.2953C14.7468 13.5164 14.7612 12.0603 14.8347 11.9968C14.8797 11.9579 15.3276 11.6314 15.8775 11.2775C16.0215 11.1845 16.1725 11.0895 16.325 10.9975C16.7269 10.755 17.1398 10.5321 17.4663 10.4126C17.4708 10.4176 17.4748 10.4221 17.4793 10.4271C17.6782 10.6561 17.7892 11.0125 17.9627 11.7159C18.0162 11.9349 18.0487 12.1103 18.0667 12.2513C18.0757 12.3223 18.0747 12.3928 18.0637 12.4608Z"
                        fill="url(#paint2_linear_2524_1427)"
                      />
                      <path
                        opacity="0.62"
                        d="M14.2333 14.4131V14.4136C14.1713 14.5051 14.0883 14.5835 13.9888 14.6415C13.8803 14.7045 13.7499 14.7805 13.6059 14.864C12.99 15.2214 12.1336 15.7164 11.7537 15.9268C11.5422 16.0438 11.3747 16.1183 11.2458 16.1658C11.1823 16.1888 11.1158 16.2033 11.0493 16.2083H11.0438C11.0408 16.2088 11.0373 16.2088 11.0343 16.2093C10.9003 16.2168 10.7658 16.1878 10.6458 16.1233C10.6259 16.1123 10.6044 16.1008 10.5819 16.0883C9.68049 15.6024 6.98442 14.1071 5.2362 13.0658C4.68228 12.7353 4.22336 12.4509 3.9474 12.2584C3.78392 12.1449 3.68444 12.0634 3.66694 12.0234C3.53697 11.7315 4.40633 10.6587 4.74178 10.2612C4.75178 10.2492 4.76227 10.2377 4.77327 10.2262C4.78077 10.2177 4.78827 10.2097 4.79627 10.2017C4.80327 10.1942 4.81027 10.1872 4.81776 10.1802C4.82276 10.1752 4.82826 10.1697 4.83376 10.1652C4.84726 10.1522 4.86126 10.1397 4.87526 10.1282C4.89126 10.1142 4.90775 10.1012 4.92425 10.0887C4.95824 10.0622 4.99374 10.0382 5.03123 10.0163C5.2437 9.89027 5.63764 9.65631 6.03457 9.41885C6.39601 9.20338 6.76046 8.98492 6.99492 8.84244C7.60982 8.468 7.79679 8.61498 7.79679 8.61498C7.79679 8.61498 7.96477 8.71046 8.24322 8.86894C9.52752 9.59832 13.1615 11.663 13.4914 11.85C13.5474 11.8815 13.5974 11.9145 13.6434 11.9509C13.6544 11.96 13.6654 11.9689 13.6759 11.9779C13.6954 11.9944 13.7139 12.0119 13.7314 12.0299C13.7389 12.0374 13.7459 12.0449 13.7534 12.0529C13.7544 12.0539 13.7559 12.0554 13.7569 12.0569C13.7614 12.0614 13.7654 12.0664 13.7699 12.0714C13.9688 12.3004 14.0798 12.6563 14.2533 13.3602C14.3073 13.5787 14.3398 13.7542 14.3573 13.8952C14.3813 14.0811 14.3348 14.2641 14.2333 14.4131Z"
                        fill="#DFB410"
                      />
                      <path
                        d="M13.7694 12.0711C13.3622 12.9693 11.3436 13.6439 11.125 13.641C10.8942 13.6377 10.8744 13.554 10.8744 13.554L5.44084 10.5465C4.88667 10.2162 4.90491 10.8592 4.62881 10.6668C4.46549 10.5531 3.68403 12.0632 3.66643 12.0236C3.53656 11.7313 4.40624 10.6584 4.74157 10.2614C4.79584 10.197 4.85681 10.139 4.92373 10.0887C4.95794 10.0624 4.99363 10.0383 5.0308 10.0163C5.43677 9.77538 6.50248 9.1419 6.9947 8.84226C7.60959 8.46802 7.79672 8.61499 7.79672 8.61499C7.79672 8.61499 13.0899 11.6225 13.4909 11.8498C13.6026 11.913 13.6926 11.9827 13.7694 12.0711Z"
                        fill="url(#paint3_linear_2524_1427)"
                      />
                      <path
                        opacity="0.67"
                        d="M13.7561 12.0532C13.5798 12.09 12.5987 12.62 12.5737 12.66L11.4262 13.4031C11.4262 13.4031 11.1397 13.5767 10.9105 13.5346C10.6813 13.4925 5.08165 10.3547 5.08165 10.3547L4.76803 10.2269C4.75903 10.2369 4.77902 10.2134 4.76803 10.2269C4.77202 10.2224 4.77602 10.2179 4.78002 10.2139C4.78552 10.2084 4.8828 10.1104 4.9235 10.085C4.9235 10.085 9.9802 13.034 11.052 12.9735C11.9119 12.925 13.0837 12.1601 13.5136 11.8597C13.6177 11.9093 13.7516 12.0482 13.7561 12.0532Z"
                        fill="#F2E05F"
                      />
                      <path
                        d="M11.125 13.641L11.0338 16.2091C10.9002 16.2168 10.7656 16.1876 10.6457 16.1231C10.6253 16.1122 10.604 16.1008 10.5815 16.0885C9.68006 15.6022 6.98404 14.1072 5.23601 13.0658C4.68184 12.7354 4.22309 12.4509 3.94699 12.2586C3.78366 12.1448 3.68403 12.0633 3.66643 12.0236C3.53656 11.7314 4.40624 10.6585 4.74157 10.2614C4.75049 10.2508 4.75941 10.2406 4.76858 10.2305C4.91902 10.2833 5.07938 10.3544 5.25039 10.4463C5.7716 10.7271 11.125 13.641 11.125 13.641Z"
                        fill="url(#paint4_linear_2524_1427)"
                      />
                      <path
                        opacity="0.53"
                        d="M11.0698 15.1778C11.0703 15.5268 11.0548 15.8462 11.0423 16.0487C11.0398 16.0902 11.0373 16.1262 11.0353 16.1572C11.0348 16.1587 11.0348 16.1602 11.0348 16.1617C11.0333 16.1787 11.0323 16.1942 11.0313 16.2072C11.0173 16.2082 11.0028 16.2087 10.9888 16.2087C10.9743 16.2087 10.9598 16.2082 10.9453 16.2072C10.9308 16.2062 10.9158 16.2052 10.9008 16.2032C10.8863 16.2012 10.8713 16.1987 10.8568 16.1962C10.8423 16.1937 10.8283 16.1902 10.8143 16.1872C10.8138 16.1867 10.8133 16.1867 10.8128 16.1867C10.7998 16.1832 10.7868 16.1797 10.7744 16.1757C10.7689 16.1737 10.7634 16.1722 10.7579 16.1702C10.7529 16.1112 10.7334 15.8732 10.6679 15.0444C10.5599 13.6831 9.65653 13.3861 9.65653 13.3861C9.65653 13.3861 5.34271 10.7171 4.92477 10.879C4.50684 11.0405 3.77895 12.1323 3.77895 12.1323C3.77895 12.1323 3.74346 12.1018 3.69447 12.0593C3.69447 12.0588 3.69397 12.0583 3.69346 12.0583C3.68647 12.0508 3.68097 12.0443 3.67596 12.0383C3.67147 12.0324 3.66797 12.0268 3.66597 12.0219C3.53599 11.7294 4.40535 10.6566 4.7408 10.2596C4.7498 10.2491 4.7588 10.2386 4.76779 10.2286H4.7683C4.89378 10.2721 5.02526 10.3291 5.16473 10.4001L5.24972 10.4446L5.26272 10.4516L5.29422 10.4686L5.33521 10.4901L5.33771 10.4911L5.46119 10.5561L5.92212 10.798C5.92212 10.798 6.0551 10.8745 6.27657 11.0015C6.27857 11.003 6.28057 11.004 6.28307 11.0055C6.36955 11.055 6.46954 11.1125 6.58002 11.1755C7.51987 11.7124 9.25044 12.6128 10.134 13.1427C10.3621 13.2795 10.5519 13.3491 10.6474 13.3821C10.6524 13.3836 10.6574 13.3856 10.6624 13.3876C10.6634 13.3881 10.6639 13.3886 10.6649 13.3891C10.6794 13.3951 10.6939 13.4031 10.7074 13.4121C10.7079 13.4126 10.7089 13.4131 10.7094 13.4136C10.7454 13.4381 10.7779 13.4726 10.8069 13.5151C10.9563 13.7306 11.0258 14.1565 11.0538 14.611C11.0653 14.7994 11.0698 14.9929 11.0698 15.1778Z"
                        fill="#B2791F"
                      />
                      <path
                        d="M14.2334 14.413V14.4135C14.1715 14.505 14.0885 14.5835 13.989 14.6415C13.8805 14.7045 13.75 14.7805 13.606 14.864C12.9901 15.2214 12.1338 15.7163 11.7538 15.9268C11.5424 16.0438 11.3749 16.1183 11.2459 16.1657C11.1824 16.1887 11.1159 16.2032 11.0494 16.2082H11.0439C11.0424 15.7398 11.0424 14.614 11.0754 14.0201C11.0874 13.8051 11.1034 13.6601 11.1254 13.6411C11.1454 13.6241 11.2429 13.5512 11.3934 13.4447C11.4079 13.4342 11.4234 13.4237 11.4389 13.4122C11.4899 13.3767 11.5459 13.3377 11.6058 13.2962C11.6898 13.2382 11.7818 13.1757 11.8803 13.1102V13.1097C11.9703 13.0497 12.0653 12.9872 12.1633 12.9242C12.6872 12.5858 13.3056 12.2219 13.757 12.0569C13.7615 12.0614 13.7655 12.0664 13.77 12.0714C13.969 12.3004 14.08 12.6563 14.2534 13.3602C14.3074 13.5786 14.3399 13.7541 14.3574 13.8951C14.3814 14.0811 14.3349 14.264 14.2334 14.413Z"
                        fill="url(#paint5_linear_2524_1427)"
                      />
                      <path
                        opacity="0.62"
                        d="M14.1727 14.4886C14.2007 13.3068 13.8221 12.6232 13.4903 12.6399C12.7876 12.6751 11.9331 13.3726 11.5591 13.858C11.1847 14.3435 11.2566 16.1518 11.2566 16.1518C11.1932 16.1748 11.1267 16.1893 11.0602 16.1943C11.0587 16.1948 11.0567 16.1948 11.0547 16.1948C11.0527 15.5564 11.0532 13.6992 11.1362 13.6272C11.2241 13.5507 12.8454 12.3799 13.7677 12.043C13.7722 12.048 13.7762 12.0525 13.7807 12.0575C13.9797 12.2864 14.0907 12.6424 14.2642 13.3463C14.3182 13.5652 14.3507 13.7407 14.3682 13.8817C14.3971 14.1061 14.3227 14.3276 14.1727 14.4886Z"
                        fill="#825804"
                      />
                      <path
                        opacity="0.3"
                        d="M10.8679 14.7242C10.8679 14.006 10.2856 13.4238 9.56738 13.4238C10.2856 13.4238 10.8679 12.8415 10.8679 12.1233C10.8679 12.8415 11.4501 13.4238 12.1683 13.4238C11.4501 13.4238 10.8679 14.006 10.8679 14.7242Z"
                        fill="white"
                      />
                      <path
                        d="M10.8678 14.1187C10.8678 13.7349 10.5567 13.4237 10.1729 13.4237C10.5567 13.4237 10.8678 13.1126 10.8678 12.7288C10.8678 13.1126 11.179 13.4237 11.5628 13.4237C11.179 13.4237 10.8678 13.7349 10.8678 14.1187Z"
                        fill="white"
                      />
                      <path
                        opacity="0.67"
                        d="M17.8529 12.8439C17.8809 11.6621 17.5023 10.9786 17.1705 10.9952C16.4678 11.0304 15.6132 11.728 15.2393 12.2134C14.8649 12.6988 14.9368 14.5072 14.9368 14.5072C14.8733 14.5302 14.8068 14.5447 14.7403 14.5497C14.7388 14.5502 14.7368 14.5502 14.7349 14.5502C14.7328 13.9118 14.7334 12.0546 14.8163 11.9826C14.9043 11.9061 16.5256 10.7353 17.4479 10.3983C17.4524 10.4033 17.4564 10.4078 17.4609 10.4128C17.6599 10.6418 17.7709 10.9977 17.9443 11.7016C17.9983 11.9206 18.0308 12.096 18.0483 12.237C18.0773 12.4615 18.0028 12.683 17.8529 12.8439Z"
                        fill="#996B07"
                      />
                      <path
                        opacity="0.6"
                        d="M5.95117 9.47381L12.0797 12.9793L12.4119 12.7648L6.16584 9.34302L5.95117 9.47381Z"
                        fill="#664814"
                      />
                      <path
                        opacity="0.6"
                        d="M12.0796 12.9793C12.0796 12.9793 12.6596 13.5806 13.5712 13.0779C14.4879 12.5724 15.8259 11.686 15.8259 11.686C15.8259 11.686 16.146 11.4366 16.1662 11.2074C16.1865 10.9782 13.4599 12.505 13.4599 12.505C13.4599 12.505 12.9038 12.8285 12.8836 12.8251C12.8634 12.8218 12.3444 12.7948 12.3444 12.7948L12.0796 12.9793Z"
                        fill="#664814"
                      />
                      <path
                        opacity="0.67"
                        d="M17.4617 10.4051C17.2853 10.4419 16.3043 10.9719 16.2793 11.0119L15.1317 11.7551C15.1317 11.7551 14.8453 11.9286 14.6161 11.8865C14.3869 11.8444 8.78722 8.70668 8.78722 8.70668L8.47359 8.57887C8.46459 8.58887 8.48459 8.56537 8.47359 8.57887C8.47759 8.57437 8.48159 8.56987 8.48559 8.56587C8.49109 8.56037 8.58837 8.46233 8.62907 8.43689C8.62907 8.43689 13.6858 11.3859 14.7576 11.3254C15.6175 11.2769 16.7893 10.5121 17.2192 10.2116C17.3232 10.2612 17.4572 10.4001 17.4617 10.4051Z"
                        fill="#F2E05F"
                      />
                      <path
                        opacity="0.3"
                        d="M6.73783 11.9166C6.73783 11.4921 6.39372 11.148 5.96924 11.148C6.39372 11.148 6.73783 10.8039 6.73783 10.3794C6.73783 10.8039 7.08193 11.148 7.50642 11.148C7.08193 11.148 6.73783 11.4921 6.73783 11.9166Z"
                        fill="white"
                      />
                      <path
                        d="M6.73789 11.5588C6.73789 11.3319 6.55399 11.148 6.32715 11.148C6.55399 11.148 6.73789 10.9642 6.73789 10.7373C6.73789 10.9642 6.92178 11.148 7.14863 11.148C6.92178 11.148 6.73789 11.3319 6.73789 11.5588Z"
                        fill="white"
                      />
                      <path
                        opacity="0.62"
                        d="M16.247 10.9011C16.2465 10.9106 16.246 10.9196 16.245 10.9286C16.243 10.9541 16.2395 10.9796 16.2345 11.0046C16.2325 11.0161 16.23 11.0276 16.227 11.0386C16.2245 11.0501 16.2215 11.0616 16.218 11.0726C16.2125 11.0936 16.2055 11.1135 16.1975 11.1336C16.192 11.1476 16.1865 11.1615 16.18 11.175C16.1615 11.216 16.1395 11.2555 16.113 11.2925C16.0935 11.3215 16.0716 11.3485 16.0466 11.3745C16.0351 11.388 16.0216 11.4015 16.0081 11.4135C15.9971 11.424 15.9861 11.434 15.9741 11.4435C15.9431 11.4695 15.9096 11.493 15.8736 11.5135C15.3002 11.8474 14.1074 12.5393 13.6384 12.7988C13.427 12.9158 13.2595 12.9903 13.1305 13.0378C13.067 13.0608 13.0005 13.0752 12.934 13.0802C12.9325 13.0807 12.9305 13.0808 12.9285 13.0808C12.9255 13.0813 12.922 13.0813 12.9191 13.0813H12.917C12.9031 13.0823 12.8886 13.0827 12.8746 13.0827C12.8601 13.0827 12.8456 13.0822 12.8311 13.0813C12.8166 13.0803 12.8016 13.0793 12.7866 13.0773C12.7721 13.0753 12.7571 13.0728 12.7426 13.0703C12.7281 13.0678 12.7141 13.0643 12.7001 13.0613C12.6996 13.0608 12.6991 13.0608 12.6986 13.0608C12.6856 13.0573 12.6726 13.0538 12.6601 13.0498C12.6546 13.0478 12.6491 13.0463 12.6436 13.0443C12.6226 13.0373 12.6016 13.0293 12.5811 13.0198C12.5741 13.0168 12.5671 13.0138 12.5601 13.0103C12.5501 13.0053 12.5406 13.0003 12.5306 12.9953C12.5106 12.9843 12.4891 12.9728 12.4666 12.9608C11.5653 12.4744 8.86919 10.9796 7.12097 9.93775C6.56706 9.6078 6.10813 9.32285 5.83217 9.13088C5.81167 9.11688 5.79267 9.10288 5.77418 9.08988C5.75568 9.07638 5.73818 9.06388 5.72169 9.05138C5.68919 9.02739 5.66069 9.00539 5.6372 8.9854C5.62521 8.9754 5.6147 8.9664 5.6052 8.9574C5.59571 8.9489 5.58721 8.9409 5.58021 8.9334C5.58021 8.9329 5.57971 8.9324 5.57921 8.9324C5.57221 8.9249 5.56672 8.91841 5.56171 8.9124C5.55721 8.90641 5.55372 8.90091 5.55172 8.89591C5.42574 8.61246 6.23811 7.59661 6.59405 7.17268C6.60505 7.15918 6.61605 7.14618 6.62655 7.13369C6.63555 7.12319 6.64455 7.11269 6.65354 7.10269C6.65754 7.0982 6.66154 7.0937 6.66554 7.08969C6.67104 7.08419 6.67604 7.0787 6.68154 7.0742C6.69053 7.0642 6.69953 7.0547 6.70903 7.0462C6.71253 7.0427 6.71553 7.0397 6.71903 7.0367C6.73253 7.0237 6.74603 7.01171 6.76003 7.00021C6.77603 6.98621 6.79252 6.97322 6.80902 6.96072C6.84301 6.93472 6.87851 6.91073 6.916 6.88873C6.99299 6.84323 7.09348 6.78324 7.20946 6.71475C7.22545 6.70526 7.24145 6.69576 7.25795 6.68576C7.27445 6.67576 7.29144 6.66576 7.30844 6.65576C7.32544 6.64576 7.34293 6.63527 7.36043 6.62477C7.37793 6.61477 7.39543 6.60377 7.41342 6.59327C7.46691 6.56128 7.52291 6.52828 7.57989 6.49429C7.62689 6.4658 7.67538 6.4373 7.72437 6.4078C7.85085 6.33232 7.98083 6.25483 8.10831 6.17884C8.31028 6.05836 8.50575 5.94088 8.67072 5.8409C8.68722 5.8314 8.70372 5.8214 8.71922 5.8119C8.77721 5.77641 8.8312 5.74391 8.87969 5.71442C9.49459 5.34048 9.68157 5.48745 9.68157 5.48745C9.68157 5.48745 14.9747 8.49498 15.3762 8.72195C15.3842 8.72645 15.3917 8.73095 15.3992 8.73545C15.4302 8.75394 15.4597 8.77244 15.4872 8.79244C15.4942 8.79744 15.5007 8.80193 15.5071 8.80744C15.5566 8.84393 15.6006 8.88392 15.6416 8.92892C15.6461 8.93392 15.6501 8.93842 15.6546 8.94342C15.6701 8.96141 15.6851 8.97991 15.6996 8.99941C15.8711 9.22987 15.9781 9.58332 16.1381 10.2322C16.192 10.4512 16.2245 10.6267 16.242 10.7676C16.248 10.8126 16.2495 10.8571 16.247 10.9011Z"
                        fill="#DFB410"
                      />
                      <path
                        d="M15.6546 8.94339C15.6361 8.98439 15.6141 9.02488 15.5891 9.06487C15.1457 9.77576 13.7464 10.3257 13.2065 10.4737C13.1105 10.5002 13.0415 10.5136 13.01 10.5131C12.7791 10.5102 12.7596 10.4262 12.7596 10.4262L12.6926 10.3892L12.0217 10.0177C12.0212 10.0172 12.0202 10.0172 12.0197 10.0167L8.46576 8.04953C8.46576 8.04953 8.46526 8.04953 8.46526 8.04903L7.61889 7.5806C7.61339 7.5776 7.60789 7.5746 7.60289 7.57161C7.59439 7.5671 7.5859 7.5626 7.57739 7.55761L7.34693 7.43013L7.34243 7.42763L7.32593 7.41864C7.28943 7.39664 7.25544 7.37914 7.22345 7.36514L7.22095 7.36414C7.21945 7.36365 7.21795 7.36314 7.21645 7.36265C7.21595 7.36215 7.21545 7.36215 7.21495 7.36165C7.08647 7.30816 6.99499 7.31515 6.92399 7.34915C6.75002 7.43014 6.69603 7.6661 6.51406 7.53912C6.35059 7.42514 5.56921 8.93541 5.55172 8.89591C5.42574 8.61246 6.23811 7.59661 6.59405 7.17268C6.60505 7.15918 6.61605 7.14618 6.62655 7.13369C6.63554 7.12319 6.64455 7.11269 6.65404 7.10269C6.65755 7.0982 6.66154 7.0937 6.66554 7.08969C6.67104 7.08419 6.67604 7.0787 6.68154 7.0742C6.69054 7.0642 6.69954 7.0547 6.70904 7.0462C6.71254 7.0427 6.71554 7.0397 6.71904 7.0367C6.73254 7.0237 6.74603 7.01171 6.76003 7.00021C6.77603 6.98621 6.79253 6.97322 6.80902 6.96072C6.84302 6.93472 6.87851 6.91073 6.91601 6.88873C6.99299 6.84323 7.09348 6.78324 7.20946 6.71475C7.22546 6.70526 7.24145 6.69576 7.25795 6.68576C7.27445 6.67576 7.29145 6.66576 7.30844 6.65576C7.32544 6.64576 7.34294 6.63527 7.36044 6.62477C7.37793 6.61477 7.39543 6.60377 7.41343 6.59327C7.46692 6.56128 7.52291 6.52828 7.5799 6.49429C7.62689 6.4658 7.67538 6.4373 7.72438 6.4078C7.85086 6.33232 7.98083 6.25483 8.10832 6.17884C8.31029 6.05836 8.50575 5.94088 8.67073 5.8409C8.68723 5.8314 8.70322 5.8214 8.71922 5.8119C8.77721 5.77641 8.8312 5.74391 8.87969 5.71442C9.4946 5.34048 9.68157 5.48745 9.68157 5.48745C9.68157 5.48745 14.9747 8.49498 15.3762 8.72195C15.3842 8.72645 15.3917 8.73095 15.3992 8.73545C15.4302 8.75394 15.4597 8.77244 15.4872 8.79244C15.4942 8.79744 15.5007 8.80193 15.5072 8.80743C15.5566 8.84393 15.6006 8.88392 15.6416 8.92892C15.6461 8.93389 15.6501 8.93839 15.6546 8.94339Z"
                        fill="url(#paint6_linear_2524_1427)"
                      />
                      <path
                        d="M12.9555 12.0519L12.9281 12.8278V12.8303L12.921 13.0312C12.9205 13.0327 12.9205 13.0342 12.9205 13.0357L12.919 13.0812H12.917C12.9031 13.0822 12.8886 13.0827 12.8746 13.0827C12.8601 13.0827 12.8456 13.0822 12.8311 13.0812C12.8166 13.0802 12.8016 13.0792 12.7866 13.0772C12.7721 13.0752 12.7571 13.0727 12.7426 13.0702C12.7281 13.0677 12.7141 13.0642 12.7001 13.0612C12.6996 13.0607 12.6991 13.0607 12.6986 13.0607C12.6856 13.0572 12.6726 13.0537 12.6601 13.0497C12.6546 13.0477 12.6491 13.0462 12.6436 13.0442C12.6226 13.0372 12.6016 13.0292 12.5811 13.0197C12.5741 13.0167 12.5671 13.0137 12.5601 13.0102C12.5501 13.0052 12.5406 13.0002 12.5306 12.9952C12.5106 12.9842 12.4891 12.9727 12.4666 12.9607C11.5653 12.4743 8.86919 10.9796 7.12097 9.93772C6.56706 9.60777 6.10813 9.32281 5.83217 9.13084C5.81167 9.11684 5.79267 9.10285 5.77418 9.08985C5.75568 9.07635 5.73818 9.06385 5.72169 9.05135C5.68919 9.02736 5.66069 9.00536 5.6372 8.98536C5.62521 8.97537 5.6147 8.96637 5.6052 8.95737C5.59571 8.94887 5.5872 8.94087 5.58021 8.93337C5.58021 8.93287 5.57971 8.93237 5.57921 8.93237C5.57221 8.92487 5.56672 8.91838 5.56171 8.91237C5.55721 8.90637 5.55372 8.90087 5.55172 8.89588C5.42574 8.61242 6.23811 7.59658 6.59405 7.17265C6.60505 7.15915 6.61605 7.14615 6.62655 7.13365C6.63555 7.12316 6.64455 7.11266 6.65354 7.10266H6.65404C6.77952 7.14615 6.91101 7.20315 7.05048 7.27413L7.13547 7.31863L7.14847 7.32563L7.17996 7.34262L7.19746 7.35212C7.20296 7.35512 7.20896 7.35812 7.21496 7.36162C7.21546 7.36212 7.21596 7.36212 7.21646 7.36262C7.29994 7.40761 7.42293 7.4741 7.5774 7.55759C7.5859 7.56259 7.5944 7.56709 7.6029 7.57159C7.6079 7.57459 7.61339 7.57759 7.61889 7.58059C7.77387 7.66507 7.95734 7.76506 8.16231 7.87554C8.16431 7.87704 8.16631 7.87804 8.16881 7.87954C8.2553 7.92903 8.35478 7.98652 8.46526 8.04902C8.46526 8.04952 8.46576 8.04952 8.46576 8.04952C9.40562 8.58643 11.1188 9.55728 12.0197 10.0167C12.0202 10.0172 12.0212 10.0172 12.0217 10.0177C12.2577 10.1382 12.4381 10.2232 12.5331 10.2562C12.5381 10.2577 12.5431 10.2597 12.5481 10.2617C12.5491 10.2622 12.5496 10.2627 12.5506 10.2632C12.5651 10.2712 12.5791 10.2787 12.5931 10.2862C12.5936 10.2867 12.5946 10.2872 12.5951 10.2877C12.6311 10.3122 12.6636 10.3467 12.6926 10.3892C12.7066 10.4091 12.7201 10.4311 12.7326 10.4551C12.8546 10.6846 12.9141 11.073 12.9396 11.4845V11.485C12.951 11.6734 12.9555 11.8669 12.9555 12.0519Z"
                        fill="url(#paint7_linear_2524_1427)"
                      />
                      <path
                        d="M16.0467 11.3744C15.9977 11.4284 15.9397 11.4754 15.8737 11.5134C15.3003 11.8474 14.1075 12.5393 13.6386 12.7987C13.4271 12.9157 13.2596 12.9902 13.1307 13.0377C13.0672 13.0607 13.0007 13.0752 12.9342 13.0802C12.9327 13.0807 12.9307 13.0807 12.9287 13.0807C12.9267 12.4423 12.9272 10.5851 13.0102 10.5131C13.0982 10.4366 14.7194 9.26578 15.6418 8.92883C15.6463 8.93383 15.6503 8.93833 15.6548 8.94333C15.8537 9.1723 15.9647 9.52824 16.1382 10.2321C16.1922 10.4511 16.2247 10.6266 16.2422 10.7675C16.2712 10.992 16.1967 11.2135 16.0467 11.3744Z"
                        fill="url(#paint8_linear_2524_1427)"
                      />
                      <path
                        opacity="0.53"
                        d="M12.9556 12.0519C12.9561 12.3988 12.9406 12.7168 12.9281 12.9192V12.9227C12.9256 12.9642 12.9231 13.0002 12.9211 13.0312C12.9206 13.0327 12.9206 13.0342 12.9206 13.0357C12.9191 13.0527 12.9181 13.0682 12.9171 13.0812C12.9031 13.0822 12.8886 13.0827 12.8746 13.0827C12.8601 13.0827 12.8456 13.0822 12.8311 13.0812C12.8166 13.0802 12.8016 13.0792 12.7866 13.0772C12.7721 13.0752 12.7571 13.0727 12.7426 13.0702C12.7281 13.0677 12.7141 13.0642 12.7001 13.0612C12.6996 13.0607 12.6991 13.0607 12.6986 13.0607C12.6856 13.0572 12.6726 13.0537 12.6601 13.0497C12.6546 13.0477 12.6491 13.0462 12.6436 13.0442C12.6386 12.9852 12.6191 12.7473 12.5536 11.9184C12.4456 10.5571 11.5423 10.2602 11.5423 10.2602C11.5423 10.2602 7.22845 7.59108 6.81052 7.75306C6.39258 7.91453 5.6647 9.00636 5.6647 9.00636C5.6647 9.00636 5.6292 8.97586 5.58021 8.93337C5.58021 8.93287 5.57971 8.93237 5.57921 8.93237C5.57221 8.92487 5.56672 8.91837 5.56171 8.91237C5.55721 8.90637 5.55372 8.90087 5.55172 8.89588C5.42574 8.61242 6.23811 7.59658 6.59405 7.17265C6.60505 7.15915 6.61605 7.14615 6.62655 7.13365C6.63554 7.12316 6.64455 7.11266 6.65354 7.10266H6.65404C6.77952 7.14615 6.911 7.20314 7.05048 7.27413L7.13547 7.31863L7.14847 7.32563L7.17996 7.34262L7.19746 7.35212L7.22095 7.36412L7.22346 7.36512L7.34243 7.4276L7.34693 7.4301L7.80786 7.67207C7.80786 7.67207 7.94084 7.74855 8.1623 7.87553C8.1643 7.87703 8.1663 7.87803 8.1688 7.87953C8.25529 7.92903 8.35477 7.98652 8.46526 8.04901C8.46526 8.04951 8.46576 8.04951 8.46576 8.04951C9.40561 8.58643 11.1188 9.55727 12.0197 10.0167C12.0202 10.0172 12.0212 10.0172 12.0217 10.0177C12.2577 10.1382 12.4381 10.2232 12.5331 10.2562C12.5381 10.2577 12.5431 10.2597 12.5481 10.2617C12.5491 10.2622 12.5496 10.2627 12.5506 10.2632C12.5651 10.2692 12.5796 10.2772 12.5931 10.2862C12.5936 10.2867 12.5946 10.2872 12.5951 10.2877C12.6311 10.3122 12.6636 10.3467 12.6926 10.3891C12.7066 10.4091 12.7201 10.4311 12.7326 10.4551C12.8546 10.6846 12.9141 11.073 12.9396 11.4845V11.485C12.9511 11.6734 12.9556 11.8669 12.9556 12.0519Z"
                        fill="#B2791F"
                      />
                      <path
                        opacity="0.67"
                        d="M15.6414 8.92889C15.465 8.96574 14.484 9.49574 14.459 9.53574L13.3114 10.2789C13.3114 10.2789 13.0249 10.4524 12.7958 10.4103C12.5666 10.3682 6.96691 7.23048 6.96691 7.23048L6.65328 7.10267C6.64428 7.11267 6.66428 7.08918 6.65328 7.10267C6.65728 7.09818 6.66128 7.09368 6.66528 7.08967C6.67078 7.08417 6.76806 6.98614 6.80875 6.96069C6.80875 6.96069 11.8655 9.90973 12.9373 9.84924C13.7972 9.80074 14.969 9.03586 15.3989 8.73541C15.5029 8.78501 15.6369 8.92389 15.6414 8.92889Z"
                        fill="#F2E05F"
                      />
                      <path
                        opacity="0.67"
                        d="M16.0467 11.3744C16.0747 10.1926 15.6962 9.50911 15.3643 9.52574C14.6616 9.56096 13.8071 10.2585 13.4331 10.7439C13.0587 11.2293 13.1307 13.0377 13.1307 13.0377C13.0672 13.0607 13.0007 13.0752 12.9342 13.0802C12.9327 13.0807 12.9307 13.0807 12.9287 13.0807C12.9267 12.4423 12.9272 10.5851 13.0102 10.5131C13.0982 10.4366 14.7194 9.26578 15.6418 8.92883C15.6463 8.93383 15.6503 8.93833 15.6548 8.94333C15.8537 9.1723 15.9647 9.52824 16.1382 10.2321C16.1922 10.4511 16.2247 10.6266 16.2422 10.7675C16.2712 10.992 16.1967 11.2135 16.0467 11.3744Z"
                        fill="#AF7F08"
                      />
                      <path
                        opacity="0.3"
                        d="M12.8833 12.0102C12.8833 11.1354 12.1741 10.4262 11.2993 10.4262C12.1741 10.4262 12.8833 9.71708 12.8833 8.84229C12.8833 9.71708 13.5924 10.4262 14.4672 10.4262C13.5924 10.4262 12.8833 11.1354 12.8833 12.0102Z"
                        fill="white"
                      />
                      <path
                        d="M12.8831 11.2727C12.8831 10.8052 12.5041 10.4262 12.0366 10.4262C12.5041 10.4262 12.8831 10.0472 12.8831 9.57971C12.8831 10.0472 13.2621 10.4262 13.7296 10.4262C13.2621 10.4262 12.8831 10.8052 12.8831 11.2727Z"
                        fill="white"
                      />
                      <path
                        opacity="0.3"
                        d="M10.4638 7.07783C10.4638 6.57952 10.0598 6.17557 9.56152 6.17557C10.0598 6.17557 10.4638 5.77162 10.4638 5.27332C10.4638 5.77162 10.8677 6.17557 11.366 6.17557C10.8677 6.17557 10.4638 6.57952 10.4638 7.07783Z"
                        fill="white"
                      />
                      <path
                        d="M10.4636 6.65783C10.4636 6.39153 10.2477 6.17565 9.98145 6.17565C10.2477 6.17565 10.4636 5.95978 10.4636 5.69348C10.4636 5.95978 10.6795 6.17565 10.9458 6.17565C10.6795 6.17565 10.4636 6.39153 10.4636 6.65783Z"
                        fill="white"
                      />
                      <path
                        opacity="0.78"
                        d="M7.20952 6.71472C7.20952 6.71472 12.1894 7.40235 14.2116 8.06966C16.2338 8.73697 10.7335 8.8583 10.228 8.75719C9.72242 8.65608 6.80908 6.96068 6.80908 6.96068L7.20952 6.71472Z"
                        fill="#F5E223"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2524_1427"
                          x1="8.90665"
                          y1="5.65795"
                          x2="15.1322"
                          y2="14.0489"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FFDD57" />
                          <stop offset="0.9963" stop-color="#F2C422" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_2524_1427"
                          x1="12.9411"
                          y1="15.0455"
                          x2="10.7557"
                          y2="10.4541"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#A17403" />
                          <stop offset="0.9963" stop-color="#402C07" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_2524_1427"
                          x1="18.1691"
                          y1="15.1129"
                          x2="15.1113"
                          y2="11.2231"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B88703" />
                          <stop offset="0.9963" stop-color="#B07B0E" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_2524_1427"
                          x1="7.7029"
                          y1="12.9629"
                          x2="9.05628"
                          y2="11.4291"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#EDC010" />
                          <stop offset="0.9963" stop-color="#E6B710" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_2524_1427"
                          x1="9.23174"
                          y1="16.6897"
                          x2="7.04629"
                          y2="12.0982"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B38203" />
                          <stop offset="0.9963" stop-color="#C88C10" />
                        </linearGradient>
                        <linearGradient
                          id="paint5_linear_2524_1427"
                          x1="12.1203"
                          y1="17.0057"
                          x2="13.5358"
                          y2="9.80678"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B37F0A" />
                          <stop offset="1" stop-color="#806221" />
                        </linearGradient>
                        <linearGradient
                          id="paint6_linear_2524_1427"
                          x1="7.08229"
                          y1="4.17415"
                          x2="13.308"
                          y2="12.5653"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FFCE12" />
                          <stop offset="0.9963" stop-color="#D9AD10" />
                        </linearGradient>
                        <linearGradient
                          id="paint7_linear_2524_1427"
                          x1="11.0154"
                          y1="13.6102"
                          x2="8.82991"
                          y2="9.01866"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#B38203" />
                          <stop offset="0.9963" stop-color="#C88C10" />
                        </linearGradient>
                        <linearGradient
                          id="paint8_linear_2524_1427"
                          x1="16.3479"
                          y1="13.6268"
                          x2="13.29"
                          y2="9.73675"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#E0A403" />
                          <stop offset="0.9963" stop-color="#C88C10" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="font-medium">Gold</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.577 8.60812L10.7437 18.7118"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.1026 14.3001L16.5775 8.60836"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.8848 10.1333L16.5765 8.6082"
                        stroke="#5DBE89"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="text-[#5DBE89]">4.75 %</div>
                  </div>
                  <div>$928.27</div>
                </td>
                <td>
                  <svg
                    width="160"
                    height="31"
                    viewBox="0 0 160 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M159.469 16.9885C157.528 16.9885 156.44 19.8115 154.5 19.8115C152.56 19.8115 151.472 19.0416 149.531 19.0416C147.591 19.0416 146.503 25.2008 144.562 25.2008C142.622 25.2008 141.534 21.0947 139.594 21.0947C137.653 21.0947 136.565 23.1477 134.625 23.1477C132.685 23.1477 131.597 13.3955 129.656 13.3955C127.716 13.3955 126.628 20.3247 124.687 20.3247C122.747 20.3247 121.659 25.2008 119.719 25.2008C117.778 25.2008 116.69 22.3778 114.75 22.3778C112.81 22.3778 111.722 18.2716 109.781 18.2716C107.841 18.2716 106.753 16.9885 104.812 16.9885C102.872 16.9885 101.784 14.1654 99.8437 14.1654C97.9033 14.1654 96.8154 16.9885 94.875 16.9885C92.9346 16.9885 91.8467 15.7053 89.9062 15.7053C87.9658 15.7053 86.8779 13.1389 84.9375 13.1389C82.9971 13.1389 81.9092 8.77607 79.9688 8.77607C78.0283 8.77607 76.9404 16.9885 75 16.9885C73.0596 16.9885 71.9717 11.3424 70.0312 11.3424C68.0908 11.3424 67.0029 12.8823 65.0625 12.8823C63.1221 12.8823 62.0342 14.9354 60.0937 14.9354C58.1533 14.9354 57.0654 12.8823 55.125 12.8823C53.1846 12.8823 52.0967 0.820312 50.1562 0.820312C48.2158 0.820312 47.1279 8.26279 45.1875 8.26279C43.2471 8.26279 42.1592 16.2185 40.2187 16.2185C38.2783 16.2185 37.1904 20.3247 35.25 20.3247C33.3096 20.3247 32.2217 18.5283 30.2812 18.5283C28.3408 18.5283 27.2529 23.1477 25.3125 23.1477C23.3721 23.1477 22.2842 29.8203 20.3437 29.8203C18.4033 29.8203 17.3154 24.4309 15.375 24.4309C13.4346 24.4309 12.3467 16.7318 10.4062 16.7318C8.46582 16.7318 7.3779 24.1743 5.43748 24.1743C3.49707 24.1743 2.40917 19.8115 0.46875 19.8115"
                      stroke="#5DBE89"
                      stroke-width="1.5"
                    />
                  </svg>
                </td>

                <td>$38 919 276,39</td>
                <td>
                  <span className="text-[#5DBE89]">50.3%</span>
                  <span className="mx-1">/</span>
                  <span className="text-[#EB4245]">49.7%</span>
                </td>
                <td>-0.0981%</td>
              </tr>
            )}
          </table>
        </div>
        <div className="w-full items-center justify-between flex mt-2">
          <div>1-3 of 3</div>
          <div className="flex items-center gap-1">
            <ArrowToLeft />
            <div>1</div>
            <ArrowToRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  BathRoomIconRent,
  BedIconRent,
  FavoriteIconRent,
  GuestsIcon,
  HeartIconRent,
  NUSDIcon,
  PinIcon,
  UnHeartIconRent,
} from "../../AssetComponents/Images";
import { PurpleButton } from "../Buttons/PurpleButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { api } from "../functions/Api";
import { setConnectModal } from "../../ReduxSlices/ModalSlice";
// import ConfettiExplosion from "react-confetti-explosion";
import { Mainnet } from "@nibiruchain/nibijs";
import { updateToken, addToken } from "../functions/Functions";

const renderCustomPrevArrow = (onClickHandler, hasPrev, label) => {
  return (
    <div
      onClick={onClickHandler}
      disabled={!hasPrev}
      className="custom-arrow custom-prev-arrow p-1 rounded-full bg-[#ffffff80] hover:bg-[#ffffff]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.75 9H14.25"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.5 12.75L3.75 9"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.5 5.25L3.75 9"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

// Custom render function for next arrow
const renderCustomNextArrow = (onClickHandler, hasNext, label) => {
  return (
    <div
      onClick={onClickHandler}
      disabled={!hasNext}
      className="custom-arrow custom-next-arrow p-1 rounded-full bg-[#ffffff80] hover:bg-[#ffffff]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.25 9H3.75"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.5 12.75L14.25 9"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.5 5.25L14.25 9"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export const RentalItem = ({
  token_id,
  tokenData,
  onClick,
  imageHeight = 180,
  priceHide,
  showArrow = true,
  onlyImages,
  // status = 0,
  rentingPeriod = [],
  traveler,
  borderNone,
  confetti = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [avgRate, setAvgRate] = useState();
  const token = useSelector((state) => state.nft.nfts[token_id]);
  const account = useSelector((state) => state.auth.account);
  const [wishlisted, setWishlisted] = useState(false);
  const [status, setStatus] = useState();
  const diff = useSelector((state) => state.time.diffToUTC);
  const dispatch = useDispatch();
  const mainnet = Mainnet();
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

  const decideStatus = async () => {
    if (!token) {
      await getToken();
      return;
    }

    for (let i = 0; i < token.rentals.rentals.length; i++) {
      if (
        token.rentals.rentals[i].renting_period[0] === rentingPeriod[0] &&
        token.rentals.rentals[i].renting_period[1] === rentingPeriod[1] &&
        token.rentals.rentals[i].address === traveler
      ) {
        if (token.rentals.rentals[i].cancelled) {
          setStatus(2);
          return;
        } else if (token.rentals.rentals[i].approved) {
          if (new Date().getTime() / 1000 < rentingPeriod[1] - diff) {
            setStatus(0);
            return;
          } else {
            setStatus(3);
            return;
          }
        } else if (!token.rentals.rentals[i].approved) {
          if (new Date().getTime() / 1000 < rentingPeriod[0] - diff) {
            setStatus(1);
            return;
          } else {
            setStatus(4);
            return;
          }
        }
      }
    }
  };
  useEffect(() => {
    if (rentingPeriod.length === 2 && traveler) decideStatus();
    else setStatus(null);
  }, [rentingPeriod, traveler, token_id, token]);

  const getReview = async () => {
    const res = await api("review/get", {
      token_id: token_id,
    });
    if (!res) return;
    let avgRate_ = 0;
    for (let i = 0; i < res.length; i++) {
      avgRate_ += res[i].rate;
    }
    setAvgRate((avgRate_ / res.length).toFixed(1));
  };

  const addToWistlist = async () => {
    if (!account) {
      dispatch(setConnectModal(true));
      return;
    }
    const res = await api("user/addToWishlist", {
      account: account,
      token_id: token_id,
    });
    if (res) await checkWistlist();
    await addToken(account, token_id, mainnet.endptTm, dispatch);
  };

  const checkWistlist = async () => {
    const res = await api("user/checkWishlist", {
      account: account,
      token_id: token_id,
    });
    setWishlisted(res);
  };
  useEffect(() => {
    if (token_id) {
      getReview();
      if (account) checkWistlist();
    }
  }, [token_id, account]);

  return (
    <div
      className={
        !borderNone
          ? "hover:bg-[#AAAAAA30] select-none relative group bg-white w-full max-w-[300px] min-w-[240px] rounded-[8px] h-max p-[10px] shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.8),2px_2px_6px_0px_rgba(187,195,206,0.6)]"
          : "hover:bg-[#AAAAAA30] select-none relative group bg-white w-full max-w-[300px] min-w-[240px] rounded-t-[8px] h-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.8),2px_2px_6px_0px_rgba(187,195,206,0.6)]"
      }
    >
      {borderNone ? (
        <img
          alt=""
          src={(token || tokenData)?.metaData.images[0]}
          className="w-full h-full rounded-t-[8px]"
        />
      ) : (
        <Carousel
          showStatus={false}
          showArrows={showArrow}
          showThumbs={false}
          renderArrowPrev={renderCustomPrevArrow}
          renderArrowNext={renderCustomNextArrow}
        >
          {(token || tokenData)?.metaData.images.map((image, i) => {
            return (
              <div
                className={`h-[${imageHeight}px] rounded-[6px] relative`}
                key={i}
              >
                <div className="w-full h-full absolute group-hover:bg-[#00000030] top-0 left-0 rounded-[6px]"></div>

                <img
                  alt=""
                  src={image}
                  className={`h-[${imageHeight}px] rounded-[6px]`}
                />
              </div>
            );
          })}
        </Carousel>
      )}
      {/* {wishlisted && confetti && (
        <ConfettiExplosion
          className="top-6 right-6 absolute"
          width={400}
          particleCount={30}
          force={0.1}
          // height={}
          particleSize={5}
          duration={2200}
          colors={["#5b1dee", "#4E59FA", "#24DBFE"]}
        />
      )} */}
      <div
        className="w-max h-max"
        onClick={(e) => {
          e.stopPropagation();
          addToWistlist();
        }}
      >
        {wishlisted ? (
          <HeartIconRent
            tooltip="removeFromWishlist"
            className={
              !borderNone
                ? "absolute right-[20px] top-[20px] cursor-pointer"
                : "absolute right-[10px] top-[10px] cursor-pointer"
            }
          />
        ) : (
          <UnHeartIconRent
            tooltip="addToWishlist"
            className={
              !borderNone
                ? "absolute right-[20px] top-[20px] cursor-pointer"
                : "absolute right-[10px] top-[10px] cursor-pointer"
            }
          />
        )}
      </div>
      <div
        className={
          !borderNone
            ? "absolute left-[20px] top-[20px]"
            : "absolute left-[10px] top-[10px]"
        }
      >
        {status === 0 && (
          <div className="p-1 text-[#38A569] gap-1 bg-white rounded-full border-[1px] border-[#38A569] flex items-center pr-[8px]">
            <div className="p-1 rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.54167 9.91667L2.625 7"
                  stroke="#38A569"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.3763 4.08331L5.54297 9.91665"
                  stroke="#38A569"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div className="text-[15px] font-light">Approved</div>
          </div>
        )}

        {status === 1 && (
          <div className="p-1 text-[#F8BC30] gap-1 bg-white rounded-full border-[1px] border-[#F8BC30] flex items-center pr-[8px]">
            <div className="p-1 rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.0013 7.34167V8.75001"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.34323 6.65833L2.35156 7.64999"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.65833 5.00002H1.25"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.35156 2.34998L3.34323 3.34164"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.0013 2.5V1.25"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.98828 3.01248L7.65078 2.34998"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75 5.00002H8.125"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.65078 7.64999L7.42995 7.42915"
                  stroke="#F8BC30"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div className="text-[15px] font-light">Pending Approval</div>
          </div>
        )}

        {status === 2 && (
          <div className="p-1 text-[#DB1F22] gap-1 bg-white rounded-full border-[1px] border-[#DB1F22] flex items-center pr-[8px]">
            <div className="p-1 rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <svg
                className="w-[10px]"
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <path
                    id="Path"
                    d="M1.5 1L10.5 10"
                    stroke="#DB1F22"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Path_2"
                    d="M1.5 10L10.5 1"
                    stroke="#DB1F22"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>

            <div className="text-[15px] font-light">Canceled</div>
          </div>
        )}

        {status === 3 && (
          <div className="p-1 text-[#38A569] gap-1 bg-white rounded-full border-[1px] border-[#38A569] flex items-center pr-[8px]">
            <div className="p-1 rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.54167 9.91667L2.625 7"
                  stroke="#38A569"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.3763 4.08331L5.54297 9.91665"
                  stroke="#38A569"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div className="text-[15px] font-light">Completed</div>
          </div>
        )}

        {status === 4 && (
          <div className="p-1 text-[#DB1F22] gap-1 bg-white rounded-full border-[1px] border-[#DB1F22] flex items-center pr-[8px]">
            <div className="p-1 rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.7487 1.75V2.91667"
                  stroke="#DB1F22"
                  stroke-width="1.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.08464 1.75V2.91667"
                  stroke="#DB1F22"
                  stroke-width="1.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.75 5.24998H11.0833"
                  stroke="#DB1F22"
                  stroke-width="1.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.0833 5.83331V4.08331C11.0833 3.11673 10.2999 2.33331 9.33333 2.33331H3.5C2.53342 2.33331 1.75 3.11673 1.75 4.08331V9.33331C1.75 10.2999 2.53342 11.0833 3.5 11.0833H5.83333"
                  stroke="#DB1F22"
                  stroke-width="1.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.1445 9.32343V10.3489L10.9507 10.8407"
                  stroke="#DB1F22"
                  stroke-width="1.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.207 12.8333C8.75745 12.8333 7.58203 11.6585 7.58203 10.2083C7.58203 8.78848 8.78953 7.58156 10.2094 7.58331C11.6584 7.58448 12.832 8.75931 12.832 10.2083C12.832 11.6579 11.6572 12.8333 10.207 12.8333"
                  stroke="#DB1F22"
                  stroke-width="1.1"
                />
              </svg>
            </div>

            <div className="text-[15px] font-light">Expired</div>
          </div>
        )}
      </div>
      {!onlyImages && (
        <div className="space-y-[10px] mt-2">
          {!priceHide && (
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-[4px]">
                <NUSDIcon className="w-[20px]" />
                <div>
                  {(token || tokenData)?.short.price_per_day} USDC /night
                </div>
              </div>
              <div className="flex items-center gap-[10px]">
                <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                  <FavoriteIconRent />
                </div>
                <div className="text-[#959595]">{avgRate}</div>
              </div>
            </div>
          )}

          <div className="flex gap-[10px] items-center">
            <PinIcon />
            <div className="text-[#959595] w-full truncate">
              {/* {(token || tokenData)?.metaData.address.city}, {(token || tokenData)?.metaData.address.state} */}
              {(token || tokenData)?.metaData.addressString}
            </div>
          </div>
          <div className="flex items-center gap-[8px] w-full ">
            <div className="flex items-center gap-[8px]">
              <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                <GuestsIcon />
              </div>
              <div className="text-[#959595]">
                {(token || tokenData)?.metaData.essentials.guests}
              </div>
            </div>
            <div className="w-[1px] h-[20px] bg-[#959595]"></div>
            <div className="flex items-center gap-[8px]">
              <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                <BathRoomIconRent />
              </div>
              <div className="text-[#959595]">
                {(token || tokenData)?.metaData.essentials.bathrooms}
              </div>
            </div>
            <div className="w-[1px] h-[20px] bg-[#959595]"></div>

            <div className="flex items-center gap-[8px]">
              <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                <BedIconRent />
              </div>
              <div className="text-[#959595]">
                {(token || tokenData)?.metaData.essentials.beds}
              </div>
            </div>

            <div className="w-[1px] h-[20px] bg-[#959595]"></div>

            <div className="flex items-center gap-[8px]">
              <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 7.33333H14.6667V9.99999C13.1939 9.99999 12 8.80609 12 7.33333Z"
                    stroke="#202020"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.3337 2C13.1746 2 14.667 3.49238 14.667 5.33333V10.6667C14.667 12.5076 13.1746 14 11.3337 14H6.00033C4.15938 14 2.66699 12.5076 2.66699 10.6667V5.33333C2.66699 3.49239 4.15938 2 6.00033 2H11.3337Z"
                    stroke="#202020"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.66732 10.6667V14"
                    stroke="#202020"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.67122 7.33333V2"
                    stroke="#202020"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.33366 7.33333H2.66699"
                    stroke="#323232"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="text-[#959595]">
                {(token || tokenData)?.metaData.essentials.square}
              </div>
              <div className="text-[#959595] text-[14px] items-top flex">
                <span>M</span>
                <span className="text-[10px] top-0">2</span>
              </div>
            </div>
          </div>
          <PurpleButton
            text={
              <div
                className="text-center"
                onClick={
                  onClick
                    ? onClick
                    : () => {
                        navigate(location.pathname + "/" + token_id);
                      }
                }
              >
                View Details
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

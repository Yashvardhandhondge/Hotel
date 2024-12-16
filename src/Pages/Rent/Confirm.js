import { NumericFormat } from "react-number-format";
import {
  ArrowToLeft,
  ArrowToRightIcon,
  CalendarIconRent,
  ColoredCalender,
  FavoriteIconRent,
  NUSDIcon,
  CheckInIcon,
  CheckOutIcon,
  UserBoxIcon,
  CheckMarkIcon,
  BookingDateIcon,
  UsersIcon,
  CopyIcon,
  Logo,
} from "../../AssetComponents/Images";
import { PurpleButton } from "../../Components/Buttons/PurpleButton";
import { PickDate } from "../../Components/Reserve/PickDate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BlackButton } from "../../Components/Buttons/BlackButton";
import { useState, useSyncExternalStore } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../Components/functions/Api";
import { useEffect } from "react";
import {
  getIdFromHash,
  truncateWalletAddress,
} from "../../Components/functions/Functions";
import addDays from "date-fns/addDays";
import converter from "number-to-words";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { executeContract } from "../../Components/functions/Contract";
import { Mainnet, Testnet } from "@nibiruchain/nibijs";
import { setConnectModal } from "../../ReduxSlices/ModalSlice";
import { getChatId } from "../../Components/functions/Functions";
import Modal from "react-responsive-modal";
import { RentalItem } from "../../Components/RealEstateProperty/RentalItem";
import { Bounce, Slide } from "react-awesome-reveal";
import Skeleton from "react-loading-skeleton";
import { updateToken } from "../../Components/functions/Functions";

export const Confirm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [profile, setProfile] = useState();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.auth.profile);
  const reservation_period = useSelector((state) => state.reservation.period);
  const reservation_guests = useSelector((state) => state.reservation.guests);
  const diffToUTC = useSelector((state) => state.time.diffToUTC);
  const currentProfile = useSelector((state) => state.auth.profile);
  const [descriptionShow, setDescriptionShow] = useState(false);

  const fee = useSelector((state) => state.reservation.fee);
  const token = useSelector((state) => state.nft.nfts[params.id]);

  const mainnet = Mainnet();
  const getToken = async () => {
    if (!token)
      await updateToken(
        {
          token_id: params.id,
          contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
        },
        mainnet.endptTm,
        dispatch
      );
  };

  useEffect(() => {
    getToken();
  }, []);

  const [tryAfterConnect, setTryAfterConnect] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [code, setCode] = useState();
  const account = useSelector((state) => state.auth.account);
  const [avgRate, setAvgRate] = useState();
  const [countReviews, setCountReviews] = useState();
  const [receipt, setReceipt] = useState();

  const getProfile = async (wallet) => {
    const profile = await api("profile/getProfile", {
      walletAddress: wallet,
    });
    setProfile(profile);
  };

  const getReview = async () => {
    const res = await api("review/get", {
      token_id: params.id,
    });
    if (!res) return;
    let avgRate = 0;
    for (let i = 0; i < res.length; i++) {
      avgRate += res[i].rate;
    }
    setAvgRate((avgRate / res.length).toFixed(1));
    setCountReviews(res.length);
  };

  useEffect(() => {
    if (params.id) getReview();
  }, [params.id]);

  useEffect(() => {
    getProfile(token?.access?.owner);
  }, [token]);

  const handleReserve = async () => {
    if (!account) {
      dispatch(setConnectModal(true));
      setTryAfterConnect(true);
      return;
    }
    // if (currentProfile?.ID === "" || !currentProfile?.ID) {
    //   toast.error("Please upload your profile to mint new NFT!");
    //   return;
    // }
    const message = {
      set_reservation_for_short_term: {
        token_id: params.id,
        renting_period: [
          (reservation_period.start + diffToUTC).toString(),
          (reservation_period.end + diffToUTC).toString(),
        ],
        guests: reservation_guests,
      },
    };

    // const message = {
    //   set_reservation_for_long_term: {
    //     token_id: params.id,
    //     renting_period: [
    //       (reservation_period.start + diffToUTC).toString(),
    //       (reservation_period.end + diffToUTC).toString(),
    //     ],
    //     guests: reservation_guests,
    //   },
    // };

    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diffToUTC) * 1000
    );

    const hash = await executeContract(
      {
        name: myProfile.Name?.replace("/", " "),
        date:
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(reservation_period.start * 1000)) +
          "~" +
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(reservation_period.end * 1000)),
        checkin: token?.metaData.checkIn,
        checkout: token?.metaData.checkOut,
        image: token?.metaData.images[0],
        buildingName: token?.metaData.buildingName,
        price: Math.round(
          Math.round(
            (reservation_period.end - reservation_period.start) / 86400
          ) * token?.short.price_per_day
        ).toString(),
        detail: `https://test.codedestate.com/dashboard/traveler/trips/${
          params.id
        }?from=${(reservation_period.start + diffToUTC).toString()}&to=${(
          reservation_period.end + diffToUTC
        ).toString()}`,
        approved: token?.short.auto_approve,
      },
      {
        type: 1,
        amount: Math.round(
          Math.round(
            (reservation_period.end - reservation_period.start) / 86400
          ) * token?.short.price_per_day
        ).toString(),
      },
      currentTime,
      Mainnet().chainId,
      Mainnet().endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      params.id,
      token?.access.owner,
      message,
      account,
      "leap",
      [
        {
          amount: (
            ((reservation_period.end - reservation_period.start) / 86400) *
              token?.short.price_per_day +
            (fee *
              (((reservation_period.end - reservation_period.start) / 86400) *
                token?.short.price_per_day)) /
              10000
          ).toString(),
          denom: process.env.REACT_APP_USDC_DENOM,
        },
      ]
    );
    if (hash) setTxHash(hash);
  };

  useEffect(() => {
    if (account === token?.access.owner) navigate(-1);
    else if (account && tryAfterConnect) handleReserve();
  }, [account]);

  const fetchCode = async (hash) => {
    const res = await getIdFromHash(hash);
    setCode(res);
  };

  useEffect(() => {
    if (txHash) fetchCode(txHash);
  }, [txHash]);

  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-auto">
      {!receipt && (
        <div className="mx-auto my-[20px] max-w-[1200px] w-[80vw] flex flex-col space-y-[16px]">
          {/* <div className="flex items-center gap-[10px]">
            <div
              className="cursor-pointer text-[#A4A4A4]"
              onClick={() => navigate("/rent/short")}
            >
              Rent
            </div>
            <ArrowToRightIcon />
            <div className="text-[#A4A4A4]">Los Angeles, CA</div>
            <ArrowToRightIcon />

            <BlackButton text="Confirmation and pay" />
          </div> */}
          {!txHash && (
            <div
              onClick={() => navigate(-1)}
              className="cursor-pointer hover:bg-[#f6f6f6] rounded-[16px] p-[16px] w-full bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
            >
              <div className="flex gap-[10px] items-center">
                <ArrowToLeft />
                <div className="font-semibold text-[20px]">
                  Confirmation and pay
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mx-auto my-[20px] gap-[20px] max-w-[1200px] w-[80vw] flex">
        {!txHash ? (
          <Slide>
            <div className="bg-white p-[16px] h-max space-y-[12px] rounded-[16px] min-w-[55%] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="text-[20px] font-semibold">Your trip</div>
              <div className="flex items-center justify-between gap-[10px]">
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-[6px]">
                    <CalendarIconRent />
                    <div>Dates</div>
                  </div>
                  <div className="text-[#666666]">
                    {new Date(
                      reservation_period.start * 1000
                    )?.toLocaleDateString("en-US", {
                      // year: "numeric",
                      month: "short",
                      day: "numeric",
                    }) +
                      "~" +
                      new Date(
                        reservation_period.end * 1000
                      )?.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-[6px]">
                    <UserBoxIcon />
                    <div>Guest</div>
                  </div>
                  <div className="text-[#666666]">
                    {reservation_guests} guest
                  </div>
                </div>
              </div>
              <hr />
              <div className="text-[20px] font-semibold">Pay with</div>
              <div className="w-[80%] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div className="flex items-center gap-[20px]">
                  <NUSDIcon />
                  <div>USDC</div>
                </div>
                <NumericFormat
                  value={
                    Math.round(
                      (reservation_period.end - reservation_period.start) /
                        86400
                    ) *
                      token?.short.price_per_day +
                    (fee *
                      (Math.round(
                        (reservation_period.end - reservation_period.start) /
                          86400
                      ) *
                        token?.short.price_per_day)) /
                      10000
                  }
                  thousandSeparator
                  displayType="text"
                />
              </div>
              <hr className="w-[80%]" />
              <div>Message the host</div>
              <div className="font-normal text-[#5A5A5A]">
                Share why you’re traveling, who’s coming with you, and what you
                love about the space.
              </div>
              <div className="flex items-center justify-between">
                <div className="gap-[10px] flex justify-between items-center">
                  {profile?.Avatar ? (
                    <img
                      alt="Avatar"
                      className="w-[50px] rounded-full"
                      src={profile?.Avatar}
                    />
                  ) : (
                    <Skeleton
                      width={50}
                      height={50}
                      style={{ borderRadius: "100px" }}
                    />
                  )}
                  <div>
                    <div>{profile?.Name?.replace("/", " ")}</div>
                    <div className="text-[#959595]">
                      {truncateWalletAddress(token?.access?.owner)}
                    </div>
                  </div>
                  <div className="text-[#959595] font-thin">
                    Joined in{" "}
                    {profile?.created
                      ? new Date(profile?.created)?.toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                          }
                        )
                      : ""}
                  </div>
                </div>
                <PurpleButton
                  text="Go to Inbox"
                  onClick={async () => {
                    let path = "";
                    const chat = await getChatId(
                      account,
                      token?.access.owner,
                      params.id,
                      "short"
                    );

                    path = "/dashboard/traveler/inbox";

                    if (chat) navigate(path + "?chat=" + chat);
                    else
                      navigate(
                        path +
                          `?id=${params.id}&receiver=${token?.access.owner}`
                      );
                  }}
                />
              </div>
              <hr />
              <div className="text-[20px] font-semibold">
                Cancellation policy
              </div>
              <div className="flex">
                <div>Free cancellation before approval.</div>
                <div className="text-[#5A5A5A] font-normal">
                  Cancel before check-in on{" "}
                  {new Date(
                    reservation_period.start * 1000
                  )?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  for a partial refund.
                </div>
              </div>
              <div>
                {token?.short?.cancellation.map((item) =>
                  addDays(reservation_period.start * 1000, -item.deadline) >
                  new Date() ? (
                    <div>
                      {item.percentage} % refundable until{" "}
                      <b>
                        {addDays(
                          reservation_period.start * 1000,
                          -item.deadline
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </b>
                    </div>
                  ) : (
                    <div>
                      {item.percentage} % refundable until{" "}
                      <b>
                        {addDays(
                          reservation_period.start * 1000,
                          -item.deadline
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </b>
                      {/* <span className="ml-1">(not refundable)</span> */}
                    </div>
                  )
                )}
              </div>
              <hr />
              <div className="text-[20px] font-semibold">Ground rules</div>
              <div className="text-[#5A5A5A] font-normal">
                We ask every guest to remember a few simple things about what
                makes a great guest.
              </div>
              <div>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#202020]"></div>
                  <div className="font-normal">Follow the house rules</div>
                </div>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[4px] h-[4px] rounded-full bg-[#202020]"></div>
                  <div className="font-normal">
                    Treat your Host’s home like your own.
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-center gap-[20px] items-start">
                <div className="w-max rounded-[4px] p-[6px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <ColoredCalender />
                </div>
                <div className="w-max max-w-[80%]">
                  <div className=" font-semibold">
                    Your reservation won’t be confirmed until the Host accepts
                    your request (within 24 hours)
                  </div>
                  <div className="text-[#5A5A5A] w-max">
                    You won't be charged until then
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="bg-white p-[16px] h-max space-y-[16px] rounded-[16px] w-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="bg-white p-[8px] rounded-[16px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <img
                  alt=""
                  src={token?.metaData.images[0]}
                  className="w-full min-h-[240px] rounded-[10px]"
                />
                {/* <RentalItem token_id={params.id} onlyImages /> */}
                <div className="text-[#959595]">
                  {token?.metaData.buildingName}
                </div>
                <div className="truncate max-w-[20vw]">
                  {token?.metaData.addressString}
                </div>
                {/* <div className="w-full flex justify-start my-2">
                  <BlackButton
                    text="Show Full description"
                    onClick={() => setDescriptionShow(true)}
                  />
                </div> */}
                <Modal
                  open={descriptionShow}
                  onClose={() => setDescriptionShow(false)}
                  center
                  classNames={{
                    modal:
                      "min-w-[400px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
                  }}
                >
                  <div>
                    <div className="text-[20px] font-bold mb-2">
                      Description
                    </div>
                    <div className="max-h-[50vh] overflow-auto scrollbarwidth">
                      {token?.metaData.description}
                    </div>
                  </div>
                </Modal>
                <div className="flex items-center gap-[8px]">
                  <FavoriteIconRent />
                  <div>{avgRate}</div>
                  <div className="text-[#959595]">
                    ({countReviews ? countReviews : "No"} reviews)
                  </div>
                </div>
              </div>
              <PickDate />
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-[10px]">
                  <CheckInIcon />
                  <div>Check in Hours</div>
                </div>
                <div className="text-[#666666]">
                  After {token?.metaData.checkIn}
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-[10px]">
                  <CheckOutIcon />
                  <div>Check out Hours</div>
                </div>
                <div className="text-[#666666]">
                  After {token?.metaData.checkOut}
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="font-semibold">Minimum Stay</div>
                <div className="font-semibold">
                  {token?.short.minimum_stay} nights
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="text-[#959595]">Rent per day</div>
                <div className="flex items-center gap-[10px]">
                  <NUSDIcon />
                  <div>{token?.short.price_per_day} USDC</div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center w-full">
                <div className="text-[#959595]">Fee</div>
                <div className="flex items-center gap-[10px]">
                  <NUSDIcon />
                  <div>
                    {(fee *
                      (Math.round(
                        (reservation_period.end - reservation_period.start) /
                          86400
                      ) *
                        token?.short.price_per_day)) /
                      10000}{" "}
                    USDC
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="text-[#959595]">Total payment</div>
                <div className="flex items-center gap-[10px]">
                  <NUSDIcon />
                  <div>
                    {Math.round(
                      (reservation_period.end - reservation_period.start) /
                        86400
                    ) * token?.short.price_per_day}{" "}
                    USDC
                  </div>
                  <div className="text-[12px] text-[#959595]">
                    /{" "}
                    {Math.round(
                      (reservation_period.end - reservation_period.start) /
                        86400
                    )}{" "}
                    days
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center w-full">
                <div className="font-semibold">Total (USDC)</div>
                <div className="flex items-center gap-[10px]">
                  <NUSDIcon />
                  <div className="text-[#5b1dee] font-semibold text-[20px]">
                    {Math.round(
                      (reservation_period.end - reservation_period.start) /
                        86400
                    ) *
                      token?.short.price_per_day +
                      (fee *
                        (Math.round(
                          (reservation_period.end - reservation_period.start) /
                            86400
                        ) *
                          token?.short.price_per_day)) /
                        10000}
                  </div>
                  <div>USDC</div>
                </div>
              </div>
              <PurpleButton
                text={
                  <div className="text-center" onClick={handleReserve}>
                    Reserve Now
                  </div>
                }
              />
            </div>
          </Slide>
        ) : (
          <>
            {receipt ? (
              <div className="space-y-4 w-[600px] mx-auto flex flex-col items-center p-[16px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <Logo className="w-[140px]" />
                <div className="w-full flex items-center gap-2">
                  {token?.short.auto_approve ? (
                    <>
                      <svg
                        className="w-[30px]"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_672_36261)">
                          <rect
                            x="3"
                            y="3"
                            width="32"
                            height="32"
                            rx="16"
                            fill="#38A569"
                          />
                          <rect
                            x="3"
                            y="3"
                            width="32"
                            height="32"
                            rx="16"
                            fill="url(#paint0_linear_672_36261)"
                            fill-opacity="0.18"
                          />
                          <rect
                            x="3.25"
                            y="3.25"
                            width="31.5"
                            height="31.5"
                            rx="15.75"
                            stroke="white"
                            stroke-opacity="0.2"
                            stroke-width="0.5"
                          />
                          <path
                            d="M25.5 15L17.5 23L13 18.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_672_36261"
                            x="0"
                            y="0"
                            width="38"
                            height="38"
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
                            <feMorphology
                              radius="3"
                              operator="dilate"
                              in="SourceAlpha"
                              result="effect1_dropShadow_672_36261"
                            />
                            <feOffset />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.0784314 0 0 0 0 0.807843 0 0 0 0 0.326431 0 0 0 0.1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_672_36261"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_672_36261"
                              result="shape"
                            />
                          </filter>
                          <linearGradient
                            id="paint0_linear_672_36261"
                            x1="19"
                            y1="3"
                            x2="19"
                            y2="23.6667"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="text-[18px] font-semibold">
                        Your reservation is completed!
                      </div>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-[30px]"
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_672_36281)">
                          <rect
                            x="3"
                            y="3"
                            width="32"
                            height="32"
                            rx="16"
                            fill="#FFB300"
                          />
                          <rect
                            x="3"
                            y="3"
                            width="32"
                            height="32"
                            rx="16"
                            fill="url(#paint0_linear_672_36281)"
                            fill-opacity="0.18"
                          />
                          <rect
                            x="3.25"
                            y="3.25"
                            width="31.5"
                            height="31.5"
                            rx="15.75"
                            stroke="white"
                            stroke-opacity="0.2"
                            stroke-width="0.5"
                          />
                          <path
                            d="M19 24.6201V28.0001"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.0206 22.98L12.6406 25.36"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.38 19H10"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.6406 12.6401L15.0206 15.0201"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19 13V10"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M23.7695 14.2301L25.3595 12.6401"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M28 19H26.5"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M25.3607 25.3602L24.8307 24.8302"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_672_36281"
                            x="0"
                            y="0"
                            width="38"
                            height="38"
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
                            <feMorphology
                              radius="3"
                              operator="dilate"
                              in="SourceAlpha"
                              result="effect1_dropShadow_672_36281"
                            />
                            <feOffset />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.807843 0 0 0 0 0.603608 0 0 0 0 0.0784314 0 0 0 0.1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_672_36281"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_672_36281"
                              result="shape"
                            />
                          </filter>
                          <linearGradient
                            id="paint0_linear_672_36281"
                            x1="19"
                            y1="3"
                            x2="19"
                            y2="23.6667"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="white" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="text-[18px] font-semibold">
                        Your reservation is requested
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full flex justify-between items-center">
                  <div>
                    <span>Hello</span>
                    <span className="font-semibold ml-1">
                      {myProfile?.Name?.replace("/", " ")}
                    </span>
                  </div>
                  <PurpleButton
                    text="See Status"
                    onClick={() => navigate("/dashboard/traveler/trips")}
                  />
                </div>
                {token?.short.auto_approve ? (
                  <div className="w-full">
                    Your reservation has been confirmed
                  </div>
                ) : (
                  <div className="w-full">
                    Your reservation has been requested to host
                  </div>
                )}

                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-[6px]">
                    <BookingDateIcon />
                    <div className="font-semibold">Booking date</div>
                  </div>
                  <div className="text-[#666666] font-normal">
                    {new Date(
                      reservation_period.start * 1000
                    )?.toLocaleDateString("en-US", {
                      // year: "numeric",
                      month: "short",
                      day: "numeric",
                    }) +
                      "~" +
                      new Date(
                        reservation_period.end * 1000
                      )?.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-[4px]">
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
                        d="M7.99994 21.0001V21.0001C9.10794 21.0001 10.0069 20.1021 10.0079 18.9941L10.0119 14.9501C10.9759 14.5281 11.8469 13.8221 12.4229 12.7161C13.3369 10.9621 13.1619 8.75807 11.9189 7.22007C9.88894 4.70907 6.09094 4.71507 4.06994 7.23807C2.83294 8.78107 2.66394 10.9861 3.58694 12.7351C4.16494 13.8311 5.03394 14.5351 5.99594 14.9541L5.99194 18.9891C5.99094 20.0991 6.88994 21.0001 7.99994 21.0001V21.0001Z"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.27252 10.3462C8.27252 10.1832 8.14052 10.0522 7.97852 10.0522C7.81552 10.0532 7.68452 10.1852 7.68452 10.3472C7.68452 10.5102 7.81652 10.6412 7.97852 10.6412C8.14052 10.6412 8.27252 10.5092 8.27252 10.3462"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.263 5.632C13.263 4.178 12.085 3 10.631 3V3C9.178 3 8 4.178 8 5.632V10.052"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.3984 6.66612L11.8484 6.21612C12.6294 5.43512 13.8954 5.43512 14.6764 6.21612L20.4134 11.9531C21.1944 12.7341 21.1944 14.0001 20.4134 14.7811L17.7664 17.4281C16.9854 18.2091 15.7194 18.2091 14.9384 17.4281L11.4854 13.9751"
                        stroke="#202020"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="font-semibold">Reservation code</div>
                  </div>
                  <div className="text-[#666666] font-normal">
                    {code?.toUpperCase().slice(-10)}
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-[6px]">
                    <CheckInIcon />
                    <div className="font-semibold">Check in Hours</div>
                  </div>
                  <div className="text-[#666666] font-normal">
                    After {token?.metaData.checkIn}
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-[6px]">
                    <CheckOutIcon />
                    <div className="font-semibold">Check out Hours</div>
                  </div>
                  <div className="text-[#666666] font-normal">
                    Before {token?.metaData.checkOut}
                  </div>
                </div>

                <div className="w-full flex justify-between">
                  <img
                    alt=""
                    src={token?.metaData.images[0]}
                    className="w-[100px] rounded-[10px]"
                  />
                  <div className="w-full ml-2 flex items-center justify-between">
                    <div>
                      <div className="text-[20px] font-medium">
                        {token?.metaData.buildingName}
                      </div>
                      <div className="text-[#666666] font-normal">
                        {code?.toUpperCase().slice(-10)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[20px] font-medium">
                        {Math.round(
                          (reservation_period.end - reservation_period.start) /
                            86400
                        ) *
                          token?.short.price_per_day +
                          (fee *
                            (Math.round(
                              (reservation_period.end -
                                reservation_period.start) /
                                86400
                            ) *
                              token?.short.price_per_day)) /
                            10000}{" "}
                        USDC
                      </div>
                      <div className="text-[#666666] font-normal">
                        {code?.toUpperCase().slice(-10)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  {token?.short.auto_approve ? (
                    <div>Use this order for your confirmation to end user</div>
                  ) : (
                    <div>
                      Please wait from host to confirm your reservation request,
                      1-3 hours
                    </div>
                  )}

                  <div className="font-semibold">
                    Thank you for order with us!
                  </div>
                  <div>CodedEstate Team</div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white p-[16px] h-max space-y-[12px] rounded-[16px] min-w-[60%] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="flex items-center gap-[10px]">
                    <div className="text-[24px] font-semibold">
                      Your reservation is completed!
                    </div>
                    <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                      <CheckMarkIcon />
                    </div>
                  </div>
                  <div className="text-[#5A5A5A]">
                    We emailed the details to Host
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="gap-[10px] flex items-center">
                      <img
                        alt="Avatar"
                        src={profile?.Avatar}
                        className="w-[40px] rounded-full"
                      />
                      <div>{profile?.Name?.replace("/", " ")}</div>
                    </div>
                    <PurpleButton
                      text="Chat Now"
                      onClick={async () => {
                        let path = "";
                        const chat = await getChatId(
                          account,
                          token?.access.owner,
                          params.id,
                          "short"
                        );

                        path = "/dashboard/traveler/inbox";

                        if (chat) navigate(path + "?chat=" + chat);
                        else
                          navigate(
                            path +
                              `?id=${params.id}&receiver=${token?.access.owner}`
                          );
                      }}
                    />
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-[6px]">
                      <BookingDateIcon />
                      <div className="font-semibold">Booking date</div>
                    </div>
                    <div className="text-[#666666] font-normal">
                      {new Date(
                        reservation_period.start * 1000
                      )?.toLocaleDateString("en-US", {
                        // year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) +
                        "~" +
                        new Date(
                          reservation_period.end * 1000
                        )?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-[6px]">
                      <UsersIcon />
                      <div className="font-semibold">Guests</div>
                    </div>
                    <div className="text-[#666666] font-normal">
                      {reservation_guests} (
                      {converter.toWords(reservation_guests)})
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-[6px]">
                      <CheckInIcon />
                      <div className="font-semibold">Check in Hours</div>
                    </div>
                    <div className="text-[#666666] font-normal">
                      After {token?.metaData.checkIn}
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-[6px]">
                      <CheckOutIcon />
                      <div className="font-semibold">Check out Hours</div>
                    </div>
                    <div className="text-[#666666] font-normal">
                      Before {token?.metaData.checkOut}
                    </div>
                  </div>
                  <hr />
                  <div className="text-[24px] font-semibold">Ground Rules</div>
                  <div>
                    We ask every guest to remember a few simple things about
                    what makes a great guest.
                  </div>
                  <div className="items-start flex gap-[10px]">
                    <div className="mt-[2px] p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                      <div className="bg-[#5b1dee] w-[10px] h-[10px] rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold">House rules</div>
                      <div className="font-normal">
                        Check-in after {token?.metaData.checkIn}
                      </div>
                      <div className="font-normal">
                        Checkout before {token?.metaData.checkOut}
                      </div>
                      <div className="font-normal">
                        {token?.metaData.groundRule}
                      </div>
                    </div>
                  </div>
                  <div className="items-start flex gap-[10px]">
                    <div className="mt-[2px] p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                      <div className="bg-[#5b1dee] w-[10px] h-[10px] rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold">Safety & property</div>
                      <div className="font-normal">
                        Carbon monoxide alarm not reported
                      </div>
                      <div className="font-normal">
                        Smoke alarm not reported
                      </div>
                      <div className="font-normal">
                        Nearby lake, river, other body of water
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-[16px] h-max space-y-[10px] rounded-[16px] w-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="bg-white space-y-[4px] p-[8px] rounded-[16px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <img
                      alt=""
                      src={token?.metaData.images[0]}
                      className="w-full max-h-[240px] rounded-[10px]"
                    />
                    <div>{token?.metaData.buildingName}</div>
                    <div className="text-[#959595] font-normal">
                      {new Date(
                        reservation_period.start * 1000
                      )?.toLocaleDateString("en-US", {
                        // year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) +
                        "~" +
                        new Date(
                          reservation_period.end * 1000
                        )?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                    </div>
                    <div className="text-[#959595] font-normal">
                      {token?.metaData.address.street +
                        ", " +
                        token?.metaData.address.city +
                        ", " +
                        token?.metaData.address.state}
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="text-[#A4A4A4] font-normal">Total</div>
                    <div className="flex items-center gap-[10px]">
                      <NUSDIcon />
                      <div className="text-[#5b1dee] font-semibold text-[20px]">
                        {Math.round(
                          (reservation_period.end - reservation_period.start) /
                            86400
                        ) *
                          token?.short.price_per_day +
                          (fee *
                            (Math.round(
                              (reservation_period.end -
                                reservation_period.start) /
                                86400
                            ) *
                              token?.short.price_per_day)) /
                            10000}
                      </div>
                      <div>USDC</div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center w-full">
                    <div className="text-[#A4A4A4] font-normal">
                      Transaction hash
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <CopyToClipboard
                        text={txHash}
                        onCopy={() => {
                          toast.success("Copied transaction hash");
                        }}
                      >
                        <div>
                          <CopyIcon className="cursor-pointer" />
                        </div>
                      </CopyToClipboard>
                      <div className="text-[#5b1dee]">
                        {truncateWalletAddress(txHash)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="text-[#A4A4A4] font-normal">
                      Reservation code
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <CopyToClipboard
                        text={code?.toUpperCase().slice(-10)}
                        onCopy={() => {
                          toast.success("Copied reservation code");
                        }}
                      >
                        <div>
                          <CopyIcon className="cursor-pointer" />
                        </div>
                      </CopyToClipboard>
                      <div className="">{code?.toUpperCase().slice(-10)}</div>
                    </div>
                  </div>
                  <PurpleButton
                    text={<div className="w-full text-center">My Trip</div>}
                    onClick={() => navigate("/dashboard/traveler/trips")}
                  />
                  <BlackButton
                    onClick={() => setReceipt(true)}
                    text={<div className="w-full text-center">Receipt</div>}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

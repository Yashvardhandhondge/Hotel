import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowToLeft,
  CheckMarkIcon,
  NUSDIcon,
} from "../../../AssetComponents/Images";
import { StarRatingCompo } from "../../../Components/StarRating/StarRatingCompo";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import { RedButton } from "../../../Components/Buttons/RedButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HostAction } from "./HostAction";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { mapStyles } from "../../../Components/GoogleMap/Style";
import { TravelerAction } from "../TravelerTrips/TravelerAction";
import {
  GuestsIcon,
  BathRoomIconRent,
  BedIconRent,
  FavoriteIconRent,
} from "../../../AssetComponents/Images";
import { getChatId } from "../../../Components/functions/Functions";
import { toast } from "react-toastify";
import { api } from "../../../Components/functions/Api";
import { Mainnet } from "@nibiruchain/nibijs";
import { updateToken } from "../../../Components/functions/Functions";
import { useDispatch } from "react-redux";

export const ReserveDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const params = useParams();
  const account = useSelector((state) => state.auth.account);
  const currentProfile = useSelector((state) => state.auth.profile);
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

  const [traveler, setTraveler] = useState();
  const [canceled, setCanceled] = useState();
  const [approved, setApproved] = useState();
  const [deposit, setDeposit] = useState();
  const [reviewMode, setReviewMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setFrom(searchParams.get("from"));
    setTo(searchParams.get("to"));
    if (searchParams.get("mode")) setReviewMode(true);
    else setReviewMode(false);
    for (let i = 0; i < token?.rentals.rentals.length; i++) {
      if (
        token?.rentals.rentals[i].renting_period[0].toString() ===
          searchParams.get("from") &&
        token?.rentals.rentals[i].renting_period[1].toString() ===
          searchParams.get("to")
      ) {
        setTraveler(token?.rentals.rentals[i].address);
        setCanceled(token?.rentals.rentals[i].cancelled);
        setApproved(token?.rentals.rentals[i].approved);
        // if (token?.rentals.rentals[i].cancelled) {
        //   setDeposit(
        //     Math.round(
        //       Math.round(
        //         (token?.rentals.rentals[i].renting_period[1] -
        //           token?.rentals.rentals[i].renting_period[0]) /
        //           86400
        //       ) * token?.short.price_per_day
        //     )
        //   );
        // } else
        setDeposit(
          (
            Number(token?.rentals.rentals[i].deposit_amount) /
            10 ** process.env.REACT_APP_USDC_DECIMALS
          ).toString()
        );
      }
    }
  }, [location.search, token]);

  const [rates, setRates] = useState({
    cleanness: 0,
    accuracy: 0,
    checkIn: 0,
    communication: 0,
    checkOut: 0,
    location: 0,
  });
  const [rate, setRate] = useState();
  const [note, setNote] = useState();
  const [review, setReview] = useState();
  const [avgRate, setAvgReviews] = useState(0);

  const getReview = async () => {
    const res = await api("review/get", {
      token_id: params.id,
    });
    if (!res) return;
    let avgRate = 0;
    for (let i = 0; i < res.length; i++) {
      avgRate += res[i].rate;
    }
    setAvgReviews(avgRate / res.length);
  };

  useEffect(() => {
    if (params.id) getReview();
  }, [params.id]);

  const handleSubmit = async () => {
    if (!currentProfile) {
      toast.error("Please upload your profile firstly");
      return;
    }
    toast.loading("Uploading your review..");
    let res;
    if (token?.access.owner === account)
      res = await api("profile/addReview", {
        walletAddress: traveler,
        data: {
          rates: rates,
          rate: rate,
          privateNote: note,
          publicReview: review,
          owner: account,
          period: [from, to],
        },
      });
    else
      res = await api("review/add", {
        token_id: params.id,
        data: {
          rates: rates,
          rate: rate,
          privateNote: note,
          publicReview: review,
          renter: account,
          period: [from, to],
        },
      });

    if (res === null) {
      toast.dismiss();
      toast.error("You already placed Review");
    }
    if (res === true) {
      toast.dismiss();
      toast.success("Your review has successfully uploaded", {
        autoClose: 1000,
      });
    }
    if (res === false) {
      toast.dismiss();
      toast.error("Uploading failed");
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));

    navigate(-1);
  };

  useEffect(() => {
    let total = 0;
    Object.values(rates).forEach((item) => {
      total += item;
    });
    setRate(total / 5);
  }, [rates]);

  return (
    <div className="w-full h-full relative">
      {reviewMode ? (
        <>
          {token?.access.owner === account ? (
            <div className="w-full h-[calc(100vh-90px)] overflow-auto flex flex-col items-center space-y-[30px] py-[20px] relative">
              <div
                onClick={() => navigate(-1)}
                className="p-[4px] rounded-full bg-white absolute top-[20px] left-[30px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              >
                <ArrowToLeft className="w-[24px] cursor-pointer" />
              </div>
              <div className="flex flex-col items-center space-y-[10px]">
                <div className="text-[24px]">
                  Rate your experience with this traveler
                </div>
                <div className="text-[#959595] max-w-[55vw] text-center">
                  You've given your traveler an overall rating. Let them know
                  how they did in these areas too so they have a better idea of
                  what went well and how they can improve.
                </div>
              </div>
              <div className="grid grid-cols-2 w-[50vw] gap-[20px]">
                <div className="flex flex-col items-center">
                  <div>Cleanness</div>
                  <StarRatingCompo
                    rating={rates.cleanness}
                    onChange={(value) =>
                      setRates({ ...rates, cleanness: value })
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Accuracy</div>
                  <StarRatingCompo
                    rating={rates.accuracy}
                    onChange={(value) =>
                      setRates({ ...rates, accuracy: value })
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Check-in</div>
                  <StarRatingCompo
                    rating={rates.checkIn}
                    onChange={(value) => setRates({ ...rates, checkIn: value })}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Check-out</div>
                  <StarRatingCompo
                    rating={rates.checkOut}
                    onChange={(value) =>
                      setRates({ ...rates, checkOut: value })
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Communication</div>
                  <StarRatingCompo
                    rating={rates.communication}
                    onChange={(value) =>
                      setRates({ ...rates, communication: value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Total Value</div>
                <StarRatingCompo rating={rate} fixed />
              </div>
              <div className="flex flex-col items-center space-y-[10px]">
                <div className="text-[20px]">
                  Write a private note for Traveler
                </div>
                <div className="text-[#959595] max-w-[50vw] text-center">
                  Say thanks or offer a few suggestions. This is just for
                  Host-other guests won't be able to read it.
                </div>
                <div className="bg-white px-[12px] w-[500px] py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <textarea
                    placeholder="Add a private note"
                    className="w-full h-full outline-none min-h-[120px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-[10px]">
                <div className="text-[20px]">
                  Write a public review for Traveler
                </div>
                <div className="text-[#959595] max-w-[40vw] text-center">
                  Give other hosts a heads-up about what they can expect. After
                  the review period ends, well publish this on this traveler's
                  profile.
                </div>
                <div className="bg-white px-[12px] w-[500px] py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <textarea
                    placeholder="Write a public review"
                    className="w-full h-full outline-none min-h-[120px]"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <BlackButton text="Cancel" onClick={() => navigate(-1)} />
                <PurpleButton text="Submit" onClick={handleSubmit} />
              </div>
            </div>
          ) : (
            <div className="w-full h-[calc(100vh-90px)] overflow-auto flex flex-col items-center space-y-[30px] py-[20px] relative">
              <div
                onClick={() => navigate(-1)}
                className="p-[4px] rounded-full bg-white absolute top-[20px] left-[30px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              >
                <ArrowToLeft className="w-[24px] cursor-pointer" />
              </div>

              <div className="flex flex-col items-center space-y-[10px]">
                <div className="text-[24px]">
                  Rate your experience in these areas
                </div>
                <div className="text-[#959595] max-w-[55vw] text-center">
                  Let them know how they did in these areas too so they have a
                  better idea of what went well and how they can improve.
                </div>
              </div>
              <div className="grid grid-cols-2 w-[50vw] gap-[20px]">
                <div className="flex flex-col items-center">
                  <div>Cleanness</div>
                  <StarRatingCompo
                    rating={rates.cleanness}
                    onChange={(value) =>
                      setRates({ ...rates, cleanness: value })
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Accuracy</div>
                  <StarRatingCompo
                    rating={rates.accuracy}
                    onChange={(value) =>
                      setRates({ ...rates, accuracy: value })
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Check-in</div>
                  <StarRatingCompo
                    rating={rates.checkIn}
                    onChange={(value) => setRates({ ...rates, checkIn: value })}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Communication</div>
                  <StarRatingCompo
                    rating={rates.communication}
                    onChange={(value) =>
                      setRates({ ...rates, communication: value })
                    }
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div>Location</div>
                  <StarRatingCompo
                    rating={rates.location}
                    onChange={(value) =>
                      setRates({ ...rates, location: value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Total Value</div>
                <StarRatingCompo rating={rate} fixed />
              </div>
              <div className="flex flex-col items-center space-y-[10px]">
                <div className="text-[20px]">Write a private note for Host</div>
                <div className="text-[#959595] max-w-[50vw] text-center">
                  Say thanks or offer a few suggestions. This is just for
                  Host-other guests won't be able to read it.
                </div>

                <div className="bg-white px-[12px] w-[500px] py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <textarea
                    placeholder="Add a private note"
                    className="w-full h-full outline-none min-h-[120px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-[10px]">
                <div className="text-[20px]">
                  Write a public review for Host
                </div>
                <div className="text-[#959595] max-w-[40vw] text-center">
                  Give other travelers a heads-up about what they can expect.
                  After the review period ends, well publish this on your host's
                  listing.
                </div>
                <div className="bg-white px-[12px] w-[500px] py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <textarea
                    placeholder="Write a public review"
                    className="w-full h-full outline-none min-h-[120px]"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <BlackButton text="Cancel" onClick={() => navigate(-1)} />
                <PurpleButton text="Submit" onClick={handleSubmit} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <GoogleMap
            center={token?.metaData.location}
            zoom={12}
            mapContainerClassName="w-full h-full"
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              zoomControl: false,
              styles: mapStyles,
            }}
          >
            <OverlayView
              position={token?.metaData?.location}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="rounded-[4px] w-max h-max p-[4px] bg-[#ffffffaa] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <img
                  alt=""
                  src={token?.metaData.images[0]}
                  className="w-[90px] h-[50px] rounded-[4px]"
                />
              </div>
            </OverlayView>
          </GoogleMap>
          <div className="absolute top-[10px] right-[10px] rounded-[10px] w-[360px] p-[10px] bg-white">
            <div className="flex items-center gap-[4px] mb-3">
              <svg
                onClick={() =>
                  navigate(location.pathname.replace(`/${params.id}`, ""))
                }
                className="w-[20px] cursor-pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 7L5 12"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 17L5 12"
                  stroke="#202020"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="text-[20px]">
                {token?.access.owner === account
                  ? "Rental Request"
                  : "Your Stay"}
              </div>
            </div>

            <div className="space-y-[10px] max-h-[calc(100vh-180px)] pr-2 overflow-auto scrollbarwidth">
              <div className="rounded-t-[8px] bg-[#dddddd] w-full h-[160px] relative">
                <img
                  alt=""
                  src={token?.metaData.images[0]}
                  className="rounded-t-[8px] w-full h-full"
                />
                {/* <div className="absolute px-[10px] flex justify-between w-full items-center top-[10px]">
              <div className="flex gap-[4px] py-[4px] px-[8px] rounded-full border-[#38A569] border-[1px] text-[#38A569] bg-white">
                <div className="w-max p-[2px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <CheckMarkIcon className="w-[20px]" />
                </div>
                <div className="font-normal">Approved</div>
              </div>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="14" fill="white" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 9.28325C14.5167 8.67875 15.4108 8 16.772 8C19.1532 8 20.75 10.235 20.75 12.3162C20.75 16.667 15.3335 20 14 20C12.6665 20 7.25 16.667 7.25 12.3162C7.25 10.235 8.84675 8 11.228 8C12.5893 8 13.4833 8.67875 14 9.28325Z"
                  fill="#EB4245"
                />
              </svg>
            </div> */}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                      <GuestsIcon />
                    </div>
                    <div className="text-[#959595]">
                      {token?.metaData.essentials.guests}
                    </div>
                  </div>
                  <div className="w-[1px] h-[20px] bg-[#959595]"></div>
                  <div className="flex items-center gap-[10px]">
                    <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                      <BathRoomIconRent />
                    </div>
                    <div className="text-[#959595]">
                      {token?.metaData.essentials.bathrooms}
                    </div>
                  </div>
                  <div className="w-[1px] h-[20px] bg-[#959595]"></div>

                  <div className="flex items-center gap-[10px]">
                    <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                      <BedIconRent />
                    </div>
                    <div className="text-[#959595]">
                      {token?.metaData.essentials.beds}
                    </div>
                  </div>
                </div>
                {token?.access.owner !== account && (
                  <PurpleButton
                    text="View Listing"
                    onClick={() => navigate(`/rent/short/${params.id}`)}
                  />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[20px]">
                  {token?.metaData.buildingName}
                </div>
                <div className="flex items-center gap-[10px]">
                  <div className="p-[6px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]">
                    <FavoriteIconRent />
                  </div>
                  <div className="text-[#959595]">{avgRate}</div>
                </div>
              </div>
              {from && to && (
                <div className="grid grid-cols-2 gap-[10px]">
                  <div className="w-full bg-[#F6F6F6] rounded-[16px] p-[8px]">
                    <div>Check-in</div>
                    <div className="flex items-center gap-[4px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.33366 1.1665V3.49984"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.66667 1.1665V3.49984"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.75 5.25016H12.25"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.0833 2.3335H2.91667C2.27208 2.3335 1.75 2.85558 1.75 3.50016V11.0835C1.75 11.7281 2.27208 12.2502 2.91667 12.2502H11.0833C11.7279 12.2502 12.25 11.7281 12.25 11.0835V3.50016C12.25 2.85558 11.7279 2.3335 11.0833 2.3335Z"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.09089 7.42513C4.01039 7.42513 3.94506 7.49046 3.94564 7.57096C3.94564 7.65146 4.01097 7.7168 4.09147 7.7168C4.17197 7.7168 4.23731 7.65146 4.23731 7.57096C4.23731 7.49046 4.17197 7.42513 4.09089 7.42513"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.00788 7.42513C6.92738 7.42513 6.86205 7.49046 6.86263 7.57096C6.86263 7.65146 6.92797 7.7168 7.00847 7.7168C7.08897 7.7168 7.1543 7.65146 7.1543 7.57096C7.1543 7.49046 7.08897 7.42513 7.00788 7.42513"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.9239 7.42513C9.8434 7.42513 9.77806 7.49046 9.77865 7.57096C9.77865 7.65146 9.84398 7.7168 9.92448 7.7168C10.005 7.7168 10.0703 7.65146 10.0703 7.57096C10.0703 7.49046 10.005 7.42513 9.9239 7.42513"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.09089 9.75863C4.01039 9.75863 3.94506 9.82396 3.94564 9.90446C3.94564 9.98496 4.01097 10.0503 4.09147 10.0503C4.17197 10.0503 4.23731 9.98496 4.23731 9.90446C4.23731 9.82396 4.17197 9.75863 4.09089 9.75863"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.00788 9.75863C6.92738 9.75863 6.86205 9.82396 6.86263 9.90446C6.86263 9.98496 6.92797 10.0503 7.00847 10.0503C7.08897 10.0503 7.1543 9.98496 7.1543 9.90446C7.1543 9.82396 7.08897 9.75863 7.00788 9.75863"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="text-[14px] text-[#959595]">
                        {new Date(from * 1000).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {", "}
                        {token?.metaData.checkIn}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-[#F6F6F6] rounded-[16px] p-[8px]">
                    <div>Check-out</div>
                    <div className="flex items-center gap-[4px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.33366 1.1665V3.49984"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.66667 1.1665V3.49984"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.75 5.25016H12.25"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.0833 2.3335H2.91667C2.27208 2.3335 1.75 2.85558 1.75 3.50016V11.0835C1.75 11.7281 2.27208 12.2502 2.91667 12.2502H11.0833C11.7279 12.2502 12.25 11.7281 12.25 11.0835V3.50016C12.25 2.85558 11.7279 2.3335 11.0833 2.3335Z"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.09089 7.42513C4.01039 7.42513 3.94506 7.49046 3.94564 7.57096C3.94564 7.65146 4.01097 7.7168 4.09147 7.7168C4.17197 7.7168 4.23731 7.65146 4.23731 7.57096C4.23731 7.49046 4.17197 7.42513 4.09089 7.42513"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.00788 7.42513C6.92738 7.42513 6.86205 7.49046 6.86263 7.57096C6.86263 7.65146 6.92797 7.7168 7.00847 7.7168C7.08897 7.7168 7.1543 7.65146 7.1543 7.57096C7.1543 7.49046 7.08897 7.42513 7.00788 7.42513"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.9239 7.42513C9.8434 7.42513 9.77806 7.49046 9.77865 7.57096C9.77865 7.65146 9.84398 7.7168 9.92448 7.7168C10.005 7.7168 10.0703 7.65146 10.0703 7.57096C10.0703 7.49046 10.005 7.42513 9.9239 7.42513"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.09089 9.75863C4.01039 9.75863 3.94506 9.82396 3.94564 9.90446C3.94564 9.98496 4.01097 10.0503 4.09147 10.0503C4.17197 10.0503 4.23731 9.98496 4.23731 9.90446C4.23731 9.82396 4.17197 9.75863 4.09089 9.75863"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.00788 9.75863C6.92738 9.75863 6.86205 9.82396 6.86263 9.90446C6.86263 9.98496 6.92797 10.0503 7.00847 10.0503C7.08897 10.0503 7.1543 9.98496 7.1543 9.90446C7.1543 9.82396 7.08897 9.75863 7.00788 9.75863"
                          stroke="#5A5A5A"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="text-[14px] text-[#959595]">
                        {new Date(to * 1000).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {", "}
                        {token?.metaData.checkOut}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full bg-[#F6F6F6] rounded-[16px] p-[8px] flex items-center gap-[6px]">
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
                    d="M12 13V13C10.343 13 9 11.657 9 10V10C9 8.343 10.343 7 12 7V7C13.657 7 15 8.343 15 10V10C15 11.657 13.657 13 12 13Z"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 21C12 21 5 15.25 5 10C5 6.134 8.134 3 12 3C15.866 3 19 6.134 19 10C19 15.25 12 21 12 21Z"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div>
                  <div>Location</div>
                  <div className="text-[14px] text-[#959595]">
                    {token?.metaData.address.street +
                      ", " +
                      token?.metaData.address.city +
                      ", " +
                      token?.metaData.address.state}
                  </div>
                </div>
              </div>
              <div className="w-full bg-[#F6F6F6] rounded-[16px] p-[8px] flex items-center gap-[6px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17H15"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.4142 10.5858C14.1953 11.3668 14.1953 12.6332 13.4142 13.4142C12.6332 14.1953 11.3668 14.1953 10.5858 13.4142C9.80474 12.6332 9.80474 11.3668 10.5858 10.5858C11.3668 9.80474 12.6332 9.80474 13.4142 10.5858"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 6.02185H17C18.105 6.02185 19 6.91685 19 8.02185V19.9998C19 21.0998 18.1 21.9998 17 21.9998H7C5.895 21.9998 5 21.1048 5 19.9998V6.02185C5 5.60585 5.258 5.23285 5.647 5.08585L13.647 2.06485C14.301 1.81785 15 2.30185 15 3.00085V6.02185"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div>
                  <div>Things to know</div>
                  <div className="text-[14px] text-[#959595]">
                    {token?.metaData.groundRule}
                  </div>
                </div>
              </div>

              <div className="w-full bg-[#F6F6F6] rounded-[16px] p-[8px] flex items-center gap-[6px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9995 19.25C11.7925 19.25 11.6245 19.418 11.6265 19.625C11.6255 19.832 11.7935 20 12.0005 20C12.2075 20 12.3755 19.832 12.3755 19.625C12.3755 19.418 12.2075 19.25 11.9995 19.25"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.59082 11.9998C8.68282 8.24681 15.3158 8.24681 19.4078 11.9998"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.59375 7.804C7.34075 2.732 16.6588 2.732 22.4058 7.804"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5791 15.821C10.0201 13.393 13.9791 13.393 16.4201 15.821"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div>
                  <div>Wifi Password</div>
                  <div className="text-[14px] text-[#959595]">
                    {token?.metaData.wifiPass}
                  </div>
                </div>
              </div>
              {from && to && (
                <>
                  {account === token?.access.owner ? (
                    <HostAction
                      token_id={params.id}
                      approved={approved}
                      cancelled={canceled}
                      rentingPeriod={[from, to]}
                      traveler={traveler}
                      fundedAmount={deposit}
                    />
                  ) : (
                    <TravelerAction
                      token_id={params.id}
                      approved={approved}
                      cancelled={canceled}
                      rentingPeriod={[from, to]}
                      fundedAmount={deposit}
                    />
                  )}
                </>
              )}
              <PurpleButton
                text={
                  token?.access.owner === account
                    ? "Message Traveler"
                    : "Message Host"
                }
                onClick={async () => {
                  let path = "";
                  const chat = await getChatId(
                    traveler ? traveler : account,
                    token?.access.owner,
                    params.id,
                    "short"
                  );

                  if (token?.access.owner === account)
                    path = "/dashboard/host/inbox";
                  else path = "/dashboard/traveler/inbox";

                  if (chat) navigate(path + "?chat=" + chat);
                  // "?id=10261280&receiver=nibi1pl6r92ncwyqa6s3cdxjzprnsg5snn2mare34f0"
                  else {
                    if (path === "/dashboard/host/inbox")
                      navigate(path + `?id=${params.id}&receiver=${traveler}`);
                    else
                      navigate(
                        path +
                          `?id=${params.id}&receiver=${token?.access.owner}`
                      );
                  }
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

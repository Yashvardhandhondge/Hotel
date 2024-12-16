import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { addDays } from "date-fns/addDays";
import {
  ArrowToLeft,
  ArrowToRightIcon,
  BathsIcon,
  BedsIcon,
  CheckInIcon,
  CheckOutIcon,
  GroundRuleIcon,
  NUSDIcon,
  UsersIcon,
} from "../../AssetComponents/Images";
import {
  PinIcon,
  MapMinusIcon,
  MapPlusIcon,
  MapShareIcon,
} from "../../AssetComponents/Images";
import { ImageView } from "../../Components/Images/ImageView";
import { PurpleButton } from "../../Components/Buttons/PurpleButton";
import { BlackButton } from "../../Components/Buttons/BlackButton";
import { NumberSpin } from "../../Components/Spin/NumberSpin";
import { Review } from "../../Components/Review/Review";
import { PickDate } from "../../Components/Reserve/PickDate";
import { Toggle } from "../../Components/Toggle/Toggle";
import { DisabledButton } from "../../Components/Buttons/DisabledButton";
import { getChatId } from "../../Components/functions/Functions";
import { mapStyles } from "../../Components/GoogleMap/Style";
import {
  BathHanger,
  Bathub,
  HairDryer,
  Heating,
  HotWater,
  Shower,
  SoapDrop,
  ToiletSeat,
} from "../../Components/Amenities/Bathroom";
import {
  Balcony,
  Park,
  SwimmingPool,
  ValleyView,
} from "../../Components/Amenities/View";
import {
  Bed,
  BedDouble,
  BedroomHanger,
  DresserDrawer,
  DressingMirror,
  SafeBox,
  SofaDouble,
  TrowelBrush,
  WashingMachine,
} from "../../Components/Amenities/Bedroom";
import { GamePad } from "../../Components/Amenities/Entertainment";
import {
  Alarm,
  CCTV,
  FireExtinguisher,
  MedicalCase,
  TvStand,
} from "../../Components/Amenities/HomeSafety";
import {
  LaptopTable,
  Wifi,
  WorkJob,
} from "../../Components/Amenities/InternetAndOffice";
import {
  Blender,
  CoffeeMachine,
  Dishes,
  DishWasher,
  ForkKnife,
  Fridge,
  Induction,
  Kitchen,
  PlateFork,
  SaltPepper,
  Stove,
  TableChair,
  Trash,
  WineGlass,
} from "../../Components/Amenities/Kitchen";
import {
  BeachUmbrella,
  ChildrenSlide,
  Lounge,
  Sun,
  Swing,
} from "../../Components/Amenities/Outdoor";
import { Parking } from "../../Components/Amenities/Parking";
import {
  Breakfast,
  CampFire,
  Cat,
  CleaningSprayAction,
  Dog,
  HouseKey,
  Longterm,
  ManStaff,
  Smoking,
  Stairs,
  Userprofile,
  WomenStaff,
} from "../../Components/Amenities/Services.";
import {
  BabyBedroom,
  BookFairyTale,
  ToyCubes,
} from "../../Components/Amenities/Family";

import {
  AirConditioning,
  Beach,
  BeachView,
  BedLinenTowels,
  CableTv,
  CarbonMonoxideDetector,
  CityView,
  CleaningProducts,
  CoffeeMaker,
  ComplimentarySoapShampooConditioner,
  CookingBasics,
  CookwareKitchenUtensils,
  CrockeryCutlery,
  DiningTable,
  DryingRack,
  Elevator,
  Essentials,
  FamilyKidsFriendly,
  FirstAidKit,
  FreeParkingWithGarage,
  Gym,
  Hangers,
  IronIroningBoard,
  Kettle,
  Marina,
  MarinaView,
  Microwave,
  NoParties,
  Oven,
  PlayGround,
  Reception,
  Refrigerator,
  RoomDarkeningShades,
  Seaview,
  SmartTv,
  SmokeDetectors,
  SmokingNotAllowed,
  StreamingServiceSuchAsNetflix,
  Toaster,
  Toilet,
  TrashCans,
  Wardrobe,
  WineGlasses,
  WirelessInternet,
} from "../../Components/Amenities/Others";

import { Appliance, Fan } from "../../Components/Amenities/HeatingandCooling";

import { useDispatch, useSelector } from "react-redux";
import converter from "number-to-words";
import Modal from "react-responsive-modal";
import {
  executeContract,
  queryContract,
} from "../../Components/functions/Contract";
import { Mainnet, Testnet } from "@nibiruchain/nibijs";
import { toast } from "react-toastify";
import { api } from "../../Components/functions/Api";
import {
  getProfileFromWallet,
  truncateWalletAddress,
} from "../../Components/functions/Functions";
import {
  setReservationFee,
  setReservationGuests,
} from "../../ReduxSlices/ReservationSlice";
import mapPinIcon from "../../assets/images/Dashboard/Dashboard/mappin.svg";
import { Fade } from "react-awesome-reveal";
import Skeleton from "react-loading-skeleton";
import { updateToken } from "../../Components/functions/Functions";

export const Details = () => {
  // const testNet = Testnet(1);
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [descriptionShow, setDescriptionShow] = useState(false);
  const [amenitiesShow, setAmenitiesShow] = useState(false);
  const reservation_guests = useSelector((state) => state.reservation.guests);
  const reservation_period = useSelector((state) => state.reservation.period);
  const fee = useSelector((state) => state.reservation.fee);
  const diff = useSelector((state) => state.time.diffToUTC);
  const [zoom, setZoom] = useState(14);
  const account = useSelector((state) => state.auth.account);
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

  const [listingDetails, setListingDetails] = useState({
    currency: process.env.REACT_APP_USDC_DENOM,
    price_per_day: token?.short.price_per_day || 70,
    auto_approve: token?.short.auto_approve || false,
    minimum_stay: token?.short.minimum_stay || 1,
    cancellation: token?.short.cancellation || [
      {
        deadline: 15,
        percentage: 90,
      },
      {
        deadline: 3,
        percentage: 7,
      },
    ],
  });

  const renderTextWithLineBreaks = (text) => {
    return text?.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const [cancellationTemp, setCancellationTemp] = useState({
    percentage: null,
    deadline: null,
  });
  const [profile, setProfile] = useState();

  const handleAddItem = () => {
    const updatedCancellation = listingDetails.cancellation.slice();
    for (let i = 0; i < updatedCancellation.length; i++) {
      if (
        Number(updatedCancellation[i].deadline) ===
          Number(cancellationTemp.deadline) ||
        Number(updatedCancellation[i].percentage) ===
          Number(cancellationTemp.percentage)
      ) {
        // setError(true);
        return;
      }
    }
    updatedCancellation.push({
      deadline: Number(cancellationTemp.deadline),
      percentage: Number(cancellationTemp.percentage),
    });
    const sortByDeadline = updatedCancellation.slice();
    const sortByPercentage = updatedCancellation.slice();

    sortByPercentage.sort((a, b) => b.percentage - a.percentage);
    sortByDeadline.sort((a, b) => b.deadline - a.deadline);

    if (JSON.stringify(sortByDeadline) === JSON.stringify(sortByPercentage)) {
      setListingDetails({ ...listingDetails, cancellation: sortByDeadline });
      // setError(false);
    } else {
      // setError(true);
    }
  };

  const handleListNFT = async () => {
    const listingMessage = {
      set_list_for_short_term_rental: {
        token_id: params.id.toString(),
        denom: listingDetails.currency.toString(),
        price_per_day:
          Number(listingDetails.price_per_day) *
          10 ** process.env.REACT_APP_USDC_DECIMALS,
        auto_approve: listingDetails.auto_approve,
        available_period: [],
        minimum_stay: listingDetails.minimum_stay,
        cancellation: listingDetails.cancellation,
      },
    };

    // const listingMessage = {
    //   set_list_for_long_term_rental: {
    //     token_id: params.id.toString(),
    //     denom: listingDetails.currency.toString(),
    //     price_per_month: Number(listingDetails.price_per_day) * 30,
    //     auto_approve: listingDetails.auto_approve,
    //     available_period: [],
    //     minimum_stay: Number(listingDetails.minimum_stay) * 30,
    //     cancellation: listingDetails.cancellation,
    //   },
    // };

    // const listingMessage = {
    //   set_list_for_sell: {
    //     token_id: params.id.toString(),
    //     denom:
    //       "tf/nibi13vuql6pp0m84nl73aya4hnnwyj896hthkjkwe8crcl023qd2nzgqcmqhlj/utestate".toString(),
    //     price: Number(listingDetails.price_per_day),
    //     auto_approve: listingDetails.auto_approve,
    //     islisted: false,
    //   },
    // };

    // const listingMessage = {
    //   set_bid_to_buy: {
    //     token_id: params.id.toString(),
    //   },
    // };

    // const listingMessage = {
    //   transfer_nft: {
    //     recipient: "nibi1amvprzy8qz63y6f0k7qfymsxy6ufj4v7209vta",
    //     token_id: params.id.toString(),
    //   },
    // };

    // const listingMessage = {
    //   mint: {
    //     amount: "100000",
    //     mint_to: "nibi1amvprzy8qz63y6f0k7qfymsxy6ufj4v7209vta",
    //   },
    // };

    // const listingMessage = {
    //   burn: {
    //     token_id: params.id.toString(),
    //   },
    // };

    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );

    const res = await executeContract(
      null,
      null,
      currentTime,
      mainnet.chainId,
      mainnet.endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      params.id,
      account,
      listingMessage,
      account,
      "leap"
      // [
      //   {
      //     amount: "70".toString(),
      //     denom:
      //       "tf/nibi13vuql6pp0m84nl73aya4hnnwyj896hthkjkwe8crcl023qd2nzgqcmqhlj/utestate",
      //   },
      // ]
    );
    if (res) navigate(location.pathname.replace("/" + params.id, ""));
  };

  const handleUnlist = async () => {
    const message = {
      set_unlist_for_shortterm_rental: {
        token_id: params.id,
      },
    };
    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );
    const res = await executeContract(
      null,
      null,
      currentTime,
      mainnet.chainId,
      mainnet.endptTm,
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      dispatch,
      params.id,
      account,
      message,
      account,
      "leap"
    );
    if (res) navigate(location.pathname.replace("/" + params.id, ""));
  };

  const handleEdit = () => {
    if (token.rentals.rentals.length > 0)
      toast.error("You cannot edit metadata as active rental exists.");
    else navigate(location.pathname + "/edit");
  };

  const getProfile = async (wallet) => {
    if (!wallet || wallet === account) return;
    const profile = await getProfileFromWallet(wallet);
    setProfile(profile);
  };

  const getFeePercentage = async () => {
    const res = await queryContract(
      process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      {
        get_fee: {},
      },
      mainnet.endptTm
    );
    dispatch(setReservationFee(res));
  };

  useEffect(() => {
    getProfile(token?.access?.owner);
  }, [token]);

  useEffect(() => {
    getFeePercentage();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-auto">
      <div className="mx-auto my-[20px] max-w-[1200px] w-[80vw] flex flex-col space-y-[16px]">
        <Fade cascade damping={0.01}>
          <div
            onClick={() =>
              navigate(location.pathname.replace("/" + params.id, ""))
            }
            className="cursor-pointer hover:bg-[#f6f6f6] space-y-[10px] rounded-[16px] p-[16px] w-full bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <div className="flex items-center gap-[10px]">
              <ArrowToLeft />
              <div className="text-[20px]">Back to NFTs</div>
            </div>
          </div>

          <div className="space-y-[10px] rounded-[16px] p-[16px] w-full bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <div className="flex items-center gap-[10px]">
              <div
                className="cursor-pointer"
                // onClick={() => navigate("/rent/short")}
              >
                {location.pathname.includes("dashboard/host") ? "Host" : "Rent"}
              </div>
              <ArrowToRightIcon />
              <BlackButton
                text={
                  // token?.metaData.address.city +
                  // ", " +
                  token?.metaData.addressString
                }
              />
            </div>
            <div>{token?.metaData.address.street}</div>
            <div className="flex gap-[10px] items-center">
              <PinIcon />
              <div className="text-[#959595]">
                {token?.metaData.addressString}
              </div>
            </div>
          </div>
          <ImageView images={token?.metaData.images} />
          <div className="w-full grid grid-cols-2 gap-[20px] ">
            <div className="h-max space-y-[10px] bg-white rounded-[16px] p-[20px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              {!location.pathname.includes("dashboard/host") && (
                <>
                  <div className="w-full flex justify-between items-center">
                    <div className="gap-[10px] flex justify-between">
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
                        {profile?.Name ? (
                          <div>{profile?.Name?.replace("/", " ")}</div>
                        ) : (
                          <Skeleton width={100} height={20} />
                        )}

                        <div className="text-[#959595]">
                          {truncateWalletAddress(token?.access?.owner)}
                        </div>
                      </div>
                    </div>
                    <PurpleButton
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
                      text="Contact"
                    />
                  </div>
                  <hr />
                </>
              )}
              <div className="text-[20px] font-semibold">
                {token?.metaData.buildingName}
              </div>
              <div className="flex items-center gap-[10px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 18.4632V13.25"
                    stroke="#202020"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.08331 8L3.48553 8.95869C3.18432 9.13941 3.00001 9.46491 3 9.81618V19.4838C2.99999 19.8441 3.19377 20.1765 3.50727 20.354C3.82078 20.5315 4.20553 20.5267 4.51447 20.3413L7.4234 18.596C7.77204 18.3868 8.21264 18.4095 8.5379 18.6535L11.4 20.8C11.7555 21.0667 12.2445 21.0667 12.6 20.8L15.4621 18.6535C15.7874 18.4095 16.228 18.3867 16.5766 18.596L19.4855 20.3413C19.7945 20.5267 20.1792 20.5315 20.4927 20.354C20.8062 20.1765 21 19.844 21 19.4838V9.81618C21 9.46491 20.8157 9.13941 20.5145 8.95868L18.9167 8"
                    stroke="#202020"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15.25V20.9985"
                    stroke="#202020"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 6V6C8 3.79086 9.79086 2 12 2V2C14.2091 2 16 3.79086 16 6V6"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 6C8 7.80656 9.99331 9.73486 11.1656 10.7131C11.6555 11.0955 12.3427 11.0956 12.8328 10.7135C14.0061 9.73545 16 7.80685 16 6"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.001 5.63889C12.1389 5.63944 12.2504 5.75162 12.25 5.88956C12.2496 6.0275 12.1376 6.13907 11.9997 6.13889C11.8617 6.13871 11.75 6.02683 11.75 5.88889C11.7496 5.82231 11.776 5.75836 11.8232 5.71137C11.8704 5.66438 11.9344 5.63827 12.001 5.63889"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="text-[18px] font-semibold">
                  {token?.metaData.addressString}
                </div>
              </div>
              {/* <div className="text-[#959595]">
                {token?.metaData.address.street}, {token?.metaData.address.city}
                , {token?.metaData.address.state}
              </div> */}
              <hr />
              <div className="flex items-center gap-[10px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.00006H21"
                    stroke="#323232"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.8672 5.49506L10.8622 5.50006L10.8672 5.50506L10.8722 5.50006L10.8672 5.49506"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.32812 5.49506L8.32313 5.50006L8.32812 5.50506L8.33312 5.50006L8.32812 5.49506"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.77734 5.49006L5.77234 5.49506L5.77734 5.50006L5.78234 5.49506L5.77734 5.49006"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 21.0001H4.9989C3.89494 21.0001 3 20.1051 3 19.0012V5.00006C3 3.89549 3.89543 3.00006 5 3.00006H19.0011C20.1051 3.00006 21 3.895 21 4.99896V11.0001"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.0391 15.6191V20.0001C14.0407 20.5517 14.4874 20.9985 15.0391 21.0001H20.0391C20.5913 21.0001 21.0391 20.5524 21.0391 20.0001V15.6876"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 16.5L18.1462 13.2369C17.7733 12.9211 17.2267 12.9211 16.8538 13.2369L13 16.5"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="text-[18px] font-semibold">Description</div>
              </div>
              <div className="font-normal max-h-[100px] overflow-hidden">
                {renderTextWithLineBreaks(token?.metaData.description)}
              </div>
              <div className="w-full flex justify-start">
                <BlackButton
                  text="Show Full description"
                  onClick={() => setDescriptionShow(true)}
                />
              </div>
              <Modal
                open={descriptionShow}
                onClose={() => setDescriptionShow(false)}
                center
                classNames={{
                  modal:
                    "min-w-[400px] h-max rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
                }}
              >
                <div>
                  <div className="text-[20px] font-bold mb-2">Description</div>
                  <div className="max-h-[50vh] overflow-auto scrollbarwidth">
                    {renderTextWithLineBreaks(token?.metaData.description)}
                  </div>
                </div>
              </Modal>
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
                  Before {token?.metaData.checkOut}
                </div>
              </div>
              <hr />
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-[10px]">
                  <BedsIcon />
                  <div>Bedrooms</div>
                </div>
                <div className="text-[#666666]">
                  {token?.metaData.essentials.bedrooms} (
                  {converter.toWords(token?.metaData.essentials.bedrooms || 0)})
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-[6px]">
                  <UsersIcon />
                  <div>Maximum people</div>
                </div>
                <div className="text-[#666666]">
                  {token?.metaData.essentials.guests} (
                  {converter.toWords(token?.metaData.essentials.guests || 0)})
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-[7px]">
                  <BathsIcon />
                  <div>Bathrooms</div>
                </div>
                <div className="text-[#666666]">
                  {token?.metaData.essentials.bathrooms} (
                  {converter.toWords(token?.metaData.essentials.bathrooms || 0)}
                  )
                </div>
              </div>
              <div className="text-[18px] font-semibold">Amenities</div>
              <div className="grid grid-cols-2 gap-[8px] text-[15px] font-normal">
                {Object.entries(token?.metaData.amenities || {})?.map(
                  (category) => {
                    return (
                      <>
                        {category[1].map((item) => {
                          return (
                            <>
                              {item === "CookwareKitchenUtensils" && (
                                <div>
                                  <CookwareKitchenUtensils />
                                </div>
                              )}
                              {item === "DryingRack" && (
                                <div>
                                  <DryingRack />
                                </div>
                              )}
                              {item === "CableTv" && (
                                <div>
                                  <CableTv />
                                </div>
                              )}
                              {item === "Toaster" && (
                                <div>
                                  <Toaster />
                                </div>
                              )}
                              {item === "Wardrobe" && (
                                <div>
                                  <Wardrobe />
                                </div>
                              )}
                              {item === "DiningTable" && (
                                <div>
                                  <DiningTable />
                                </div>
                              )}
                              {item === "Reception" && (
                                <div>
                                  <Reception />
                                </div>
                              )}
                              {item === "CityView" && (
                                <div>
                                  <CityView />
                                </div>
                              )}
                              {item === "SmokeDetectors" && (
                                <div>
                                  <SmokeDetectors />
                                </div>
                              )}
                              {item === "MarinaView" && (
                                <div>
                                  <MarinaView />
                                </div>
                              )}
                              {item === "Gym" && (
                                <div>
                                  <Gym />
                                </div>
                              )}
                              {item === "CarbonMonoxideDetector" && (
                                <div>
                                  <CarbonMonoxideDetector />
                                </div>
                              )}
                              {item === "Hangers" && (
                                <div>
                                  <Hangers />
                                </div>
                              )}
                              {item === "TrashCans" && (
                                <div>
                                  <TrashCans />
                                </div>
                              )}
                              {item === "WineGlasses" && (
                                <div>
                                  <WineGlasses />
                                </div>
                              )}
                              {item === "StreamingServiceSuchAsNetflix" && (
                                <div>
                                  <StreamingServiceSuchAsNetflix />
                                </div>
                              )}

                              {item === "CrockeryCutlery" && (
                                <div>
                                  <CrockeryCutlery />
                                </div>
                              )}

                              {item === "Toilet" && (
                                <div>
                                  <Toilet />
                                </div>
                              )}

                              {item === "Oven" && (
                                <div>
                                  <Oven />
                                </div>
                              )}
                              {item === "CoffeeMaker" && (
                                <div>
                                  <CoffeeMaker />
                                </div>
                              )}
                              {item ===
                                "ComplimentarySoapShampooConditioner" && (
                                <div>
                                  <ComplimentarySoapShampooConditioner />
                                </div>
                              )}
                              {item === "BeachView" && (
                                <div>
                                  <BeachView />
                                </div>
                              )}
                              {item === "Elevator" && (
                                <div>
                                  <Elevator />
                                </div>
                              )}
                              {item === "WirelessInternet" && (
                                <div>
                                  <WirelessInternet />
                                </div>
                              )}
                              {item === "FreeParkingWithGarage" && (
                                <div>
                                  <FreeParkingWithGarage />
                                </div>
                              )}
                              {item === "SmartTv" && (
                                <div>
                                  <SmartTv />
                                </div>
                              )}
                              {item === "FireExtinguisher" && (
                                <div>
                                  <FireExtinguisher />
                                </div>
                              )}
                              {item === "Marina" && (
                                <div>
                                  <Marina />
                                </div>
                              )}
                              {item === "RoomDarkeningShades" && (
                                <div>
                                  <RoomDarkeningShades />
                                </div>
                              )}
                              {item === "IronIroningBoard" && (
                                <div>
                                  <IronIroningBoard />
                                </div>
                              )}
                              {item === "BedLinenTowels" && (
                                <div>
                                  <BedLinenTowels />
                                </div>
                              )}
                              {item === "Kettle" && (
                                <div>
                                  <Kettle />
                                </div>
                              )}
                              {item === "Microwave" && (
                                <div>
                                  <Microwave />
                                </div>
                              )}
                              {item === "AirConditioning" && (
                                <div>
                                  <AirConditioning />
                                </div>
                              )}
                              {item === "Seaview" && (
                                <div>
                                  <Seaview />
                                </div>
                              )}
                              {item === "Beach" && (
                                <div>
                                  <Beach />
                                </div>
                              )}
                              {item === "PlayGround" && (
                                <div>
                                  <PlayGround />
                                </div>
                              )}
                              {item === "Refrigerator" && (
                                <div>
                                  <Refrigerator />
                                </div>
                              )}
                              {item === "FamilyKidsFriendly" && (
                                <div>
                                  <FamilyKidsFriendly />
                                </div>
                              )}
                              {item === "NoParties" && (
                                <div>
                                  <NoParties />
                                </div>
                              )}
                              {item === "Essentials" && (
                                <div>
                                  <Essentials />
                                </div>
                              )}
                              {item === "CleaningProducts" && (
                                <div>
                                  <CleaningProducts />
                                </div>
                              )}
                              {item === "FirstAidKit" && (
                                <div>
                                  <FirstAidKit />
                                </div>
                              )}
                              {item === "CookingBasics" && (
                                <div>
                                  <CookingBasics />
                                </div>
                              )}
                              {item === "SmokingNotAllowed" && (
                                <div>
                                  <SmokingNotAllowed />
                                </div>
                              )}

                              {item === "bathub" && (
                                <div>
                                  <Bathub />
                                </div>
                              )}
                              {item === "hairdryer" && (
                                <div>
                                  <HairDryer />
                                </div>
                              )}
                              {item === "shower" && (
                                <div>
                                  <Shower />
                                </div>
                              )}
                              {item === "hotwater" && (
                                <div>
                                  <HotWater />
                                </div>
                              )}
                              {item === "soapdrop" && (
                                <div>
                                  <SoapDrop />
                                </div>
                              )}
                              {item === "heating" && (
                                <div>
                                  <Heating />
                                </div>
                              )}
                              {item === "toiletseat" && (
                                <div>
                                  <ToiletSeat />
                                </div>
                              )}
                              {item === "bathhanger" && (
                                <div>
                                  <BathHanger />
                                </div>
                              )}
                              {item === "swimmingpool" && (
                                <div>
                                  <SwimmingPool />
                                </div>
                              )}
                              {item === "valleyview" && (
                                <div>
                                  <ValleyView />
                                </div>
                              )}
                              {item === "park" && (
                                <div>
                                  <Park />
                                </div>
                              )}
                              {item === "balcony" && (
                                <div>
                                  <Balcony />
                                </div>
                              )}
                              {item === "trowelbrush" && (
                                <div>
                                  <TrowelBrush />
                                </div>
                              )}
                              {item === "hanger" && (
                                <div>
                                  <BedroomHanger />
                                </div>
                              )}
                              {item === "beddouble" && (
                                <div>
                                  <BedDouble />
                                </div>
                              )}
                              {item === "bed" && (
                                <div>
                                  <Bed />
                                </div>
                              )}
                              {item === "dresserdrawer" && (
                                <div>
                                  <DresserDrawer />
                                </div>
                              )}
                              {item === "dressingmirror" && (
                                <div>
                                  <DressingMirror />
                                </div>
                              )}
                              {item === "safebox" && (
                                <div>
                                  <SafeBox />
                                </div>
                              )}
                              {item === "sofadouble" && (
                                <div>
                                  <SofaDouble />
                                </div>
                              )}
                              {item === "washingmachine" && (
                                <div>
                                  <WashingMachine />
                                </div>
                              )}
                              {item === "gamepad" && (
                                <div>
                                  <GamePad />
                                </div>
                              )}
                              {item === "medicalcase" && (
                                <div>
                                  <MedicalCase />
                                </div>
                              )}
                              {item === "fireextinguisher" && (
                                <div>
                                  <FireExtinguisher />
                                </div>
                              )}
                              {item === "tvstand" && (
                                <div>
                                  <TvStand />
                                </div>
                              )}
                              {item === "alarm" && (
                                <div>
                                  <Alarm />
                                </div>
                              )}
                              {item === "cctv" && (
                                <div>
                                  <CCTV />
                                </div>
                              )}
                              {item === "wifi" && (
                                <div>
                                  <Wifi />
                                </div>
                              )}
                              {item === "workjob" && (
                                <div>
                                  <WorkJob />
                                </div>
                              )}
                              {item === "laptoptable" && (
                                <div>
                                  <LaptopTable />
                                </div>
                              )}
                              {item === "kitchen" && (
                                <div>
                                  <Kitchen />
                                </div>
                              )}
                              {item === "forkknife" && (
                                <div>
                                  <ForkKnife />
                                </div>
                              )}
                              {item === "stove" && (
                                <div>
                                  <Stove />
                                </div>
                              )}
                              {item === "induction" && (
                                <div>
                                  <Induction />
                                </div>
                              )}
                              {item === "dishes" && (
                                <div>
                                  <Dishes />
                                </div>
                              )}
                              {item === "fridge" && (
                                <div>
                                  <Fridge />
                                </div>
                              )}
                              {item === "tablechair" && (
                                <div>
                                  <TableChair />
                                </div>
                              )}
                              {item === "coffeemachine" && (
                                <div>
                                  <CoffeeMachine />
                                </div>
                              )}
                              {item === "blender" && (
                                <div>
                                  <Blender />
                                </div>
                              )}
                              {item === "saltpepper" && (
                                <div>
                                  <SaltPepper />
                                </div>
                              )}
                              {item === "dishwasher" && (
                                <div>
                                  <DishWasher />
                                </div>
                              )}
                              {item === "wineglass" && (
                                <div>
                                  <WineGlass />
                                </div>
                              )}
                              {item === "trash" && (
                                <div>
                                  <Trash />
                                </div>
                              )}
                              {item === "platefork" && (
                                <div>
                                  <PlateFork />
                                </div>
                              )}
                              {item === "childrenslide" && (
                                <div>
                                  <ChildrenSlide />
                                </div>
                              )}
                              {item === "lounge" && (
                                <div>
                                  <Lounge />
                                </div>
                              )}
                              {item === "swing" && (
                                <div>
                                  <Swing />
                                </div>
                              )}
                              {item === "sun" && (
                                <div>
                                  <Sun />
                                </div>
                              )}
                              {item === "beachumbrella" && (
                                <div>
                                  <BeachUmbrella />
                                </div>
                              )}
                              {item === "parking" && (
                                <div>
                                  <Parking />
                                </div>
                              )}
                              {item === "cat" && (
                                <div>
                                  <Cat />
                                </div>
                              )}
                              {item === "dog" && (
                                <div>
                                  <Dog />
                                </div>
                              )}
                              {item === "breakfast" && (
                                <div>
                                  <Breakfast />
                                </div>
                              )}
                              {item === "longterm" && (
                                <div>
                                  <Longterm />
                                </div>
                              )}
                              {item === "housekey" && (
                                <div>
                                  <HouseKey />
                                </div>
                              )}
                              {item === "userprofile" && (
                                <div>
                                  <Userprofile />
                                </div>
                              )}
                              {item === "cleaningspray" && (
                                <div>
                                  <CleaningSprayAction />
                                </div>
                              )}
                              {item === "smoking" && (
                                <div>
                                  <Smoking />
                                </div>
                              )}
                              {item === "campfire" && (
                                <div>
                                  <CampFire />
                                </div>
                              )}
                              {/* {item === "womenstaff" && (
                              <div>
                                <WomenStaff />
                              </div>
                            )} */}
                              {item === "stairs" && (
                                <div>
                                  <Stairs />
                                </div>
                              )}
                              {item === "manstaff" && (
                                <div>
                                  <ManStaff />
                                </div>
                              )}
                              {item === "toyscubes" && (
                                <div>
                                  <ToyCubes />
                                </div>
                              )}
                              {item === "fairytale" && (
                                <div>
                                  <BookFairyTale />
                                </div>
                              )}
                              {item === "babybedroom" && (
                                <div>
                                  <BabyBedroom />
                                </div>
                              )}
                              {item === "appliance" && (
                                <div>
                                  <Appliance />
                                </div>
                              )}
                              {item === "fan" && (
                                <div>
                                  <Fan />
                                </div>
                              )}
                            </>
                          );
                        })}
                      </>
                    );
                  }
                )}
              </div>
              <div className="w-max">
                <BlackButton
                  text="Show All amenities"
                  onClick={() => setAmenitiesShow(true)}
                />
                <Modal
                  open={amenitiesShow}
                  onClose={() => setAmenitiesShow(false)}
                  center
                  classNames={{
                    modal:
                      "min-w-[500px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
                  }}
                >
                  <div className="font-semibold text-[18px]">
                    What this place offers
                  </div>
                  <div className="gap-[8px] text-[15px] font-normal max-h-[70vh] overflow-auto">
                    {Object.entries(token?.metaData.amenities || {})?.map(
                      (category) => {
                        return (
                          <>
                            {category[1]?.length ? (
                              <div className="text-[16px] font-medium py-[8px]">
                                {category[0]}
                              </div>
                            ) : (
                              <></>
                            )}
                            {category[1].map((item) => {
                              return (
                                <>
                                  {item === "CookwareKitchenUtensils" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CookwareKitchenUtensils />
                                    </div>
                                  )}
                                  {item === "DryingRack" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <DryingRack />
                                    </div>
                                  )}
                                  {item === "CableTv" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CableTv />
                                    </div>
                                  )}
                                  {item === "Toaster" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Toaster />
                                    </div>
                                  )}
                                  {item === "Wardrobe" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Wardrobe />
                                    </div>
                                  )}
                                  {item === "DiningTable" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <DiningTable />
                                    </div>
                                  )}
                                  {item === "Reception" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Reception />
                                    </div>
                                  )}
                                  {item === "CityView" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CityView />
                                    </div>
                                  )}
                                  {item === "SmokeDetectors" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SmokeDetectors />
                                    </div>
                                  )}
                                  {item === "MarinaView" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <MarinaView />
                                    </div>
                                  )}
                                  {item === "Gym" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Gym />
                                    </div>
                                  )}
                                  {item === "CarbonMonoxideDetector" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CarbonMonoxideDetector />
                                    </div>
                                  )}
                                  {item === "Hangers" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Hangers />
                                    </div>
                                  )}
                                  {item === "TrashCans" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <TrashCans />
                                    </div>
                                  )}
                                  {item === "WineGlasses" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <WineGlasses />
                                    </div>
                                  )}
                                  {item === "StreamingServiceSuchAsNetflix" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <StreamingServiceSuchAsNetflix />
                                    </div>
                                  )}

                                  {item === "CrockeryCutlery" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CrockeryCutlery />
                                    </div>
                                  )}

                                  {item === "Toilet" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Toilet />
                                    </div>
                                  )}

                                  {item === "Oven" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Oven />
                                    </div>
                                  )}
                                  {item === "CoffeeMaker" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CoffeeMaker />
                                    </div>
                                  )}
                                  {item ===
                                    "ComplimentarySoapShampooConditioner" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <ComplimentarySoapShampooConditioner />
                                    </div>
                                  )}
                                  {item === "BeachView" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BeachView />
                                    </div>
                                  )}
                                  {item === "Elevator" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Elevator />
                                    </div>
                                  )}
                                  {item === "WirelessInternet" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <WirelessInternet />
                                    </div>
                                  )}
                                  {item === "FreeParkingWithGarage" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <FreeParkingWithGarage />
                                    </div>
                                  )}
                                  {item === "SmartTv" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SmartTv />
                                    </div>
                                  )}
                                  {item === "FireExtinguisher" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <FireExtinguisher />
                                    </div>
                                  )}
                                  {item === "Marina" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Marina />
                                    </div>
                                  )}
                                  {item === "RoomDarkeningShades" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <RoomDarkeningShades />
                                    </div>
                                  )}
                                  {item === "IronIroningBoard" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <IronIroningBoard />
                                    </div>
                                  )}
                                  {item === "BedLinenTowels" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BedLinenTowels />
                                    </div>
                                  )}
                                  {item === "Kettle" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Kettle />
                                    </div>
                                  )}
                                  {item === "Microwave" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Microwave />
                                    </div>
                                  )}
                                  {item === "AirConditioning" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <AirConditioning />
                                    </div>
                                  )}
                                  {item === "Seaview" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Seaview />
                                    </div>
                                  )}
                                  {item === "Beach" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Beach />
                                    </div>
                                  )}
                                  {item === "PlayGround" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <PlayGround />
                                    </div>
                                  )}
                                  {item === "Refrigerator" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Refrigerator />
                                    </div>
                                  )}
                                  {item === "FamilyKidsFriendly" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <FamilyKidsFriendly />
                                    </div>
                                  )}
                                  {item === "NoParties" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <NoParties />
                                    </div>
                                  )}
                                  {item === "Essentials" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Essentials />
                                    </div>
                                  )}
                                  {item === "CleaningProducts" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CleaningProducts />
                                    </div>
                                  )}
                                  {item === "FirstAidKit" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <FirstAidKit />
                                    </div>
                                  )}
                                  {item === "CookingBasics" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CookingBasics />
                                    </div>
                                  )}
                                  {item === "SmokingNotAllowed" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SmokingNotAllowed />
                                    </div>
                                  )}

                                  {item === "bathub" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Bathub />
                                    </div>
                                  )}
                                  {item === "hairdryer" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <HairDryer />
                                    </div>
                                  )}
                                  {item === "shower" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Shower />
                                    </div>
                                  )}
                                  {item === "hotwater" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <HotWater />
                                    </div>
                                  )}
                                  {item === "soapdrop" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SoapDrop />
                                    </div>
                                  )}
                                  {item === "heating" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Heating />
                                    </div>
                                  )}
                                  {item === "toiletseat" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <ToiletSeat />
                                    </div>
                                  )}
                                  {item === "bathhanger" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BathHanger />
                                    </div>
                                  )}
                                  {item === "swimmingpool" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SwimmingPool />
                                    </div>
                                  )}
                                  {item === "valleyview" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <ValleyView />
                                    </div>
                                  )}
                                  {item === "park" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Park />
                                    </div>
                                  )}
                                  {item === "balcony" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Balcony />
                                    </div>
                                  )}
                                  {item === "trowelbrush" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <TrowelBrush />
                                    </div>
                                  )}
                                  {item === "hanger" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BedroomHanger />
                                    </div>
                                  )}
                                  {item === "beddouble" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BedDouble />
                                    </div>
                                  )}
                                  {item === "bed" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Bed />
                                    </div>
                                  )}
                                  {item === "dresserdrawer" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <DresserDrawer />
                                    </div>
                                  )}
                                  {item === "dressingmirror" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <DressingMirror />
                                    </div>
                                  )}
                                  {item === "safebox" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SafeBox />
                                    </div>
                                  )}
                                  {item === "sofadouble" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SofaDouble />
                                    </div>
                                  )}
                                  {item === "washingmachine" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <WashingMachine />
                                    </div>
                                  )}
                                  {item === "gamepad" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <GamePad />
                                    </div>
                                  )}
                                  {item === "medicalcase" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <MedicalCase />
                                    </div>
                                  )}
                                  {item === "fireextinguisher" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <FireExtinguisher />
                                    </div>
                                  )}
                                  {item === "tvstand" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <TvStand />
                                    </div>
                                  )}
                                  {item === "alarm" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Alarm />
                                    </div>
                                  )}
                                  {item === "cctv" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CCTV />
                                    </div>
                                  )}
                                  {item === "wifi" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Wifi />
                                    </div>
                                  )}
                                  {item === "workjob" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <WorkJob />
                                    </div>
                                  )}
                                  {item === "laptoptable" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <LaptopTable />
                                    </div>
                                  )}
                                  {item === "kitchen" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Kitchen />
                                    </div>
                                  )}
                                  {item === "forkknife" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <ForkKnife />
                                    </div>
                                  )}
                                  {item === "stove" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Stove />
                                    </div>
                                  )}
                                  {item === "induction" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Induction />
                                    </div>
                                  )}
                                  {item === "dishes" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Dishes />
                                    </div>
                                  )}
                                  {item === "fridge" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Fridge />
                                    </div>
                                  )}
                                  {item === "tablechair" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <TableChair />
                                    </div>
                                  )}
                                  {item === "coffeemachine" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CoffeeMachine />
                                    </div>
                                  )}
                                  {item === "blender" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Blender />
                                    </div>
                                  )}
                                  {item === "saltpepper" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <SaltPepper />
                                    </div>
                                  )}
                                  {item === "dishwasher" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <DishWasher />
                                    </div>
                                  )}
                                  {item === "wineglass" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <WineGlass />
                                    </div>
                                  )}
                                  {item === "trash" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Trash />
                                    </div>
                                  )}
                                  {item === "platefork" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <PlateFork />
                                    </div>
                                  )}
                                  {item === "childrenslide" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <ChildrenSlide />
                                    </div>
                                  )}
                                  {item === "lounge" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Lounge />
                                    </div>
                                  )}
                                  {item === "swing" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Swing />
                                    </div>
                                  )}
                                  {item === "sun" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Sun />
                                    </div>
                                  )}
                                  {item === "beachumbrella" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BeachUmbrella />
                                    </div>
                                  )}
                                  {item === "parking" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Parking />
                                    </div>
                                  )}
                                  {item === "cat" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Cat />
                                    </div>
                                  )}
                                  {item === "dog" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Dog />
                                    </div>
                                  )}
                                  {item === "breakfast" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Breakfast />
                                    </div>
                                  )}
                                  {item === "longterm" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Longterm />
                                    </div>
                                  )}
                                  {item === "housekey" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <HouseKey />
                                    </div>
                                  )}
                                  {item === "userprofile" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Userprofile />
                                    </div>
                                  )}
                                  {item === "cleaningspray" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CleaningSprayAction />
                                    </div>
                                  )}
                                  {item === "smoking" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Smoking />
                                    </div>
                                  )}
                                  {item === "campfire" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <CampFire />
                                    </div>
                                  )}
                                  {/* {item === "womenstaff" && (
                                  <div className="w-full border-b-[1px] py-[6px]">
                                    <WomenStaff />
                                  </div>
                                )} */}
                                  {item === "stairs" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Stairs />
                                    </div>
                                  )}
                                  {item === "manstaff" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <ManStaff />
                                    </div>
                                  )}
                                  {item === "toyscubes" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <ToyCubes />
                                    </div>
                                  )}
                                  {item === "fairytale" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BookFairyTale />
                                    </div>
                                  )}
                                  {item === "babybedroom" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <BabyBedroom />
                                    </div>
                                  )}
                                  {item === "appliance" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Appliance />
                                    </div>
                                  )}
                                  {item === "fan" && (
                                    <div className="w-full border-b-[1px] py-[6px]">
                                      <Fan />
                                    </div>
                                  )}
                                </>
                              );
                            })}
                          </>
                        );
                      }
                    )}
                  </div>
                </Modal>
              </div>
              <hr />

              <div className="flex items-center gap-[10px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5355 12.4645C22.4881 14.4171 22.4881 17.5829 20.5355 19.5355C18.5829 21.4882 15.4171 21.4882 13.4644 19.5355C11.5118 17.5829 11.5118 14.4171 13.4644 12.4645C15.4171 10.5118 18.5829 10.5118 20.5355 12.4645"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.866 5.495C9.863 5.495 9.861 5.497 9.861 5.5C9.861 5.503 9.863 5.505 9.866 5.505C9.869 5.505 9.871 5.503 9.871 5.5C9.871 5.497 9.869 5.495 9.866 5.495"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.327 5.495C7.324 5.495 7.322 5.497 7.322 5.5C7.322 5.503 7.324 5.505 7.327 5.505C7.33 5.505 7.332 5.503 7.332 5.5C7.332 5.497 7.33 5.495 7.327 5.495"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.77899 5.49012C4.77599 5.49012 4.77399 5.49212 4.77399 5.49512C4.77399 5.49812 4.77599 5.50012 4.77899 5.50012C4.78199 5.50012 4.78399 5.49812 4.78399 5.49512C4.78399 5.49212 4.78199 5.49012 4.77899 5.49012"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 8H19"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 11.417V5C19 3.895 18.105 3 17 3H4C2.895 3 2 3.895 2 5V16C2 17.105 2.895 18 4 18H12.418"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.41 14.5898L15.59 17.4098"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.41 17.4098L15.59 14.5898"
                    stroke="#323232"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="text-[18px] font-semibold">
                  Cancellation policy
                </div>
              </div>
              <div className="font-normal max-h-[100px] overflow-hidden">
                {renderTextWithLineBreaks(token?.metaData.cancellation)}
              </div>
              {/* <div className="flex">
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
                    </div>
                  )
                )}
              </div> */}

              <hr />
              <div className="flex items-center gap-[10px]">
                <GroundRuleIcon />
                <div className="text-[18px] font-semibold">Ground Rules</div>
              </div>
              <div className="font-normal">
                {renderTextWithLineBreaks(token?.metaData.groundRule)}
              </div>
            </div>
            {location.pathname.includes("dashboard/host") ? (
              <div className="space-y-[16px] h-max bg-white rounded-[16px] p-[20px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div className="text-[20px] font-semibold">
                  Property Listing Details
                </div>

                <div className="space-y-[10px]">
                  <div>Currency</div>
                  <div className="px-[12px] flex items-center justify-between w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div className="flex items-center gap-[10px]">
                      <NUSDIcon />
                      <div className="font-normal">USDC</div>
                    </div>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.66797 6.33334L7.0013 8.66668L9.33464 6.33334"
                        stroke="#38A569"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-[10px]">
                  <div>Price per day</div>
                  <div className="px-[12px]  w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <input
                      className="outline-none w-full font-normal"
                      placeholder="100"
                      value={listingDetails.price_per_day}
                      onChange={(e) =>
                        setListingDetails({
                          ...listingDetails,
                          price_per_day: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[10px]">
                  <Toggle
                    status={listingDetails.auto_approve}
                    onChange={() =>
                      setListingDetails({
                        ...listingDetails,
                        auto_approve: !listingDetails.auto_approve,
                      })
                    }
                  />
                  <div>Auto approve</div>
                </div>

                <div className="px-[12px] flex items-center justify-between w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="font-normal">Minimum Stay</div>
                  <NumberSpin
                    value={listingDetails.minimum_stay}
                    onChange={(value) =>
                      setListingDetails({
                        ...listingDetails,
                        minimum_stay: value,
                      })
                    }
                    min={1}
                  />
                </div>
                <div className="font-semibold">Cancellation policy</div>
                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="space-y-[10px]">
                    <div className="font-normal">Percentage</div>
                    <div className="flex items-center px-[12px] w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <input
                        className="outline-none w-full font-normal"
                        placeholder="50"
                        value={cancellationTemp.percentage}
                        onChange={(e) =>
                          setCancellationTemp({
                            ...cancellationTemp,
                            percentage: e.target.value,
                          })
                        }
                      />
                      <div className="text-[#959595]">%</div>
                    </div>
                  </div>
                  <div className="space-y-[10px]">
                    <div className="font-normal">Deadline</div>
                    <div className="flex items-center px-[12px] w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <input
                        className="outline-none font-normal w-full"
                        placeholder="10"
                        value={cancellationTemp.deadline}
                        onChange={(e) =>
                          setCancellationTemp({
                            ...cancellationTemp,
                            deadline: e.target.value,
                          })
                        }
                      />
                      <div className="text-[#959595] w-[420px] truncate">
                        days before check-in
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[10px] cursor-pointer hover:underline decoration-[#5b1dee]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 12H17"
                      stroke="#5B1DEE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 17V7"
                      stroke="#5B1DEE"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div
                    className="text-[#5B1DEE] cursor-pointer"
                    onClick={handleAddItem}
                  >
                    Add cancellation policy
                  </div>
                </div>
                <div className="font-normal">Items</div>
                {listingDetails.cancellation.map((item, i) => {
                  return (
                    <div className="px-[12px] flex items-center justify-between w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="font-normal">
                        {item.percentage} % refundable {item.deadline} days
                        before
                      </div>
                      <svg
                        className="cursor-pointer hover:translate-y-[-2px]"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          // Create a copy of the cancellation array
                          const updatedCancellation =
                            listingDetails.cancellation.slice();
                          updatedCancellation.splice(i, 1);
                          setListingDetails({
                            ...listingDetails,
                            cancellation: updatedCancellation,
                          });
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.4467 18H6.54672C5.67422 18 4.94922 17.3267 4.88422 16.4559L4.13672 6.33337H15.8317L15.1092 16.4517C15.0467 17.3242 14.3209 18 13.4467 18V18Z"
                          stroke="#5A5A5A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.9987 9.66663V14.6666"
                          stroke="#5A5A5A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3.33203 6.33329H16.6654"
                          stroke="#5A5A5A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.1654 6.33333L13.3212 4.08167C13.077 3.43083 12.4554 3 11.7604 3H8.23703C7.54203 3 6.92036 3.43083 6.6762 4.08167L5.83203 6.33333"
                          stroke="#5A5A5A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8576 9.66663L12.4992 14.6666"
                          stroke="#5A5A5A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.13984 9.66663L7.49818 14.6666"
                          stroke="#5A5A5A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  );
                })}

                <PurpleButton
                  text={
                    <div className="text-center">
                      {token?.short.islisted
                        ? "Update Listing"
                        : "List For Rental"}
                    </div>
                  }
                  onClick={handleListNFT}
                />
                <div className="grid grid-cols-2 gap-[20px]">
                  <BlackButton text="Edit Metadata" onClick={handleEdit} />
                  {token?.short.islisted ? (
                    <BlackButton
                      text="Unlist Property"
                      onClick={handleUnlist}
                    />
                  ) : (
                    <DisabledButton text="Unlist Property" />
                  )}
                </div>
              </div>
            ) : (
              <div className="h-max space-y-[16px] bg-white rounded-[16px] p-[20px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <PickDate />
                <div className="flex justify-between w-full">
                  <div className="font-semibold">Minimum Stay</div>
                  <div className="font-semibold">
                    {token?.short.minimum_stay} nights
                  </div>
                </div>
                <div className="px-[12px] flex items-center justify-between w-full py-[14px] rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div>Guests</div>
                  <NumberSpin
                    min={1}
                    value={reservation_guests}
                    onChange={(value) => dispatch(setReservationGuests(value))}
                  />
                </div>
                <PurpleButton
                  text={
                    <div
                      className="text-center"
                      onClick={() => {
                        if (
                          reservation_guests >
                          token?.metaData?.essentials.guests
                        ) {
                          toast.error("Too many guests requested");
                          return;
                        }
                        if (
                          Math.round(
                            (reservation_period.end -
                              reservation_period.start) /
                              86400
                          ) < token?.short.minimum_stay
                        ) {
                          toast.error(
                            "Your requested stay is shorter than the host´s minimum stay"
                          );
                          return;
                        }
                        navigate(location.pathname + "/confirm");
                      }}
                    >
                      Reserve
                    </div>
                  }
                />
                <div className="text-[#959595] text-center">
                  You will not be charged yet. You will be required to sign a
                  message from your wallet to confirm the reservation
                </div>
                <hr />
                <div className="flex justify-between items-center w-full">
                  <div className="text-[#959595]">
                    Total price for the property
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <NUSDIcon />
                    <div>
                      {Math.round(
                        (reservation_period.end - reservation_period.start) /
                          86400
                      ) * token?.short.price_per_day}
                      <span className="ml-1">USDC</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="text-[#959595]">Coded Estate service fee</div>
                  <div className="flex items-center gap-[10px]">
                    <NUSDIcon />
                    <div>
                      {(fee *
                        (Math.round(
                          (reservation_period.end - reservation_period.start) /
                            86400
                        ) *
                          token?.short.price_per_day)) /
                        10000}
                      <span className="ml-1">USDC</span>
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
              </div>
            )}
          </div>
          <Review tokenId={token?.token_id} />

          <GoogleMap
            center={token?.metaData.location}
            zoom={zoom}
            mapContainerClassName="relative w-full h-[300px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
            options={{
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              zoomControl: false,
              styles: mapStyles,
            }}
          >
            <div className="absolute top-[20px] right-[20px] flex items-center gap-[10px]">
              <div className="p-[4px] rounded-full hover:bg-[#000000] shadow-md bg-gradient-to-b from-[#202020c0] from-0% to-70% to-[#202020]">
                <MapShareIcon />
              </div>
              <div
                className="p-[4px] rounded-full hover:bg-[#f6f6f6] shadow-md bg-white cursor-pointer"
                onClick={() => setZoom(zoom + 1)}
              >
                <MapPlusIcon />
              </div>
              <div
                className="p-[4px] rounded-full hover:bg-[#f6f6f6] shadow-md bg-white cursor-pointer"
                onClick={() => setZoom(zoom - 1)}
              >
                <MapMinusIcon />
              </div>
            </div>
            <Marker
              position={token?.metaData.location}
              icon={{
                url: mapPinIcon,
                scaledSize: new window.google.maps.Size(80, 80),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(40, 68),
              }}
            />
          </GoogleMap>
        </Fade>
      </div>
    </div>
  );
};

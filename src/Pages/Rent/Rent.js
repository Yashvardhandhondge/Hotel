import {
  SelectionGroup,
  SelectionItem,
} from "../../Components/Selection/Selection";
import {
  ArrowIconRent,
  ArrowToLeft,
  ArrowToRightIcon,
  FilterIconRent,
  GridLayoutIconRent,
  LightIcon,
  MapLineIconRent,
  NUSDIcon,
  PinLocationIconRent,
  RatingIconRent,
  SearchNormalIcon,
  ShortRentalIcon,
  SortIconRentCe,
  SortIconRentDec,
  CheckMarkPurple,
  PlusIcon,
} from "../../AssetComponents/Images";
import { PurpleButton } from "../../Components/Buttons/PurpleButton";
import { Popover } from "react-tiny-popover";
import { useState, useEffect } from "react";
import { RentalItem } from "../../Components/RealEstateProperty/RentalItem";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { queryContract } from "../../Components/functions/Contract";
import { useDispatch } from "react-redux";
import { Testnet } from "@nibiruchain/nibijs";
import { updateToken } from "../../Components/functions/Functions";
import { useSelector } from "react-redux";
import { mapStyles } from "../../Components/GoogleMap/Style";
import {
  MapShareIcon,
  MapPlusIcon,
  MapMinusIcon,
} from "../../AssetComponents/Images";
import { GoogleMap, OverlayView, Marker } from "@react-google-maps/api";
import { PinIcon } from "../../AssetComponents/Images";
import mapPinIcon from "../../assets/images/Dashboard/Dashboard/mappin.svg";
import { DateRangePicker } from "react-date-range";
import {
  setReservationPeriod,
  setWho,
} from "../../ReduxSlices/ReservationSlice";
import { NumberSpin } from "../../Components/Spin/NumberSpin";
import Modal from "react-responsive-modal";
import { CustomChart } from "../../Components/Chart/CustomChart";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {
  setPriceRange,
  setAmenities,
  setAmenitiesEssentials,
  setFilter,
  setPropertyType,
  setInstantBook,
  setAllowPets,
} from "../../ReduxSlices/SearchSlice";
import { BlackButton } from "../../Components/Buttons/BlackButton";
import { Toggle } from "../../Components/Toggle/Toggle";
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
import { api } from "../../Components/functions/Api";
import { Appliance, Fan } from "../../Components/Amenities/HeatingandCooling";
import { Fade } from "react-awesome-reveal";

export const Rent = () => {
  const [searchPop, setSearchPop] = useState(false);
  const [searchItem, setSearchItem] = useState(-1);
  const [showOrderMenu, setShowOrderMenu] = useState(false);
  const [showMapMenu, setShowMapMenu] = useState(false);
  const navigate = useNavigate();
  const account = useSelector((state) => state.auth.account);
  const nfts = useSelector((state) => state.nft?.nfts);
  const reservation_period = useSelector((state) => state.reservation.period);
  const who = useSelector((state) => state.reservation.who);
  const guests = useSelector((state) => state.reservation.guests);
  const chartData = [
    7, 22, 1, 93, 48, 8, 67, 9, 55, 7, 22, 1, 93, 48, 8, 67, 9, 55, 7, 22, 1,
    93, 48, 8, 67, 9, 55,
  ];
  const amenities = useSelector((state) => state.search.amenities);
  const propertyType = useSelector((state) => state.search.propertyType);
  const [metaDetails, setMetaDetails] = useState({
    amenities: {},
  });
  const [properties, setProperties] = useState([]);
  const defaultPeriod = [
    {
      startDate: reservation_period.start
        ? new Date(reservation_period.start * 1000)
        : new Date(),
      endDate: reservation_period.end
        ? new Date(reservation_period.end * 1000)
        : new Date(),
      key: "selection",
      color: "#5b1deeaa",
    },
  ];
  const amenityCategories = [
    "All",
    "Bathroom",
    "Bedroom and Laundry",
    "Entertainment",
    "Family",
    "Heating and cooling",
    "Home safety",
    "Internet and office",
    "Kitchen and dining",
    "Location features",
    "Outdoor",
    "Parking and facilities",
    "Services",
    "Others",
  ];
  const [period, setPeriod] = useState(defaultPeriod);
  const [openFilter, setOpenFilter] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState();
  const testNet = Testnet(1);
  const [zoom, setZoom] = useState(10);
  const [currentCategory, setCurrentCategory] = useState("Bathroom");
  const [activeToken, setActiveToken] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const [addressInput, setAddressInput] = useState();
  const [hideMap, setHideMap] = useState(false);
  const [predictList, setPredictList] = useState([]);
  const service = new window.google.maps.places.AutocompleteService();
  const geocoder = new window.google.maps.Geocoder();
  const range = useSelector((state) => state.search.priceRange);
  const instantBook = useSelector((state) => state.search.instantBook);
  const allowPets = useSelector((state) => state.search.allowPets);
  const [pinLocation, setPinLocation] = useState({
    lat: 25,
    lng: 55,
  });

  const getAddressList = async (input) => {
    service.getPlacePredictions(
      { input: input },
      function (predictions, status) {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          return;
        }
        setPredictList(predictions);
      }
    );
  };

  const handleSelectMapPin = async (pinLocation) => {
    const res = await geocoder.geocode({ location: pinLocation });
    // setAddressInput(res.results[0].formatted_address);
  };

  useEffect(() => {
    handleSelectMapPin(pinLocation);
  }, [pinLocation]);

  useEffect(() => {
    if (!range?.max)
      dispatch(
        setPriceRange({
          min: range?.min,
          max: 1000,
        })
      );
    if (!range?.min)
      dispatch(
        setPriceRange({
          min: 1,
          max: range?.max,
        })
      );
  }, [range]);

  useEffect(() => {
    getAddressList(addressInput);
  }, [addressInput]);

  useEffect(() => {
    switch (location.pathname.split("/")[2]) {
      case "all":
        setCurrent(0);
        break;
      case "long":
        setCurrent(1);
        break;
      case "short":
        setCurrent(2);
        break;
      default:
        setCurrent(-1);
        break;
    }
  }, [location]);

  const handleSelectFromAddressList = async (place_id) => {
    const res = await geocoder.geocode({ placeId: place_id });
    setPinLocation({
      lat: res.results[0].geometry.location.lat(),
      lng: res.results[0].geometry.location.lng(),
    });
    setSearchItem(1);
  };

  useEffect(() => {
    dispatch(
      setReservationPeriod({
        start: Math.floor(new Date(period[0].startDate).getTime() / 1000),
        end: Math.floor(new Date(period[0].endDate).getTime() / 1000),
      })
    );
  }, [period]);

  const handleClear = () => {
    dispatch(
      setPriceRange({
        min: 1,
        max: 1000,
      })
    );
    dispatch(
      setAmenities({
        bathroom: 0,
        bedroom: 0,
        bed: 0,
        squareFeet: "",
      })
    );
    dispatch(setPropertyType(null));
    dispatch(setInstantBook(false));
    dispatch(setAllowPets(false));
    setMetaDetails({ amenities: {} });
  };

  const getProperties = async () => {
    const res = await api("property/getProperties", {});
    // console.log(res);
    setProperties(res);
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex items-center justify-between px-[16px] my-[20px]">
          <SelectionGroup
            defaultItem={current}
            className="border-[2px] border-[#e3e3e3] w-max px-[6px] py-[4px] gap-[8px] flex items-center rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">All</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => navigate("/rent/all")}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">All</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Long term</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => navigate("/rent/long")}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Long term</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Short term</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => navigate("/rent/short")}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Short term</div>
                </div>
              }
            />
          </SelectionGroup>

          <Popover
            isOpen={searchPop}
            positions={"bottom"}
            onClickOutside={() => {
              setSearchPop(false);
              setSearchItem(-1);
              setPredictList([]);
            }}
            content={
              <div className="mt-[10px] bg-white rounded-[10px] w-max h-max shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                {searchItem === 0 &&
                  predictList?.map((address) => {
                    return (
                      <div
                        onClick={() => {
                          handleSelectFromAddressList(address.place_id);
                        }}
                        className="w-[400px] bg-white flex gap-[10px] items-center cursor-pointer overflow-hidden h-[50px] p-[8px] rounded-[8px] hover:bg-gray-300"
                      >
                        <PinIcon />
                        <div className="w-full truncate">
                          {address.description}
                        </div>
                      </div>
                    );
                  })}
                {(searchItem === 1 || searchItem === 2) && (
                  <DateRangePicker
                    onChange={(item) => setPeriod([item.selection])}
                    months={2}
                    ranges={period}
                    direction="horizontal"
                    minDate={new Date()}
                    color="#5b1dee"
                    startDatePlaceholder="Check In"
                    endDatePlaceholder="Check Out"
                    className="my-[20px]"
                    showDateDisplay={false}
                  />
                )}
                {searchItem === 3 && (
                  <div className="w-[340px] p-[20px] space-y-[10px]">
                    <div className="flex items-center justify-between ">
                      <div>
                        <div className="font-semibold">Adults</div>
                        <div className="text-[#959595]">Age 13 or above</div>
                      </div>
                      <div className="flex items-center">
                        <NumberSpin
                          value={who.adults || 1}
                          onChange={(value) =>
                            dispatch(
                              setWho({
                                ...who,
                                adults: value,
                              })
                            )
                          }
                          min={1}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between ">
                      <div>
                        <div className="font-semibold">Children</div>
                        <div className="text-[#959595]">Age 2-12</div>
                      </div>
                      <div className="flex items-center">
                        <NumberSpin
                          value={who.children || 0}
                          onChange={(value) =>
                            dispatch(
                              setWho({
                                ...who,
                                children: value,
                              })
                            )
                          }
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between ">
                      <div>
                        <div className="font-semibold">Infants</div>
                        <div className="text-[#959595]">Under 2</div>
                      </div>
                      <div className="flex items-center">
                        <NumberSpin
                          value={who.infants || 0}
                          onChange={(value) =>
                            dispatch(
                              setWho({
                                ...who,
                                infants: value,
                              })
                            )
                          }
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between ">
                      <div>
                        <div className="font-semibold">Pets</div>
                        <div className="text-[#959595] underline">
                          Bringing a service animal?
                        </div>
                      </div>
                      <div className="flex items-center">
                        <NumberSpin
                          value={who.pets || 0}
                          onChange={(value) =>
                            dispatch(
                              setWho({
                                ...who,
                                pets: value,
                              })
                            )
                          }
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
          >
            <div className="flex items-center h-max w-max bg-white border-[2px] gap-[1px] flex items-center border-[#e3e3e3] rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="" onClick={() => setSearchPop(true)}>
                <SelectionGroup
                  SelectedItemMask="rounded-[10px] bg-[#e3e3e3]"
                  defaultItem={searchItem}
                  className="gap-[2px] flex items-center w-max rounded-[14px]"
                >
                  <SelectionItem
                    UnselectedItem={
                      <div
                        onClick={() => setSearchItem(0)}
                        className="cursor-pointer hover:bg-[#f6f6f6] space-y-[4px] py-[8px] px-[20px] bg-white rounded-[10px]"
                      >
                        <div className="text-[16px]">Where</div>
                        <input
                          placeholder="Search destinations"
                          className="outline-none font-normal truncate"
                          value={addressInput}
                        />
                      </div>
                    }
                    SelectedItem={
                      <div className="cursor-pointer hover:bg-[#f6f6f6] space-y-[4px] py-[8px] px-[20px] bg-[#e3e3e3] rounded-[10px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.8),0px_1px_2px_0px_rgba(0,0,0,0.1)]">
                        <div className="text-[16px]">Where</div>
                        <input
                          placeholder="Search destinations"
                          className="outline-none bg-[#e3e3e3] font-normal truncate"
                          value={addressInput}
                          onChange={(e) => {
                            // setIsOpen(true);
                            setAddressInput(e.target.value);
                          }}
                        />
                      </div>
                    }
                  />
                  <SelectionItem
                    UnselectedItem={
                      <div
                        onClick={() => setSearchItem(1)}
                        className="space-y-[4px] hover:bg-[#f6f6f6] py-[8px] px-[20px] bg-white rounded-[10px]"
                      >
                        <div className="">Check in</div>
                        <div className="text-[#666666] font-normal truncate">
                          {reservation_period.start
                            ? new Date(
                                reservation_period.start * 1000
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Add Date"}
                        </div>
                      </div>
                    }
                    SelectedItem={
                      <div className="space-y-[4px] hover:bg-[#f6f6f6] py-[8px] px-[20px] bg-[#e3e3e3] rounded-[10px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.8),0px_1px_2px_0px_rgba(0,0,0,0.1)]">
                        <div className="">Check in</div>
                        <div className="text-[#666666] font-normal truncate">
                          {reservation_period.start
                            ? new Date(
                                reservation_period.start * 1000
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Add Date"}
                        </div>
                      </div>
                    }
                  />
                  <SelectionItem
                    UnselectedItem={
                      <div
                        onClick={() => setSearchItem(2)}
                        className="space-y-[4px] hover:bg-[#f6f6f6] py-[8px] px-[20px] bg-white w-[120px] rounded-[10px]"
                      >
                        <div className="">Check out</div>
                        <div className="text-[#666666] font-normal truncate">
                          {reservation_period.end
                            ? new Date(
                                reservation_period.end * 1000
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Add Date"}
                        </div>
                      </div>
                    }
                    SelectedItem={
                      <div className="space-y-[4px] hover:bg-[#f6f6f6] py-[8px] px-[20px] bg-[#e3e3e3] rounded-[10px] w-[120px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.8),0px_1px_2px_0px_rgba(0,0,0,0.1)]">
                        <div className="">Check out</div>
                        <div className="text-[#666666] font-normal truncate">
                          {reservation_period.end
                            ? new Date(
                                reservation_period.end * 1000
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Add Date"}
                        </div>
                      </div>
                    }
                  />
                  <SelectionItem
                    UnselectedItem={
                      <div
                        onClick={() => setSearchItem(3)}
                        className="space-y-[4px] hover:bg-[#f6f6f6] py-[8px] px-[20px] bg-white w-[120px] rounded-[10px]"
                      >
                        <div className="">Who</div>
                        <div className="text-[#666666] font-normal tr uncate">
                          {guests ? guests : "Add Guests"}
                        </div>
                      </div>
                    }
                    SelectedItem={
                      <div className="space-y-[4px] hover:bg-[#f6f6f6] py-[8px] px-[20px] bg-[#e3e3e3] rounded-[10px] w-[120px] shadow-[2px_2px_1px_0px_rgba(187,195,206,0.6),-2px_-2px_2px_0px_rgba(253,255,255,0.8),0px_1px_2px_0px_rgba(0,0,0,0.1)]">
                        <div className="">Who</div>
                        <div className="text-[#666666] font-normal truncate">
                          {guests ? guests : "Add Guests"}
                        </div>
                      </div>
                    }
                  />
                </SelectionGroup>
              </div>
              <div className="px-[10px]">
                <PurpleButton
                  text={
                    <div className="flex items-center gap-[10px]">
                      <SearchNormalIcon />
                      <div className="font-normal">Search</div>
                    </div>
                  }
                  onClick={(e) => {
                    setSearchItem(-1);
                    setSearchPop(false);
                  }}
                />
              </div>
            </div>
          </Popover>

          <div className="flex items-center gap-[10px]">
            <div
              onClick={() => setOpenFilter(true)}
              className="py-[4px] cursor-pointer bg-white hover:bg-[#f6f6f6] rounded-[10px] px-[14px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
            >
              <FilterIconRent />
              <div className="text-black font-semibold">Filter</div>
            </div>

            <Modal
              open={openFilter}
              center
              onClose={() => setOpenFilter(false)}
              classNames={{
                modal:
                  "rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
              }}
            >
              <div className="w-[500px]">
                <div className="flex items-center w-full mb-[20px] gap-1">
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1035 11.293L19.0005 8.397L16.1035 5.5"
                      stroke="#323232"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 8.39999H19"
                      stroke="#323232"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.897 13.707L5 16.603L7.897 19.5"
                      stroke="#323232"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M19 16.6H5"
                      stroke="#323232"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="text-[20px] font-semibold">Filters</div>
                </div>
                <div className="h-[50vh] overflow-auto scrollbarwidth px-[10px]">
                  <div className="mt-[20px]">
                    <div className="text-[18px] font-semibold">Price range</div>
                  </div>
                  <div className="w-full">
                    <div className="w-full mx-auto space-y-2">
                      <CustomChart
                        data={chartData}
                        start={range?.min}
                        end={range?.max}
                        min={1}
                        max={1000}
                      />
                      {/* <InputRange
                        draggableTrack
                        maxValue={1000}
                        minValue={1}
                        onChange={(value) => {
                          // console.log(value);
                          dispatch(setPriceRange(value));
                        }}
                        value={range}
                      /> */}
                      <RangeSlider
                        max={1000}
                        min={1}
                        value={[range?.min, range?.max]}
                        onInput={(value) => {
                          dispatch(
                            setPriceRange({
                              min: value[0],
                              max: value[1],
                            })
                          );
                        }}
                        // className="bg-[#5b1dee]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-[20px] my-[16px] font-semibold">
                    <div className="w-full space-y-[10px]">
                      <div className="font-semibold">Minimum</div>
                      <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                        <div>USDC</div>
                        <input
                          className="outline-none w-full"
                          value={range?.min}
                          onChange={(e) =>
                            dispatch(
                              setPriceRange({
                                ...range,
                                min: e.target.value,
                              })
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full space-y-[10px]">
                      <div className="font-semibold">Maximum</div>
                      <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                        <div>USDC</div>
                        <input
                          className="outline-none w-full"
                          value={range?.max}
                          onChange={(e) =>
                            dispatch(
                              setPriceRange({
                                ...range,
                                max: e.target.value,
                              })
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[2px] bg-[#eeeeee] my-[12px]" />
                  <div className="space-y-[12px]">
                    <div className="text-[18px] font-semibold">
                      Rooms and beds
                    </div>
                    <div>
                      <div>Bedrooms</div>
                      <SelectionGroup
                        defaultItem={amenities.bedroom}
                        className="flex gap-[8px] text-[#D5D5D5] my-[12px]"
                        // SelectedItemMask="border-[#5B1DEE] text-[#5B1DEE]"
                      >
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              Any
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 0 })
                                )
                              }
                            >
                              Any
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              1
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 1 })
                                )
                              }
                            >
                              1
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              2
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 2 })
                                )
                              }
                            >
                              2
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              3
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 3 })
                                )
                              }
                            >
                              3
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              4
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 4 })
                                )
                              }
                            >
                              4
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              5
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 5 })
                                )
                              }
                            >
                              5
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              6
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 6 })
                                )
                              }
                            >
                              6
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              7+
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6]  py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bedroom: 7 })
                                )
                              }
                            >
                              7+
                            </div>
                          }
                        />
                      </SelectionGroup>

                      <div>Beds</div>
                      <SelectionGroup
                        defaultItem={amenities.bed}
                        className="flex gap-[8px] text-[#D5D5D5] my-[12px]"
                      >
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              Any
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 0 }))
                              }
                            >
                              Any
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              1
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 1 }))
                              }
                            >
                              1
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              2
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 2 }))
                              }
                            >
                              2
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              3
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 3 }))
                              }
                            >
                              3
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              4
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 4 }))
                              }
                            >
                              4
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              5
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 5 }))
                              }
                            >
                              5
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              6
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 6 }))
                              }
                            >
                              6
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] border-[#5B1DEE] text-[#5B1DEE] text-center">
                              7+
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(setAmenities({ ...amenities, bed: 7 }))
                              }
                            >
                              7+
                            </div>
                          }
                        />
                      </SelectionGroup>

                      <div>Bathrooms</div>
                      <SelectionGroup
                        defaultItem={amenities.bathroom}
                        className="flex gap-[8px] text-[#D5D5D5] my-[12px]"
                        SelectedItemMask="border-[#5B1DEE] text-[#5B1DEE]"
                      >
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              Any
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 0 })
                                )
                              }
                            >
                              Any
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              1
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 1 })
                                )
                              }
                            >
                              1
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              2
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 2 })
                                )
                              }
                            >
                              2
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              3
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 3 })
                                )
                              }
                            >
                              3
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              4
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 4 })
                                )
                              }
                            >
                              4
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              5
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 5 })
                                )
                              }
                            >
                              5
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              6
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 6 })
                                )
                              }
                            >
                              6
                            </div>
                          }
                        />
                        <SelectionItem
                          SelectedItem={
                            <div className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                              7+
                            </div>
                          }
                          UnselectedItem={
                            <div
                              className="w-full min-w-[50px] hover:bg-[#f6f6f6] py-[8px] border-[1px] rounded-[16px] text-center"
                              onClick={() =>
                                dispatch(
                                  setAmenities({ ...amenities, bathroom: 7 })
                                )
                              }
                            >
                              7+
                            </div>
                          }
                        />
                      </SelectionGroup>
                    </div>
                  </div>
                  <div className="w-full h-[2px] bg-[#eeeeee] my-[12px]" />
                  <div>
                    <div className="text-[18px] font-semibold">
                      Property type
                    </div>
                    <SelectionGroup
                      defaultItem={propertyType}
                      className="flex gap-[8px] text-[#D5D5D5] my-[12px]"
                    >
                      <SelectionItem
                        SelectedItem={
                          <div className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                            House
                          </div>
                        }
                        UnselectedItem={
                          <div
                            className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center"
                            onClick={() => dispatch(setPropertyType(0))}
                          >
                            House
                          </div>
                        }
                      />
                      <SelectionItem
                        SelectedItem={
                          <div className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                            Apartment
                          </div>
                        }
                        UnselectedItem={
                          <div
                            className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center"
                            onClick={() => dispatch(setPropertyType(1))}
                          >
                            Apartment
                          </div>
                        }
                      />
                      <SelectionItem
                        SelectedItem={
                          <div className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                            Guesthouse
                          </div>
                        }
                        UnselectedItem={
                          <div
                            className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center"
                            onClick={() => dispatch(setPropertyType(2))}
                          >
                            Guesthouse
                          </div>
                        }
                      />
                      <SelectionItem
                        SelectedItem={
                          <div className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center border-[#5B1DEE] text-[#5B1DEE]">
                            Hotel
                          </div>
                        }
                        UnselectedItem={
                          <div
                            className="bg-[#F6F6F6] min-w-[100px] hover:bg-[#ffffff] w-full py-[30px] border-[1px] rounded-[16px] text-center"
                            onClick={() => dispatch(setPropertyType(3))}
                          >
                            Hotel
                          </div>
                        }
                      />
                    </SelectionGroup>
                  </div>
                  <div className="w-full h-[2px] bg-[#eeeeee] my-[12px]" />

                  <div className="w-full space-y-[10px]">
                    <div className="font-semibold text-[18px]">Amenities</div>
                    <div className="grid grid-cols-2 gap-[8px] text-[15px] font-normal">
                      {Object.entries(metaDetails.amenities || {})?.map(
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
                                    {item ===
                                      "StreamingServiceSuchAsNetflix" && (
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

                    <div className="w-full space-y-[10px]">
                      <div className="w-full flex flex-wrap gap-[10px]">
                        {amenityCategories.map((item) => {
                          return (
                            <div
                              onClick={() => setCurrentCategory(item)}
                              className={
                                currentCategory === item
                                  ? "bg-[#dddddd] hover:bg-[#dddddd] cursor-pointer select-none px-[14px] py-[8px] rounded-[12px] w-max border-[1px] border-[#E3E3E3]"
                                  : "hover:bg-[#dddddd] cursor-pointer select-none px-[14px] py-[8px] rounded-[12px] w-max border-[1px] border-[#E3E3E3]"
                              }
                            >
                              {item}
                            </div>
                          );
                        })}
                      </div>
                      <div className="grid grid-cols-2 gap-[10px] p-[10px]">
                        {(currentCategory === "Bathroom" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <Bathub />
                              {metaDetails.amenities.Bathroom?.includes(
                                "bathub"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "bathub"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "bathub",
                                            ]
                                          : ["bathub"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <HairDryer />
                              {metaDetails.amenities.Bathroom?.includes(
                                "hairdryer"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "hairdryer"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "hairdryer",
                                            ]
                                          : ["hairdryer"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Shower />
                              {metaDetails.amenities.Bathroom?.includes(
                                "shower"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "shower"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "shower",
                                            ]
                                          : ["shower"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <HotWater />
                              {metaDetails.amenities.Bathroom?.includes(
                                "hotwater"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "hotwater"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "hotwater",
                                            ]
                                          : ["hotwater"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <SoapDrop />
                              {metaDetails.amenities.Bathroom?.includes(
                                "soapdrop"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "soapdrop"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "soapdrop",
                                            ]
                                          : ["soapdrop"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Heating />
                              {metaDetails.amenities.Bathroom?.includes(
                                "heating"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "heating"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "heating",
                                            ]
                                          : ["heating"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <ToiletSeat />
                              {metaDetails.amenities.Bathroom?.includes(
                                "toiletseat"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "toiletseat"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "toiletseat",
                                            ]
                                          : ["toiletseat"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BathHanger />
                              {metaDetails.amenities.Bathroom?.includes(
                                "bathhanger"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom:
                                          metaDetails.amenities.Bathroom?.filter(
                                            (item) => item !== "bathhanger"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Bathroom: metaDetails.amenities.Bathroom
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Bathroom,
                                              "bathhanger",
                                            ]
                                          : ["bathhanger"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Location features" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <SwimmingPool />
                              {metaDetails.amenities[
                                "Location features"
                              ]?.includes("swimmingpool") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features":
                                          metaDetails.amenities[
                                            "Location features"
                                          ].filter(
                                            (item) => item !== "swimmingpool"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features": metaDetails
                                          .amenities["Location features"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Location features"
                                              ],
                                              "swimmingpool",
                                            ]
                                          : ["swimmingpool"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <ValleyView />
                              {metaDetails.amenities[
                                "Location features"
                              ]?.includes("valleyview") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features":
                                          metaDetails.amenities[
                                            "Location features"
                                          ].filter(
                                            (item) => item !== "valleyview"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features": metaDetails
                                          .amenities["Location features"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Location features"
                                              ],
                                              "valleyview",
                                            ]
                                          : ["valleyview"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Park />
                              {metaDetails.amenities[
                                "Location features"
                              ]?.includes("park") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features":
                                          metaDetails.amenities[
                                            "Location features"
                                          ].filter((item) => item !== "park"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features": metaDetails
                                          .amenities["Location features"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Location features"
                                              ],
                                              "park",
                                            ]
                                          : ["park"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Balcony />
                              {metaDetails.amenities[
                                "Location features"
                              ]?.includes("balcony") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features":
                                          metaDetails.amenities[
                                            "Location features"
                                          ].filter(
                                            (item) => item !== "balcony"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Location features": metaDetails
                                          .amenities["Location features"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Location features"
                                              ],
                                              "balcony",
                                            ]
                                          : ["balcony"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Bedroom and Laundry" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <TrowelBrush />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("trowelbrush") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "trowelbrush"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "trowelbrush",
                                            ]
                                          : ["trowelbrush"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BedroomHanger />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("hanger") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "hanger"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "hanger",
                                            ]
                                          : ["hanger"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BedDouble />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("beddouble") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "beddouble"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "beddouble",
                                            ]
                                          : ["beddouble"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Bed />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("bed") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter((item) => item !== "bed"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "bed",
                                            ]
                                          : ["bed"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <DresserDrawer />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("dresserdrawer") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "dresserdrawer"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "dresserdrawer",
                                            ]
                                          : ["dresserdrawer"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <DressingMirror />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("dressingmirror") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "dressingmirror"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "dressingmirror",
                                            ]
                                          : ["dressingmirror"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <SafeBox />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("safebox") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "safebox"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "safebox",
                                            ]
                                          : ["safebox"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <SofaDouble />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("sofadouble") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "sofadouble"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "sofadouble",
                                            ]
                                          : ["sofadouble"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <WashingMachine />
                              {metaDetails.amenities[
                                "Bedroom and Laundry"
                              ]?.includes("washingmachine") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry":
                                          metaDetails.amenities[
                                            "Bedroom and Laundry"
                                          ]?.filter(
                                            (item) => item !== "washingmachine"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Bedroom and Laundry": metaDetails
                                          .amenities["Bedroom and Laundry"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Bedroom and Laundry"
                                              ],
                                              "washingmachine",
                                            ]
                                          : ["washingmachine"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Entertainment" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <GamePad />
                              {metaDetails.amenities["Entertainment"]?.includes(
                                "gamepad"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Entertainment: metaDetails.amenities[
                                          "Entertainment"
                                        ]?.filter((item) => item !== "gamepad"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Entertainment: metaDetails.amenities[
                                          "Entertainment"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Entertainment"
                                              ],
                                              "gamepad",
                                            ]
                                          : ["gamepad"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Home safety" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <MedicalCase />
                              {metaDetails.amenities["Home safety"]?.includes(
                                "medicalcase"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.filter(
                                          (item) => item !== "medicalcase"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Home safety"
                                              ],
                                              "medicalcase",
                                            ]
                                          : ["medicalcase"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <FireExtinguisher />
                              {metaDetails.amenities["Home safety"]?.includes(
                                "fireextinguisher"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.filter(
                                          (item) => item !== "fireextinguisher"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Home safety"
                                              ],
                                              "fireextinguisher",
                                            ]
                                          : ["fireextinguisher"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <TvStand />
                              {metaDetails.amenities["Home safety"]?.includes(
                                "tvstand"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.filter((item) => item !== "tvstand"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Home safety"
                                              ],
                                              "tvstand",
                                            ]
                                          : ["tvstand"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Alarm />
                              {metaDetails.amenities["Home safety"]?.includes(
                                "alarm"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.filter((item) => item !== "alarm"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Home safety"
                                              ],
                                              "alarm",
                                            ]
                                          : ["alarm"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CCTV />
                              {metaDetails.amenities["Home safety"]?.includes(
                                "cctv"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.filter((item) => item !== "cctv"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Home safety": metaDetails.amenities[
                                          "Home safety"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Home safety"
                                              ],
                                              "cctv",
                                            ]
                                          : ["cctv"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Internet and office" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <Wifi />
                              {metaDetails.amenities[
                                "Internet and office"
                              ]?.includes("wifi") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Internet and office":
                                          metaDetails.amenities[
                                            "Internet and office"
                                          ]?.filter((item) => item !== "wifi"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Internet and office": metaDetails
                                          .amenities["Internet and office"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Internet and office"
                                              ],
                                              "wifi",
                                            ]
                                          : ["wifi"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <WorkJob />
                              {metaDetails.amenities[
                                "Internet and office"
                              ]?.includes("workjob") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Internet and office":
                                          metaDetails.amenities[
                                            "Internet and office"
                                          ]?.filter(
                                            (item) => item !== "workjob"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Internet and office": metaDetails
                                          .amenities["Internet and office"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Internet and office"
                                              ],
                                              "workjob",
                                            ]
                                          : ["workjob"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <LaptopTable />
                              {metaDetails.amenities[
                                "Internet and office"
                              ]?.includes("laptoptable") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Internet and office":
                                          metaDetails.amenities[
                                            "Internet and office"
                                          ]?.filter(
                                            (item) => item !== "laptoptable"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Internet and office": metaDetails
                                          .amenities["Internet and office"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Internet and office"
                                              ],
                                              "laptoptable",
                                            ]
                                          : ["laptoptable"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Kitchen and dining" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <Kitchen />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("kitchen") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "kitchen"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "kitchen",
                                            ]
                                          : ["kitchen"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <ForkKnife />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("forkknife") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "forkknife"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "forkknife",
                                            ]
                                          : ["forkknife"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Stove />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("stove") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter((item) => item !== "stove"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "stove",
                                            ]
                                          : ["stove"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Induction />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("induction") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "induction"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "induction",
                                            ]
                                          : ["induction"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Dishes />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("dishes") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "dishes"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "dishes",
                                            ]
                                          : ["dishes"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Fridge />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("fridge") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "fridge"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "fridge",
                                            ]
                                          : ["fridge"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <TableChair />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("tablechair") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "tablechair"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "tablechair",
                                            ]
                                          : ["tablechair"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CoffeeMachine />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("coffeemachine") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "coffeemachine"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "coffeemachine",
                                            ]
                                          : ["coffeemachine"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Blender />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("blender") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "blender"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "blender",
                                            ]
                                          : ["blender"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <SaltPepper />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("saltpepper") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "saltpepper"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "saltpepper",
                                            ]
                                          : ["saltpepper"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <DishWasher />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("dishwasher") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "dishwasher"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "dishwasher",
                                            ]
                                          : ["dishwasher"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <WineGlass />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("wineglass") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "wineglass"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "wineglass",
                                            ]
                                          : ["wineglass"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Trash />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("trash") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter((item) => item !== "trash"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "trash",
                                            ]
                                          : ["trash"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <PlateFork />
                              {metaDetails.amenities[
                                "Kitchen and dining"
                              ]?.includes("platefork") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining":
                                          metaDetails.amenities[
                                            "Kitchen and dining"
                                          ]?.filter(
                                            (item) => item !== "platefork"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Kitchen and dining": metaDetails
                                          .amenities["Kitchen and dining"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Kitchen and dining"
                                              ],
                                              "platefork",
                                            ]
                                          : ["platefork"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Outdoor" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <ChildrenSlide />
                              {metaDetails.amenities["Outdoor"]?.includes(
                                "childrenslide"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.filter(
                                          (item) => item !== "childrenslide"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Outdoor"
                                              ],
                                              "childrenslide",
                                            ]
                                          : ["childrenslide"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Lounge />
                              {metaDetails.amenities["Outdoor"]?.includes(
                                "lounge"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.filter((item) => item !== "lounge"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Outdoor"
                                              ],
                                              "lounge",
                                            ]
                                          : ["lounge"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Swing />
                              {metaDetails.amenities["Outdoor"]?.includes(
                                "swing"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.filter((item) => item !== "swing"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Outdoor"
                                              ],
                                              "swing",
                                            ]
                                          : ["swing"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Sun />
                              {metaDetails.amenities["Outdoor"]?.includes(
                                "sun"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.filter((item) => item !== "sun"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Outdoor"
                                              ],
                                              "sun",
                                            ]
                                          : ["sun"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BeachUmbrella />
                              {metaDetails.amenities["Outdoor"]?.includes(
                                "beachumbrella"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.filter(
                                          (item) => item !== "beachumbrella"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Outdoor: metaDetails.amenities[
                                          "Outdoor"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Outdoor"
                                              ],
                                              "beachumbrella",
                                            ]
                                          : ["beachumbrella"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Parking and facilities" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <Parking />
                              {metaDetails.amenities[
                                "Parking and facilities"
                              ]?.includes("parking") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Parking and facilities":
                                          metaDetails.amenities[
                                            "Parking and facilities"
                                          ]?.filter(
                                            (item) => item !== "parking"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Parking and facilities": metaDetails
                                          .amenities["Parking and facilities"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Parking and facilities"
                                              ],
                                              "parking",
                                            ]
                                          : ["parking"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Services" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <Cat />
                              {metaDetails.amenities["Services"]?.includes(
                                "cat"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter((item) => item !== "cat"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "cat",
                                            ]
                                          : ["cat"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Dog />
                              {metaDetails.amenities["Services"]?.includes(
                                "dog"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter((item) => item !== "dog"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "dog",
                                            ]
                                          : ["dog"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Breakfast />
                              {metaDetails.amenities["Services"]?.includes(
                                "breakfast"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "breakfast"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "breakfast",
                                            ]
                                          : ["breakfast"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Longterm />
                              {metaDetails.amenities["Services"]?.includes(
                                "longterm"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "longterm"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "longterm",
                                            ]
                                          : ["longterm"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <HouseKey />
                              {metaDetails.amenities["Services"]?.includes(
                                "housekey"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "housekey"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "housekey",
                                            ]
                                          : ["housekey"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Userprofile />
                              {metaDetails.amenities["Services"]?.includes(
                                "userprofile"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "userprofile"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "userprofile",
                                            ]
                                          : ["userprofile"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CleaningSprayAction />
                              {metaDetails.amenities["Services"]?.includes(
                                "cleaningspray"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "cleaningspray"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "cleaningspray",
                                            ]
                                          : ["cleaningspray"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Smoking />
                              {metaDetails.amenities["Services"]?.includes(
                                "smoking"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter((item) => item !== "smoking"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "smoking",
                                            ]
                                          : ["smoking"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CampFire />
                              {metaDetails.amenities["Services"]?.includes(
                                "campfire"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "campfire"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "campfire",
                                            ]
                                          : ["campfire"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            {/* <div className="w-full items-center justify-between flex">
                              <WomenStaff />
                              {metaDetails.amenities["Services"]?.includes(
                                "womenstaff"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "womenstaff"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "womenstaff",
                                            ]
                                          : ["womenstaff"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div> */}
                            <div className="w-full items-center justify-between flex">
                              <Stairs />
                              {metaDetails.amenities["Services"]?.includes(
                                "stairs"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter((item) => item !== "stairs"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "stairs",
                                            ]
                                          : ["stairs"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <ManStaff />
                              {metaDetails.amenities["Services"]?.includes(
                                "manstaff"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.filter(
                                          (item) => item !== "manstaff"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Services: metaDetails.amenities[
                                          "Services"
                                        ]?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Services"
                                              ],
                                              "manstaff",
                                            ]
                                          : ["manstaff"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Family" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <ToyCubes />
                              {metaDetails.amenities["Family"]?.includes(
                                "toyscubes"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Family: metaDetails.amenities[
                                          "Family"
                                        ]?.filter(
                                          (item) => item !== "toyscubes"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Family: metaDetails.amenities["Family"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Family"
                                              ],
                                              "toyscubes",
                                            ]
                                          : ["toyscubes"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BookFairyTale />
                              {metaDetails.amenities["Family"]?.includes(
                                "fairytale"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Family: metaDetails.amenities[
                                          "Family"
                                        ]?.filter(
                                          (item) => item !== "fairytale"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Family: metaDetails.amenities["Family"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Family"
                                              ],
                                              "fairytale",
                                            ]
                                          : ["fairytale"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BabyBedroom />
                              {metaDetails.amenities["Family"]?.includes(
                                "babybedroom"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Family: metaDetails.amenities[
                                          "Family"
                                        ]?.filter(
                                          (item) => item !== "babybedroom"
                                        ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Family: metaDetails.amenities["Family"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Family"
                                              ],
                                              "babybedroom",
                                            ]
                                          : ["babybedroom"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                        {(currentCategory === "Heating and cooling" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <Appliance />
                              {metaDetails.amenities[
                                "Heating and cooling"
                              ]?.includes("appliance") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Heating and cooling":
                                          metaDetails.amenities[
                                            "Heating and cooling"
                                          ]?.filter(
                                            (item) => item !== "appliance"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Heating and cooling": metaDetails
                                          .amenities["Heating and cooling"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Heating and cooling"
                                              ],
                                              "appliance",
                                            ]
                                          : ["appliance"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Fan />
                              {metaDetails.amenities[
                                "Heating and cooling"
                              ]?.includes("fan") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Heating and cooling":
                                          metaDetails.amenities[
                                            "Heating and cooling"
                                          ]?.filter((item) => item !== "fan"),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        "Heating and cooling": metaDetails
                                          .amenities["Heating and cooling"]
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities[
                                                "Heating and cooling"
                                              ],
                                              "fan",
                                            ]
                                          : ["fan"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}

                        {(currentCategory === "Others" ||
                          currentCategory === "All") && (
                          <>
                            <div className="w-full items-center justify-between flex">
                              <CookwareKitchenUtensils />
                              {metaDetails.amenities.Others?.includes(
                                "CookwareKitchenUtensils"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "CookwareKitchenUtensils"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CookwareKitchenUtensils",
                                            ]
                                          : ["CookwareKitchenUtensils"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>

                            <div className="w-full items-center justify-between flex">
                              <DryingRack />
                              {metaDetails.amenities.Others?.includes(
                                "DryingRack"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "DryingRack"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "DryingRack",
                                            ]
                                          : ["DryingRack"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CableTv />
                              {metaDetails.amenities.Others?.includes(
                                "CableTv"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "CableTv"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CableTv",
                                            ]
                                          : ["CableTv"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Toaster />
                              {metaDetails.amenities.Others?.includes(
                                "Toaster"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Toaster"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Toaster",
                                            ]
                                          : ["Toaster"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Wardrobe />
                              {metaDetails.amenities.Others?.includes(
                                "Wardrobe"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Wardrobe"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Wardrobe",
                                            ]
                                          : ["Wardrobe"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <DiningTable />
                              {metaDetails.amenities.Others?.includes(
                                "DiningTable"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "DiningTable"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "DiningTable",
                                            ]
                                          : ["DiningTable"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Reception />
                              {metaDetails.amenities.Others?.includes(
                                "Reception"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Reception"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Reception",
                                            ]
                                          : ["Reception"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CityView />
                              {metaDetails.amenities.Others?.includes(
                                "CityView"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "CityView"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CityView",
                                            ]
                                          : ["CityView"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <SmokeDetectors />
                              {metaDetails.amenities.Others?.includes(
                                "SmokeDetectors"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "SmokeDetectors"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "SmokeDetectors",
                                            ]
                                          : ["SmokeDetectors"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <MarinaView />
                              {metaDetails.amenities.Others?.includes(
                                "MarinaView"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "MarinaView"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "MarinaView",
                                            ]
                                          : ["MarinaView"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Gym />
                              {metaDetails.amenities.Others?.includes("Gym") ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Gym"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Gym",
                                            ]
                                          : ["Gym"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CarbonMonoxideDetector />
                              {metaDetails.amenities.Others?.includes(
                                "CarbonMonoxideDetector"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "CarbonMonoxideDetector"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CarbonMonoxideDetector",
                                            ]
                                          : ["CarbonMonoxideDetector"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Hangers />
                              {metaDetails.amenities.Others?.includes(
                                "Hangers"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Hangers"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Hangers",
                                            ]
                                          : ["Hangers"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <TrashCans />
                              {metaDetails.amenities.Others?.includes(
                                "TrashCans"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "TrashCans"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "TrashCans",
                                            ]
                                          : ["TrashCans"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <WineGlasses />
                              {metaDetails.amenities.Others?.includes(
                                "WineGlasses"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "WineGlasses"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "WineGlasses",
                                            ]
                                          : ["WineGlasses"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <StreamingServiceSuchAsNetflix />
                              {metaDetails.amenities.Others?.includes(
                                "StreamingServiceSuchAsNetflix"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !==
                                              "StreamingServiceSuchAsNetflix"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "StreamingServiceSuchAsNetflix",
                                            ]
                                          : ["StreamingServiceSuchAsNetflix"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CrockeryCutlery />
                              {metaDetails.amenities.Others?.includes(
                                "CrockeryCutlery"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "CrockeryCutlery"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CrockeryCutlery",
                                            ]
                                          : ["CrockeryCutlery"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Toilet />
                              {metaDetails.amenities.Others?.includes(
                                "Toilet"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Toilet"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Toilet",
                                            ]
                                          : ["Toilet"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Oven />
                              {metaDetails.amenities.Others?.includes(
                                "Oven"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Oven"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Oven",
                                            ]
                                          : ["Oven"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CoffeeMaker />
                              {metaDetails.amenities.Others?.includes(
                                "CoffeeMaker"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "CoffeeMaker"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CoffeeMaker",
                                            ]
                                          : ["CoffeeMaker"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <ComplimentarySoapShampooConditioner />
                              {metaDetails.amenities.Others?.includes(
                                "ComplimentarySoapShampooConditioner"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !==
                                              "ComplimentarySoapShampooConditioner"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "ComplimentarySoapShampooConditioner",
                                            ]
                                          : [
                                              "ComplimentarySoapShampooConditioner",
                                            ],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BeachView />
                              {metaDetails.amenities.Others?.includes(
                                "BeachView"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "BeachView"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "BeachView",
                                            ]
                                          : ["BeachView"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Elevator />
                              {metaDetails.amenities.Others?.includes(
                                "Elevator"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Elevator"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Elevator",
                                            ]
                                          : ["Elevator"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <WirelessInternet />
                              {metaDetails.amenities.Others?.includes(
                                "WirelessInternet"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "WirelessInternet"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "WirelessInternet",
                                            ]
                                          : ["WirelessInternet"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <FreeParkingWithGarage />
                              {metaDetails.amenities.Others?.includes(
                                "FreeParkingWithGarage"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "FreeParkingWithGarage"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "FreeParkingWithGarage",
                                            ]
                                          : ["FreeParkingWithGarage"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <SmartTv />
                              {metaDetails.amenities.Others?.includes(
                                "SmartTv"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "SmartTv"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "SmartTv",
                                            ]
                                          : ["SmartTv"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <FireExtinguisher />
                              {metaDetails.amenities.Others?.includes(
                                "FireExtinguisher"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "FireExtinguisher"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "FireExtinguisher",
                                            ]
                                          : ["FireExtinguisher"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Marina />
                              {metaDetails.amenities.Others?.includes(
                                "Marina"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Marina"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Marina",
                                            ]
                                          : ["Marina"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <RoomDarkeningShades />
                              {metaDetails.amenities.Others?.includes(
                                "RoomDarkeningShades"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "RoomDarkeningShades"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "RoomDarkeningShades",
                                            ]
                                          : ["RoomDarkeningShades"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <IronIroningBoard />
                              {metaDetails.amenities.Others?.includes(
                                "IronIroningBoard"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "IronIroningBoard"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "IronIroningBoard",
                                            ]
                                          : ["IronIroningBoard"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <BedLinenTowels />
                              {metaDetails.amenities.Others?.includes(
                                "BedLinenTowels"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "BedLinenTowels"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "BedLinenTowels",
                                            ]
                                          : ["BedLinenTowels"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Kettle />
                              {metaDetails.amenities.Others?.includes(
                                "Kettle"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Kettle"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Kettle",
                                            ]
                                          : ["Kettle"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Microwave />
                              {metaDetails.amenities.Others?.includes(
                                "Microwave"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Microwave"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Microwave",
                                            ]
                                          : ["Microwave"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <AirConditioning />
                              {metaDetails.amenities.Others?.includes(
                                "AirConditioning"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "AirConditioning"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "AirConditioning",
                                            ]
                                          : ["AirConditioning"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Seaview />
                              {metaDetails.amenities.Others?.includes(
                                "Seaview"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Seaview"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Seaview",
                                            ]
                                          : ["Seaview"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Beach />
                              {metaDetails.amenities.Others?.includes(
                                "Beach"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Beach"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Beach",
                                            ]
                                          : ["Beach"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <PlayGround />
                              {metaDetails.amenities.Others?.includes(
                                "PlayGround"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "PlayGround"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "PlayGround",
                                            ]
                                          : ["PlayGround"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Refrigerator />
                              {metaDetails.amenities.Others?.includes(
                                "Refrigerator"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Refrigerator"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Refrigerator",
                                            ]
                                          : ["Refrigerator"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <FamilyKidsFriendly />
                              {metaDetails.amenities.Others?.includes(
                                "FamilyKidsFriendly"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "FamilyKidsFriendly"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "FamilyKidsFriendly",
                                            ]
                                          : ["FamilyKidsFriendly"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <NoParties />
                              {metaDetails.amenities.Others?.includes(
                                "NoParties"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "NoParties"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "NoParties",
                                            ]
                                          : ["NoParties"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <Essentials />
                              {metaDetails.amenities.Others?.includes(
                                "Essentials"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "Essentials"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "Essentials",
                                            ]
                                          : ["Essentials"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CleaningProducts />
                              {metaDetails.amenities.Others?.includes(
                                "CleaningProducts"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "CleaningProducts"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CleaningProducts",
                                            ]
                                          : ["CleaningProducts"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <FirstAidKit />
                              {metaDetails.amenities.Others?.includes(
                                "FirstAidKit"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "FirstAidKit"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "FirstAidKit",
                                            ]
                                          : ["FirstAidKit"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <CookingBasics />
                              {metaDetails.amenities.Others?.includes(
                                "CookingBasics"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) => item !== "CookingBasics"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "CookingBasics",
                                            ]
                                          : ["CookingBasics"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                            <div className="w-full items-center justify-between flex">
                              <SmokingNotAllowed />
                              {metaDetails.amenities.Others?.includes(
                                "SmokingNotAllowed"
                              ) ? (
                                <CheckMarkPurple
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others:
                                          metaDetails.amenities.Others?.filter(
                                            (item) =>
                                              item !== "SmokingNotAllowed"
                                          ),
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <PlusIcon
                                  onClick={() => {
                                    setMetaDetails({
                                      ...metaDetails,
                                      amenities: {
                                        ...metaDetails.amenities,
                                        Others: metaDetails.amenities.Others
                                          ?.length
                                          ? [
                                              ...metaDetails.amenities.Others,
                                              "SmokingNotAllowed",
                                            ]
                                          : ["SmokingNotAllowed"],
                                      },
                                    });
                                  }}
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[2px] bg-[#eeeeee] my-[12px]" />

                  <div className="space-y-[12px]">
                    <div className="font-semibold text-[18px]">
                      Booking options
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Instant Book</div>
                        <div className="text-[14px] text-[#959595]">
                          Listings you can book without for Host approval
                        </div>
                      </div>
                      <Toggle
                        status={instantBook}
                        onChange={() => dispatch(setInstantBook(!instantBook))}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">Allows pets</div>
                        <div className="text-[14px] text-[#959595]">
                          Bringing a service animal?
                        </div>
                      </div>
                      <Toggle
                        status={allowPets}
                        onChange={() => dispatch(setAllowPets(!allowPets))}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-[32px]">
                  <BlackButton text="Clear" onClick={handleClear} />
                  <PurpleButton
                    text="Apply"
                    onClick={() => setOpenFilter(false)}
                  />
                </div>
              </div>
            </Modal>

            <Popover
              isOpen={showOrderMenu}
              positions={"bottom"}
              onClickOutside={() => setShowOrderMenu(false)}
              content={
                <div
                  onClick={() => setShowOrderMenu(false)}
                  className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                >
                  <div className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full">
                    <SortIconRentCe />
                    <div className="text-[#666666]">Price: Low to High</div>
                  </div>
                  <div className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-max">
                    <SortIconRentDec />
                    <div className="text-[#666666]">Price: High to Low</div>
                  </div>
                  <div className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-full">
                    <RatingIconRent />
                    <div className="text-[#666666]">Rating</div>
                  </div>
                </div>
              }
            >
              <div
                onClick={() => setShowOrderMenu(true)}
                className="py-[4px] cursor-pointer bg-white hover:bg-[#f6f6f6] rounded-[10px] px-[14px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              >
                <div className="text-[#5b1dee] font-semibold">New Listing</div>
                <ArrowIconRent />
              </div>
            </Popover>
          </div>
        </div>
        {(location.pathname.split("/")[2] === "short" ||
          location.pathname.split("/")[2] === "all") && (
          <div className="w-full h-full flex max-h-[calc(100vh-200px)]">
            <div
              className={
                fullScreen
                  ? "w-0 hidden"
                  : hideMap
                  ? "w-full flex flex-col h-full"
                  : "w-max flex flex-col h-full"
              }
            >
              <div className="grid grid-cols-3 items-center w-full">
                <div className="flex items-center">
                  <ShortRentalIcon />
                  <div className="text-[24px] font-semibold min-w-[300px]">
                    Short-Term Rental
                  </div>
                </div>
                <Popover
                  isOpen={showMapMenu}
                  positions={"bottom"}
                  onClickOutside={() => setShowMapMenu(false)}
                  content={
                    <div
                      onClick={() => setShowMapMenu(false)}
                      className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                    >
                      {!fullScreen && !hideMap && (
                        <div
                          onClick={() => setHideMap(true)}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <GridLayoutIconRent />
                          <div className="text-[#666666]">Hide Map</div>
                        </div>
                      )}
                      {!fullScreen && hideMap && (
                        <div
                          onClick={() => setHideMap(false)}
                          className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
                        >
                          <GridLayoutIconRent />
                          <div className="text-[#666666]">Show Map</div>
                        </div>
                      )}

                      <div
                        onClick={() => {
                          setHideMap(false);
                          setFullScreen(true);
                        }}
                        className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-full"
                      >
                        <PinLocationIconRent />
                        <div className="text-[#666666]">View Full Map</div>
                      </div>
                    </div>
                  }
                >
                  <div
                    onClick={() => setShowMapMenu(true)}
                    className="justify-self-center hover:bg-[#f6f6f6] select-none w-max py-[4px] cursor-pointer bg-white rounded-[10px] px-[14px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                  >
                    <MapLineIconRent />
                    <div className="font-semibold">View Map</div>
                  </div>
                </Popover>
              </div>

              <div
                className={
                  hideMap
                    ? "w-full flex flex-wrap py-[10px] gap-4 overflow-auto h-[calc(100vh-270px)] px-[20px]"
                    : "w-max grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-1 py-[10px] gap-4 overflow-auto h-[calc(100vh-270px)] px-[20px]"
                }
              >
                {/* <Fade cascade damping={0.1}> */}
                {properties?.map((nft, index) => {
                  if (nft?.access?.owner !== account && nft?.short?.islisted)
                    return (
                      <>
                        <div
                          className={
                            activeToken === nft?.token_id
                              ? "w-max h-max translate-y-[-4px]"
                              : "w-max h-max"
                          }
                          onMouseEnter={() => setActiveToken(nft?.token_id)}
                          onMouseLeave={() => setActiveToken(null)}
                          key={index}
                        >
                          <RentalItem
                            token_id={nft?.token_id}
                            tokenData={nft}
                          />
                        </div>
                      </>
                    );
                  // else return <></>;
                })}
                {/* </Fade> */}
              </div>
            </div>
            <GoogleMap
              center={pinLocation}
              zoom={zoom}
              mapContainerClassName={
                hideMap
                  ? "w-0"
                  : "relative w-full mx-[10px] h-full rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              }
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: false,
                styles: mapStyles,
              }}
            >
              <div className="absolute top-[20px] left-[20px]">
                <div
                  onClick={() => setFullScreen(!fullScreen)}
                  className="p-[4px] rounded-full shadow-md bg-white cursor-pointer hover:bg-[#f6f6f6]"
                >
                  {fullScreen ? <ArrowToRightIcon /> : <ArrowToLeft />}
                </div>
              </div>
              <div className="absolute top-[20px] right-[20px] flex items-center gap-[10px]">
                <div className="p-[4px] rounded-full hover:bg-[#000000] shadow-md bg-gradient-to-b from-[#202020c0] from-0% to-70% to-[#202020]">
                  <MapShareIcon />
                </div>
                <div
                  className="p-[4px] rounded-full shadow-md bg-white hover:bg-[#f6f6f6] cursor-pointer"
                  onClick={() => setZoom(zoom + 1)}
                >
                  <MapPlusIcon />
                </div>
                <div
                  className="p-[4px] rounded-full shadow-md bg-white hover:bg-[#f6f6f6] cursor-pointer"
                  onClick={() => setZoom(zoom - 1)}
                >
                  <MapMinusIcon />
                </div>
              </div>
              {properties?.map((nft, index) => {
                if (nft?.access?.owner !== account && nft?.short?.islisted)
                  return (
                    <OverlayView
                      position={nft?.metaData?.location}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                      key={index}
                    >
                      <div>
                        <div
                          onClick={() => {
                            navigate(location.pathname + "/" + nft?.token_id);
                          }}
                          onMouseEnter={() => setActiveToken(nft?.token_id)}
                          onMouseLeave={() => setActiveToken(null)}
                          className={
                            nft?.token_id === activeToken
                              ? "w-max px-[12px] py-[6px] rounded-[12px] bg-gradient-to-b from-[#202020c0] from-0% to-70% to-[#202020] text-white text-center cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                              : "w-max px-[12px] py-[6px] rounded-[12px] bg-gradient-to-b from-[#5b1deec0] hover:from-[#202020c0] from-0% to-70% to-[#5b1dee] hover:to-[#202020] text-white text-center cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                          }
                        >
                          <div className="flex items-center gap-[4px]">
                            <NUSDIcon className="w-[20px]" />
                            <div className="text-[16px]">
                              ${nft?.short?.price_per_day}
                            </div>
                          </div>
                        </div>
                        {nft?.token_id === activeToken && (
                          <div className="scale-x-[0.6] scale-y-[0.5] left-[-50px] origin-top z-[200] absolute">
                            <RentalItem
                              token_id={nft?.token_id}
                              confetti={false}
                              tokenData={nft}
                            />
                          </div>
                        )}
                      </div>
                    </OverlayView>
                  );
                // else return <></>;
              })}
              <Marker
                position={pinLocation}
                draggable
                onDragEnd={(e) => {
                  setPinLocation({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  });
                }}
                icon={{
                  url: mapPinIcon,
                  scaledSize: new window.google.maps.Size(80, 80),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(40, 68),
                }}
              />
            </GoogleMap>
          </div>
        )}
        {location.pathname.split("/")[2] === "long" && (
          <div className="w-full h-full flex-col items-center justify-center flex max-h-[calc(100vh-200px)]">
            <svg
              className="w-[100px] h-[100px]"
              width="72"
              height="73"
              viewBox="0 0 72 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_316_17319)">
                <rect
                  x="8"
                  y="8.5"
                  width="56"
                  height="56"
                  rx="28"
                  fill="white"
                />
                <path
                  d="M48.8627 32.5183V23.1611C48.8627 22.2407 48.1157 21.4937 47.1953 21.4937H44.099C43.1786 21.4937 42.4316 22.2407 42.4316 23.1611V27.006"
                  stroke="url(#paint0_linear_316_17319)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.9941 34.3558L33.8295 23.3545C35.0783 22.2841 36.9208 22.2841 38.1696 23.3545L51.0066 34.3558"
                  stroke="url(#paint1_linear_316_17319)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.1387 32.5183V48.1715C23.1387 50.014 24.631 51.5063 26.4734 51.5063H34.3333"
                  stroke="url(#paint2_linear_316_17319)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M45.173 53.1736C41.0297 53.1736 37.6699 49.8139 37.6699 45.6705C37.6699 41.5271 41.0297 38.1674 45.173 38.1674C49.3181 38.1674 52.6762 41.5271 52.6762 45.6705C52.6762 49.8139 49.3181 53.1736 45.173 53.1736"
                  stroke="url(#paint3_linear_316_17319)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M48.1381 44.1882L44.4332 47.8931L42.209 45.6705"
                  stroke="url(#paint4_linear_316_17319)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_316_17319"
                  x="-9.53674e-07"
                  y="0.499999"
                  width="72"
                  height="72"
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
                    result="effect1_dropShadow_316_17319"
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
                    in2="effect1_dropShadow_316_17319"
                    result="effect2_dropShadow_316_17319"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_316_17319"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_316_17319"
                  x1="45.6471"
                  y1="21.4937"
                  x2="45.6471"
                  y2="32.5183"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B349A" />
                  <stop offset="1" stop-color="#4C37C3" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_316_17319"
                  x1="36.0004"
                  y1="22.5517"
                  x2="36.0004"
                  y2="34.3558"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B349A" />
                  <stop offset="1" stop-color="#4C37C3" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_316_17319"
                  x1="28.736"
                  y1="32.5183"
                  x2="28.736"
                  y2="51.5063"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B349A" />
                  <stop offset="1" stop-color="#4C37C3" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_316_17319"
                  x1="45.173"
                  y1="38.1674"
                  x2="45.173"
                  y2="53.1736"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B349A" />
                  <stop offset="1" stop-color="#4C37C3" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_316_17319"
                  x1="45.1736"
                  y1="44.1882"
                  x2="45.1736"
                  y2="47.8931"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6B349A" />
                  <stop offset="1" stop-color="#4C37C3" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-[#202020]">Coming soon</div>
          </div>

          // <div className="w-full h-full flex max-h-[calc(100vh-200px)]">
          //   <div
          //     className={
          //       fullScreen
          //         ? "w-0 hidden"
          //         : hideMap
          //         ? "w-full flex flex-col h-full"
          //         : "w-max flex flex-col h-full"
          //     }
          //   >
          //     <div className="grid grid-cols-3 items-center w-full">
          //       <div className="flex items-center">
          //         <ShortRentalIcon />
          //         <div className="text-[24px] font-semibold min-w-[300px]">
          //           Long-Term Rental
          //         </div>
          //       </div>
          //       <Popover
          //         isOpen={showMapMenu}
          //         positions={"bottom"}
          //         onClickOutside={() => setShowMapMenu(false)}
          //         content={
          //           <div
          //             onClick={() => setShowMapMenu(false)}
          //             className="mt-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          //           >
          //             {!fullScreen && !hideMap && (
          //               <div
          //                 onClick={() => setHideMap(true)}
          //                 className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
          //               >
          //                 <GridLayoutIconRent />
          //                 <div className="text-[#666666]">Hide Map</div>
          //               </div>
          //             )}
          //             {!fullScreen && hideMap && (
          //               <div
          //                 onClick={() => setHideMap(false)}
          //                 className="cursor-pointer hover:bg-[#f5f5f5] rounded-t-[10px] p-[8px] gap-[8px] flex items-center w-full"
          //               >
          //                 <GridLayoutIconRent />
          //                 <div className="text-[#666666]">Show Map</div>
          //               </div>
          //             )}

          //             <div
          //               onClick={() => {
          //                 setHideMap(false);
          //                 setFullScreen(true);
          //               }}
          //               className="cursor-pointer hover:bg-[#f5f5f5] rounded-b-[10px] p-[8px] gap-[8px] flex items-center w-full"
          //             >
          //               <PinLocationIconRent />
          //               <div className="text-[#666666]">View Full Map</div>
          //             </div>
          //           </div>
          //         }
          //       >
          //         <div
          //           onClick={() => setShowMapMenu(true)}
          //           className="justify-self-center hover:bg-[#f6f6f6] select-none w-max py-[4px] cursor-pointer bg-white rounded-[10px] px-[14px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          //         >
          //           <MapLineIconRent />
          //           <div className="font-semibold">View Map</div>
          //         </div>
          //       </Popover>
          //     </div>

          //     <div
          //       className={
          //         hideMap
          //           ? "w-full flex flex-wrap py-[10px] gap-4 overflow-auto h-[calc(100vh-270px)] px-[20px]"
          //           : "w-max grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-1 py-[10px] gap-4 overflow-auto h-[calc(100vh-270px)] px-[20px]"
          //       }
          //     >
          //       <Fade cascade damping={0.2}>
          //         {Object.values(nfts).map((nft) => {
          //           if (nft?.access?.owner !== account && nft?.long.islisted)
          //             return (
          //               <>
          //                 <div
          //                   className={
          //                     activeToken === nft?.token_id
          //                       ? "w-max h-max translate-y-[-4px]"
          //                       : "w-max h-max"
          //                   }
          //                   onMouseEnter={() => setActiveToken(nft?.token_id)}
          //                   onMouseLeave={() => setActiveToken(null)}
          //                 >
          //                   <RentalItem token_id={nft?.token_id} />
          //                 </div>
          //               </>
          //             );
          //           // else return <></>;
          //         })}
          //       </Fade>
          //     </div>
          //   </div>
          //   <GoogleMap
          //     center={pinLocation}
          //     zoom={zoom}
          //     mapContainerClassName={
          //       hideMap
          //         ? "w-0"
          //         : "relative w-full mx-[10px] h-full rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          //     }
          //     options={{
          //       mapTypeControl: false,
          //       streetViewControl: false,
          //       fullscreenControl: false,
          //       zoomControl: false,
          //       styles: mapStyles,
          //     }}
          //   >
          //     <div className="absolute top-[20px] left-[20px]">
          //       <div
          //         onClick={() => setFullScreen(!fullScreen)}
          //         className="p-[4px] rounded-full shadow-md bg-white cursor-pointer hover:bg-[#f6f6f6]"
          //       >
          //         {fullScreen ? <ArrowToRightIcon /> : <ArrowToLeft />}
          //       </div>
          //     </div>
          //     <div className="absolute top-[20px] right-[20px] flex items-center gap-[10px]">
          //       <div className="p-[4px] rounded-full hover:bg-[#000000] shadow-md bg-gradient-to-b from-[#202020c0] from-0% to-70% to-[#202020]">
          //         <MapShareIcon />
          //       </div>
          //       <div
          //         className="p-[4px] rounded-full shadow-md bg-white hover:bg-[#f6f6f6] cursor-pointer"
          //         onClick={() => setZoom(zoom + 1)}
          //       >
          //         <MapPlusIcon />
          //       </div>
          //       <div
          //         className="p-[4px] rounded-full shadow-md bg-white hover:bg-[#f6f6f6] cursor-pointer"
          //         onClick={() => setZoom(zoom - 1)}
          //       >
          //         <MapMinusIcon />
          //       </div>
          //     </div>
          //     {Object.values(nfts).map((nft) => {
          //       if (nft?.access?.owner !== account && nft?.short?.islisted)
          //         return (
          //           <OverlayView
          //             position={nft?.metaData?.location}
          //             mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          //           >
          //             <div>
          //               <div
          //                 onClick={() => {
          //                   navigate(location.pathname + "/" + nft?.token_id);
          //                 }}
          //                 onMouseEnter={() => setActiveToken(nft?.token_id)}
          //                 onMouseLeave={() => setActiveToken(null)}
          //                 className={
          //                   nft?.token_id === activeToken
          //                     ? "w-max px-[12px] py-[6px] rounded-[12px] bg-gradient-to-b from-[#202020c0] from-0% to-70% to-[#202020] text-white text-center cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          //                     : "w-max px-[12px] py-[6px] rounded-[12px] bg-gradient-to-b from-[#5b1deec0] hover:from-[#202020c0] from-0% to-70% to-[#5b1dee] hover:to-[#202020] text-white text-center cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          //                 }
          //               >
          //                 <div className="flex items-center gap-[4px]">
          //                   <NUSDIcon className="w-[20px]" />
          //                   <div className="text-[16px]">
          //                     ${nft?.short?.price_per_day}
          //                   </div>
          //                 </div>
          //               </div>
          //               {nft?.token_id === activeToken && (
          //                 <div className="scale-x-[0.6] scale-y-[0.5] left-[-50px] origin-top z-[200] absolute">
          //                   <RentalItem token_id={nft?.token_id} />
          //                 </div>
          //               )}
          //             </div>
          //           </OverlayView>
          //         );
          //       else return <></>;
          //     })}
          //     <Marker
          //       position={pinLocation}
          //       draggable
          //       onDragEnd={(e) => {
          //         setPinLocation({
          //           lat: e.latLng.lat(),
          //           lng: e.latLng.lng(),
          //         });
          //       }}
          //       icon={{
          //         url: mapPinIcon,
          //         scaledSize: new window.google.maps.Size(80, 80),
          //         origin: new window.google.maps.Point(0, 0),
          //         anchor: new window.google.maps.Point(40, 68),
          //       }}
          //     />
          //   </GoogleMap>
          // </div>
        )}
      </div>
    </div>
  );
};

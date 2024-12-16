import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AddressIcon,
  AirConditionerIcon,
  AmenitiesIcon,
  BathsIcon,
  BodySoapIcon,
  BuildingNameIcon,
  CheckInIcon,
  CheckMarkPurple,
  CheckOutIcon,
  CloseIcon,
  DeleteIcon,
  DescriptionIcon,
  EssentialIcon,
  GroundRule,
  GroundRuleIcon,
  HotWaterIcon,
  ImageIcon,
  MapMinusIcon,
  MapPlusIcon,
  MapShareIcon,
  MintBathroomsIcon,
  MintBedroomsIcon,
  MintBedsIcon,
  MintCameraIcon,
  MintGuestsIcon,
  MintHome,
  MintImage,
  MintSample,
  MintUpload,
  PetsIcon,
  PinIcon,
  PlusIcon,
  PropertyIdIcon,
  TvIcon,
  ArrowToLeft,
  WifiIcon,
} from "../../../AssetComponents/Images";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import { WhiteButton } from "../../../Components/Buttons/WhiteButton";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { mapStyles } from "../../../Components/GoogleMap/Style";
import ImageUploading from "react-images-uploading";
import mapPinIcon from "../../../assets/images/Dashboard/Dashboard/mappin.svg";
import { api } from "../../../Components/functions/Api";
// import { getPredictionsGoogleMap } from "../../../Components/GoogleMap/MapService";
import { setTokenUpdate } from "../../../ReduxSlices/CommunicationSlice";
import { executeContract } from "../../../Components/functions/Contract";
import { Popover } from "react-tiny-popover";
import { NumberSpin } from "../../../Components/Spin/NumberSpin";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import { Toggle } from "../../../Components/Toggle/Toggle";
import { ReclaimZKP } from "../../../Components/ReclaimZKP/Reclaim";
import TimePicker from "react-time-picker";
import Modal from "react-responsive-modal";
import "react-time-picker/dist/TimePicker.css";
import { toast } from "react-toastify";
import {
  deletePinsFromIPFS,
  pinImagesToIPFS,
  pinMetadata,
} from "../../../Components/functions/IPFS";
import {
  BathHanger,
  Bathub,
  HairDryer,
  Heating,
  HotWater,
  Shower,
  SoapDrop,
  ToiletSeat,
} from "../../../Components/Amenities/Bathroom";
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
} from "../../../Components/Amenities/Others";
import {
  Balcony,
  Park,
  SwimmingPool,
  ValleyView,
} from "../../../Components/Amenities/View";
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
} from "../../../Components/Amenities/Bedroom";
import { GamePad } from "../../../Components/Amenities/Entertainment";
import {
  Alarm,
  CCTV,
  FireExtinguisher,
  MedicalCase,
  TvStand,
} from "../../../Components/Amenities/HomeSafety";
import {
  LaptopTable,
  Wifi,
  WorkJob,
} from "../../../Components/Amenities/InternetAndOffice";
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
} from "../../../Components/Amenities/Kitchen";
import {
  BeachUmbrella,
  ChildrenSlide,
  Lounge,
  Sun,
  Swing,
} from "../../../Components/Amenities/Outdoor";
import { Parking } from "../../../Components/Amenities/Parking";
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
} from "../../../Components/Amenities/Services.";
import {
  BabyBedroom,
  BookFairyTale,
  ToyCubes,
} from "../../../Components/Amenities/Family";
import {
  Appliance,
  Fan,
} from "../../../Components/Amenities/HeatingandCooling";
import { useDispatch, useSelector } from "react-redux";
import { Mainnet, Testnet } from "@nibiruchain/nibijs";
import { updateToken } from "../../../Components/functions/Functions";

export const EditNFT = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(10);

  const params = useParams();
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

  const diff = useSelector((state) => state.time.diffToUTC);

  const [addressInput, setAddressInput] = useState();
  const [predictList, setPredictList] = useState([]);
  const [addressDetails, setAddressDetails] = useState(token?.metaData.address);
  const service = new window.google.maps.places.AutocompleteService();
  const geocoder = new window.google.maps.Geocoder();
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState(token?.metaData.images);
  const [dragStartIdx, setDragStartIdx] = useState();
  const [dragEndIdx, setDragEndIdx] = useState();
  const account = useSelector((state) => state.auth.account);
  const [imagesToUnpin, setImagesToUnpin] = useState([]);
  const [imagesToPin, setImagesToPin] = useState([]);

  const [metaDetails, setMetaDetails] = useState({
    buildingName: token?.metaData.buildingName,
    propertyId: token?.metaData.propertyId,
    groundRule: token?.metaData.groundRule,
    checkIn: token?.metaData.checkIn,
    checkOut: token?.metaData.checkOut,
    wifiPass: token?.metaData.wifiPass,
    description: token?.metaData.description,
    cancellation: token?.metaData.cancellation,
    amenities: token?.metaData.amenities || {},
    pets: token?.metaData.pets,
    essentials: token?.metaData.essentials,
  });

  const [pinLocation, setPinLocation] = useState(token?.metaData.location);
  const location = useLocation();
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
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [amenitiesModal, setAmenitiesModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Bathroom");
  const dispatch = useDispatch();
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
  const handleSelectFromAddressList = async (place_id) => {
    setIsOpen(false);
    const res = await geocoder.geocode({ placeId: place_id });
    setPinLocation({
      lat: res.results[0].geometry.location.lat(),
      lng: res.results[0].geometry.location.lng(),
    });
  };
  const handleSelectMapPin = async (pinLocation) => {
    setIsOpen(false);
    const res = await geocoder.geocode({ location: pinLocation });
    setAddressInput(res.results[0].formatted_address);
    const addressComponents = res?.results[0].address_components;
    let parsedAddress = {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      county: "",
    };
    addressComponents?.forEach((component) => {
      if (component.types.includes("route")) {
        parsedAddress.street = component.long_name;
      } else if (component.types.includes("locality")) {
        parsedAddress.city = component.long_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        parsedAddress.state = component.short_name;
      } else if (component.types.includes("postal_code")) {
        parsedAddress.zipCode = component.long_name;
      } else if (component.types.includes("administrative_area_level_2")) {
        parsedAddress.county = component.long_name;
      }
    });

    setAddressDetails(parsedAddress);
  };

  function swapElements(array, index1, index2) {
    if (index1 >= array.length || index2 >= array.length) {
      return "Invalid index";
    }

    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    setImages(array);
  }
  function removeElement(array, index) {
    let temp = array;
    temp.splice(index, 1);
    setImages(temp);
  }

  const updateMetaData = async (images = []) => {
    // const updateMessage = {
    //   set_extension: {
    //     token_id: params.id,
    //     extension: {
    //       name: metaDetails?.buildingName,
    //       image: images.map((image, index) => {
    //         return {
    //           key: index.toString(),
    //           value: image,
    //         };
    //       }),
    //       external_url: "",
    //       description: metaDetails?.description,
    //       attributes: [
    //         ...Object.entries(metaDetails).map((attribute) => {
    //           return {
    //             key: attribute[0].toString(),
    //             value:
    //               typeof attribute[1] !== "string"
    //                 ? JSON.stringify(attribute[1])
    //                 : attribute[1],
    //           };
    //         }),
    //         {
    //           key: "location",
    //           value: JSON.stringify(pinLocation),
    //         },
    //         {
    //           key: "address",
    //           value: JSON.stringify(addressDetails),
    //         },
    //         {
    //           key: "addressString",
    //           value: addressInput,
    //         },
    //       ],
    //     },
    //   },
    // };

    const res = await api("property/updateProperty", {
      token_id: params.id,
      metaData: {
        ...metaDetails,
        images: images,
        location: pinLocation,
        address: addressDetails,
        addressString: addressInput,
      },
    });
    // await updateToken(
    //   {
    //     token_id: params.id,
    //     contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
    //   },
    //   mainnet.endptTm,
    //   dispatch
    // );

    dispatch(
      setTokenUpdate({
        token_id: params.id,
        contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
        sender: null,
      })
    );

    // const mainnet = Mainnet();
    // const currentTime = new Date(
    //   (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    // );

    // const res = await executeContract(
    //   null,
    //   null,
    //   currentTime,
    //   mainnet.chainId,
    //   mainnet.endptTm,
    //   process.env.REACT_APP_RENTAL_SMART_CONTRACT,
    //   dispatch,
    //   params.id,
    //   account,
    //   updateMessage,
    //   account,
    //   "leap"
    // );
    if (res) navigate(location.pathname.replace("/edit", ""));
  };

  const handleUpdate = async () => {
    if (images.length < 5) {
      toast.error("Please upload at least 5 photos of your property");
      return;
    }
    await deletePinsFromIPFS(imagesToUnpin, process.env.REACT_APP_PINATA_JWT_2);
    const imgHashes = await pinImagesToIPFS(
      imagesToPin,
      process.env.REACT_APP_PINATA_JWT_2,
      process.env.REACT_APP_PINATA_GATEWAY_2
    );
    let temp = images;
    for (let i = 0; i < images.length; i++) {
      if (!images[i].includes(process.env.REACT_APP_PINATA_GATEWAY_2))
        temp[i] = imgHashes.splice(0, 1)[0];
    }
    await updateMetaData(temp);
  };

  useEffect(() => {
    getAddressList(addressInput);
  }, [addressInput]);

  useEffect(() => {
    handleSelectMapPin(pinLocation);
  }, [pinLocation]);

  return (
    <div className="w-full h-[calc(100vh-120px)] overflow-auto flex flex-col">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer space-y-[10px] mt-3 rounded-[16px] p-[16px] w-[600px] mx-auto bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
      >
        <div className="flex items-center gap-[10px]">
          <ArrowToLeft />
          <div className="">Back</div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-[20px] justify-center my-[20px]">
        <div className="w-[600px] h-max p-[10px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          {images[0] ? (
            <div className="relative group">
              <div className="absolute bg-white px-[10px] text-[14px] font-normal py-[6px] top-[10px] left-[10px] rounded-[8px]">
                Cover photo
              </div>
              <div
                onClick={() => removeElement(images.slice(), 0)}
                className="group-hover:block hidden shadow-md cursor-pointer absolute bg-white p-[8px] bottom-[10px] right-[10px] rounded-full"
              >
                <DeleteIcon className="w-[16px]" />
              </div>
              <img
                alt=""
                src={images[0]}
                className="w-full rounded-[10px]"
                onDragStart={() => {
                  setDragStartIdx(0);
                }}
                onDragEnter={() => {
                  setDragEndIdx(0);
                }}
                onDragEnd={() => {
                  swapElements(images.slice(), dragStartIdx, dragEndIdx);
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-max min-h-[200px] border-[2px] border-dashed rounded-[8px]">
              <ImageIcon />
            </div>
          )}

          <div className="h-max grid grid-cols-2 gap-[10px] mt-[10px]">
            {images.slice(1).map((img, idx) => {
              return (
                <div className="relative group">
                  <div
                    onClick={() => {
                      removeElement(images.slice(), idx + 1);
                      setImagesToUnpin([
                        ...imagesToUnpin,
                        images[idx + 1].replace(
                          process.env.REACT_APP_PINATA_GATEWAY_2,
                          ""
                        ),
                      ]);
                    }}
                    className="hidden group-hover:block group shadow-md cursor-pointer absolute bg-white p-[8px] bottom-[10px] right-[10px] rounded-full"
                  >
                    <DeleteIcon className="w-[16px]" />
                  </div>
                  <img
                    alt=""
                    draggable
                    src={images[idx + 1]}
                    className="rounded-[8px]"
                    onDragStart={() => {
                      setDragStartIdx(idx + 1);
                    }}
                    onDragEnter={() => {
                      setDragEndIdx(idx + 1);
                    }}
                    onDragEnd={() => {
                      swapElements(images.slice(), dragStartIdx, dragEndIdx);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <ImageUploading
          onChange={(image) => {
            setImages([image[0].data_url, ...images]);
            setImagesToPin([...imagesToPin, image[0]]);
          }}
          dataURLKey="data_url"
          acceptType={[
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
            "tiff",
            "tif",
            "svg",
            "webp",
            "heic",
            "heif",
          ]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div
              className={
                isDragging
                  ? "border-[2px] rounded-[12px] w-[600px] h-[300px] justify-center space-y-[10px] flex flex-col items-center bg-[#E3E3E3]"
                  : "border-[2px] rounded-[12px] w-[600px] h-[300px] justify-center space-y-[10px] flex flex-col items-center bg-[#F6F6F6]"
              }
              {...dragProps}
            >
              <MintCameraIcon />
              <PurpleButton onClick={onImageUpload} text="Upload file" />
              <div className="text-[#595959]">... or drag and drop files</div>
            </div>
          )}
        </ImageUploading>
        <div className="space-y-[20px] w-[600px] px-[16px] py-[24px] bg-white rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          <div className="px-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <BuildingNameIcon />
              <div>Building Name</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <input
                placeholder="Building name"
                className="outline-none w-full font-normal text-[14px]"
                value={metaDetails?.buildingName}
                onChange={(e) =>
                  setMetaDetails({
                    ...metaDetails,
                    buildingName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="px-[14px] flex items-start justify-between">
            <div className="flex items-center gap-[10px]">
              <GroundRule />
              <div>Ground Rules</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <textarea
                placeholder="Ground rules"
                className="h-[80px] outline-none w-full font-normal text-[14px]"
                value={metaDetails?.groundRule}
                onChange={(e) =>
                  setMetaDetails({
                    ...metaDetails,
                    groundRule: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="px-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <CheckInIcon className="w-[16px]" />
              <div>Check in Hours</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <input
                placeholder="00:00"
                className="outline-none w-full font-normal text-[14px]"
                value={metaDetails?.checkIn}
                onClick={() => setCheckInModal(true)}
              />
              <Modal
                open={checkInModal}
                center
                onClose={() => setCheckInModal(false)}
                classNames={{
                  modal:
                    "min-w-[300px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
                }}
              >
                <div className="text-[18px] font-semibold">Check In</div>
                <div className="mt-[30px]">
                  <TimePicker
                    clockIcon={null}
                    clearIcon={null}
                    value={metaDetails?.checkIn}
                    disableClock
                    onChange={(value) =>
                      setMetaDetails({ ...metaDetails, checkIn: value })
                    }
                    autoFocus
                  />
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div
                    className="text-[#5b1dee] underline cursor-pointer"
                    onClick={() =>
                      setMetaDetails({ ...metaDetails, checkIn: null })
                    }
                  >
                    Clear times
                  </div>
                  <PurpleButton
                    text="Save"
                    onClick={() => setCheckInModal(false)}
                  />
                </div>

                {/* <div
              tabIndex="-1"
              className="grid grid-cols-3 gap-[20px] mt-[20px]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
                return (
                  <div
                    onClick={() => {
                      document
                        .getElementsByClassName(
                          "react-time-picker__inputGroup"
                        )[0]
                        .dispatchEvent(
                          new KeyboardEvent("keydown", {
                            key: number,
                            code: `Digit${number}`,
                            keyCode: number.toString().charCodeAt(0),
                            which: number.toString().charCodeAt(0),
                          })
                        );
                    }}
                    className="rounded-[8px] hover:bg-[#dddddd] flex items-center justify-center cursor-pointer font-normal w-full text-center h-[50px] text-[24px]"
                  >
                    {number}
                  </div>
                );
              })}
              <div></div>
              <div className="cursor-pointer font-normal w-full text-center h-[50px] text-[24px]">
                {0}
              </div>
              <div></div>
            </div> */}
              </Modal>
            </div>
          </div>
          <div className="px-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <CheckOutIcon className="w-[16px]" />
              <div>Check out Hours</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <input
                placeholder="00:00"
                className="outline-none w-full font-normal text-[14px]"
                value={metaDetails?.checkOut}
                onClick={() => setCheckOutModal(true)}
              />

              <Modal
                open={checkOutModal}
                center
                onClose={() => setCheckOutModal(false)}
                classNames={{
                  modal:
                    "min-w-[300px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
                }}
              >
                <div className="text-[18px] font-semibold">Check In</div>
                <div className="mt-[30px]">
                  <TimePicker
                    clockIcon={null}
                    clearIcon={null}
                    value={metaDetails?.checkOut}
                    disableClock
                    onChange={(value) =>
                      setMetaDetails({ ...metaDetails, checkOut: value })
                    }
                    autoFocus
                  />
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div
                    className="text-[#5b1dee] underline cursor-pointer"
                    onClick={() =>
                      setMetaDetails({ ...metaDetails, checkOut: null })
                    }
                  >
                    Clear times
                  </div>
                  <PurpleButton
                    text="Save"
                    onClick={() => setCheckOutModal(false)}
                  />
                </div>
              </Modal>
            </div>
          </div>
          <div className="px-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <WifiIcon className="w-[16px]" />
              <div>WiFi Password</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <input
                placeholder="Password"
                className="outline-none w-full font-normal text-[14px]"
                value={metaDetails?.wifiPass}
                onChange={(e) =>
                  setMetaDetails({ ...metaDetails, wifiPass: e.target.value })
                }
              />
            </div>
          </div>
          <div className="px-[14px] flex items-start justify-between">
            <div className="flex items-center gap-[10px]">
              <DescriptionIcon />
              <div>Description</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <textarea
                placeholder="Description"
                className="h-[80px] outline-none w-full font-normal text-[14px]"
                value={metaDetails?.description}
                onChange={(e) =>
                  setMetaDetails({
                    ...metaDetails,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="px-[14px] flex items-start justify-between">
            <div className="flex items-center gap-[10px]">
              <svg
                className="w-[20px]"
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

              <div>Cancellation policy</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <textarea
                placeholder="Cancellation policy"
                className="h-[80px] outline-none w-full font-normal text-[14px]"
                value={metaDetails?.cancellation}
                onChange={(e) =>
                  setMetaDetails({
                    ...metaDetails,
                    cancellation: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="px-[14px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <AddressIcon />
              <div>Address</div>
            </div>
            <div className="bg-white px-[12px] w-[260px] py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
              <input
                placeholder="Address"
                className="outline-none w-full font-normal text-[14px]"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                // disabled
              />
            </div>
          </div>
          <div className="px-[14px] flex items-start justify-between">
            <div className="flex flex-col items-center space-y-[10px] w-full">
              <Popover
                isOpen={predictList?.length > 0 && isOpen}
                positions={"bottom"}
                onClickOutside={() => setPredictList([])}
                content={
                  <div className="py-[10px] space-y-[4px] bg-white rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    {predictList?.map((address) => {
                      return (
                        <div
                          onClick={() => {
                            handleSelectFromAddressList(address.place_id);
                          }}
                          className="w-[500px] bg-white flex gap-[10px] items-center cursor-pointer overflow-hidden h-[50px] p-[8px] rounded-[8px] hover:bg-gray-300"
                        >
                          <PinIcon />
                          <div className="w-full truncate">
                            {address.description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                }
              >
                <div className="flex bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="w-[90px]">{"Address :"}</div>
                  <input
                    className="outline-none w-full text-[#101010]"
                    value={addressInput}
                    onChange={(e) => {
                      setIsOpen(true);
                      setAddressInput(e.target.value);
                    }}
                  />
                </div>
              </Popover>

              <GoogleMap
                center={pinLocation}
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
                  <div className="p-[4px] rounded-full shadow-md bg-gradient-to-b from-[#202020c0] from-0% to-70% to-[#202020]">
                    <MapShareIcon />
                  </div>
                  <div
                    className="p-[4px] rounded-full shadow-md bg-white cursor-pointer"
                    onClick={() => setZoom(zoom + 1)}
                  >
                    <MapPlusIcon />
                  </div>
                  <div
                    className="p-[4px] rounded-full shadow-md bg-white cursor-pointer"
                    onClick={() => setZoom(zoom - 1)}
                  >
                    <MapMinusIcon />
                  </div>
                </div>

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
          </div>

          <div className="px-[14px] gap-[40px] flex items-center justify-between">
            <div className="w-full space-y-[10px]">
              <div className="text-[14px] font-normal">City</div>
              <div className="bg-white px-[12px] w-full py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
                <input
                  value={addressDetails?.city}
                  disabled
                  className="bg-white outline-none w-full font-normal text-[14px]"
                />
              </div>
            </div>
            <div className="w-full space-y-[10px]">
              <div className="text-[14px] font-normal">State</div>
              <div className="bg-white px-[12px] w-full py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
                <input
                  value={addressDetails?.state}
                  disabled
                  className="bg-white outline-none w-full font-normal text-[14px]"
                />
              </div>
            </div>
          </div>
          <div className="px-[14px] gap-[40px] flex items-center justify-between">
            <div className="w-full space-y-[10px]">
              <div className="text-[14px] font-normal">ZIP Code</div>
              <div className="bg-white px-[12px] w-full py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
                <input
                  value={addressDetails?.zipCode}
                  disabled
                  className="bg-white outline-none w-full font-normal text-[14px]"
                />
              </div>
            </div>
            <div className="w-full space-y-[10px]">
              <div className="text-[14px] font-normal">Country</div>
              <div className="bg-white px-[12px] w-full py-[14px] border-[1px] border-[#E3E3E3] rounded-[12px]">
                <input
                  value={addressDetails?.county}
                  disabled
                  className="bg-white outline-none w-full font-normal text-[14px]"
                />
              </div>
            </div>
          </div>
          <div className="px-[14px] flex items-start justify-between">
            <div className="flex items-center gap-[4px]">
              <AmenitiesIcon />
              <div>Amenities</div>
            </div>
            <div
              className="underline cursor-pointer"
              onClick={() => setAmenitiesModal(true)}
            >
              Edit
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[16px] text-[15px] font-normal">
            {Object.entries(metaDetails?.amenities)?.map((category) => {
              return (
                <>
                  {category[1]?.length ? (
                    <div className="px-[14px] text-[16px] col-span-2">
                      {category[0]}
                    </div>
                  ) : (
                    <></>
                  )}
                  {category[1].map((item) => {
                    return (
                      <>
                        {item === "CookwareKitchenUtensils" && (
                          <div className="px-[14px]">
                            <CookwareKitchenUtensils />
                          </div>
                        )}
                        {item === "DryingRack" && (
                          <div className="px-[14px]">
                            <DryingRack />
                          </div>
                        )}
                        {item === "CableTv" && (
                          <div className="px-[14px]">
                            <CableTv />
                          </div>
                        )}
                        {item === "Toaster" && (
                          <div className="px-[14px]">
                            <Toaster />
                          </div>
                        )}
                        {item === "Wardrobe" && (
                          <div className="px-[14px]">
                            <Wardrobe />
                          </div>
                        )}
                        {item === "DiningTable" && (
                          <div className="px-[14px]">
                            <DiningTable />
                          </div>
                        )}
                        {item === "Reception" && (
                          <div className="px-[14px]">
                            <Reception />
                          </div>
                        )}
                        {item === "CityView" && (
                          <div className="px-[14px]">
                            <CityView />
                          </div>
                        )}
                        {item === "SmokeDetectors" && (
                          <div className="px-[14px]">
                            <SmokeDetectors />
                          </div>
                        )}
                        {item === "MarinaView" && (
                          <div className="px-[14px]">
                            <MarinaView />
                          </div>
                        )}
                        {item === "Gym" && (
                          <div className="px-[14px]">
                            <Gym />
                          </div>
                        )}
                        {item === "CarbonMonoxideDetector" && (
                          <div className="px-[14px]">
                            <CarbonMonoxideDetector />
                          </div>
                        )}
                        {item === "Hangers" && (
                          <div className="px-[14px]">
                            <Hangers />
                          </div>
                        )}
                        {item === "TrashCans" && (
                          <div className="px-[14px]">
                            <TrashCans />
                          </div>
                        )}
                        {item === "WineGlasses" && (
                          <div className="px-[14px]">
                            <WineGlasses />
                          </div>
                        )}
                        {item === "StreamingServiceSuchAsNetflix" && (
                          <div className="px-[14px]">
                            <StreamingServiceSuchAsNetflix />
                          </div>
                        )}

                        {item === "CrockeryCutlery" && (
                          <div className="px-[14px]">
                            <CrockeryCutlery />
                          </div>
                        )}

                        {item === "Toilet" && (
                          <div className="px-[14px]">
                            <Toilet />
                          </div>
                        )}

                        {item === "Oven" && (
                          <div className="px-[14px]">
                            <Oven />
                          </div>
                        )}
                        {item === "CoffeeMaker" && (
                          <div className="px-[14px]">
                            <CoffeeMaker />
                          </div>
                        )}
                        {item === "ComplimentarySoapShampooConditioner" && (
                          <div className="px-[14px]">
                            <ComplimentarySoapShampooConditioner />
                          </div>
                        )}
                        {item === "BeachView" && (
                          <div className="px-[14px]">
                            <BeachView />
                          </div>
                        )}
                        {item === "Elevator" && (
                          <div className="px-[14px]">
                            <Elevator />
                          </div>
                        )}
                        {item === "WirelessInternet" && (
                          <div className="px-[14px]">
                            <WirelessInternet />
                          </div>
                        )}
                        {item === "FreeParkingWithGarage" && (
                          <div className="px-[14px]">
                            <FreeParkingWithGarage />
                          </div>
                        )}
                        {item === "SmartTv" && (
                          <div className="px-[14px]">
                            <SmartTv />
                          </div>
                        )}
                        {item === "FireExtinguisher" && (
                          <div className="px-[14px]">
                            <FireExtinguisher />
                          </div>
                        )}
                        {item === "Marina" && (
                          <div className="px-[14px]">
                            <Marina />
                          </div>
                        )}
                        {item === "RoomDarkeningShades" && (
                          <div className="px-[14px]">
                            <RoomDarkeningShades />
                          </div>
                        )}
                        {item === "IronIroningBoard" && (
                          <div className="px-[14px]">
                            <IronIroningBoard />
                          </div>
                        )}
                        {item === "BedLinenTowels" && (
                          <div className="px-[14px]">
                            <BedLinenTowels />
                          </div>
                        )}
                        {item === "Kettle" && (
                          <div className="px-[14px]">
                            <Kettle />
                          </div>
                        )}
                        {item === "Microwave" && (
                          <div className="px-[14px]">
                            <Microwave />
                          </div>
                        )}
                        {item === "AirConditioning" && (
                          <div className="px-[14px]">
                            <AirConditioning />
                          </div>
                        )}
                        {item === "Seaview" && (
                          <div className="px-[14px]">
                            <Seaview />
                          </div>
                        )}
                        {item === "Beach" && (
                          <div className="px-[14px]">
                            <Beach />
                          </div>
                        )}
                        {item === "PlayGround" && (
                          <div className="px-[14px]">
                            <PlayGround />
                          </div>
                        )}
                        {item === "Refrigerator" && (
                          <div className="px-[14px]">
                            <Refrigerator />
                          </div>
                        )}
                        {item === "FamilyKidsFriendly" && (
                          <div className="px-[14px]">
                            <FamilyKidsFriendly />
                          </div>
                        )}
                        {item === "NoParties" && (
                          <div className="px-[14px]">
                            <NoParties />
                          </div>
                        )}
                        {item === "Essentials" && (
                          <div className="px-[14px]">
                            <Essentials />
                          </div>
                        )}
                        {item === "CleaningProducts" && (
                          <div className="px-[14px]">
                            <CleaningProducts />
                          </div>
                        )}
                        {item === "FirstAidKit" && (
                          <div className="px-[14px]">
                            <FirstAidKit />
                          </div>
                        )}
                        {item === "CookingBasics" && (
                          <div className="px-[14px]">
                            <CookingBasics />
                          </div>
                        )}
                        {item === "SmokingNotAllowed" && (
                          <div className="px-[14px]">
                            <SmokingNotAllowed />
                          </div>
                        )}
                        {item === "bathub" && (
                          <div className="px-[14px]">
                            <Bathub />
                          </div>
                        )}
                        {item === "hairdryer" && (
                          <div className="px-[14px]">
                            <HairDryer />
                          </div>
                        )}
                        {item === "shower" && (
                          <div className="px-[14px]">
                            <Shower />
                          </div>
                        )}
                        {item === "hotwater" && (
                          <div className="px-[14px]">
                            <HotWater />
                          </div>
                        )}
                        {item === "soapdrop" && (
                          <div className="px-[14px]">
                            <SoapDrop />
                          </div>
                        )}
                        {item === "heating" && (
                          <div className="px-[14px]">
                            <Heating />
                          </div>
                        )}
                        {item === "toiletseat" && (
                          <div className="px-[14px]">
                            <ToiletSeat />
                          </div>
                        )}
                        {item === "bathhanger" && (
                          <div className="px-[14px]">
                            <BathHanger />
                          </div>
                        )}
                        {item === "swimmingpool" && (
                          <div className="px-[14px]">
                            <SwimmingPool />
                          </div>
                        )}
                        {item === "valleyview" && (
                          <div className="px-[14px]">
                            <ValleyView />
                          </div>
                        )}
                        {item === "park" && (
                          <div className="px-[14px]">
                            <Park />
                          </div>
                        )}
                        {item === "balcony" && (
                          <div className="px-[14px]">
                            <Balcony />
                          </div>
                        )}
                        {item === "trowelbrush" && (
                          <div className="px-[14px]">
                            <TrowelBrush />
                          </div>
                        )}
                        {item === "hanger" && (
                          <div className="px-[14px]">
                            <BedroomHanger />
                          </div>
                        )}
                        {item === "beddouble" && (
                          <div className="px-[14px]">
                            <BedDouble />
                          </div>
                        )}
                        {item === "bed" && (
                          <div className="px-[14px]">
                            <Bed />
                          </div>
                        )}
                        {item === "dresserdrawer" && (
                          <div className="px-[14px]">
                            <DresserDrawer />
                          </div>
                        )}
                        {item === "dressingmirror" && (
                          <div className="px-[14px]">
                            <DressingMirror />
                          </div>
                        )}
                        {item === "safebox" && (
                          <div className="px-[14px]">
                            <SafeBox />
                          </div>
                        )}
                        {item === "sofadouble" && (
                          <div className="px-[14px]">
                            <SofaDouble />
                          </div>
                        )}
                        {item === "washingmachine" && (
                          <div className="px-[14px]">
                            <WashingMachine />
                          </div>
                        )}
                        {item === "gamepad" && (
                          <div className="px-[14px]">
                            <GamePad />
                          </div>
                        )}
                        {item === "medicalcase" && (
                          <div className="px-[14px]">
                            <MedicalCase />
                          </div>
                        )}
                        {item === "fireextinguisher" && (
                          <div className="px-[14px]">
                            <FireExtinguisher />
                          </div>
                        )}
                        {item === "tvstand" && (
                          <div className="px-[14px]">
                            <TvStand />
                          </div>
                        )}
                        {item === "alarm" && (
                          <div className="px-[14px]">
                            <Alarm />
                          </div>
                        )}
                        {item === "cctv" && (
                          <div className="px-[14px]">
                            <CCTV />
                          </div>
                        )}
                        {item === "wifi" && (
                          <div className="px-[14px]">
                            <Wifi />
                          </div>
                        )}
                        {item === "workjob" && (
                          <div className="px-[14px]">
                            <WorkJob />
                          </div>
                        )}
                        {item === "laptoptable" && (
                          <div className="px-[14px]">
                            <LaptopTable />
                          </div>
                        )}
                        {item === "kitchen" && (
                          <div className="px-[14px]">
                            <Kitchen />
                          </div>
                        )}
                        {item === "forkknife" && (
                          <div className="px-[14px]">
                            <ForkKnife />
                          </div>
                        )}
                        {item === "stove" && (
                          <div className="px-[14px]">
                            <Stove />
                          </div>
                        )}
                        {item === "induction" && (
                          <div className="px-[14px]">
                            <Induction />
                          </div>
                        )}
                        {item === "dishes" && (
                          <div className="px-[14px]">
                            <Dishes />
                          </div>
                        )}
                        {item === "fridge" && (
                          <div className="px-[14px]">
                            <Fridge />
                          </div>
                        )}
                        {item === "tablechair" && (
                          <div className="px-[14px]">
                            <TableChair />
                          </div>
                        )}
                        {item === "coffeemachine" && (
                          <div className="px-[14px]">
                            <CoffeeMachine />
                          </div>
                        )}
                        {item === "blender" && (
                          <div className="px-[14px]">
                            <Blender />
                          </div>
                        )}
                        {item === "saltpepper" && (
                          <div className="px-[14px]">
                            <SaltPepper />
                          </div>
                        )}
                        {item === "dishwasher" && (
                          <div className="px-[14px]">
                            <DishWasher />
                          </div>
                        )}
                        {item === "wineglass" && (
                          <div className="px-[14px]">
                            <WineGlass />
                          </div>
                        )}
                        {item === "trash" && (
                          <div className="px-[14px]">
                            <Trash />
                          </div>
                        )}
                        {item === "platefork" && (
                          <div className="px-[14px]">
                            <PlateFork />
                          </div>
                        )}
                        {item === "childrenslide" && (
                          <div className="px-[14px]">
                            <ChildrenSlide />
                          </div>
                        )}
                        {item === "lounge" && (
                          <div className="px-[14px]">
                            <Lounge />
                          </div>
                        )}
                        {item === "swing" && (
                          <div className="px-[14px]">
                            <Swing />
                          </div>
                        )}
                        {item === "sun" && (
                          <div className="px-[14px]">
                            <Sun />
                          </div>
                        )}
                        {item === "beachumbrella" && (
                          <div className="px-[14px]">
                            <BeachUmbrella />
                          </div>
                        )}
                        {item === "parking" && (
                          <div className="px-[14px]">
                            <Parking />
                          </div>
                        )}
                        {item === "cat" && (
                          <div className="px-[14px]">
                            <Cat />
                          </div>
                        )}
                        {item === "dog" && (
                          <div className="px-[14px]">
                            <Dog />
                          </div>
                        )}
                        {item === "breakfast" && (
                          <div className="px-[14px]">
                            <Breakfast />
                          </div>
                        )}
                        {item === "longterm" && (
                          <div className="px-[14px]">
                            <Longterm />
                          </div>
                        )}
                        {item === "housekey" && (
                          <div className="px-[14px]">
                            <HouseKey />
                          </div>
                        )}
                        {item === "userprofile" && (
                          <div className="px-[14px]">
                            <Userprofile />
                          </div>
                        )}
                        {item === "cleaningspray" && (
                          <div className="px-[14px]">
                            <CleaningSprayAction />
                          </div>
                        )}
                        {item === "smoking" && (
                          <div className="px-[14px]">
                            <Smoking />
                          </div>
                        )}
                        {item === "campfire" && (
                          <div className="px-[14px]">
                            <CampFire />
                          </div>
                        )}
                        {/* {item === "womenstaff" && (
                          <div className="px-[14px]">
                            <WomenStaff />
                          </div>
                        )} */}
                        {item === "stairs" && (
                          <div className="px-[14px]">
                            <Stairs />
                          </div>
                        )}
                        {item === "manstaff" && (
                          <div className="px-[14px]">
                            <ManStaff />
                          </div>
                        )}
                        {item === "toyscubes" && (
                          <div className="px-[14px]">
                            <ToyCubes />
                          </div>
                        )}
                        {item === "fairytale" && (
                          <div className="px-[14px]">
                            <BookFairyTale />
                          </div>
                        )}
                        {item === "babybedroom" && (
                          <div className="px-[14px]">
                            <BabyBedroom />
                          </div>
                        )}
                        {item === "appliance" && (
                          <div className="px-[14px]">
                            <Appliance />
                          </div>
                        )}
                        {item === "fan" && (
                          <div className="px-[14px]">
                            <Fan />
                          </div>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>

          <Modal
            open={amenitiesModal}
            center
            onClose={() => setAmenitiesModal(false)}
            classNames={{
              modal:
                "min-w-[300px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
            }}
          >
            <div className="w-[500px] space-y-[10px]">
              <div className="text-[20px] font-semibold">Add amenities</div>

              <div className="flex items-center bg-white px-[12px] w-full py-[8px] border-[1px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <input
                  placeholder="Search amenities"
                  className="outline-none w-full font-normal"
                />
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.58268 17.9998C13.9549 17.9998 17.4993 14.4554 17.4993 10.0832C17.4993 5.71092 13.9549 2.1665 9.58268 2.1665C5.21043 2.1665 1.66602 5.71092 1.66602 10.0832C1.66602 14.4554 5.21043 17.9998 9.58268 17.9998Z"
                    stroke="#202020"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3327 18.8332L16.666 17.1665"
                    stroke="#202020"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
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
              <div className="grid grid-cols-2 gap-[10px] max-h-[200px] overflow-auto scrollbarwidth p-[10px]">
                {(currentCategory === "Bathroom" ||
                  currentCategory === "All") && (
                  <>
                    <div className="w-full items-center justify-between flex">
                      <Bathub />
                      {metaDetails?.amenities.Bathroom?.includes("bathub") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities.Bathroom?.includes(
                        "hairdryer"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities.Bathroom?.includes("shower") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities.Bathroom?.includes("hotwater") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities.Bathroom?.includes("soapdrop") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities.Bathroom?.includes("heating") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities.Bathroom?.includes(
                        "toiletseat"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities.Bathroom?.includes(
                        "bathhanger"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Bathroom:
                                  metaDetails?.amenities.Bathroom?.filter(
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
                                ...metaDetails?.amenities,
                                Bathroom: metaDetails?.amenities.Bathroom
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities.Bathroom,
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
                      {metaDetails?.amenities["Location features"]?.includes(
                        "swimmingpool"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
                                  "Location features"
                                ].filter((item) => item !== "swimmingpool"),
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
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
                                  "Location features"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Location features"]?.includes(
                        "valleyview"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
                                  "Location features"
                                ].filter((item) => item !== "valleyview"),
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
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
                                  "Location features"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Location features"]?.includes(
                        "park"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
                                  "Location features"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Location features"]?.includes(
                        "balcony"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
                                  "Location features"
                                ].filter((item) => item !== "balcony"),
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
                                ...metaDetails?.amenities,
                                "Location features": metaDetails?.amenities[
                                  "Location features"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "trowelbrush"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "trowelbrush"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "hanger"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "hanger"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "beddouble"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "beddouble"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "bed"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "dresserdrawer"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "dresserdrawer"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "dressingmirror"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "dressingmirror"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "safebox"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "safebox"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "sofadouble"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "sofadouble"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Bedroom and Laundry"]?.includes(
                        "washingmachine"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.filter((item) => item !== "washingmachine"),
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
                                ...metaDetails?.amenities,
                                "Bedroom and Laundry": metaDetails?.amenities[
                                  "Bedroom and Laundry"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Entertainment"]?.includes(
                        "gamepad"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Entertainment: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Entertainment: metaDetails?.amenities[
                                  "Entertainment"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Home safety"]?.includes(
                        "medicalcase"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
                                  "Home safety"
                                ]?.filter((item) => item !== "medicalcase"),
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
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
                                  "Home safety"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities["Home safety"],
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
                      {metaDetails?.amenities["Home safety"]?.includes(
                        "fireextinguisher"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
                                  "Home safety"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities["Home safety"],
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
                      {metaDetails?.amenities["Home safety"]?.includes(
                        "tvstand"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
                                  "Home safety"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities["Home safety"],
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
                      {metaDetails?.amenities["Home safety"]?.includes(
                        "alarm"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
                                  "Home safety"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities["Home safety"],
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
                      {metaDetails?.amenities["Home safety"]?.includes(
                        "cctv"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Home safety": metaDetails?.amenities[
                                  "Home safety"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities["Home safety"],
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
                      {metaDetails?.amenities["Internet and office"]?.includes(
                        "wifi"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Internet and office": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Internet and office": metaDetails?.amenities[
                                  "Internet and office"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Internet and office"]?.includes(
                        "workjob"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Internet and office": metaDetails?.amenities[
                                  "Internet and office"
                                ]?.filter((item) => item !== "workjob"),
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
                                ...metaDetails?.amenities,
                                "Internet and office": metaDetails?.amenities[
                                  "Internet and office"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Internet and office"]?.includes(
                        "laptoptable"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Internet and office": metaDetails?.amenities[
                                  "Internet and office"
                                ]?.filter((item) => item !== "laptoptable"),
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
                                ...metaDetails?.amenities,
                                "Internet and office": metaDetails?.amenities[
                                  "Internet and office"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "kitchen"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "kitchen"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "forkknife"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "forkknife"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "stove"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "induction"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "induction"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "dishes"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "dishes"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "fridge"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "fridge"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "tablechair"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "tablechair"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "coffeemachine"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "coffeemachine"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "blender"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "blender"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "saltpepper"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "saltpepper"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "dishwasher"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "dishwasher"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "wineglass"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "wineglass"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "trash"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Kitchen and dining"]?.includes(
                        "platefork"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.filter((item) => item !== "platefork"),
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
                                ...metaDetails?.amenities,
                                "Kitchen and dining": metaDetails?.amenities[
                                  "Kitchen and dining"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Outdoor"]?.includes(
                        "childrenslide"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities[
                                  "Outdoor"
                                ]?.filter((item) => item !== "childrenslide"),
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
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities["Outdoor"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Outdoor"],
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
                      {metaDetails?.amenities["Outdoor"]?.includes("lounge") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities["Outdoor"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Outdoor"],
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
                      {metaDetails?.amenities["Outdoor"]?.includes("swing") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities["Outdoor"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Outdoor"],
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
                      {metaDetails?.amenities["Outdoor"]?.includes("sun") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities["Outdoor"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Outdoor"],
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
                      {metaDetails?.amenities["Outdoor"]?.includes(
                        "beachumbrella"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities[
                                  "Outdoor"
                                ]?.filter((item) => item !== "beachumbrella"),
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
                                ...metaDetails?.amenities,
                                Outdoor: metaDetails?.amenities["Outdoor"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Outdoor"],
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
                      {metaDetails?.amenities[
                        "Parking and facilities"
                      ]?.includes("parking") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Parking and facilities":
                                  metaDetails?.amenities[
                                    "Parking and facilities"
                                  ]?.filter((item) => item !== "parking"),
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
                                ...metaDetails?.amenities,
                                "Parking and facilities": metaDetails
                                  ?.amenities["Parking and facilities"]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Services"]?.includes("cat") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes("dog") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "breakfast"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "breakfast"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "longterm"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "longterm"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "housekey"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "housekey"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "userprofile"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "userprofile"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "cleaningspray"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "cleaningspray"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "smoking"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "campfire"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "campfire"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "womenstaff"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "womenstaff"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "stairs"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Services"]?.includes(
                        "manstaff"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities[
                                  "Services"
                                ]?.filter((item) => item !== "manstaff"),
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
                                ...metaDetails?.amenities,
                                Services: metaDetails?.amenities["Services"]
                                  ?.length
                                  ? [
                                      ...metaDetails?.amenities["Services"],
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
                      {metaDetails?.amenities["Family"]?.includes(
                        "toyscubes"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Family: metaDetails?.amenities[
                                  "Family"
                                ]?.filter((item) => item !== "toyscubes"),
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
                                ...metaDetails?.amenities,
                                Family: metaDetails?.amenities["Family"]?.length
                                  ? [
                                      ...metaDetails?.amenities["Family"],
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
                      {metaDetails?.amenities["Family"]?.includes(
                        "fairytale"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Family: metaDetails?.amenities[
                                  "Family"
                                ]?.filter((item) => item !== "fairytale"),
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
                                ...metaDetails?.amenities,
                                Family: metaDetails?.amenities["Family"]?.length
                                  ? [
                                      ...metaDetails?.amenities["Family"],
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
                      {metaDetails?.amenities["Family"]?.includes(
                        "babybedroom"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Family: metaDetails?.amenities[
                                  "Family"
                                ]?.filter((item) => item !== "babybedroom"),
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
                                ...metaDetails?.amenities,
                                Family: metaDetails?.amenities["Family"]?.length
                                  ? [
                                      ...metaDetails?.amenities["Family"],
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
                      {metaDetails?.amenities["Heating and cooling"]?.includes(
                        "appliance"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Heating and cooling": metaDetails?.amenities[
                                  "Heating and cooling"
                                ]?.filter((item) => item !== "appliance"),
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
                                ...metaDetails?.amenities,
                                "Heating and cooling": metaDetails?.amenities[
                                  "Heating and cooling"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities["Heating and cooling"]?.includes(
                        "fan"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                "Heating and cooling": metaDetails?.amenities[
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
                                ...metaDetails?.amenities,
                                "Heating and cooling": metaDetails?.amenities[
                                  "Heating and cooling"
                                ]?.length
                                  ? [
                                      ...metaDetails?.amenities[
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
                      {metaDetails?.amenities.Others?.includes(
                        "CookwareKitchenUtensils"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "CookwareKitchenUtensils"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("DryingRack") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("CableTv") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Toaster") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Wardrobe") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "DiningTable"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Reception") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("CityView") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "SmokeDetectors"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("MarinaView") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Gym") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [...metaDetails?.amenities.Others, "Gym"]
                                  : ["Gym"],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full items-center justify-between flex">
                      <CarbonMonoxideDetector />
                      {metaDetails?.amenities.Others?.includes(
                        "CarbonMonoxideDetector"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "CarbonMonoxideDetector"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Hangers") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("TrashCans") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "WineGlasses"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "StreamingServiceSuchAsNetflix"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) =>
                                    item !== "StreamingServiceSuchAsNetflix"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "CrockeryCutlery"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Toilet") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [...metaDetails?.amenities.Others, "Toilet"]
                                  : ["Toilet"],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full items-center justify-between flex">
                      <Oven />
                      {metaDetails?.amenities.Others?.includes("Oven") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [...metaDetails?.amenities.Others, "Oven"]
                                  : ["Oven"],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full items-center justify-between flex">
                      <CoffeeMaker />
                      {metaDetails?.amenities.Others?.includes(
                        "CoffeeMaker"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "ComplimentarySoapShampooConditioner"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
                                      "ComplimentarySoapShampooConditioner",
                                    ]
                                  : ["ComplimentarySoapShampooConditioner"],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full items-center justify-between flex">
                      <BeachView />
                      {metaDetails?.amenities.Others?.includes("BeachView") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Elevator") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "WirelessInternet"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "WirelessInternet"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "FreeParkingWithGarage"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "FreeParkingWithGarage"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("SmartTv") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "FireExtinguisher"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "FireExtinguisher"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Marina") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [...metaDetails?.amenities.Others, "Marina"]
                                  : ["Marina"],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full items-center justify-between flex">
                      <RoomDarkeningShades />
                      {metaDetails?.amenities.Others?.includes(
                        "RoomDarkeningShades"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "RoomDarkeningShades"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "IronIroningBoard"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "IronIroningBoard"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "BedLinenTowels"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Kettle") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [...metaDetails?.amenities.Others, "Kettle"]
                                  : ["Kettle"],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full items-center justify-between flex">
                      <Microwave />
                      {metaDetails?.amenities.Others?.includes("Microwave") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "AirConditioning"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Seaview") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Beach") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [...metaDetails?.amenities.Others, "Beach"]
                                  : ["Beach"],
                              },
                            });
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full items-center justify-between flex">
                      <PlayGround />
                      {metaDetails?.amenities.Others?.includes("PlayGround") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "Refrigerator"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "FamilyKidsFriendly"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "FamilyKidsFriendly"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("NoParties") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes("Essentials") ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "CleaningProducts"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "CleaningProducts"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "FirstAidKit"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "CookingBasics"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
                      {metaDetails?.amenities.Others?.includes(
                        "SmokingNotAllowed"
                      ) ? (
                        <CheckMarkPurple
                          onClick={() => {
                            setMetaDetails({
                              ...metaDetails,
                              amenities: {
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.filter(
                                  (item) => item !== "SmokingNotAllowed"
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
                                ...metaDetails?.amenities,
                                Others: metaDetails?.amenities.Others?.length
                                  ? [
                                      ...metaDetails?.amenities.Others,
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
              <div className="flex items-center justify-between mt-6">
                <div
                  className="text-[#5b1dee] underline cursor-pointer"
                  onClick={() =>
                    setMetaDetails({ ...metaDetails, amenities: {} })
                  }
                >
                  Clear amenities
                </div>
                <PurpleButton
                  text="Save"
                  onClick={() => setAmenitiesModal(false)}
                />
              </div>
            </div>
          </Modal>

          <div className="px-[14px] flex items-start justify-between">
            <div className="flex items-center gap-[4px]">
              <EssentialIcon />
              <div>Essentials</div>
            </div>
          </div>
          <div className="space-y-[10px]">
            <div className="px-[14px] flex items-center justify-between">
              <div className="text-[14px] font-normal">Guests</div>
              <NumberSpin
                value={metaDetails?.essentials.guests}
                min={1}
                onChange={(value) =>
                  setMetaDetails({
                    ...metaDetails,
                    essentials: { ...metaDetails?.essentials, guests: value },
                  })
                }
              />
            </div>
            <div className="px-[14px] flex items-center justify-between">
              <div className="text-[14px] font-normal">Bedrooms</div>
              <NumberSpin
                value={metaDetails?.essentials.bedrooms}
                onChange={(value) =>
                  setMetaDetails({
                    ...metaDetails,
                    essentials: {
                      ...metaDetails?.essentials,
                      bedrooms: value,
                    },
                  })
                }
              />
            </div>
            <div className="px-[14px] flex items-center justify-between">
              <div className="text-[14px] font-normal">Beds</div>
              <NumberSpin
                value={metaDetails?.essentials.beds}
                onChange={(value) =>
                  setMetaDetails({
                    ...metaDetails,
                    essentials: { ...metaDetails?.essentials, beds: value },
                  })
                }
              />
            </div>
            <div className="px-[14px] flex items-center justify-between">
              <div className="text-[14px] font-normal">Bathrooms</div>
              <NumberSpin
                value={metaDetails?.essentials.bathrooms}
                onChange={(value) =>
                  setMetaDetails({
                    ...metaDetails,
                    essentials: {
                      ...metaDetails?.essentials,
                      bathrooms: value,
                    },
                  })
                }
              />
            </div>
            <div className="px-[14px] flex items-center justify-between">
              <div className="text-[14px] font-normal">Meters</div>
              <div className="flex items-center border-[2px] rounded-md w-[98px] px-1">
                <input
                  value={metaDetails?.essentials.square}
                  onChange={(e) =>
                    setMetaDetails({
                      ...metaDetails,
                      essentials: {
                        ...metaDetails?.essentials,
                        square: e.target.value,
                      },
                    })
                  }
                  className="outline-none w-full text-center pl-2"
                  min={1}
                />
                <div className="text-[#959595] text-[14px] items-top flex">
                  <span>M</span>
                  <span className="text-[10px] top-0">2</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[14px] flex items-start justify-between">
            <div className="flex items-center gap-[4px]">
              <PetsIcon />
              <div>Pets</div>
            </div>
          </div>
          <div className="px-[14px] flex items-center justify-between">
            <div className="text-[14px] font-normal">Allowing pets</div>
            <Toggle
              status={metaDetails?.pets}
              onChange={() =>
                setMetaDetails({ ...metaDetails, pets: !metaDetails?.pets })
              }
            />
          </div>
        </div>
      </div>
      <div className="w-[600px] mx-auto my-3 flex justify-end">
        <PurpleButton text="Update" onClick={handleUpdate} />
      </div>
    </div>
  );
};
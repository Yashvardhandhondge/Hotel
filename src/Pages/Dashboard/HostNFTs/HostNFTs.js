import {
  SelectionGroup,
  SelectionItem,
} from "../../../Components/Selection/Selection";
import { EmptyNft, LightIcon } from "../../../AssetComponents/Images";
import { RentalItem } from "../../../Components/RealEstateProperty/RentalItem";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

export const HostNFTs = () => {
  const nfts = useSelector((state) => state.nft.nfts);
  const account = useSelector((state) => state.auth.account);
  const [current, setCurrent] = useState(0);

  const [listedCounts, setListedCounts] = useState(0);
  const [verifiedCounts, setVerifiedCounts] = useState(0);
  const [rentalActiveCounts, setRentalActiveCounts] = useState(0);
  useEffect(() => {
    const temp = Object.values(nfts);
    let listedCounts = 0,
      rentalActiveCounts = 0,
      verifiedCounts = 0;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].access.owner === account) {
        verifiedCounts++;
        if (temp[i].short.islisted) listedCounts++;
        if (temp[i].rentals.rentals.length) rentalActiveCounts++;
      }
    }
    setVerifiedCounts(verifiedCounts);
    setListedCounts(listedCounts);
    setRentalActiveCounts(rentalActiveCounts);
  }, [nfts]);

  return (
    <div className="w-full overflow-auto max-h-[calc(100vh-80px)] h-full p-[10px]">
      <div className="w-full h-full space-y-[20px] rounded-[10px] p-[8px] flex flex-col">
        <div className="bg-white border-[2px] h-max border-[#E3E3E3] p-[24px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          <div className="flex items-center gap-[10px]">
            <div className="p-[8px] w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#5b1dee]">
              <svg
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_672_35116)">
                  <path
                    d="M14.125 11.375H13.25V7.43749L13.378 7.56546C13.4602 7.64755 13.5717 7.69361 13.6879 7.69351C13.8041 7.69341 13.9155 7.64715 13.9976 7.56491C14.0797 7.48267 14.1257 7.37119 14.1256 7.25499C14.1255 7.13879 14.0793 7.02739 13.997 6.9453L8.61852 1.56843C8.45444 1.40446 8.23197 1.31235 8 1.31235C7.76803 1.31235 7.54556 1.40446 7.38148 1.56843L2.00297 6.9453C1.92095 7.02739 1.8749 7.13871 1.87495 7.25475C1.875 7.3708 1.92115 7.48207 2.00324 7.56409C2.08533 7.64611 2.19665 7.69216 2.31269 7.69211C2.42874 7.69206 2.54001 7.64591 2.62203 7.56382L2.75 7.43749V11.375H1.875C1.75897 11.375 1.64769 11.4211 1.56564 11.5031C1.48359 11.5852 1.4375 11.6965 1.4375 11.8125C1.4375 11.9285 1.48359 12.0398 1.56564 12.1218C1.64769 12.2039 1.75897 12.25 1.875 12.25H14.125C14.241 12.25 14.3523 12.2039 14.4344 12.1218C14.5164 12.0398 14.5625 11.9285 14.5625 11.8125C14.5625 11.6965 14.5164 11.5852 14.4344 11.5031C14.3523 11.4211 14.241 11.375 14.125 11.375ZM9.3125 11.375H6.6875V8.74999C6.6875 8.69197 6.71055 8.63633 6.75157 8.59531C6.79259 8.55429 6.84823 8.53124 6.90625 8.53124H9.09375C9.15177 8.53124 9.20741 8.55429 9.24843 8.59531C9.28945 8.63633 9.3125 8.69197 9.3125 8.74999V11.375Z"
                    fill="white"
                  />
                  <path
                    d="M13.75 8.19143V7.68903M13.75 8.19143C13.7295 8.19279 13.709 8.19349 13.6883 8.19351C13.5342 8.19365 13.3839 8.15584 13.25 8.08525V10.875H13.75M13.75 8.19143V10.875M13.75 8.19143C13.9763 8.17633 14.1902 8.07963 14.3514 7.91815C14.5272 7.74206 14.6258 7.50336 14.6256 7.25455C14.6254 7.00587 14.5265 6.76745 14.3505 6.59169L13.997 6.9453M13.75 7.68903L1.875 11.375C1.75897 11.375 1.64769 11.4211 1.56564 11.5031C1.48359 11.5852 1.4375 11.6965 1.4375 11.8125C1.4375 11.9285 1.48359 12.0398 1.56564 12.1218C1.64769 12.2039 1.75897 12.25 1.875 12.25H14.125C14.241 12.25 14.3523 12.2039 14.4344 12.1218C14.5164 12.0398 14.5625 11.9285 14.5625 11.8125C14.5625 11.6965 14.5164 11.5852 14.4344 11.5031C14.3523 11.4211 14.241 11.375 14.125 11.375H13.75V10.875M13.75 7.68903C13.8432 7.6756 13.9303 7.63235 13.9976 7.56491C14.0797 7.48267 14.1257 7.37119 14.1256 7.25499C14.1255 7.13879 14.0793 7.02739 13.997 6.9453M13.75 7.68903L2.25 7.68762M13.75 10.875H14.125C14.3736 10.875 14.6121 10.9738 14.7879 11.1496C14.9637 11.3254 15.0625 11.5638 15.0625 11.8125C15.0625 12.0611 14.9637 12.2996 14.7879 12.4754C14.6121 12.6512 14.3736 12.75 14.125 12.75H1.875C1.62636 12.75 1.3879 12.6512 1.21209 12.4754C1.03627 12.2996 0.9375 12.0611 0.9375 11.8125C0.9375 11.5638 1.03627 11.3254 1.21209 11.1496C1.3879 10.9738 1.62636 10.875 1.875 10.875H2.25V8.19003M13.997 6.9453L14.3503 6.59144L8.97201 1.21482L8.97195 1.21476C8.71412 0.957089 8.36452 0.812347 8 0.812347C7.63548 0.812347 7.28588 0.957089 7.02805 1.21476L7.02799 1.21482L1.64947 6.59169L1.64926 6.5919C1.47351 6.76781 1.37484 7.00632 1.37495 7.25497C1.37506 7.50363 1.47394 7.74205 1.64984 7.9178C1.81085 8.07867 2.02432 8.17496 2.25 8.19003M13.997 6.9453L8.61852 1.56843C8.45444 1.40446 8.23197 1.31235 8 1.31235C7.76803 1.31235 7.54556 1.40446 7.38148 1.56843L2.00297 6.9453C1.92095 7.02739 1.8749 7.13871 1.87495 7.25475C1.875 7.3708 1.92115 7.48207 2.00324 7.56409C2.07041 7.6312 2.15713 7.67422 2.25 7.68762M2.25 8.19003V7.68762M2.25 8.19003C2.27088 8.19142 2.29186 8.19212 2.31292 8.19211C2.46665 8.19204 2.61648 8.15422 2.75 8.08377V10.875L2.25 7.68762M7.1875 10.875V9.03124H8.8125V10.875H7.1875Z"
                    stroke="#202020"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_672_35116"
                    x="0.4375"
                    y="0.312347"
                    width="16.125"
                    height="13.9377"
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
                      result="effect1_dropShadow_672_35116"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_672_35116"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="font-semibold text-[24px]">My Real Estate NFTs</div>
          </div>

          <div className="text-[#666666] font-normal">
            Your Real Estate Status
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-[16px]">
          <Fade cascade damping={0.2}>
            <div className="bg-white flex justify-between items-center p-[16px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="flex items-center gap-[10px]">
                <div className="p-[6px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.668 7.50001V3.33409C11.668 3.06078 11.802 2.80484 12.0266 2.64916C12.2513 2.49348 12.538 2.45786 12.7939 2.55383L16.9606 4.11633C17.2858 4.23829 17.5013 4.54922 17.5013 4.89659V17.5"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.66797 17.5V8.50154C6.66797 7.94841 7.11637 7.5 7.6695 7.5H13.1664C13.432 7.5 13.6868 7.60552 13.8746 7.79334C14.0624 7.98117 14.168 8.23591 14.168 8.50154V17.5"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16797 7.49999V4.99999C9.16797 4.53975 8.79487 4.16666 8.33464 4.16666H5.0013C4.54106 4.16666 4.16797 4.53975 4.16797 4.99999V9.99999"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.66667 2.5V4.16667"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.3346 17.5H1.66797"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.5 17.5V10.8333C2.5 10.3731 2.8731 10 3.33333 10H6.66667"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.16667 14.5833V10.4167"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.6667 14.5833V10.4167"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-[#959595]">Total NFTs Listed</div>
              </div>
              <div className="text-[20px]">{listedCounts}</div>
            </div>
            {/* <div className="bg-white flex justify-between items-center p-[16px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="flex items-center gap-[10px]">
                <div className="p-[6px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 10.4167H8.33333"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.832 10.4167H14.1654"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 7.50001H8.33333"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.832 7.50001H14.1654"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.16667 14.1667V3.89685C4.16666 3.59962 4.32496 3.32489 4.58212 3.17584L5.40954 2.69627C5.66698 2.54705 5.98445 2.54641 6.24248 2.69461L7.49652 3.4149L7.50052 3.41657C7.52275 3.40348 8.26108 2.97548 8.74498 2.69499C9.00189 2.54615 9.31876 2.546 9.57582 2.69458L10.8299 3.41488H10.8368L12.0908 2.69467C12.3489 2.54647 12.6663 2.54711 12.9238 2.69633L14.1632 3.41467H14.1701L15.4242 2.69437C15.6822 2.54617 15.9997 2.54681 16.2571 2.69603L17.0845 3.17561C17.3417 3.32464 17.5 3.59934 17.5 3.89655V16.25C17.5 16.9404 16.9404 17.5 16.25 17.5V17.5C15.5596 17.5 15 16.9404 15 16.25V15C15 14.5398 14.6269 14.1667 14.1667 14.1667H3.33333C2.8731 14.1667 2.5 14.5398 2.5 15V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H16.25"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-[#959595]">Total NFTs Unverified</div>
              </div>
              <div className="text-[20px]">0</div>
            </div> */}
            <div className="bg-white flex justify-between items-center p-[16px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="flex items-center gap-[10px]">
                <div className="p-[6px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="9.9987"
                      cy="5.41667"
                      rx="2.91667"
                      ry="2.91667"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.2487 11.6667V8.05243"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.7487 8.05243V11.6667"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.33203 11.6667H11.6654C13.0461 11.6667 14.1654 12.7859 14.1654 14.1667V14.1667H5.83203V14.1667C5.83203 12.7859 6.95132 11.6667 8.33203 11.6667V11.6667Z"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.16667 14.1667H15.8333C16.7538 14.1667 17.5 14.9128 17.5 15.8333V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V15.8333C2.5 14.9128 3.24619 14.1667 4.16667 14.1667Z"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-[#959595]">Verified NFTS</div>
              </div>
              <div className="text-[20px]">{verifiedCounts}</div>
            </div>
            <div className="bg-white flex justify-between items-center p-[16px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="flex items-center gap-[10px]">
                <div className="p-[6px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3333 14.1667H15C16.3807 14.1667 17.5 13.0474 17.5 11.6667V5.83334C17.5 4.45263 16.3807 3.33334 15 3.33334H5C3.61929 3.33334 2.5 4.45263 2.5 5.83334V7.50001"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.52734 7.69355C9.05365 7.16725 9.82075 6.96171 10.5397 7.15435C11.2586 7.34699 11.8202 7.90855 12.0128 8.62749C12.2055 9.34643 11.9999 10.1135 11.4736 10.6398"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.5 16.6667L3.46293 17.1481C3.92577 17.3795 4.43613 17.5 4.9536 17.5H10.4167C11.107 17.5 11.6667 16.9404 11.6667 16.25V16.25C11.6667 15.5596 11.107 15 10.4167 15H7.08333"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.5 10.8333H4.92779C5.28841 10.8333 5.6393 10.9503 5.92779 11.1667L7.79218 12.565C8.10591 12.8003 8.3021 13.1601 8.3299 13.5513C8.3577 13.9425 8.21438 14.3265 7.93708 14.6038V14.6038C7.46104 15.0798 6.70741 15.1334 6.16883 14.7294L5 13.8528"
                      stroke="#5A5A5A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-[#959595]">Active Rentals</div>
              </div>
              <div className="text-[20px]">{rentalActiveCounts}</div>
            </div>
          </Fade>
        </div>
        <div className="px-[20px] w-full justify-between flex items-center my-[40px]">
          <SelectionGroup
            defaultItem={current}
            className="border-[2px] border-[#e3e3e3] w-max px-[6px] py-[4px] gap-[8px] flex items-center rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[160px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Verified NFTs</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setCurrent(0)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[160px] flex justify-center"
                >
                  <div className="text-[#959595]">Verified NFTs</div>
                </div>
              }
            />
            {/* <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[160px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">
                    Unverified NFTs
                  </div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setCurrent(1)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[160px] flex justify-center"
                >
                  <div className="text-[#959595]">Unverified NFTs</div>
                </div>
              }
            /> */}
            <SelectionItem
              SelectedItem={
                <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[160px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">My Listings</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setCurrent(1)}
                  className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[160px] flex justify-center"
                >
                  <div className="text-[#959595]">My Listings</div>
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

        <div className="flex px-[40px] gap-[20px] w-full flex-wrap overflow-auto max-h-[calc(100vh-200px)]">
          {Object.keys(nfts).map((nft, i) => {
            if (
              (nfts[nft].access.owner === account &&
                current === 1 &&
                nfts[nft].short.islisted) ||
              (nfts[nft].access.owner === account &&
                current === 0 &&
                !nfts[nft].short.islisted)
            )
              return (
                <Fade>
                  <RentalItem token_id={nft} />
                </Fade>
              );
            else
              return (
                <>
                  {/* {i === Object.keys(nfts).length - 1 && (
                    <div className="flex flex-col items-center w-full justify-center h-[calc(100vh-600px)]">
                      <EmptyNft />
                      <div>No NFTs yet</div>
                      <div className="text-[#737373]">
                        {current === 0
                          ? "No Verified NFTs yet"
                          : current === 1
                          ? "No Unverified NFTs yet"
                          : "No Listed NFTs yet"}
                      </div>
                    </div>
                  )} */}
                </>
              );
          })}
        </div>
      </div>
    </div>
  );
};

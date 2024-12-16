import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowToRightIcon,
  EmptyBooking,
  EmptyInbox,
  EmptyNft,
  EmptyProperty,
  UnVerified,
  VerifyUserIcon,
} from "../../../AssetComponents/Images";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import { useSelector } from "react-redux";
import { RentalItem } from "../../../Components/RealEstateProperty/RentalItem";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useRef, useState } from "react";
import { truncateWalletAddress } from "../../../Components/functions/Functions";
import { getProfileFromWallet } from "../../../Components/functions/Functions";
import { UserBoxIcon } from "../../../AssetComponents/Images";
import { Fade } from "react-awesome-reveal";
import { toast } from "react-toastify";
import {
  SelectionGroup,
  SelectionItem,
} from "../../../Components/Selection/Selection";
import { LightIcon } from "../../../AssetComponents/Images";

export const HostDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentProfile = useSelector((state) => state.auth.profile);
  const nfts = useSelector((state) => state.nft.nfts);
  const account = useSelector((state) => state.auth.account);
  const diff = useSelector((state) => state.time.diffToUTC);
  const notificationContent = useSelector((state) => state.notification.items);
  const [myNfts, setMyNfts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [profiles, setProfiles] = useState({});
  const ref_nfts = useRef();
  const [flag, setFlag] = useState(0);
  const diffToUTC = useSelector((state) => state.time.diffToUTC);
  let flags = [false, false, false, false];
  const ref_requests = useRef();
  useEffect(() => {
    const nfts_ = Object.values(nfts);
    const temp = [];
    const temp_ = [];
    for (let i = 0; i < nfts_.length; i++) {
      if (nfts_[i].access.owner === account) {
        temp.push(nfts_[i]);
        if (nfts_[i].rentals.rentals.length) temp_.push(nfts_[i]);
      }
    }
    setMyNfts(temp);
    setRequests(temp_);
  }, [nfts]);
  const setPeriodParams = (token_id, from, to) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("from", from);
    searchParams.set("to", to);
    navigate(
      "/dashboard/host/reservations" + `/${token_id}?${searchParams.toString()}`
    );
  };
  const handleScrollLeft = () => {
    ref_nfts.current.scrollTo({
      left: ref_nfts.current.scrollLeft + 200,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    ref_nfts.current.scrollTo({
      left: ref_nfts.current.scrollLeft - 200,
      behavior: "smooth",
    });
  };

  const handleScrollLeft_ = () => {
    ref_requests.current.scrollTo({
      left: ref_requests.current.scrollLeft + 200,
      behavior: "smooth",
    });
  };

  const handleScrollRight_ = () => {
    ref_requests.current.scrollTo({
      left: ref_requests.current.scrollLeft - 200,
      behavior: "smooth",
    });
  };

  const getProfile = async (address, profiles) => {
    if (profiles[address] || profiles[address] === false) return;
    const profile = await getProfileFromWallet(address);
    profiles[address] = profile;
  };

  const parseAction = (action) => {
    switch (action) {
      case "finalize_short_term_rental":
        return (
          <div className="flex items-center">
            <div className="text-[#38A569]">Completed</div>
          </div>
        );
        break;
      case "set_reservation_for_short_term":
        return (
          <div className="flex items-center">
            <div className="text-[#38A569]">Reserved</div>
          </div>
        );
        break;
      case "cancel_reservation_for_shortterm":
        return (
          <div className="flex items-center">
            <div className="text-[#DB1F22]">Canceled</div>
          </div>
        );
        break;

      case "cancel_rental_for_shortterm":
        return (
          <div className="flex items-center">
            <div className="text-[#DB1F22]">Canceled</div>
          </div>
        );
        break;

      case "reject_reservation_for_shortterm":
        return (
          <div className="flex items-center">
            <div className="text-[#DB1F22]">Rejected</div>
          </div>
        );
        break;
      default:
        break;
    }
  };

  const getProfiles = async () => {
    let tempProfiles = {};
    for (let i = 0; i < notificationContent.length; i++) {
      if (notificationContent[i].type === "message") {
        getProfile(notificationContent[i].data.message.sender, tempProfiles);
      } else {
        getProfile(notificationContent[i].data.sender, tempProfiles);
      }
    }
    setProfiles(tempProfiles);
  };

  useEffect(() => {
    getProfiles();
  }, [notificationContent]);

  return (
    <div className="select-none w-full overflow-auto max-h-[calc(100vh-80px)] h-full p-[10px]">
      <div className="w-full h-full space-y-[20px] rounded-[10px] p-[8px] flex flex-col">
        <div className="bg-white border-[2px] h-max border-[#E3E3E3] p-[24px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          <div className="font-semibold text-[24px]">Dashboard</div>
          <div className="text-[#666666] font-normal">
            Welcome to the CodedEstate Dashboard
          </div>
        </div>
        <div className="flex gap-[20px] px-[10px] w-full min-h-[240px]">
          <div className="min-w-[300px] h-full flex flex-col space-y-[10px]">
            <div className="font-semibold">Verify NFTs</div>
            <div className="bg-white flex flex-col justify-around p-2 items-center border-[2px] h-full w-full border-[#E3E3E3] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              {currentProfile?.Avatar ? (
                <img
                  alt=""
                  src={currentProfile?.Avatar}
                  className="w-[80px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                />
              ) : (
                <VerifyUserIcon />
              )}
              {currentProfile?.Name ? (
                <div className="font-semibold">
                  {currentProfile?.Name?.replace("/", " ")}
                </div>
              ) : (
                <div className="font-semibold">Unknown</div>
              )}

              {currentProfile?.ID?.split("/").some(
                (item) => item !== "true" && item !== ""
              ) ? (
                <div className="flex items-center">
                  <svg
                    className="w-[40px]"
                    width="47"
                    height="46"
                    viewBox="0 0 47 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_dd_559_33145)">
                      <rect
                        x="11.5"
                        y="11"
                        width="24"
                        height="24"
                        rx="12"
                        fill="#5B1DEE"
                      />
                      <rect
                        x="11.5"
                        y="11"
                        width="24"
                        height="24"
                        rx="12"
                        fill="url(#paint0_linear_559_33145)"
                        fill-opacity="0.18"
                      />
                      <g clip-path="url(#clip0_559_33145)">
                        <g filter="url(#filter1_d_559_33145)">
                          <path
                            d="M27.8258 22.259C27.6396 22.0838 27.4471 21.9033 27.3695 21.7398C27.2978 21.5901 27.2808 21.3366 27.2642 21.091C27.2332 20.6345 27.1986 20.1172 26.8197 19.776C26.4409 19.4349 25.9228 19.4546 25.4655 19.4715C25.2196 19.4806 24.9657 19.4902 24.8093 19.4346C24.639 19.3745 24.4389 19.2019 24.2453 19.0351C23.906 18.7417 23.5206 18.4093 23.0319 18.435C22.5432 18.4606 22.1951 18.8313 21.8879 19.1586C21.7127 19.3448 21.5322 19.5373 21.3687 19.6149C21.2199 19.6865 20.9654 19.7036 20.7199 19.7202C20.2634 19.7512 19.746 19.7858 19.4049 20.1646C19.0638 20.5435 19.0858 21.0615 19.1004 21.5188C19.1095 21.7648 19.1191 22.0187 19.0634 22.1751C19.0033 22.3454 18.8308 22.5455 18.664 22.7391C18.3705 23.0784 18.0382 23.4638 18.0638 23.9525C18.0894 24.4412 18.4602 24.7893 18.7875 25.0965C18.9736 25.2717 19.1662 25.4522 19.2437 25.6157C19.3154 25.7654 19.3325 26.019 19.3491 26.2645C19.3801 26.721 19.4147 27.2384 19.7935 27.5795C20.1724 27.9206 20.6905 27.9009 21.1477 27.884C21.3937 27.8749 21.6476 27.8653 21.804 27.921C21.9742 27.981 22.1743 28.1536 22.368 28.3204C22.7073 28.6139 23.0927 28.9462 23.5814 28.9206C24.0701 28.895 24.4182 28.5242 24.7254 28.1969C24.9006 28.0107 25.0811 27.8182 25.2446 27.7407C25.3943 27.669 25.6478 27.6519 25.8934 27.6353C26.3499 27.6043 26.8672 27.5697 27.2083 27.1909C27.5494 26.812 27.5298 26.2939 27.5129 25.8367C27.5037 25.5907 27.4942 25.3368 27.5498 25.1804C27.6099 25.0101 27.7825 24.8101 27.9493 24.6164C28.2427 24.2771 28.575 23.8917 28.5494 23.403C28.5238 22.9143 28.1531 22.5662 27.8258 22.259ZM25.399 22.7072L22.915 25.466C22.882 25.5027 22.8422 25.5324 22.7977 25.5537C22.7532 25.5749 22.705 25.5872 22.6558 25.5897C22.6066 25.5923 22.5574 25.5852 22.5109 25.5687C22.4645 25.5522 22.4217 25.5268 22.3851 25.4938L21.2028 24.4292C21.1288 24.3626 21.0843 24.2694 21.0791 24.17C21.0739 24.0706 21.1084 23.9733 21.175 23.8993C21.2416 23.8254 21.3348 23.7809 21.4342 23.7757C21.5336 23.7705 21.6309 23.805 21.7049 23.8715L22.6084 24.6855L24.8413 22.2051C24.8743 22.1685 24.9142 22.1387 24.9587 22.1175C25.0031 22.0963 25.0513 22.0841 25.1005 22.0815C25.1498 22.0789 25.199 22.086 25.2454 22.1025C25.2919 22.1189 25.3346 22.1444 25.3712 22.1773C25.4079 22.2103 25.4376 22.2502 25.4588 22.2946C25.4801 22.3391 25.4923 22.3873 25.4949 22.4365C25.4975 22.4857 25.4903 22.535 25.4739 22.5814C25.4574 22.6279 25.432 22.6706 25.399 22.7072Z"
                            fill="white"
                          />
                          <path
                            d="M27.7231 22.3684L27.723 22.3682L27.7169 22.3625C27.6265 22.2775 27.5303 22.1869 27.4469 22.097C27.3628 22.0063 27.2827 21.9068 27.234 21.8041L27.3695 21.7398M27.7231 22.3684L27.2641 21.0892C27.2331 20.6331 27.1981 20.1167 26.8197 19.776C26.4414 19.4354 25.9241 19.4545 25.4673 19.4714L25.4655 19.4715L25.4641 19.4716C25.2186 19.4807 24.9654 19.4901 24.8093 19.4346C24.6395 19.3746 24.4401 19.2029 24.2469 19.0365L24.2453 19.0351C23.906 18.7417 23.5206 18.4093 23.0319 18.435C22.5432 18.4606 22.1951 18.8313 21.8879 19.1586L21.8838 19.1629C21.7099 19.3477 21.5309 19.5379 21.3687 19.6149C21.2202 19.6863 20.9665 19.7035 20.7215 19.7201L20.7199 19.7202M27.7231 22.3684C28.0608 22.6853 28.3777 22.9927 28.3996 23.4108C28.4216 23.829 28.1384 24.1684 27.8359 24.5183L27.8356 24.5185L27.8324 24.5222C27.7507 24.6171 27.6637 24.7182 27.5895 24.8173C27.5154 24.9162 27.4463 25.0233 27.4085 25.1301C27.3726 25.2311 27.3607 25.3528 27.3571 25.4704C27.3536 25.5889 27.3584 25.7175 27.3628 25.8381L27.363 25.8422C27.3804 26.313 27.3905 26.7644 27.0969 27.0905C26.8032 27.4166 26.3533 27.4538 25.8832 27.4856L25.8791 27.4859C25.7587 27.4941 25.6303 27.5028 25.5129 27.5187C25.3963 27.5345 25.2764 27.5591 25.1798 27.6054L25.2446 27.7407M27.7231 22.3684L18.664 22.7391L18.6654 22.7375C18.8318 22.5443 19.0035 22.3449 19.0634 22.1751C19.119 22.019 19.1095 21.7658 19.1004 21.5203L19.1004 21.5188M27.3695 21.7398L27.2342 21.8046C27.188 21.7079 27.1634 21.5881 27.1476 21.4715C27.1316 21.3541 27.1229 21.2256 27.1148 21.1053L27.1145 21.1011C27.0826 20.6311 27.0455 20.1812 26.7194 19.8875C26.3932 19.5939 25.9419 19.604 25.4711 19.6214L25.4669 19.6216C25.3464 19.626 25.2177 19.6308 25.0993 19.6273C24.9817 19.6237 24.8601 19.6118 24.7592 19.5759M27.3695 21.7398C27.4465 21.9021 27.6367 22.081 27.8215 22.255L27.8258 22.259L27.3695 21.7398ZM24.7592 19.5759C24.7591 19.5759 24.7591 19.5759 24.759 19.5759L24.8093 19.4346L24.7594 19.576C24.7593 19.576 24.7592 19.576 24.7592 19.5759ZM24.7592 19.5759C24.6523 19.5382 24.5452 19.469 24.4462 19.3949C24.3471 19.3207 24.2459 19.2336 24.1511 19.1519L24.1474 19.1487L24.1471 19.1485C23.7973 18.8459 23.4579 18.5628 23.0397 18.5847C22.6216 18.6067 22.3142 18.9236 21.9972 19.2613L21.9971 19.2614L21.9914 19.2675C21.9063 19.3579 21.8158 19.4541 21.7259 19.5375C21.6351 19.6216 21.5357 19.7016 21.433 19.7504L21.3687 19.6149L21.4338 19.75C21.3374 19.7964 21.2173 19.821 21.1007 19.8368C20.9833 19.8527 20.8547 19.8614 20.7344 19.8696L20.73 19.8699M20.73 19.8699L20.7199 19.7202M20.73 19.8699C20.26 19.9018 19.81 19.9389 19.5164 20.265C19.2228 20.591 19.2352 21.0414 19.2503 21.5137L19.2503 21.5133L19.1004 21.5188M20.73 19.8699L20.73 19.8699L20.7199 19.7202M20.7199 19.7202L20.7181 19.7203C20.262 19.7513 19.7456 19.7863 19.4049 20.1646C19.0689 20.5378 19.0852 21.046 19.0997 21.4982C19.0999 21.5051 19.1002 21.512 19.1004 21.5188M19.1004 21.5188L19.2503 21.5141L19.2504 21.5175C19.2549 21.638 19.2597 21.7667 19.2561 21.8851C19.2526 22.0027 19.2407 22.1243 19.2048 22.2253M19.2048 22.2253C19.2048 22.2252 19.2048 22.2251 19.2049 22.225L19.0634 22.1751L19.2047 22.2254C19.2048 22.2253 19.2048 22.2253 19.2048 22.2253ZM19.2048 22.2253C19.167 22.3321 19.0979 22.4392 19.0238 22.5382C18.9496 22.6373 18.8625 22.7385 18.7808 22.8333L18.7776 22.837L18.7774 22.8373C18.4748 23.1871 18.1917 23.5265 18.2136 23.9447C18.2355 24.3628 18.5525 24.6702 18.8902 24.9872L18.8903 24.9873L18.8964 24.993C18.9867 25.078 19.083 25.1686 19.1663 25.2585C19.2504 25.3492 19.3304 25.4485 19.3792 25.5512C19.4253 25.6478 19.4499 25.7675 19.4657 25.884C19.4816 26.0014 19.4903 26.1298 19.4985 26.2502L19.4987 26.2544C19.5306 26.7244 19.5678 27.1743 19.8939 27.468C20.22 27.7616 20.6714 27.7515 21.1422 27.7341L21.1463 27.734C21.2669 27.7295 21.3955 27.7247 21.5139 27.7283C21.6316 27.7318 21.7533 27.7437 21.8543 27.7796C21.9611 27.8174 22.0682 27.8865 22.1671 27.9606C22.2662 28.0348 22.3673 28.1219 22.4622 28.2036L22.4659 28.2068L22.4661 28.207C22.816 28.5096 23.1554 28.7927 23.5735 28.7708C23.9917 28.7489 24.2991 28.4319 24.616 28.0942L24.6162 28.0941L24.6219 28.088C24.7069 27.9976 24.7975 27.9014 24.8874 27.8181C24.9781 27.7339 25.0775 27.6539 25.1803 27.6051L25.2446 27.7407M25.2446 27.7407C25.394 27.6691 25.6468 27.652 25.892 27.6354L25.8934 27.6353L21.1492 27.884C21.3947 27.8748 21.6479 27.8654 21.804 27.921C21.9738 27.9809 22.1732 28.1526 22.3663 28.319L22.368 28.3204C22.7073 28.6139 23.0927 28.9462 23.5814 28.9206C24.0701 28.895 24.4182 28.5242 24.7254 28.1969L24.7294 28.1926C24.9034 28.0078 25.0823 27.8176 25.2446 27.7407ZM21.8053 23.7601L21.8053 23.7601C21.7017 23.6669 21.5654 23.6186 21.4263 23.6259C21.2872 23.6332 21.1567 23.6954 21.0635 23.7989C20.9703 23.9025 20.922 24.0388 20.9293 24.1779C20.9366 24.317 20.9989 24.4475 21.1024 24.5407L22.2847 25.6052C22.2847 25.6052 22.2847 25.6052 22.2847 25.6053C22.336 25.6514 22.3958 25.687 22.4608 25.7101C22.5258 25.7331 22.5948 25.7431 22.6637 25.7395C22.7326 25.7359 22.8001 25.7188 22.8623 25.689C22.9246 25.6593 22.9803 25.6177 23.0265 25.5664C23.0265 25.5664 23.0265 25.5663 23.0265 25.5663L25.5105 22.8076C25.5566 22.7563 25.5922 22.6965 25.6153 22.6315C25.6383 22.5665 25.6483 22.4976 25.6447 22.4287C25.6411 22.3598 25.6239 22.2923 25.5942 22.2301C25.5645 22.1678 25.5229 22.112 25.4716 22.0659C25.4204 22.0197 25.3605 21.9841 25.2955 21.9611C25.2305 21.9381 25.1616 21.9281 25.0927 21.9317C25.0238 21.9353 24.9563 21.9524 24.8941 21.9821C24.8318 22.0118 24.776 22.0535 24.7299 22.1047L24.7299 22.1047L22.5973 24.4736L21.8053 23.7601Z"
                            stroke="#202020"
                            stroke-width="0.3"
                          />
                        </g>
                      </g>
                    </g>
                    <defs>
                      <filter
                        id="filter0_dd_559_33145"
                        x="0.833331"
                        y="0.333331"
                        width="45.3333"
                        height="45.3333"
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
                        <feOffset dx="2.66667" dy="2.66667" />
                        <feGaussianBlur stdDeviation="4" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_559_33145"
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
                          in2="effect1_dropShadow_559_33145"
                          result="effect2_dropShadow_559_33145"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect2_dropShadow_559_33145"
                          result="shape"
                        />
                      </filter>
                      <filter
                        id="filter1_d_559_33145"
                        x="18.0625"
                        y="18.4336"
                        width="11.4883"
                        height="11.4884"
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
                        <feOffset dx="1" dy="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_559_33145"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_559_33145"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_559_33145"
                        x1="23.5"
                        y1="11"
                        x2="23.5"
                        y2="26.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                      <clipPath id="clip0_559_33145">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          transform="translate(17 18) rotate(-3)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="text-[#959595] font-normal text-[14px]">
                    Verified Account
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-[10px]">
                  <UnVerified />
                  <div className="text-[#959595] font-normal text-[14px]">
                    Unverified Account
                  </div>
                </div>
              )}
              {currentProfile?.ID?.split("/").some(
                (item) => item !== "true" && item !== ""
              ) ? (
                <div className="w-full">
                  <PurpleButton
                    text={
                      <div
                        onClick={() => navigate("/dashboard/profile?mode=host")}
                        className="w-full text-center"
                      >
                        Your Profile
                      </div>
                    }
                  />
                </div>
              ) : (
                <div className="w-full">
                  <BlackButton
                    text={
                      <div
                        onClick={() => navigate("/dashboard/profile?mode=host")}
                        className="w-full text-center"
                      >
                        Verify now
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="relative w-max max-w-[calc(50vw-500px)] h-full flex flex-col space-y-[10px]">
            <div className="font-semibold">Your Minted NFTs</div>
            <div className="w-full h-full bg-white p-2 border-[2px] border-[#E3E3E3] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div
                ref={ref_nfts}
                className="pb-1 flex gap-[10px] items-center overflow-auto scrollbarwidth w-full"
              >
                {myNfts.map((nft, i) => {
                  return (
                    <Fade key={i}>
                      <div className="w-max h-max relative group">
                        <RentalItem
                          showArrow={false}
                          token_id={nft.token_id}
                          imageHeight={200}
                          onlyImages
                        />

                        <div className="group-hover:flex absolute top-0 left-0 w-full h-full hidden flex-col items-center justify-center">
                          <BlackButton
                            text="View"
                            onClick={() =>
                              navigate(
                                "/dashboard/host/nfts" + `/${nft.token_id}`
                              )
                            }
                          />
                        </div>
                      </div>
                    </Fade>
                  );
                })}
              </div>

              {myNfts.length === 0 && (
                <div className="flex flex-col justify-center items-center h-full w-full px-[100px] text-center">
                  <EmptyProperty />
                  <div className="font-semibold">
                    You have no properties yet
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="relative h-full max-w-[calc(50vw-200px)] w-max flex flex-col space-y-[10px]">
            <div className="font-semibold">Booking request</div>

            <div
              ref={ref_requests}
              className="border-[2px] border-[#E3E3E3] h-full bg-white p-2 top-0 overflow-auto w-full rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
            >
              <div className="w-full min-w-[calc(50vw-240px)] justify-between flex items-center gap-4">
                <SelectionGroup
                  defaultItem={flag}
                  className="border-[2px] border-[#e3e3e3] w-max px-[6px] py-[4px] gap-[8px] flex items-center rounded-[14px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                >
                  <SelectionItem
                    SelectedItem={
                      <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                        <div className="text-black font-semibold">Upcoming</div>
                        <LightIcon />
                      </div>
                    }
                    UnselectedItem={
                      <div
                        onClick={() => setFlag(0)}
                        className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                      >
                        <div className="text-[#959595]">Upcoming</div>
                      </div>
                    }
                  />
                  <SelectionItem
                    SelectedItem={
                      <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                        <div className="text-black font-semibold">Current</div>
                        <LightIcon />
                      </div>
                    }
                    UnselectedItem={
                      <div
                        onClick={() => setFlag(1)}
                        className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                      >
                        <div className="text-[#959595]">Current</div>
                      </div>
                    }
                  />
                  <SelectionItem
                    SelectedItem={
                      <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                        <div className="text-black font-semibold">
                          Completed
                        </div>
                        <LightIcon />
                      </div>
                    }
                    UnselectedItem={
                      <div
                        onClick={() => setFlag(2)}
                        className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                      >
                        <div className="text-[#959595]">Completed</div>
                      </div>
                    }
                  />
                  <SelectionItem
                    SelectedItem={
                      <div className="py-[4px] cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                        <div className="text-black font-semibold">
                          Cancelled
                        </div>
                        <LightIcon />
                      </div>
                    }
                    UnselectedItem={
                      <div
                        onClick={() => setFlag(3)}
                        className="py-[4px] cursor-pointer hover:bg-[#f6f6f6] rounded-[10px] w-[120px] flex justify-center"
                      >
                        <div className="text-[#959595]">Cancelled</div>
                      </div>
                    }
                  />
                </SelectionGroup>

                {/* <div className="flex gap-[10px] items-center border-[#E3E3E3] border-[1px] rounded-[12px] pl-[16px] pr-[8px] py-[9px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
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
                </div> */}
              </div>
              <div className="flex gap-2 items-center mt-1 pb-1 w-full overflow-auto scrollbarwidth">
                {Object.values(nfts).map((nft, i) => {
                  if (
                    nft.access.owner === account &&
                    nft.rentals.rentals.length
                  ) {
                    return nft.rentals.rentals.map((reservation, j) => {
                      if (
                        (reservation.cancelled && flag === 3) ||
                        (!reservation.cancelled &&
                          new Date().getTime() / 1000 <
                            reservation.renting_period[0] - diffToUTC &&
                          flag === 0) ||
                        (!reservation.cancelled &&
                          new Date().getTime() / 1000 >
                            reservation.renting_period[0] - diffToUTC &&
                          flag === 1 &&
                          new Date().getTime() / 1000 <
                            reservation.renting_period[1] - diffToUTC &&
                          flag === 1) ||
                        (!reservation.cancelled &&
                          new Date().getTime() / 1000 >
                            reservation.renting_period[1] - diffToUTC &&
                          flag === 2)
                      ) {
                        flags[flag] = true;

                        return (
                          <Fade>
                            <div className="w-max h-max relative group">
                              <RentalItem
                                traveler={reservation.address}
                                rentingPeriod={reservation.renting_period}
                                token_id={nft.token_id}
                                onlyImages
                                imageHeight={153}
                              />
                              <div className="group-hover:flex absolute top-0 left-0 w-full h-full hidden flex-col items-center justify-center">
                                <BlackButton
                                  text="View all"
                                  onClick={() =>
                                    setPeriodParams(
                                      nft.token_id,
                                      reservation.renting_period[0],
                                      reservation.renting_period[1]
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </Fade>
                        );
                      } else
                        return (
                          <>
                            {!flags[flag] &&
                              j === nft.rentals.rentals.length - 1 &&
                              i === Object.values(nfts).length - 1 && (
                                <div className="flex flex-col items-center w-full justify-center h-full">
                                  <EmptyBooking />
                                  <div>No reservations yet</div>
                                  <div className="text-[#737373]">
                                    No upcoming reservations yet
                                  </div>
                                </div>
                              )}
                          </>
                        );
                    });
                  } else
                    return (
                      <>
                        {!flags[flag] &&
                          i === Object.values(nfts).length - 1 && (
                            <div className="flex flex-col items-center w-full justify-center h-full">
                              <EmptyBooking />
                              <div>No reservations yet</div>
                              <div className="text-[#737373]">
                                No upcoming reservations yet
                              </div>
                            </div>
                          )}
                      </>
                    );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[20px] px-[10px] w-full min-h-[300px]">
          <div className="min-w-[40%] h-full flex flex-col space-y-[10px]">
            <div className="font-semibold">Mint Your Real Estate NFT</div>
            <div className="bg-white flex flex-col justify-around items-center border-[2px] h-full w-full border-[#E3E3E3] p-[24px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <EmptyNft />
              {myNfts.length === 0 && (
                <div className="flex flex-col items-center">
                  <div className="font-semibold">No NFT's minted yet</div>
                  <div className="text-[#959595] font-normal text-[14px]">
                    Your NFT minted is empty yet
                  </div>
                </div>
              )}

              <PurpleButton
                text={
                  <div
                    onClick={() => {
                      // if (currentProfile.ID === "" || !currentProfile.ID) {
                      //   toast.error(
                      //     "Please upload your profile to mint new NFT!"
                      //   );
                      //   return;
                      // }
                      navigate("/dashboard/host/mint");
                    }}
                    className="min-w-[100px] text-center"
                  >
                    Mint
                  </div>
                }
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col space-y-[10px]">
            <div className="font-semibold">Notifications</div>

            {notificationContent.length > 0 ? (
              <div className="bg-white space-y-[4px] border-[2px] h-full w-full overflow-auto border-[#E3E3E3] p-[8px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] scrollbarwidth">
                {notificationContent
                  .slice()
                  .reverse()
                  .map((item, i) => {
                    if (item.type === "event")
                      return (
                        <div
                          onClick={() => {
                            if (
                              nfts[item.data.token_id]?.access.owner === account
                            )
                              navigate(`/dashboard/host/transactions`);
                            else navigate(`/dashboard/traveler/transactions`);
                          }}
                          className="hover:bg-[#f0f0f0] rounded-[4px] cursor-pointer p-[6px] w-full flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {profiles[item.data.sender]?.Avatar ? (
                              <img
                                alt=""
                                src={profiles[item.data.sender]?.Avatar}
                                className="w-[44px] h-[44px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                              />
                            ) : (
                              <div className="w-[44px] h-[44px] flex bg-[#f0f0f0] rounded-full">
                                <UserBoxIcon className="m-auto" />
                              </div>
                            )}

                            <div>
                              <div>
                                {profiles[item.data.sender]?.Name
                                  ? profiles[item.data.sender]?.Name?.replace(
                                      "/",
                                      " "
                                    )
                                  : truncateWalletAddress(item.data.sender)}
                              </div>
                              <div className="flex gap-2 w-[200px] truncate">
                                <span className="font-semibold">
                                  {parseAction(item.data.action)}
                                </span>
                                <span className="truncate">
                                  {
                                    nfts[item.data.token_id]?.metaData
                                      .buildingName
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <img
                              alt=""
                              src={nfts[item.data.token_id]?.metaData.images[0]}
                              className="w-[60px] h-full rounded-[4px]"
                            />
                            <div>
                              <div className="text-[12px] text-end">
                                {new Intl.DateTimeFormat("en-US", {
                                  day: "numeric",
                                  month: "short",
                                }).format(
                                  (Math.round(
                                    new Date(item.data.timeUTC).getTime() / 1000
                                  ) -
                                    diff) *
                                    1000
                                )}
                              </div>
                              <div className="text-[12px] text-end">
                                {new Intl.DateTimeFormat("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }).format(
                                  (Math.round(
                                    new Date(item.data.timeUTC).getTime() / 1000
                                  ) -
                                    diff) *
                                    1000
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    else
                      return (
                        <div
                          onClick={() => {
                            if (nfts[item.data.nftId]?.access.owner === account)
                              navigate(
                                `/dashboard/host/inbox?chat=${item.data.id}`
                              );
                            else
                              navigate(
                                `/dashboard/traveler/inbox?chat=${item.data.id}`
                              );
                          }}
                          className="hover:bg-[#f0f0f0] rounded-[4px] cursor-pointer p-[6px] w-full flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {profiles[item.data.message.sender]?.Avatar ? (
                              <img
                                alt=""
                                src={profiles[item.data.message.sender]?.Avatar}
                                className="w-[44px] h-[44px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                              />
                            ) : (
                              <div className="w-[44px] h-[44px] flex bg-[#f0f0f0] rounded-full">
                                <UserBoxIcon className="m-auto" />
                              </div>
                            )}

                            <div>
                              <div>
                                {profiles[item.data.message.sender]?.Name
                                  ? profiles[
                                      item.data.message.sender
                                    ]?.Name?.replace("/", " ")
                                  : truncateWalletAddress(
                                      item.data.message.sender
                                    )}
                              </div>

                              <div className="flex gap-2 w-[200px] truncate">
                                <span className="truncate">
                                  Sent new message
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <img
                              alt=""
                              src={nfts[item.data.nftId]?.metaData.images[0]}
                              className="w-[60px] h-full rounded-[4px]"
                            />
                            <div>
                              <div className="text-[12px] text-end">
                                {new Intl.DateTimeFormat("en-US", {
                                  day: "numeric",
                                  month: "short",
                                }).format(
                                  (Math.round(
                                    new Date(
                                      item.data.message.generatedTime
                                    ).getTime() / 1000
                                  ) -
                                    diff) *
                                    1000
                                )}
                              </div>
                              <div className="text-[12px] text-end">
                                {new Intl.DateTimeFormat("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                }).format(
                                  (Math.round(
                                    new Date(
                                      item.data.message.generatedTime
                                    ).getTime() / 1000
                                  ) -
                                    diff) *
                                    1000
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                  })}
              </div>
            ) : (
              <div className="bg-white flex flex-col justify-around items-center border-[2px] h-full w-full border-[#E3E3E3] p-[24px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <EmptyInbox />
                <div className="flex flex-col items-center">
                  <div className="font-semibold">No notifications yet</div>
                  <div className="text-[#959595] font-normal text-[14px]">
                    Your inbox is empty yet
                  </div>
                </div>
                <PurpleButton
                  text={<div className="min-w-[100px] text-center">Inbox</div>}
                  onClick={() => navigate("/dashboard/host/inbox")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

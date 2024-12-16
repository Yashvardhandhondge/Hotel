import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowToLeft,
  CameraIcon,
  EmptyBooking,
  EmptyNft,
  UnVerified,
  VerifyUserIcon,
} from "../../../AssetComponents/Images";
import { PurpleButton } from "../../../Components/Buttons/PurpleButton";
import { BlackButton } from "../../../Components/Buttons/BlackButton";
import { Review } from "../../../Components/Review/Review";
import { useEffect, useRef, useState } from "react";
import Modal from "react-responsive-modal";
import AvatarEditor from "react-avatar-editor";
import InputSlider from "react-input-slider";
import { ReclaimZKP } from "../../../Components/ReclaimZKP/Reclaim";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setAuthToken } from "../../../Components/functions/Api";
import { setCurrentProfile } from "../../../Layouts/DashboardLayouts";
import { getProfileFromWallet } from "../../../Components/functions/Functions";
import imageCompression from "browser-image-compression";
import { RentalItem } from "../../../Components/RealEstateProperty/RentalItem";
import { Fade } from "react-awesome-reveal";

async function compressImage(imageFile) {
  // const imageFile = event.target.files[0];
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 130,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    return compressedFile;
    // await uploadToServer(compressedFile); // write your own logic
  } catch (error) {
    console.log(error);
  }
}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

const CropperModal = ({
  src,
  modalOpen,
  setModalOpen,
  setPreview,
  setFile,
}) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);
  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);

      const blob = await result.blob();
      const compressed = await compressImage(blob);
      // setFile(result.url);
      blobToDataURL(compressed, function (dataurl) {
        setFile(dataurl);
      });

      // setPreview(URL.createObjectURL(blob));
      setPreview(URL.createObjectURL(compressed));
      setModalOpen(false);
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      center
      classNames={{
        modal:
          "min-w-[300px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
      }}
    >
      <div className="p-[16px] w-[360px]">
        <div className="mx-auto text-center my-[20px] text-[20px] font-semibold">
          Crop your avatar
        </div>
        <AvatarEditor
          ref={cropRef}
          image={src}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
          className="mx-auto rounded-[16px]"
        />

        <div className="my-[20px] flex justify-center">
          <InputSlider
            styles={{
              track: {
                height: "5px",
                background: "#e9ecef",
              },
              active: {
                background: "#5b1dee",
              },
            }}
            xmin={10}
            xmax={50}
            x={slideValue}
            axis="x"
            onChange={({ x }) => setSlideValue(x)}
          />
        </div>
        <div className="grid grid-cols-2 gap-[20px]">
          <PurpleButton text="Save" onClick={handleSave} />
          <BlackButton text="Cancel" onClick={(e) => setModalOpen(false)} />
        </div>
      </div>
    </Modal>
  );
};

export const Profile = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [src, setSrc] = useState(null);
  const nfts = useSelector((state) => state.nft.nfts);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const [mode, setMode] = useState();
  const currentProfile = useSelector((state) => state.auth.profile);
  const account = useSelector((state) => state.auth.account);
  const [profile, setProfile] = useState({
    avatar: currentProfile?.Avatar,
    firstName: currentProfile?.Name?.split("/")[0] || "",
    lastName: currentProfile?.Name?.split("/")[1] || "",
    ID: currentProfile?.ID || "",
    email: currentProfile?.Email || "",
    company: currentProfile?.Company || "",
    bio: currentProfile?.Bio || "",
    review: currentProfile?.Review,
  });
  const dispatch = useDispatch();
  const handleImgChange = (e) => {
    try {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("mode")) setMode(searchParams.get("mode"));
  }, [location.search]);

  useEffect(() => {
    const nfts_ = Object.values(nfts);
    const temp = [];
    for (let i = 0; i < nfts_.length; i++) {
      if (nfts_[i].access.owner === account && nfts_[i].short.islisted)
        temp.push(nfts_[i]);
    }
    setListings(temp);
  }, [nfts]);

  function generateRandom8DigitInteger() {
    return Math.floor(10000000 + Math.random() * 90000000);
  }

  const submitChanges = async () => {
    if (
      !profile.avatar ||
      !profile.firstName ||
      !profile.lastName ||
      // !profile.ID ||
      !profile.email
    ) {
      toast.error("You missed necessary fields.");
      return;
    }

    toast.loading("Uploading your profile..");
    let data = new FormData();
    data.append("walletAddress", account);
    data.append("Avatar", profile.avatar);
    data.append("Bio", profile.bio);
    data.append("Name", profile.firstName + "/" + profile.lastName);
    data.append("Company", profile.company);
    // data.append("ID", profile.ID);
    data.append("ID", generateRandom8DigitInteger().toString());
    data.append("Email", profile.email);
    const res = (
      await axios.post(
        process.env.REACT_APP_BACKEND_SERVER + "profile/uploadProfile",
        data,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            accept: "application/json",
            Authorization: setAuthToken({ name: "Avatar" }),
          },
        }
      )
    ).data;
    if (res) {
      toast.dismiss();
      await setCurrentProfile(account, dispatch);
      toast.success("Changes are saved!", {
        autoClose: 2000,
      });
    }
  };

  const getCustomProfile = async (address) => {
    const res = await getProfileFromWallet(address);
    setProfile({
      avatar: res?.Avatar,
      firstName: res?.Name?.split("/")[0] || "",
      lastName: res?.Name?.split("/")[1] || "",
      ID: res?.ID || "",
      email: res?.Email || "",
      company: res?.Company || "",
      bio: res?.Bio || "",
      review: res?.Reviews || [],
    });
  };

  useEffect(() => {
    if (params.address) getCustomProfile(params.address);
  }, [params.address]);

  useEffect(() => {
    console.log(profile.ID);
  }, [profile.ID]);

  return (
    <div className="w-full h-[calc(100vh-120px)] overflow-auto">
      <div className="space-y-[20px] w-[80vw] my-[20px] mx-auto max-w-[800px]">
        <Fade cascade>
          <div className="flex items-center gap-[10px]">
            <div
              onClick={() => navigate(-1)}
              className="bg-white cursor-pointer hover:translate-x-[-4px] hover:bg-[#f6f6f6] p-[4px] w-max rounded-full shadow-[-2px_-2px_6px_0px_rgba(253,255,255,0.80),2px_2px_6px_0px_rgba(187,195,206,0.60)]"
            >
              <ArrowToLeft />
            </div>
            {!params.address && (
              <div className="text-[20px] font-semibold">Your profile</div>
            )}
          </div>
          <div className="mt-[20px] flex gap-[100px] w-full justify-between items-start">
            <div className="w-max flex items-center flex-col">
              {preview || profile?.avatar ? (
                <img
                  alt=""
                  src={preview || profile?.avatar}
                  className="w-[130px] rounded-full shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                />
              ) : (
                <VerifyUserIcon className="w-[130px]" />
              )}

              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImgChange}
                hidden
              />

              <CropperModal
                modalOpen={modalOpen}
                src={src}
                setPreview={setPreview}
                setModalOpen={setModalOpen}
                setFile={(value) => setProfile({ ...profile, avatar: value })}
              />

              <div
                hidden={params.address}
                onClick={handleInputClick}
                className="mt-[-10px] hover:translate-y-[-4px] mb-[30px] px-[6px] py-[2px] rounded-[12px] bg-gradient-to-b from-[#5b1deec0] from-0% to-70% to-[#5b1dee] text-white cursor-pointer shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              >
                <div className="flex items-center gap-[4px]">
                  <CameraIcon />
                  <div className="font-normal">Upload</div>
                </div>
              </div>
              {(currentProfile?.ID?.split("/").some(
                (item) => item === "true"
              ) &&
                mode === "traveler") ||
              (profile.ID?.split("/").some((item) => item === "true") &&
                mode === "traveler") ||
              (currentProfile?.ID?.split("/").some(
                (item) => item !== "true" && item !== ""
              ) &&
                mode === "host") ||
              (profile.ID?.split("/").some(
                (item) => item !== "true" && item !== ""
              ) &&
                mode === "host") ||
              (profile.ID && !mode) ? (
                <div className="w-max flex items-center">
                  <svg
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

                  <div className="">Verified Account</div>
                </div>
              ) : (
                <div className="w-max flex items-center gap-[10px]">
                  <UnVerified />
                  <div className="">Unverified Account</div>
                </div>
              )}
            </div>
            <div className="w-full space-y-[20px]">
              <div className="w-full gap-[20px] grid grid-cols-2">
                <div className="w-full space-y-[10px]">
                  <div className="font-semibold">First name</div>
                  <div className="bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <input
                      disabled={params.address}
                      className="outline-none w-full"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="w-full space-y-[10px]">
                  <div className="font-semibold">Last name</div>
                  <div className="bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <input
                      disabled={params.address}
                      className="outline-none w-full"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-[20px]" hidden={params.address}>
                {mode !== "traveler" && (
                  <div className="w-full space-y-[10px]" hidden>
                    <div className="font-semibold">ID</div>
                    <div className="bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <input
                        className="outline-none w-full"
                        value={profile.ID}
                        disabled
                      />
                    </div>
                  </div>
                )}

                {mode === "traveler" && (
                  <div className="text-[#7E7E7E]">
                    Use one of following ZKP providers which you are ready to
                    verify your Identity
                  </div>
                )}

                <div className="flex justify-end gap-3 flex-wrap">
                  {mode === "host" && (
                    <ReclaimZKP
                      txt={"Verify Emirates ID"}
                      setReturn={(value) =>
                        setProfile({ ...profile, ID: profile.ID + "/" + value })
                      }
                    />
                  )}
                  {mode === "traveler" && (
                    <>
                      <ReclaimZKP
                        providerId={2}
                        txt={"Coinbase KYC"}
                        setReturn={(value) =>
                          setProfile({
                            ...profile,
                            ID: profile.ID + "/" + value,
                          })
                        }
                      />
                      <ReclaimZKP
                        providerId={3}
                        txt={"Binance KYC"}
                        setReturn={(value) =>
                          setProfile({
                            ...profile,
                            ID: profile.ID + "/" + value,
                          })
                        }
                      />
                      <ReclaimZKP
                        providerId={4}
                        txt={"OKX KYC"}
                        setReturn={(value) =>
                          setProfile({
                            ...profile,
                            ID: profile.ID + "/" + value,
                          })
                        }
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="w-full space-y-[10px]" hidden={params.address}>
                <div className="font-semibold">Email address</div>
                <div className="bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <input
                    disabled={params.address}
                    className="outline-none w-full"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full space-y-[10px]">
                <div className="font-semibold">Company</div>
                <div className="bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <input
                    disabled={params.address}
                    className="outline-none w-full"
                    value={profile.company}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="w-full space-y-[10px]">
                <div hidden={params.address} className="font-semibold">
                  About you
                </div>
                <div className="bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <textarea
                    disabled={params.address}
                    className="outline-none w-full min-h-[140px]"
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bio: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div hidden={params.address}>
                <div className="flex justify-end">
                  <PurpleButton text="Save changes" onClick={submitChanges} />
                </div>
              </div>
            </div>
          </div>
          <div hidden={params.address}>
            {mode === "host" && (
              <>
                <div className="h-full min-h-[240px] bg-white flex top-0 gap-[10px] justify-around items-center overflow-auto scrollbarwidth w-full rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  {listings.map((nft) => {
                    return (
                      <>
                        <RentalItem
                          showArrow={false}
                          token_id={nft.token_id}
                          imageHeight={200}
                          onlyImages
                        />
                      </>
                    );
                  })}
                  {listings.length === 0 && (
                    <div className="flex flex-col space-y-3 justify-around items-center h-full w-full">
                      <EmptyNft />
                      <div className="font-semibold">No List property</div>
                      <PurpleButton
                        text={
                          <div
                            className="min-w-[100px] text-center"
                            onClick={() => navigate("/dashboard/host/nfts")}
                          >
                            List property
                          </div>
                        }
                      />
                    </div>
                  )}

                  {/* {listings.length > 0 && (
                  <div className="absolute w-full h-[calc(100%-34px)] hover:bg-[#00000050] bg-[#00000020] rounded-[10px]  flex flex-col items-center justify-center">
                    <PurpleButton
                      text="View all"
                      onClick={() => navigate("/dashboard/host/nfts")}
                    />
                  </div>
                )} */}
                </div>

                {/* <div className="bg-white flex flex-col justify-around items-center border-[2px] min-h-[300px] w-full border-[#E3E3E3] p-[24px] rounded-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <EmptyNft />
              <div className="flex flex-col items-center">
                <div className="font-semibold">No List property</div>
                <div className="text-[#959595] font-normal text-[14px]">
                  No list property for this account
                </div>
              </div>
              <PurpleButton
                text={
                  <div className="min-w-[100px] text-center">List property</div>
                }
              />
            </div> */}
              </>
            )}
          </div>
          {profile.review?.length > 0 && <Review reviewData={profile.review} />}
        </Fade>
      </div>
    </div>
  );
};

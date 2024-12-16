import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
// import { Reclaim } from "@reclaimprotocol/js-sdk";
import { QRCode } from "react-qrcode-logo";
import logo from "../../assets/images/logoForQRcode.svg";
import IDVerifiedSVG from "../../assets/animations/idverified.gif";
import IDnotVerifiedSVG from "../../assets/animations/idnotverified.png";
import { GreenButton } from "../Buttons/GreenButton";

// export const ReclaimZKP = ({ providerId = 0, setReturn = () => {}, txt }) => {
//   const [requestUrl, setRequestUrl] = useState();
//   const [proofs, setProofs] = useState();
//   const [show, setShow] = useState(false);
//   const [status, setStatus] = useState(null);
//   const APP_ID = "0x6CB1eBb098847b314Da9f157de692743bd9A6d8b";

//   const reclaimProofRequest = new Reclaim.ProofRequest(APP_ID);

//   const providerIds = [
//     "330309b6-2c86-4071-a96c-e3da218fcbc7", // Dubai Land Department - Emirates Id
//     "a6496655-08dc-43a2-8f41-97915aaa2f3c", // Dubailand_TitleDeed
//     "285a345c-c6a6-4b9f-9e1e-23432082c0a8", // Coinbase Completed KYC
//     "2b22db5c-78d9-4d82-84f0-a9e0a4ed0470", // Binance KYC Level
//     "61560bd9-db21-409e-97d5-435914446f67", // OKX KYC
//     "f04d54d5-5ce5-4a52-809e-d2a4ec76cbd0", // Coinbase_Lite
//     "fd5208f7-ace4-4743-9284-9a2536dfd053", // Binance Lite
//     "9793e8d5-e603-4ca7-a535-8e82273b5f42", // OKX Lite
//   ];

//   function findValue(obj, key) {
//     for (var property in obj) {
//       if (obj.hasOwnProperty(property)) {
//         if (property === key) {
//           return obj[property];
//         } else if (typeof obj[property] === "object") {
//           var result = findValue(obj[property], key);
//           if (result !== undefined) {
//             return result;
//           }
//         }
//       }
//     }
//   }

//   async function createVerificationRequest() {
//     toast.loading("Generating proofs..");
//     // id of the provider you want to generate the proof for
//     await reclaimProofRequest.buildProofRequest(providerIds[providerId]);

//     reclaimProofRequest.setSignature(
//       await reclaimProofRequest.generateSignature(
//         "0x122404352cd04e4deb6bccf66c967f50cbe3467e6e1587916d2b03e02bf0a42b" // Handle securely for production
//       )
//     );

//     const { requestUrl, statusUrl } =
//       await reclaimProofRequest.createVerificationRequest();

//     await reclaimProofRequest.startSession({
//       onSuccessCallback: (proofs) => {
//         setStatus(true);
//         // setShow(false);
//         toast.dismiss();
//         console.log("Verification success", proofs);
//         console.log(
//           JSON.parse(proofs[0]?.claimData.context).extractedParameters
//         );

//         if (providerId === 0) {
//           console.log(
//             JSON.parse(proofs[0]?.claimData.context).extractedParameters
//           );
//           setReturn(
//             findValue(
//               JSON.parse(proofs[0]?.claimData.context).extractedParameters,
//               "Emirates_ID"
//             ).toString()
//           );
//         }

//         if (providerId === 1)
//           setReturn(
//             findValue(
//               JSON.parse(proofs[0]?.claimData.context).extractedParameters,
//               "Titledeed"
//             ).toString()
//           );
//         else {
//           setReturn(true);
//           // setReturn(
//           //   JSON.parse(
//           //     proofs[0]?.claimData.context
//           //   ).extractedParameters.toString()
//           // );
//         }
//       },
//       onFailureCallback: (error) => {
//         setShow(false);
//         setStatus(false);
//         toast.dismiss();
//         toast.error("ZKP verification request has failed");
//         console.error("Verification failed", error);
//       },
//     });

//     setRequestUrl(requestUrl);
//   }

//   useEffect(() => {
//     if (requestUrl) {
//       setShow(true);
//       setStatus(null);
//     }
//   }, [requestUrl]);

//   const handleClose = () => {
//     setShow(false);
//     toast.dismiss();
//   };

//   return (
//     <div className="">
//       {/* <BlackButton text={txt} onClick={createVerificationRequest} /> */}
//       <GreenButton text={txt} onClick={createVerificationRequest} />

//       <Modal
//         open={show}
//         onClose={handleClose}
//         center
//         classNames={{
//           modal:
//             "min-w-[350px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
//         }}
//       >
//         {status === null && (
//           <div className="relative w-[300px]">
//             <div className="font-semibold text-[20px]">Scan QR Code</div>
//             <div className="w-full">
//               Follow the steps below to automatically verify your ID:
//             </div>
//             <div className="mx-auto bg-gradient-to-b from-[#4E59FA] to-[#24DBFE] w-max h-max">
//               <QRCode
//                 value={requestUrl}
//                 eyeColor={{ outer: "#000000", inner: "#000000" }}
//                 eyeRadius={{ outer: "12", inner: "10" }}
//                 fgColor="#4E59FA"
//                 bgColor="#ffffff"
//                 logoImage={logo}
//                 removeQrCodeBehindLogo
//                 logoPadding={5}
//                 logoWidth={24}
//                 logoHeight={20}
//               />
//             </div>
//             <div className="flex items-center">
//               <svg
//                 className="min-w-[40px] ml-[-12px]"
//                 width="40"
//                 height="40"
//                 viewBox="0 0 40 40"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g filter="url(#filter0_dd_733_42214)">
//                   <rect
//                     x="8"
//                     y="8"
//                     width="24"
//                     height="24"
//                     rx="12"
//                     fill="white"
//                   />
//                   <path
//                     d="M25.9993 17.3333V15.3333C25.9993 14.5967 25.4027 14 24.666 14H22.666"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M17.3333 14H15.3333C14.5967 14 14 14.5967 14 15.3333V17.3333"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M14 22.6665V24.6665C14 25.4032 14.5967 25.9998 15.3333 25.9998H17.3333"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M22.666 25.9998H24.666C25.4027 25.9998 25.9993 25.4032 25.9993 24.6665V22.6665"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M14 19.9998H26"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                 </g>
//                 <defs>
//                   <filter
//                     id="filter0_dd_733_42214"
//                     x="-9.53674e-07"
//                     y="-9.53674e-07"
//                     width="40"
//                     height="40"
//                     filterUnits="userSpaceOnUse"
//                     color-interpolation-filters="sRGB"
//                   >
//                     <feFlood flood-opacity="0" result="BackgroundImageFix" />
//                     <feColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <feOffset dx="2" dy="2" />
//                     <feGaussianBlur stdDeviation="3" />
//                     <feColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in2="BackgroundImageFix"
//                       result="effect1_dropShadow_733_42214"
//                     />
//                     <feColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <feOffset dx="-2" dy="-2" />
//                     <feGaussianBlur stdDeviation="3" />
//                     <feColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in2="effect1_dropShadow_733_42214"
//                       result="effect2_dropShadow_733_42214"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in="SourceGraphic"
//                       in2="effect2_dropShadow_733_42214"
//                       result="shape"
//                     />
//                   </filter>
//                 </defs>
//               </svg>
//               <div className="text-[14px]">Scan QR Code</div>
//             </div>
//             <div className="flex items-center">
//               <svg
//                 className="min-w-[40px] ml-[-12px]"
//                 width="40"
//                 height="40"
//                 viewBox="0 0 40 40"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g filter="url(#filter0_dd_733_42218)">
//                   <rect
//                     x="8"
//                     y="8"
//                     width="24"
//                     height="24"
//                     rx="12"
//                     fill="white"
//                   />
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M14 22.6667V24.6667C14 25.403 14.597 26 15.3333 26H24.6667C25.403 26 26 25.403 26 24.6667V22.6667C26 22.2985 25.7015 22 25.3333 22H23.0784C22.8258 22 22.595 22.1427 22.4821 22.3685L22.1839 22.9648C22.071 23.1907 21.8402 23.3333 21.5876 23.3333H18.4117C18.1591 23.3333 17.9281 23.1905 17.8153 22.9645L17.5177 22.3688C17.4049 22.1428 17.1739 22 16.9213 22H14.6667C14.2985 22 14 22.2985 14 22.6667Z"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M18.666 18.6665L19.9993 19.9998L21.3327 18.6665"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M19.9993 19.9998V16.6665"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M25.3327 20V15.3333C25.3327 14.597 24.7357 14 23.9993 14H15.9993C15.263 14 14.666 14.597 14.666 15.3333V20"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                 </g>
//                 <defs>
//                   <filter
//                     id="filter0_dd_733_42218"
//                     x="-9.53674e-07"
//                     y="-9.53674e-07"
//                     width="40"
//                     height="40"
//                     filterUnits="userSpaceOnUse"
//                     color-interpolation-filters="sRGB"
//                   >
//                     <feFlood flood-opacity="0" result="BackgroundImageFix" />
//                     <feColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <feOffset dx="2" dy="2" />
//                     <feGaussianBlur stdDeviation="3" />
//                     <feColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in2="BackgroundImageFix"
//                       result="effect1_dropShadow_733_42218"
//                     />
//                     <feColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <feOffset dx="-2" dy="-2" />
//                     <feGaussianBlur stdDeviation="3" />
//                     <feColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in2="effect1_dropShadow_733_42218"
//                       result="effect2_dropShadow_733_42218"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in="SourceGraphic"
//                       in2="effect2_dropShadow_733_42218"
//                       result="shape"
//                     />
//                   </filter>
//                 </defs>
//               </svg>

//               <div className="text-[14px]">
//                 Open or Download the Reclaim Protocol App
//               </div>
//             </div>
//             <div className="flex items-center justify-start">
//               <svg
//                 className="min-w-[40px] ml-[-12px]"
//                 width="40"
//                 height="40"
//                 viewBox="0 0 40 40"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g filter="url(#filter0_dd_733_42222)">
//                   <rect
//                     x="8"
//                     y="8"
//                     width="24"
//                     height="24"
//                     rx="12"
//                     fill="white"
//                   />
//                   <path
//                     d="M25.1447 18.4079V14.665C25.1447 14.2968 24.8459 13.998 24.4777 13.998H23.2392C22.8711 13.998 22.5723 14.2968 22.5723 14.665V16.203"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M13.9961 19.143L19.1302 14.7425C19.6298 14.3143 20.3667 14.3143 20.8663 14.7425L26.0011 19.143"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M14.8535 18.4077V24.669C14.8535 25.406 15.4504 26.0029 16.1874 26.0029H19.3314"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M23.6673 26.67C22.0099 26.67 20.666 25.3261 20.666 23.6687C20.666 22.0114 22.0099 20.6675 23.6673 20.6675C25.3253 20.6675 26.6685 22.0114 26.6685 23.6687C26.6685 25.3261 25.3253 26.67 23.6673 26.67"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                   <path
//                     d="M24.8521 23.0757L23.3702 24.5576L22.4805 23.6686"
//                     stroke="#959595"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   />
//                 </g>
//                 <defs>
//                   <filter
//                     id="filter0_dd_733_42222"
//                     x="-9.53674e-07"
//                     y="-9.53674e-07"
//                     width="40"
//                     height="40"
//                     filterUnits="userSpaceOnUse"
//                     color-interpolation-filters="sRGB"
//                   >
//                     <feFlood flood-opacity="0" result="BackgroundImageFix" />
//                     <feColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <feOffset dx="2" dy="2" />
//                     <feGaussianBlur stdDeviation="3" />
//                     <feColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0.733333 0 0 0 0 0.764706 0 0 0 0 0.807843 0 0 0 0.6 0"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in2="BackgroundImageFix"
//                       result="effect1_dropShadow_733_42222"
//                     />
//                     <feColorMatrix
//                       in="SourceAlpha"
//                       type="matrix"
//                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                       result="hardAlpha"
//                     />
//                     <feOffset dx="-2" dy="-2" />
//                     <feGaussianBlur stdDeviation="3" />
//                     <feColorMatrix
//                       type="matrix"
//                       values="0 0 0 0 0.992157 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in2="effect1_dropShadow_733_42222"
//                       result="effect2_dropShadow_733_42222"
//                     />
//                     <feBlend
//                       mode="normal"
//                       in="SourceGraphic"
//                       in2="effect2_dropShadow_733_42222"
//                       result="shape"
//                     />
//                   </filter>
//                 </defs>
//               </svg>

//               <div className="text-[14px]">
//                 Click on "Create Proof" in the Reclaim Protocol App and login
//                 with your Emirates ID
//               </div>
//             </div>
//           </div>
//         )}
//         {status === true && (
//           <div className="space-y-[20px] w-[300px]">
//             {providerId === 1 && (
//               <>
//                 <div className="flex items-center gap-[10px]">
//                   <svg
//                     width="30"
//                     height="31"
//                     viewBox="0 0 30 31"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g filter="url(#filter0_d_1159_44733)">
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="#38A569"
//                       />
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="url(#paint0_linear_1159_44733)"
//                         fill-opacity="0.18"
//                       />
//                       <rect
//                         x="3.25"
//                         y="3.75"
//                         width="23.5"
//                         height="23.5"
//                         rx="11.75"
//                         stroke="white"
//                         stroke-opacity="0.2"
//                         stroke-width="0.5"
//                       />
//                       <path
//                         d="M19.3333 12.8335L14 18.1668L11 15.1668"
//                         stroke="white"
//                         stroke-width="1.5"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </g>
//                     <defs>
//                       <filter
//                         id="filter0_d_1159_44733"
//                         x="0"
//                         y="0.5"
//                         width="30"
//                         height="30"
//                         filterUnits="userSpaceOnUse"
//                         color-interpolation-filters="sRGB"
//                       >
//                         <feFlood
//                           flood-opacity="0"
//                           result="BackgroundImageFix"
//                         />
//                         <feColorMatrix
//                           in="SourceAlpha"
//                           type="matrix"
//                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                           result="hardAlpha"
//                         />
//                         <feMorphology
//                           radius="3"
//                           operator="dilate"
//                           in="SourceAlpha"
//                           result="effect1_dropShadow_1159_44733"
//                         />
//                         <feOffset />
//                         <feComposite in2="hardAlpha" operator="out" />
//                         <feColorMatrix
//                           type="matrix"
//                           values="0 0 0 0 0.0784314 0 0 0 0 0.807843 0 0 0 0 0.326431 0 0 0 0.1 0"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in2="BackgroundImageFix"
//                           result="effect1_dropShadow_1159_44733"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in="SourceGraphic"
//                           in2="effect1_dropShadow_1159_44733"
//                           result="shape"
//                         />
//                       </filter>
//                       <linearGradient
//                         id="paint0_linear_1159_44733"
//                         x1="15"
//                         y1="3.5"
//                         x2="15"
//                         y2="19"
//                         gradientUnits="userSpaceOnUse"
//                       >
//                         <stop stop-color="white" />
//                         <stop offset="1" stop-color="white" stop-opacity="0" />
//                       </linearGradient>
//                     </defs>
//                   </svg>

//                   <div className="text-[20px] font-semibold">
//                     Property ID Verified
//                   </div>
//                 </div>
//                 <div className="m-auto flex justify-center">
//                   <svg
//                     width="150"
//                     height="150"
//                     viewBox="0 0 150 150"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <rect width="150" height="150" rx="75" fill="#F6F6F6" />
//                     <path
//                       d="M120 71.2502V116.25C120 117.245 119.605 118.199 118.902 118.902C118.198 119.605 117.245 120 116.25 120H33.75C32.7555 120 31.8017 119.605 31.0984 118.902C30.3951 118.199 30 117.245 30 116.25V71.2502C29.9965 70.2642 30.1891 69.2873 30.5665 68.3764C30.9439 67.4654 31.4987 66.6386 32.1985 65.944L69.6985 28.444C71.1049 27.0385 73.0118 26.249 75 26.249C76.9883 26.249 78.8952 27.0385 80.3016 28.444L117.802 65.944C118.501 66.6386 119.056 67.4654 119.434 68.3764C119.811 69.2873 120.004 70.2642 120 71.2502Z"
//                       fill="#531AD9"
//                     />
//                     <path
//                       d="M94.5918 74.0919L70.5918 98.092C70.3828 98.3017 70.1344 98.4681 69.8609 98.5817C69.5874 98.6953 69.2942 98.7537 68.998 98.7537C68.7019 98.7537 68.4087 98.6953 68.1352 98.5817C67.8617 98.4681 67.6133 98.3017 67.4043 98.092L56.9043 87.592C56.695 87.3827 56.529 87.1342 56.4157 86.8607C56.3024 86.5873 56.2441 86.2942 56.2441 85.9982C56.2441 85.7022 56.3024 85.4091 56.4157 85.1357C56.529 84.8622 56.695 84.6137 56.9043 84.4045C57.1136 84.1952 57.3621 84.0291 57.6355 83.9159C57.909 83.8026 58.2021 83.7443 58.498 83.7443C58.794 83.7443 59.0871 83.8026 59.3606 83.9159C59.634 84.0291 59.8825 84.1952 60.0918 84.4045L68.9999 93.3126L91.408 70.9082C91.8307 70.4855 92.404 70.248 93.0018 70.248C93.5996 70.248 94.1729 70.4855 94.5955 70.9082C95.0182 71.3309 95.2557 71.9042 95.2557 72.502C95.2557 73.0997 95.0182 73.673 94.5955 74.0957L94.5918 74.0919Z"
//                       fill="white"
//                     />
//                   </svg>
//                 </div>
//                 <div className="w-full text-center">
//                   Your property ID is verified, you can check it on this form
//                 </div>
//               </>
//             )}
//             {providerId === 0 && (
//               <>
//                 <div className="flex items-center gap-[10px]">
//                   <svg
//                     width="30"
//                     height="31"
//                     viewBox="0 0 30 31"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g filter="url(#filter0_d_1159_44733)">
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="#38A569"
//                       />
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="url(#paint0_linear_1159_44733)"
//                         fill-opacity="0.18"
//                       />
//                       <rect
//                         x="3.25"
//                         y="3.75"
//                         width="23.5"
//                         height="23.5"
//                         rx="11.75"
//                         stroke="white"
//                         stroke-opacity="0.2"
//                         stroke-width="0.5"
//                       />
//                       <path
//                         d="M19.3333 12.8335L14 18.1668L11 15.1668"
//                         stroke="white"
//                         stroke-width="1.5"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </g>
//                     <defs>
//                       <filter
//                         id="filter0_d_1159_44733"
//                         x="0"
//                         y="0.5"
//                         width="30"
//                         height="30"
//                         filterUnits="userSpaceOnUse"
//                         color-interpolation-filters="sRGB"
//                       >
//                         <feFlood
//                           flood-opacity="0"
//                           result="BackgroundImageFix"
//                         />
//                         <feColorMatrix
//                           in="SourceAlpha"
//                           type="matrix"
//                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                           result="hardAlpha"
//                         />
//                         <feMorphology
//                           radius="3"
//                           operator="dilate"
//                           in="SourceAlpha"
//                           result="effect1_dropShadow_1159_44733"
//                         />
//                         <feOffset />
//                         <feComposite in2="hardAlpha" operator="out" />
//                         <feColorMatrix
//                           type="matrix"
//                           values="0 0 0 0 0.0784314 0 0 0 0 0.807843 0 0 0 0 0.326431 0 0 0 0.1 0"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in2="BackgroundImageFix"
//                           result="effect1_dropShadow_1159_44733"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in="SourceGraphic"
//                           in2="effect1_dropShadow_1159_44733"
//                           result="shape"
//                         />
//                       </filter>
//                       <linearGradient
//                         id="paint0_linear_1159_44733"
//                         x1="15"
//                         y1="3.5"
//                         x2="15"
//                         y2="19"
//                         gradientUnits="userSpaceOnUse"
//                       >
//                         <stop stop-color="white" />
//                         <stop offset="1" stop-color="white" stop-opacity="0" />
//                       </linearGradient>
//                     </defs>
//                   </svg>

//                   <div className="text-[20px] font-semibold">ID Verified</div>
//                 </div>
//                 <div className="m-auto flex justify-center">
//                   <img alt="" src={IDVerifiedSVG} />
//                 </div>
//                 <div className="w-full text-center">
//                   Your Emirates ID is verified, you can check it on this form
//                 </div>
//               </>
//             )}
//             {(providerId === 2 || providerId === 3 || providerId === 4) && (
//               <>
//                 <div className="flex items-center gap-[10px]">
//                   <svg
//                     width="30"
//                     height="31"
//                     viewBox="0 0 30 31"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g filter="url(#filter0_d_1159_44733)">
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="#38A569"
//                       />
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="url(#paint0_linear_1159_44733)"
//                         fill-opacity="0.18"
//                       />
//                       <rect
//                         x="3.25"
//                         y="3.75"
//                         width="23.5"
//                         height="23.5"
//                         rx="11.75"
//                         stroke="white"
//                         stroke-opacity="0.2"
//                         stroke-width="0.5"
//                       />
//                       <path
//                         d="M19.3333 12.8335L14 18.1668L11 15.1668"
//                         stroke="white"
//                         stroke-width="1.5"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </g>
//                     <defs>
//                       <filter
//                         id="filter0_d_1159_44733"
//                         x="0"
//                         y="0.5"
//                         width="30"
//                         height="30"
//                         filterUnits="userSpaceOnUse"
//                         color-interpolation-filters="sRGB"
//                       >
//                         <feFlood
//                           flood-opacity="0"
//                           result="BackgroundImageFix"
//                         />
//                         <feColorMatrix
//                           in="SourceAlpha"
//                           type="matrix"
//                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                           result="hardAlpha"
//                         />
//                         <feMorphology
//                           radius="3"
//                           operator="dilate"
//                           in="SourceAlpha"
//                           result="effect1_dropShadow_1159_44733"
//                         />
//                         <feOffset />
//                         <feComposite in2="hardAlpha" operator="out" />
//                         <feColorMatrix
//                           type="matrix"
//                           values="0 0 0 0 0.0784314 0 0 0 0 0.807843 0 0 0 0 0.326431 0 0 0 0.1 0"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in2="BackgroundImageFix"
//                           result="effect1_dropShadow_1159_44733"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in="SourceGraphic"
//                           in2="effect1_dropShadow_1159_44733"
//                           result="shape"
//                         />
//                       </filter>
//                       <linearGradient
//                         id="paint0_linear_1159_44733"
//                         x1="15"
//                         y1="3.5"
//                         x2="15"
//                         y2="19"
//                         gradientUnits="userSpaceOnUse"
//                       >
//                         <stop stop-color="white" />
//                         <stop offset="1" stop-color="white" stop-opacity="0" />
//                       </linearGradient>
//                     </defs>
//                   </svg>

//                   <div className="text-[20px] font-semibold">ID Verified</div>
//                 </div>
//                 <div className="m-auto flex justify-center">
//                   <img alt="" src={IDVerifiedSVG} />
//                 </div>
//                 <div className="w-full text-center">
//                   Your ID is verified, you can check it on this form
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//         {status === false && (
//           <div className="space-y-[20px] w-[300px]">
//             {providerId === 1 && (
//               <>
//                 <div className="flex items-center gap-[10px]">
//                   <svg
//                     width="30"
//                     height="31"
//                     viewBox="0 0 30 31"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g filter="url(#filter0_d_1159_45200)">
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="#DB1F22"
//                       />
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="url(#paint0_linear_1159_45200)"
//                         fill-opacity="0.18"
//                       />
//                       <rect
//                         x="3.25"
//                         y="3.75"
//                         width="23.5"
//                         height="23.5"
//                         rx="11.75"
//                         stroke="white"
//                         stroke-opacity="0.2"
//                         stroke-width="0.5"
//                       />
//                       <path
//                         d="M12 12.5L18 18.5"
//                         stroke="white"
//                         stroke-width="1.5"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                       <path
//                         d="M12 18.5L18 12.5"
//                         stroke="white"
//                         stroke-width="1.5"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </g>
//                     <defs>
//                       <filter
//                         id="filter0_d_1159_45200"
//                         x="0"
//                         y="0.5"
//                         width="30"
//                         height="30"
//                         filterUnits="userSpaceOnUse"
//                         color-interpolation-filters="sRGB"
//                       >
//                         <feFlood
//                           flood-opacity="0"
//                           result="BackgroundImageFix"
//                         />
//                         <feColorMatrix
//                           in="SourceAlpha"
//                           type="matrix"
//                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                           result="hardAlpha"
//                         />
//                         <feMorphology
//                           radius="3"
//                           operator="dilate"
//                           in="SourceAlpha"
//                           result="effect1_dropShadow_1159_45200"
//                         />
//                         <feOffset />
//                         <feComposite in2="hardAlpha" operator="out" />
//                         <feColorMatrix
//                           type="matrix"
//                           values="0 0 0 0 0.807843 0 0 0 0 0.0784314 0 0 0 0 0.0901961 0 0 0 0.1 0"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in2="BackgroundImageFix"
//                           result="effect1_dropShadow_1159_45200"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in="SourceGraphic"
//                           in2="effect1_dropShadow_1159_45200"
//                           result="shape"
//                         />
//                       </filter>
//                       <linearGradient
//                         id="paint0_linear_1159_45200"
//                         x1="15"
//                         y1="3.5"
//                         x2="15"
//                         y2="19"
//                         gradientUnits="userSpaceOnUse"
//                       >
//                         <stop stop-color="white" />
//                         <stop offset="1" stop-color="white" stop-opacity="0" />
//                       </linearGradient>
//                     </defs>
//                   </svg>

//                   <div className="text-[20px] font-semibold">
//                     Property ID not verified
//                   </div>
//                 </div>
//                 <div className="m-auto flex justify-center">
//                   <svg
//                     width="150"
//                     height="150"
//                     viewBox="0 0 150 150"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <rect width="150" height="150" rx="75" fill="#F6F6F6" />
//                     <path
//                       d="M120 71.2502V116.25C120 117.245 119.605 118.199 118.902 118.902C118.198 119.605 117.245 120 116.25 120H33.75C32.7555 120 31.8017 119.605 31.0984 118.902C30.3951 118.199 30 117.245 30 116.25V71.2502C29.9965 70.2642 30.1891 69.2873 30.5665 68.3764C30.9439 67.4654 31.4987 66.6386 32.1985 65.944L69.6985 28.444C71.1049 27.0385 73.0118 26.249 75 26.249C76.9883 26.249 78.8952 27.0385 80.3016 28.444L117.802 65.944C118.501 66.6386 119.056 67.4654 119.434 68.3764C119.811 69.2873 120.004 70.2642 120 71.2502Z"
//                       fill="#531AD9"
//                     />
//                     <path
//                       d="M90.0918 93.908C90.5145 94.3307 90.7519 94.9039 90.7519 95.5017C90.7519 96.0995 90.5145 96.6728 90.0918 97.0955C89.6691 97.5182 89.0958 97.7556 88.498 97.7556C87.9003 97.7556 87.327 97.5182 86.9043 97.0955L74.9999 85.1873L63.0918 97.0917C62.6691 97.5144 62.0958 97.7519 61.498 97.7519C60.9003 97.7519 60.327 97.5144 59.9043 97.0917C59.4816 96.669 59.2441 96.0957 59.2441 95.498C59.2441 94.9002 59.4816 94.3269 59.9043 93.9042L71.8124 81.9998L59.908 70.0917C59.4854 69.669 59.2479 69.0957 59.2479 68.498C59.2479 67.9002 59.4854 67.3269 59.908 66.9042C60.3307 66.4815 60.904 66.2441 61.5018 66.2441C62.0996 66.2441 62.6729 66.4815 63.0955 66.9042L74.9999 78.8123L86.908 66.9023C87.3307 66.4797 87.904 66.2422 88.5018 66.2422C89.0996 66.2422 89.6729 66.4797 90.0955 66.9023C90.5182 67.325 90.7557 67.8983 90.7557 68.4961C90.7557 69.0939 90.5182 69.6672 90.0955 70.0898L78.1874 81.9998L90.0918 93.908Z"
//                       fill="white"
//                     />
//                   </svg>
//                 </div>
//                 <div className="w-full text-center">
//                   Your property ID is not verified, you can check it on this
//                   form
//                 </div>
//               </>
//             )}
//             {providerId === 0 && (
//               <>
//                 <div className="flex items-center gap-[10px]">
//                   <svg
//                     width="30"
//                     height="31"
//                     viewBox="0 0 30 31"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g filter="url(#filter0_d_1159_45200)">
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="#DB1F22"
//                       />
//                       <rect
//                         x="3"
//                         y="3.5"
//                         width="24"
//                         height="24"
//                         rx="12"
//                         fill="url(#paint0_linear_1159_45200)"
//                         fill-opacity="0.18"
//                       />
//                       <rect
//                         x="3.25"
//                         y="3.75"
//                         width="23.5"
//                         height="23.5"
//                         rx="11.75"
//                         stroke="white"
//                         stroke-opacity="0.2"
//                         stroke-width="0.5"
//                       />
//                       <path
//                         d="M12 12.5L18 18.5"
//                         stroke="white"
//                         stroke-width="1.5"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                       <path
//                         d="M12 18.5L18 12.5"
//                         stroke="white"
//                         stroke-width="1.5"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       />
//                     </g>
//                     <defs>
//                       <filter
//                         id="filter0_d_1159_45200"
//                         x="0"
//                         y="0.5"
//                         width="30"
//                         height="30"
//                         filterUnits="userSpaceOnUse"
//                         color-interpolation-filters="sRGB"
//                       >
//                         <feFlood
//                           flood-opacity="0"
//                           result="BackgroundImageFix"
//                         />
//                         <feColorMatrix
//                           in="SourceAlpha"
//                           type="matrix"
//                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                           result="hardAlpha"
//                         />
//                         <feMorphology
//                           radius="3"
//                           operator="dilate"
//                           in="SourceAlpha"
//                           result="effect1_dropShadow_1159_45200"
//                         />
//                         <feOffset />
//                         <feComposite in2="hardAlpha" operator="out" />
//                         <feColorMatrix
//                           type="matrix"
//                           values="0 0 0 0 0.807843 0 0 0 0 0.0784314 0 0 0 0 0.0901961 0 0 0 0.1 0"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in2="BackgroundImageFix"
//                           result="effect1_dropShadow_1159_45200"
//                         />
//                         <feBlend
//                           mode="normal"
//                           in="SourceGraphic"
//                           in2="effect1_dropShadow_1159_45200"
//                           result="shape"
//                         />
//                       </filter>
//                       <linearGradient
//                         id="paint0_linear_1159_45200"
//                         x1="15"
//                         y1="3.5"
//                         x2="15"
//                         y2="19"
//                         gradientUnits="userSpaceOnUse"
//                       >
//                         <stop stop-color="white" />
//                         <stop offset="1" stop-color="white" stop-opacity="0" />
//                       </linearGradient>
//                     </defs>
//                   </svg>

//                   <div className="text-[20px] font-semibold">
//                     ID is not verified
//                   </div>
//                 </div>
//                 <div className="m-auto flex justify-center">
//                   <img alt="" src={IDnotVerifiedSVG} />
//                 </div>
//                 <div className="w-full text-center">
//                   Your Emirates ID isn’t verified, you can check it on this form
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

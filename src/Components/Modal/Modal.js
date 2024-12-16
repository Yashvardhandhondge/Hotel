import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { setConnectModal, setTxModalClose } from "../../ReduxSlices/ModalSlice";
import { CloseIcon } from "../../AssetComponents/Images";
import Lottie from "lottie-react";
import hourGlass from "../../assets/animations/timeglass.json";
import success from "../../assets/animations/success.json";
import failed from "../../assets/animations/failed.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setConnect, setEthereum } from "../../ReduxSlices/AuthSlice";
import { useEffect, useState } from "react";
import { Testnet, Mainnet } from "@nibiruchain/nibijs";
import { toast } from "react-toastify";
import { api } from "../functions/Api";
import ClipLoader from "react-spinners/ClipLoader";

export const TransactionModal = () => {
  const dispatch = useDispatch();
  const onCloseModal = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.dismiss();
    dispatch(setTxModalClose());
  };
  const open = useSelector((state) => state.modal.transactionModal);
  const txStatus = useSelector((state) => state.modal.txStatus);
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{
        modal:
          "min-w-[350px] h-max rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
      }}
    >
      <div className="h-[210px] flex flex-col justify-between">
        {txStatus === false && (
          <>
            <div className="text-[20px] font-semibold">Transaction Failed</div>
            <Lottie
              animationData={failed}
              loop={false}
              className="m-auto w-[160px]"
              onComplete={onCloseModal}
            />
            <div className="w-full text-center">Your transaction is failed</div>
          </>
        )}
        {txStatus === true && (
          <>
            <div className="text-[20px] font-semibold">
              Transaction Confirmed
            </div>
            <Lottie
              animationData={success}
              loop={false}
              className="m-auto w-[160px]"
              onComplete={onCloseModal}
            />
            <div className="w-full text-center">
              Your transaction is confirmed
            </div>
          </>
        )}

        {txStatus === null && (
          <>
            <div className="text-[20px] font-semibold">Transaction Process</div>
            <Lottie
              animationData={hourGlass}
              className="w-[140px] mx-auto max-h-[100px]"
            />
            <div className="w-full text-center">
              Please wait your transaction...
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export const ConnectModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.connectModal);
  const account_ = useSelector((state) => state.auth.account);
  // const ethereum = useSelector((state) => state.auth.ethereum);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const onCloseModal = () => {
    // toast.dismiss();a
    dispatch(setConnectModal(false));
    if (location.pathname.split("/")[1] !== "earn")
      if (!account_) navigate("/rent/short");
  };

  const connectToBackend = async (account_) => {
    const res = await api("user/login", {
      account: account_,
    });

    return res;
  };

  const handleConnect = async (wallet) => {
    dispatch(setConnectModal(false));
    if (wallet === "leap") {
      try {
        // const testNet = Testnet(1);
        const mainnet = Mainnet();
        setLoading(true);
        await window.leap.enable(mainnet.chainId);
        const offlineSigner = window.leap.getOfflineSigner(mainnet.chainId);
        const accounts = await offlineSigner.getAccounts();
        dispatch(setConnect(accounts[0].address));
        connectToBackend(accounts[0].address);
        setLoading(false);
      } catch (error) {
        toast.error("Cannot connect to your leap wallet");
        setLoading(false);

        onCloseModal();
      }
    }
    if (wallet === "bybitWallet") {
      try {
        const accounts = await window.bybitWallet.request({
          method: "eth_requestAccounts",
          params: [],
        });
        dispatch(setEthereum(accounts[0]));
        setLoading(false);
      } catch (error) {
        toast.error("Cannot connect to your leap wallet");
        setLoading(false);

        onCloseModal();
      }
    }
    if (wallet === "metamask") {
    }
  };

  useEffect(() => {
    if (account_) onCloseModal();
  }, [account_]);

  useEffect(() => {
    if (open) setLoading(false);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{
        modal:
          "min-w-[300px] min-h-[200px] rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
      }}
      // closeIcon={<CloseIcon />}
      showCloseIcon={false}
    >
      <div className="w-full flex flex-col items-center justify-center pt-[40px]">
        <div className="font-semibold text-[20px] absolute top-[10px] left-[60px]">
          CONNECT TO WEB3
        </div>

        {location.pathname.split("/")[1] !== "earn" && (
          <div
            onClick={() => handleConnect("leap")}
            className="pt-[12px] pb-[6px] px-[8px] w-full rounded-[8px] flex flex-col gap-[12px] items-center cursor-pointer transition ease-in-out hover:bg-gray-300 duration-100"
          >
            {loading ? (
              <ClipLoader />
            ) : (
              <img
                alt=""
                src={"https://assets.leapwallet.io/logos/leap-cosmos-logo.svg"}
                className="w-[100px] h-[100px]"
              />
            )}

            <div>
              {!window.leap && (
                <Link target="_blank" to="https://www.leapwallet.io/download">
                  <div className="font-semibold text-[#4C37C3] hover:text-[#5b1dee]">
                    install
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* <div
          onClick={() => handleConnect("bybitWallet")}
          className="pt-[12px] pb-[6px] mt-2 px-[8px] w-full rounded-[8px] flex flex-col gap-[12px] items-center cursor-pointer transition ease-in-out hover:bg-gray-300 duration-100"
        >
          {loading ? (
            <ClipLoader />
          ) : (
            <svg
              className="w-[100px] h-[100px]"
              width="88"
              height="88"
              viewBox="0 0 88 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18.7C0 8.37227 8.37228 0 18.7 0H69.3C79.6277 0 88 8.37228 88 18.7V69.3C88 79.6277 79.6277 88 69.3 88H18.7C8.37227 88 0 79.6277 0 69.3V18.7Z"
                fill="#404347"
              />
              <path
                d="M7.57617 26.8067C6.78516 24.0787 8.4775 21.2531 11.2559 20.663L57.6087 10.8173C59.809 10.35 62.0443 11.4443 63.0247 13.4689L83.8443 56.4657L25.1776 87.5101L7.57617 26.8067Z"
                fill="url(#paint0_linear_312_17534)"
              />
              <path
                d="M8.18242 30.1618C7.35049 27.2838 9.27925 24.3413 12.2502 23.9559L73.6865 15.9881C76.2391 15.6571 78.6111 17.3618 79.1111 19.8867L88.0003 64.7771L24.6892 87.2665L8.18242 30.1618Z"
                fill="white"
              />
              <path
                d="M0 34.2222C0 28.8221 4.37766 24.4445 9.77778 24.4445H68.4444C79.2447 24.4445 88 33.1998 88 44V68.4445C88 79.2447 79.2447 88 68.4444 88H19.5556C8.75532 88 0 79.2447 0 68.4445V34.2222Z"
                fill="black"
              />
              <path
                d="M58.2201 61.1959V42.8755H61.7937V61.1959H58.2201Z"
                fill="#F7A600"
              />
              <path
                d="M17.4395 66.6637H9.77795V48.3434H17.1313C20.7049 48.3434 22.7874 50.3505 22.7874 53.4893C22.7874 55.5215 21.4504 56.8345 20.5257 57.2721C21.6315 57.7869 23.0456 58.9438 23.0456 61.3885C23.0456 64.8108 20.7049 66.6637 17.4395 66.6637ZM16.8481 51.5343H13.3516V55.7548H16.8481C18.3642 55.7548 19.2138 54.9064 19.2138 53.6455C19.2138 52.3826 18.3662 51.5343 16.8481 51.5343ZM17.0793 58.9708H13.3516V63.4728H17.0793C18.6994 63.4728 19.47 62.4432 19.47 61.2092C19.472 59.9733 18.6994 58.9708 17.0793 58.9708Z"
                fill="white"
              />
              <path
                d="M32.8925 59.1501V66.6637H29.3439V59.1501L23.8419 48.3434H27.7238L31.1432 55.7278L34.5107 48.3434H38.3926L32.8925 59.1501Z"
                fill="white"
              />
              <path
                d="M48.5633 66.6637H40.9017V48.3434H48.2551C51.8287 48.3434 53.9112 50.3505 53.9112 53.4893C53.9112 55.5215 52.5742 56.8345 51.6495 57.2721C52.7553 57.7869 54.1693 58.9438 54.1693 61.3885C54.1674 64.8108 51.8268 66.6637 48.5633 66.6637ZM47.9719 51.5343H44.4753V55.7548H47.9719C49.488 55.7548 50.3376 54.9064 50.3376 53.6455C50.3357 52.3826 49.488 51.5343 47.9719 51.5343ZM48.2031 58.9708H44.4753V63.4728H48.2031C49.8232 63.4728 50.5938 62.4432 50.5938 61.2092C50.5938 59.9734 49.8213 58.9708 48.2031 58.9708Z"
                fill="white"
              />
              <path
                d="M73.439 51.5343V66.6637H69.8654V51.5343H65.0839V48.3434H78.2224V51.5343H73.439Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_312_17534"
                  x1="7.33308"
                  y1="25.594"
                  x2="84.6381"
                  y2="21.7216"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFD748" />
                  <stop offset="1" stop-color="#F7A600" />
                </linearGradient>
              </defs>
            </svg>
          )}

          <div>
            {!window.bybitWallet && (
              <Link target="_blank" to="https://www.bybit.com/en/web3/home">
                <div className="font-semibold text-[#4C37C3] hover:text-[#5b1dee]">
                  install
                </div>
              </Link>
            )}
          </div>
        </div>
        <div
          onClick={() => handleConnect("metamask")}
          className="mt-2 px-[8px] w-full rounded-[8px] flex flex-col gap-[12px] items-center cursor-pointer transition ease-in-out hover:bg-gray-300 duration-100"
        >
          {loading ? (
            <ClipLoader />
          ) : (
            <img
              alt=""
              src="https://metamask.io/assets/icon.svg"
              className="w-[130px] h-[130px]"
            />
          )}

          <div>
            {!window.ethereum && (
              <Link target="_blank" to="https://www.bybit.com/en/web3/home">
                <div className="font-semibold text-[#4C37C3] hover:text-[#5b1dee]">
                  install
                </div>
              </Link>
            )}
          </div>
        </div> */}
        <div className="max-w-[260px] text-center">
          You have to connect your wallet to interact with the platform
        </div>
      </div>
    </Modal>
  );
};

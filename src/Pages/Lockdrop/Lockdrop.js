import { NumericFormat } from "react-number-format";
import { Toggle } from "../../Components/Toggle/Toggle";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import {
  ArrowToDownHeader,
  CalenderIcon,
  CloseIcon,
  DAIIcon,
  FDUSDIcon,
  Logo,
  NUSDIcon,
  USDTIcon,
  // EthIcon,
} from "../../AssetComponents/Images";
import { Calendar } from "react-date-range";
import Modal from "react-responsive-modal";
// import { addDays } from "date-fns";
import { useEffect, useState, useSyncExternalStore } from "react";
import { LightIcon } from "../../AssetComponents/Images";
import {
  SelectionGroup,
  SelectionItem,
} from "../../Components/Selection/Selection";
import { PurpleButton } from "../../Components/Buttons/PurpleButton";
import { WhiteButton } from "../../Components/Buttons/WhiteButton";
import { Fade } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { setConnectModal } from "../../ReduxSlices/ModalSlice";
import { useSelector } from "react-redux";
import {
  thiredWebClient,
  truncateWalletAddress,
} from "../../Components/functions/Functions";
import { ethers } from "ethers";
import LockERC20_abi from "./LockdropABI.json";
import ERC20_abi from "./ERC20ABI.json";
import checkMarkJson from "../../assets/animations/Check mark.json";
import confettiJson from "../../assets/animations/Confetti.json";
import { toast } from "react-toastify";
import { api } from "../../Components/functions/Api";
import { Popover } from "react-tiny-popover";
import { injectedProvider } from "thirdweb/wallets";
import { useSendAndConfirmTransaction } from "thirdweb/react";
import { useSendTransaction, useReadContract } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { createThirdwebClient } from "thirdweb";
import {
  ethereum,
  arbitrum,
  optimism,
  polygon,
  base,
  bsc,
  avalanche,
} from "thirdweb/chains";
import { useSwitchActiveWalletChain } from "thirdweb/react";
import Lottie from "lottie-react";
import saiLogo from "../../saiLogo.svg";
import { useActiveWalletChain } from "thirdweb/react";

import ethereumIcon from "../../assets/images/blockchains/ethereum.png";
import arbitrumIcon from "../../assets/images/blockchains/arbitrum.png";
import optimismIcon from "../../assets/images/blockchains/optimism.png";
import polygonIcon from "../../assets/images/blockchains/polygon.png";
import baseIcon from "../../assets/images/blockchains/base.png";
import bscIcon from "../../assets/images/blockchains/bsc.png";
import avalancheIcon from "../../assets/images/blockchains/avalanche.png";

const writeContract = async (
  chain,
  address,
  method,
  params,
  sendTransaction = async () => {}
) => {
  try {
    toast.loading("Confirming transaction..");
    const contract = getContract({
      client: thiredWebClient,
      chain: chain,
      address: address,
    });
    const tx = prepareContractCall({
      contract: contract,
      method: method,
      params: params,
    });

    const data = await tx.data();

    const transaction = {
      ...tx,
      data: data,
    };
    const { transactionHash } = await sendTransaction(transaction);
    toast.dismiss();
    toast.success("Transation confirmed!");
    console.log(transactionHash);
    return transactionHash;
  } catch (error) {
    console.log(error);
    toast.dismiss();
    toast.error("Transaction not confirmed, please try again");
  }
};

export const LockDrop = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNoti, setShowNoti] = useState(true);
  const [amount, setAmount] = useState(100);
  const [balance, setBalance] = useState(0);
  const [weeks, setWeeks] = useState(20);
  const [maxFlag, setMaxFlag] = useState(false);
  const connected_account_ethereum = useSelector(
    (state) => state.auth.ethereum
  );
  const [confetti, setConfetti] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tab, setTab] = useState(0);
  const [openPop, setOpenPop] = useState(false);
  const [positions, setPositions] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [tokens, setTokens] = useState([
    {
      name: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      icon: <NUSDIcon />,
      chainIcon: (
        <img alt="" src={ethereumIcon} className="w-[14px] rounded-full" />
      ),
      decimal: 6,
      chain: ethereum,
      rpc: "https://ethereum-rpc.publicnode.com",
      contract: "0x23a0dc68691019F5dbcE4990B394A9cA03a16d07",
    },
    {
      name: "USDT",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      chainIcon: (
        <img alt="" src={ethereumIcon} className="w-[14px] rounded-full" />
      ),
      icon: <USDTIcon className="w-[24px]" />,
      decimal: 6,
      chain: ethereum,
      rpc: "https://ethereum-rpc.publicnode.com",
      contract: "0x23a0dc68691019F5dbcE4990B394A9cA03a16d07",
    },
    {
      name: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      icon: <DAIIcon className="w-[24px]" />,
      decimal: 18,
      chainIcon: (
        <img alt="" src={ethereumIcon} className="w-[14px] rounded-full" />
      ),
      chain: ethereum,
      rpc: "https://ethereum-rpc.publicnode.com",
      contract: "0x23a0dc68691019F5dbcE4990B394A9cA03a16d07",
    },
    {
      name: "FDUSD",
      address: "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409",
      icon: <FDUSDIcon className="w-[24px]" />,
      chainIcon: (
        <img alt="" src={ethereumIcon} className="w-[14px] rounded-full" />
      ),
      decimal: 18,
      chain: ethereum,
      rpc: "https://ethereum-rpc.publicnode.com",
      contract: "0x23a0dc68691019F5dbcE4990B394A9cA03a16d07",
    },

    {
      name: "USDC",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      icon: <NUSDIcon />,
      chainIcon: (
        <img alt="" src={arbitrumIcon} className="w-[14px] rounded-full" />
      ),
      decimal: 6,
      chain: arbitrum,
      rpc: "https://arbitrum.drpc.org",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDT",
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      chainIcon: (
        <img alt="" src={arbitrumIcon} className="w-[14px] rounded-full" />
      ),
      icon: <USDTIcon className="w-[24px]" />,
      decimal: 6,
      chain: arbitrum,
      rpc: "https://arbitrum.drpc.org",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "DAI",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      icon: <DAIIcon className="w-[24px]" />,
      decimal: 18,
      chainIcon: (
        <img alt="" src={arbitrumIcon} className="w-[14px] rounded-full" />
      ),
      chain: arbitrum,
      rpc: "https://arbitrum.drpc.org",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDC",
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      icon: <NUSDIcon />,
      chainIcon: (
        <img alt="" src={optimismIcon} className="w-[14px] rounded-full" />
      ),
      decimal: 6,
      chain: optimism,
      rpc: "https://optimism-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDT",
      address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      chainIcon: (
        <img alt="" src={optimismIcon} className="w-[14px] rounded-full" />
      ),
      icon: <USDTIcon className="w-[24px]" />,
      decimal: 6,
      chain: optimism,
      rpc: "https://optimism-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "DAI",
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      icon: <DAIIcon className="w-[24px]" />,
      decimal: 18,
      chainIcon: (
        <img alt="" src={optimismIcon} className="w-[14px] rounded-full" />
      ),
      chain: optimism,
      rpc: "https://optimism-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDC",
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      icon: <NUSDIcon />,
      chainIcon: (
        <img alt="" src={polygonIcon} className="w-[14px] rounded-full" />
      ),
      decimal: 6,
      chain: polygon,
      rpc: "https://polygon-bor-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDT",
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      chainIcon: (
        <img alt="" src={polygonIcon} className="w-[14px] rounded-full" />
      ),
      icon: <USDTIcon className="w-[24px]" />,
      decimal: 6,
      chain: polygon,
      rpc: "https://polygon-bor-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "DAI",
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      icon: <DAIIcon className="w-[24px]" />,
      decimal: 18,
      chainIcon: (
        <img alt="" src={polygonIcon} className="w-[14px] rounded-full" />
      ),
      chain: polygon,
      rpc: "https://polygon-bor-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDC",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      icon: <NUSDIcon />,
      chainIcon: (
        <img alt="" src={baseIcon} className="w-[14px] rounded-full" />
      ),
      decimal: 6,
      chain: base,
      rpc: "https://base-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDT",
      address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
      chainIcon: (
        <img alt="" src={baseIcon} className="w-[14px] rounded-full" />
      ),
      icon: <USDTIcon className="w-[24px]" />,
      decimal: 6,
      chain: base,
      rpc: "https://base-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "DAI",
      address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      icon: <DAIIcon className="w-[24px]" />,
      decimal: 18,
      chainIcon: (
        <img alt="" src={baseIcon} className="w-[14px] rounded-full" />
      ),
      chain: base,
      rpc: "https://base-rpc.publicnode.com",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDC",
      address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      icon: <NUSDIcon />,
      chainIcon: <img alt="" src={bscIcon} className="w-[14px] rounded-full" />,
      decimal: 18,
      chain: bsc,
      rpc: "https://bsc-pokt.nodies.app",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDT",
      address: "0x55d398326f99059fF775485246999027B3197955",
      chainIcon: <img alt="" src={bscIcon} className="w-[14px] rounded-full" />,
      icon: <USDTIcon className="w-[24px]" />,
      decimal: 18,
      chain: bsc,
      rpc: "https://bsc-pokt.nodies.app",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "DAI",
      address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
      icon: <DAIIcon className="w-[24px]" />,
      decimal: 18,
      chainIcon: <img alt="" src={bscIcon} className="w-[14px] rounded-full" />,
      chain: bsc,
      rpc: "https://bsc-pokt.nodies.app",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDC",
      address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
      icon: <NUSDIcon />,
      chainIcon: (
        <img alt="" src={avalancheIcon} className="w-[14px] rounded-full" />
      ),
      decimal: 6,
      chain: avalanche,
      rpc: "https://avalanche.drpc.org",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "USDT",
      address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      chainIcon: (
        <img alt="" src={avalancheIcon} className="w-[14px] rounded-full" />
      ),
      icon: <USDTIcon className="w-[24px]" />,
      decimal: 6,
      chain: avalanche,
      rpc: "https://avalanche.drpc.org",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },

    {
      name: "DAI",
      address: "0xd586e7f844cea2f87f50152665bcbc2c279d8d70",
      icon: <DAIIcon className="w-[24px]" />,
      decimal: 18,
      chainIcon: (
        <img alt="" src={avalancheIcon} className="w-[14px] rounded-full" />
      ),
      chain: avalanche,
      rpc: "https://avalanche.drpc.org",
      contract: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
    },
  ]);

  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [periodMax, setPeriodMax] = useState(false);
  const [inputValue, setInputValue] = useState();
  const { mutateAsync: sendTransaction } = useSendAndConfirmTransaction();
  const switchChain = useSwitchActiveWalletChain();

  const contracts = [
    {
      address: "0x23a0dc68691019F5dbcE4990B394A9cA03a16d07",
      rpc: "https://ethereum-rpc.publicnode.com",
    },
    {
      address: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
      rpc: "https://arbitrum-one.publicnode.com",
    },
    {
      address: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
      rpc: "https://optimism-rpc.publicnode.com",
    },
    {
      address: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
      rpc: "https://polygon-bor-rpc.publicnode.com",
    },
    {
      address: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
      rpc: "https://base-rpc.publicnode.com",
    },
    {
      address: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
      rpc: "https://bsc-pokt.nodies.app",
    },
    {
      address: "0x479f2c91bEb8eC3C6238cd155a5b880875B6Fa1a",
      rpc: "https://avalanche-c-chain-rpc.publicnode.com",
    },
  ];

  const findToken = (address, item) => {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].address === address) {
        return tokens[i];
      }
    }
  };

  const queryBalance = async () => {
    if (!connected_account_ethereum) return;
    try {
      const Erc20Contract = new ethers.Contract(
        selectedToken.address,
        ERC20_abi,
        new ethers.JsonRpcProvider(selectedToken.rpc)
      );
      const res = await Erc20Contract.balanceOf(connected_account_ethereum);
      setBalance(
        selectedToken.decimal === 18
          ? ethers.formatEther(res)
          : ethers.formatUnits(res, "mwei")
      );
    } catch (error) {
      console.log(error.toString());
    }
  };

  const queryDeposit = async () => {
    if (!connected_account_ethereum) return;
    let deposits = [];

    for (let i = 0; i < contracts.length; i++) {
      try {
        const LockContract = new ethers.Contract(
          contracts[i].address,
          LockERC20_abi,
          new ethers.JsonRpcProvider(contracts[i].rpc)
        );
        const res = await LockContract.getDeposits(connected_account_ethereum);
        if (res.length) deposits = deposits.concat(res);
      } catch (error) {
        console.log(error.toString());
        toast.error(
          "Failed to connect to RPC node.. Please check again some time later."
        );
      }
    }
    setPositions(deposits);
  };

  useEffect(() => {
    queryBalance();
  }, [connected_account_ethereum, updateFlag, selectedToken]);

  useEffect(() => {
    queryDeposit();
  }, [connected_account_ethereum, updateFlag]);

  const activeChain = useActiveWalletChain();
  // useEffect(() => {}, [selectedToken.chain]);

  const handleDeposit = async () => {
    if (Number(amount) < 1) {
      toast.error("Insufficient amount to deposit!");
      return;
    }

    if (activeChain.id !== selectedToken.chain.id) {
      try {
        toast.loading("Switching to destination chain..");
        if (connected_account_ethereum) await switchChain(selectedToken.chain);
        toast.dismiss();
        toast.success("Wallet Switched successfully!");
      } catch (error) {
        console.log(error);
        toast.dismiss();
        toast.error("Switching failed!");
        return;
      }
    }

    let hash = await writeContract(
      selectedToken.chain,
      selectedToken.address,
      "function approve(address _spender, uint _value)",
      [
        selectedToken.contract,
        selectedToken.decimal === 18
          ? ethers.parseEther(amount.toString().replace(",", ""))
          : ethers.parseUnits(amount.toString().replace(",", ""), "mwei"),
      ],
      sendTransaction
    );
    // let hash = 1;
    if (hash) {
      hash = await writeContract(
        selectedToken.chain,
        selectedToken.contract,
        "function LockTokens(address token_address, uint256 amount, uint256 period_weeks, bool dec)",
        [
          selectedToken.address,
          selectedToken.decimal === 18
            ? ethers.parseEther(amount.toString().replace(",", ""))
            : ethers.parseUnits(amount.toString().replace(",", ""), "mwei"),
          weeks,
          false,
        ],
        sendTransaction
      );
      if (hash) {
        const res = await api("lockdrop/addDeposit", {
          address: connected_account_ethereum,
          deposit_asset: selectedToken.address,
          chain_id: selectedToken.chain.id,
          deposit_amount: amount,
          usdc_amount: amount,
          lock_weeks: weeks,
          txhash: hash,
        });

        setUpdateFlag(!updateFlag);
        setConfetti(true);

        toast.success(`You deposited your tokens successfully! Tx: ${hash}`);
      }
    }
  };

  const checklist = async () => {
    if (!connected_account_ethereum) return;
    const res = await api("locklist/add", {
      address: connected_account_ethereum,
    });
    if (res) setShowModal(true);
  };

  useEffect(() => {
    checklist();
  }, [connected_account_ethereum]);

  const handleClick = async () => {
    if (!connected_account_ethereum) {
      // dispatch(setConnectModal(true));
    } else {
      handleDeposit();
    }
  };

  useEffect(() => {
    setInputValue(selectedToken.name);
    setOpenPop(false);
  }, [selectedToken]);

  const sortTokens = () => {
    let copy = tokens;
    copy.sort((a, b) => {
      const aIncludes = a.name
        .toUpperCase()
        .includes(inputValue?.toUpperCase());
      const bIncludes = b.name
        .toUpperCase()
        .includes(inputValue?.toUpperCase());
      if (aIncludes && !bIncludes) {
        return -1; // a comes before b
      } else if (!aIncludes && bIncludes) {
        return 1; // b comes before a
      } else {
        return 0; // equal, keep original order
      }
    });
    setTokens(copy);
  };

  useEffect(() => {
    sortTokens();
  }, [inputValue]);

  useEffect(() => {
    if (!openPop) setInputValue(selectedToken.name);
  }, [openPop]);

  useEffect(() => {
    if (maxFlag) setAmount(balance);
  }, [maxFlag]);

  useEffect(() => {
    if (periodMax) setWeeks(52);
  }, [periodMax]);

  useEffect(() => {
    if (amount < balance) setMaxFlag(false);
  }, [amount]);

  useEffect(() => {
    if (weeks)
      setDate(
        new Date((new Date().getTime() / 1000 + weeks * 7 * 86400) * 1000)
      );
    if (weeks < 52) setPeriodMax(false);
  }, [weeks]);

  return (
    <div className="w-full max-h-[calc(100vh-80px)] mt-[80px] sm:mb-0 mb-[80px] overflow-auto">
      <div className="sm:w-[800px] w-[96vw] flex flex-col items-center mx-auto my-6 space-y-4">
        <div className="flex sm:gap-2 gap-1 items-center justify-start">
          <Logo className="sm:h-[50px] h-[30px]" />
          <svg
            className="sm:max-h-[20px] h-[10px]"
            width="46"
            height="49"
            viewBox="0 0 46 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.1014 29.7976L9.69738 48.802H0.975586L18.511 24.1973L1.89367 0.510742H10.9827L23.1932 18.4134L35.4955 0.510742H44.2173L27.6918 24.0137L45.2272 48.802H36.0464L23.1014 29.7976Z"
              fill="#323260"
            />
          </svg>

          <img alt="" src={saiLogo} className="sm:max-h-[50px] max-h-[30px]" />
        </div>
        {showNoti && (
          <div className="relative w-full text-[#202020] font-normal rounded-lg border-[1px] bg-white sm:p-4 p-2 pl-1 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <div className="w-full flex items-start sm:gap-2">
              <svg
                className="min-w-[50px] max-h-[50px]"
                width="72"
                height="77"
                viewBox="0 0 72 77"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_dd_3007_73884)">
                  <g filter="url(#filter1_ii_3007_73884)">
                    <path
                      d="M28 11.1188C32.9504 8.26068 39.0496 8.26068 44 11.1188L55.7128 17.8812C60.6632 20.7393 63.7128 26.0214 63.7128 31.7376V45.2624C63.7128 50.9786 60.6632 56.2607 55.7128 59.1188L44 65.8812C39.0496 68.7393 32.9504 68.7393 28 65.8812L16.2872 59.1188C11.3368 56.2607 8.28719 50.9786 8.28719 45.2624V31.7376C8.28719 26.0214 11.3368 20.7393 16.2872 17.8812L28 11.1188Z"
                      fill="url(#paint0_linear_3007_73884)"
                    />
                  </g>
                  <path
                    d="M32.5833 50.2163L37.0597 27.1278C37.1894 26.4615 37.7355 26.0089 38.2797 26.1157C38.7464 26.2062 39.06 26.6788 39.06 27.231C39.06 27.3234 39.051 27.4193 39.033 27.5153L34.5566 50.6038C34.4268 51.2701 33.8808 51.7227 33.3366 51.6159C32.8698 51.5254 32.5563 51.0528 32.5563 50.5006C32.5563 50.4082 32.5653 50.3123 32.5833 50.2163Z"
                    fill="white"
                  />
                  <path
                    d="M34.6384 30.8051C34.5392 31.3193 34.0905 31.6904 33.5697 31.6904H28.8572L28.8374 31.6923L22.6274 38.864L28.8483 46.0483L28.8572 46.0393H30.3638C31.0486 46.0393 31.564 46.6676 31.4324 47.3429C31.3333 47.8571 30.8846 48.2283 30.3638 48.2283H28.8572C28.2733 48.2283 27.7057 47.9965 27.3002 47.591L20.9821 40.298C20.6073 39.9069 20.4 39.3999 20.4 38.864C20.4 38.328 20.6055 37.8211 20.9821 37.4318L27.2462 30.1967L27.302 30.137C27.7093 29.7332 28.277 29.5015 28.859 29.5015H33.5715C34.2545 29.5015 34.7699 30.1297 34.6384 30.8051Z"
                    fill="white"
                  />
                  <path
                    d="M44.3149 30.1388L46.3495 32.4871H49.3554C49.7591 32.4871 50.0871 32.8166 50.0871 33.2222V34.0877C50.0871 34.4932 49.7591 34.8228 49.3554 34.8228H48.3715L50.6331 37.4336C51.0079 37.8247 51.2152 38.3317 51.2152 38.8658C51.2152 39.4017 51.0097 39.9087 50.6331 40.298L44.369 47.5312L44.3131 47.591C43.9059 47.9965 43.3382 48.2283 42.7543 48.2283H38.0437C37.3589 48.2283 36.8435 47.6 36.9732 46.9247C37.0723 46.4105 37.5211 46.0393 38.0437 46.0393L42.7759 46.0375L48.986 38.8658L42.767 31.6814L42.7562 31.6904H41.2496C40.5648 31.6904 40.0494 31.0622 40.1809 30.3869C40.28 29.8726 40.7288 29.5015 41.2496 29.5015H42.7562C43.34 29.5015 43.9077 29.735 44.3149 30.1388Z"
                    fill="white"
                  />
                  <path
                    d="M42.4824 36.7402L44.0214 38.5164C44.1132 38.6123 44.1637 38.7354 44.1637 38.8658C44.1637 38.9961 44.1132 39.1193 44.0214 39.2152L42.495 40.9769L42.4824 40.9914C42.3832 41.0892 42.2445 41.1471 42.1021 41.1471H41.0497C40.7974 41.1471 40.5938 40.9425 40.5938 40.6891V37.0426C40.5938 36.7891 40.7974 36.5845 41.0497 36.5845H42.1021C42.2445 36.5845 42.3832 36.6406 42.4824 36.7402Z"
                    fill="white"
                  />
                  <path
                    d="M29.9311 40.9802L28.0623 40.1437C27.9848 40.1093 27.9344 40.0314 27.9344 39.9463V37.7827C27.9344 37.6976 27.9848 37.6198 28.0623 37.5853L29.9311 36.7488C30.0501 36.6963 30.1834 36.6963 30.3023 36.7488L32.1711 37.5853C32.2486 37.6198 32.2991 37.6976 32.2991 37.7827V39.9463C32.2991 40.0314 32.2486 40.1093 32.1711 40.1437L30.3023 40.9802C30.1834 41.0345 30.0482 41.0345 29.9311 40.9802Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dd_3007_73884"
                    x="-4"
                    y="-1.5"
                    width="80"
                    height="80"
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
                      result="effect1_dropShadow_3007_73884"
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
                      in2="effect1_dropShadow_3007_73884"
                      result="effect2_dropShadow_3007_73884"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_3007_73884"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_ii_3007_73884"
                    x="8.28717"
                    y="4.9751"
                    width="55.4257"
                    height="67.0498"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_3007_73884"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="-4" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_3007_73884"
                      result="effect2_innerShadow_3007_73884"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_3007_73884"
                    x1="36.6154"
                    y1="6.5"
                    x2="36.6154"
                    y2="69.2692"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#4E59FA" />
                    <stop offset="1" stop-color="#24DBFE" />
                  </linearGradient>
                </defs>
              </svg>

              <div>
                <div className="sm:text-[20px] text-[16px] font-semibold">
                  Coded Estate Rewards!
                </div>
                <div className="text-[14px] sm:text-[16px]">
                  Be super early and deposit liquidity ahead of mainnet for an
                  opportunity to participate in Bybit's campaign as well as earn
                  Coded Estate points & more.
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer absolute top-4 right-4"
              onClick={() => setShowNoti(false)}
            >
              <CloseIcon />
            </div>
          </div>
        )}

        <div className="flex sm:flex-row flex-col items-center space-y-2 justify-between w-full">
          <div className="text-[20px] font-semibold text-center">
            {tab === 0
              ? "Deposit liquidity with Coded Estate"
              : "Manage your liquidity provided on Coded Estate"}
          </div>
          <SelectionGroup
            className="px-[6px] py-[4px] text-[14px] gap-[8px] flex items-center rounded-[14px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
            defaultItem={tab}
            // SelectedItemMask={maskString}
          >
            <SelectionItem
              SelectedItem={
                <div className="py-1 cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">Overview</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => {
                    setTab(0);
                  }}
                  className="py-1 cursor-pointer hover:bg-white rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">Overview</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="py-1 cursor-pointer bg-white rounded-[10px] w-[120px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-black font-semibold">My position</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => {
                    setTab(1);
                  }}
                  className="py-1 cursor-pointer hover:bg-white rounded-[10px] w-[120px] flex justify-center"
                >
                  <div className="text-[#959595]">My position</div>
                </div>
              }
            />
          </SelectionGroup>
        </div>
        {tab === 0 && (
          <Fade className="w-full">
            <div className="w-full text-[#202020] font-normal rounded-lg border-[1px] bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              Connect your wallet, enter the amount of liquidity to deposit and
              select how long you would like to deposit your liquidity with
              Coded Estate.
              <br />
              <br />
              Tip: You need a minimum of $10 in liquidity to participate and you
              can deposit different amounts for different periods within the
              pool.{" "}
              <span className="font-semibold text-[#5b1dee]">
                Rewards accrue relative to lock in period and stake in the pool
              </span>
            </div>
            <div className="w-full text-[#202020] font-normal rounded-lg border-[1px] bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="except flex items-center justify-between text-[18px] rounded-lg py-2 px-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div className="flex items-center gap-3">
                  <Popover
                    isOpen={openPop}
                    positions={["bottom"]}
                    onClickOutside={() => setOpenPop(false)}
                    content={
                      <div className="except max-h-[300px] overflow-auto scrollbarwidth bg-white py-1 mt-2 w-[130px] h-max shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                        {tokens.map((token, i) => {
                          return (
                            <div
                              onClick={() => {
                                setSelectedToken(token);
                                setOpenPop(false);
                              }}
                              className="flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-[#d0d0d0]"
                            >
                              <>
                                <div className="relative">
                                  {token.icon}
                                  <div className="absolute bottom-0 right-[-4px]">
                                    {token.chainIcon}
                                  </div>
                                </div>
                                {
                                  <span className="text-[16px]">
                                    {token.name}
                                  </span>
                                }
                              </>
                            </div>
                          );
                        })}
                      </div>
                    }
                  >
                    <div
                      onClick={() => setOpenPop(true)}
                      className="flex items-center gap-2 cursor-pointer w-[120px]"
                    >
                      {
                        <>
                          <div className="relative">
                            {selectedToken.icon}
                            <div className="absolute bottom-0 right-[-4px]">
                              {selectedToken.chainIcon}
                            </div>
                          </div>
                          {
                            // <div >
                            //   {selectedToken.name}
                            // </div>
                            <input
                              className="text-[16px] w-[46px] outline-none"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onBlur={() => setInputValue(selectedToken.name)}
                            />
                          }
                        </>
                      }
                      <ArrowToDownHeader />

                      <div className="w-[2px] bg-[#E3E3E3] h-[20px]" />
                    </div>
                  </Popover>
                  <div className="text-[14px] sm:block hidden">
                    {selectedToken.chain.name}
                  </div>
                </div>
                <NumericFormat
                  max={balance}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  thousandSeparator
                  className="font-semibold text-end outline-none w-[100px]"
                />
                {/* <input
                  className="font-semibold text-end outline-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                /> */}
              </div>
              <div className="flex sm:flex-row space-y-2 flex-col sm:items-center justify-between font-semibold mt-3 mb-6">
                <div className="min-w-[200px] mt-2">Available to Deposit</div>
                <div className="flex items-center justify-between w-full">
                  <NumericFormat
                    value={balance}
                    thousandSeparator
                    decimalScale={4}
                    fixedDecimalScale
                    disabled
                    className="font-semibold text-end outline-none w-[100px]"
                  />
                  <div className="flex gap-2 items-center">
                    <span>Max</span>
                    <Toggle
                      status={maxFlag}
                      onChange={() => setMaxFlag(!maxFlag)}
                    />
                  </div>
                </div>
              </div>
              {/* <RangeSlider
                className="single-thumb"
                min={0}
                max={balance}
                onInput={(e) => setAmount(e[1])}
                value={[0, amount]}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled
              /> */}
            </div>
            <div className="w-full text-[#202020] font-normal rounded-lg border-[1px] bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="text-[20px] font-semibold">
                Select deposit period
              </div>
              <div className="text-[#202020] font-normal">
                Your liquidity will be default be locked until the end of
                pre-season (12 weeks) unless you elected otherwise. The longer
                liquidity is locked the more rewards.
              </div>
              <div
                // onClick={() => setShowModal(true)}
                className="mb-6 mt-4 cursor-pointer hover:bg-[#f6f6f6] px-[12px] flex sm:flex-row flex-col space-y-2 justify-between text-[#5b1dee] w-full pb-[14px] pt-1 rounded-[16px] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              >
                {/* <div>
                  {date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div> */}
                {/* <CalenderIcon /> */}
                <div className="sm:min-w-[400px] mt-2">
                  Locking weeks : (1 to 52) after mainnet launch
                </div>

                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-2">
                    <div>Max</div>
                    <Toggle
                      status={periodMax}
                      onChange={() => setPeriodMax(!periodMax)}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      value={weeks}
                      onChange={(e) => setWeeks(e.target.value)}
                      className="outline-none w-[50px]"
                      type="number"
                      min={1}
                      max={52}
                    />
                  </div>
                </div>
              </div>
              {/* <RangeSlider
                className="single-thumb mb-4"
                min={new Date().getTime() / 1000}
                max={new Date().getTime() / 1000 + 52 * 7 * 86400}
                // defaultValue={[0, 50]}
                value={[new Date().getTime() / 1000, date.getTime() / 1000]}
                // onInput={(e) => setDate(new Date(e[1] * 1000))}
                thumbsDisabled={[true, false]}
                rangeSlideDisabled
              /> */}
            </div>
            {/* <div className="w-full grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border-[1px] bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <Logo />
                <div>
                  {(
                    amount *
                    0.0000000001 *
                    (date.getTime() - Date.now())
                  ).toFixed(2)}{" "}
                  ESTATE
                </div>
                <div className="text-[#5A5A5A] font-normal">
                  Est. ESTATE Rewards
                </div>
              </div>
              <div className="flex flex-col justify-center items-center space-y-2 rounded-lg border-[1px] bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <div>{1.25}%</div>
                <div className="text-[#5A5A5A] font-normal">
                  My current share of this pool’s ESTATE rewards
                </div>
              </div>
            </div> */}
            <div className="w-full">
              <PurpleButton
                disabled={!connected_account_ethereum}
                text="Deposit Tokens"
                onClick={handleClick}
              />
            </div>
            <div className="w-full text-center text-[#B6B6B6] font-normal">
              Powered by Coded Estate & Sai by Nibiru
            </div>
          </Fade>
        )}
        {tab === 1 && (
          <div className="w-full flex gap-4">
            <div className="w-full space-y-4">
              {connected_account_ethereum ? (
                <div className="w-full text-[#202020] font-normal rounded-lg border-[1px] bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="flex items-center gap-2">
                    {positions.length ? (
                      <>
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 8.5H21"
                            stroke="#323232"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.866 5.995L10.861 6L10.866 6.005L10.871 6L10.866 5.995"
                            stroke="#323232"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.32703 5.995L8.32203 6L8.32703 6.005L8.33203 6L8.32703 5.995"
                            stroke="#323232"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.77905 5.99012L5.77405 5.99512L5.77905 6.00012L5.78405 5.99512L5.77905 5.99012"
                            stroke="#323232"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 21.5H4.9989C3.89494 21.5 3 20.6051 3 19.5011V5.5C3 4.39543 3.89543 3.5 5 3.5H19.0011C20.1051 3.5 21 4.39494 21 5.4989V11.5"
                            stroke="#323232"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.0405 16.1189V20.4999C14.0421 21.0515 14.4889 21.4983 15.0405 21.4999H20.0405C20.5928 21.4999 21.0405 21.0522 21.0405 20.4999V16.1875"
                            stroke="#323232"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M22 17L18.1462 13.7368C17.7733 13.4211 17.2267 13.4211 16.8538 13.7368L13 17"
                            stroke="#323232"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="font-semibold text-[18px]">
                          Positions Overview
                        </span>
                        <span className="sm:block hidden">
                          (Remaining weeks after Mainnet)
                        </span>
                      </>
                    ) : (
                      <span className="text-[18px] w-full text-center">
                        Deposit Liquidity to view position
                      </span>
                    )}
                  </div>

                  {positions.map((position) => {
                    const token = findToken(position[3]);
                    return (
                      <div className="grid grid-cols-3 w-full items-end mt-4">
                        <div className="space-y-1">
                          <div className="text-[12px] font-semibold text-[#5A5A5A]">
                            Your Stake
                          </div>
                          <div className="text-[12px] font-semibold">
                            ${" "}
                            {token.decimal === 18
                              ? Number(ethers.formatUnits(position[0])).toFixed(
                                  2
                                )
                              : Number(
                                  ethers.formatUnits(position[0], "mwei")
                                ).toFixed(2)}
                          </div>
                          <div className="flex gap-2 sm:flex-row flex-col">
                            <div className="text-[12px] text-[#5A5A5A]">
                              <div className="flex items-center gap-2">
                                {token.decimal === 18
                                  ? Number(
                                      ethers.formatUnits(position[0])
                                    ).toFixed(2)
                                  : Number(
                                      ethers.formatUnits(position[0], "mwei")
                                    ).toFixed(2)}{" "}
                                <div className="relative">
                                  {token.icon}
                                  <div className="absolute bottom-0 right-[-4px]">
                                    {token.chainIcon}
                                  </div>
                                </div>
                                <div className="sm:block hidden">
                                  {token.name}
                                </div>
                              </div>
                            </div>

                            {/* <div className="text-[12px] text-[#5A5A5A]">
                              at{" "}
                              {new Date(
                                Number(position[2]) * 1000
                              ).toUTCString()}
                            </div> */}
                          </div>
                        </div>

                        {/* <div className="space-y-1">
                          <div className="text-[12px] font-semibold text-[#5A5A5A]">
                            Available to claim
                          </div>
                          <div className="text-[12px] font-semibold">
                            Not available yet
                          </div>
                          <div className="text-[12px] text-[#5A5A5A]">
                            ${" "}
                            {token.decimal === 18
                              ? ethers.formatEther(position[0])
                              : ethers.formatUnits(position[0], "mwei")}
                          </div>
                        </div> */}

                        <div className="space-y-1">
                          <div className="text-[12px] font-semibold text-[#5A5A5A]">
                            Locking weeks
                          </div>
                          <div className="text-[12px] font-semibold">
                            {position[1].toString()}
                          </div>
                        </div>
                        <div className="w-full flex justify-end">
                          <PurpleButton text="Claim" disabled />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2 py-[60px] w-full text-[#202020] font-normal rounded-lg border-[1px] bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <div className="text-[14px]">Make a deposit to view data</div>
                  <div className="text-[#959595] text-[12px]">
                    Connect wallet to see performance of your position
                  </div>
                  {/* <PurpleButton
                    text={
                      connected_account_ethereum
                        ? truncateWalletAddress(connected_account_ethereum)
                        : "Connect wallet"
                    }
                    // onClick={tryConnect}
                  /> */}
                </div>
              )}
            </div>
            {/* <div className="w-full h-max text-[#202020] font-normal rounded-lg bg-white p-4 shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <div className="rounded-lg mb-4 bg-[#F6F6F6] border-[1px] p-4 w-full">
                <div className="w-full flex items-center justify-between">
                  <span className="font-semibold">Your Deposit</span>
                  <span className="font-semibold">$5000</span>
                </div>
                <div className="w-full flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <NUSDIcon />
                    <span className="text-[16px]">USDC</span>
                    <ArrowToDownHeader />
                  </div>
                  <span className="font-semibold">50000</span>
                </div>
                <div className="w-full flex items-center justify-between mt-2">
                  <div className="text-[#5A5A5A] font-semibold text-[14px]">
                    Available: 0 NUSD
                  </div>
                  <div className="flex gap-2 text-[12px]">
                    <div className="px-2 bg-white border-[1px] rounded-md">
                      Half
                    </div>
                    <div className="px-2 bg-white border-[1px] rounded-md">
                      Max
                    </div>
                  </div>
                </div>
              </div>
              <PurpleButton
                text={
                  connected_account_ethereum ? truncateWalletAddress(connected_account_ethereum) : "Connect wallet"
                }
                onClick={tryConnect}
              />
            </div> */}
          </div>
        )}
      </div>
      <Modal
        center
        open={confetti}
        classNames={{ modal: "rounded-lg h-[310px]" }}
        onClose={() => setConfetti(false)}
      >
        <div className="sm:max-w-[300px] relative">
          <div className="top-0 absolute">
            <Lottie animationData={confettiJson} loop={false} />
          </div>
          <div className="">
            <Lottie animationData={checkMarkJson} loop={false} />
          </div>
          <div className="text-[20px] font-semibold w-full flex flex-col items-center absolute top-[160px]">
            <div className="">Successfully deposited</div>
            <div className="flex items-center gap-2 mt-2">
              <div>{selectedToken.icon}</div>
              <div>{amount}</div>
              <div>{selectedToken.name}</div>
            </div>

            <div
              onClick={() => setConfetti(false)}
              className="text-[16px] mt-3 font-normal w-full text-center hover:translate-y-[-6px] shadow-[0px_2px_20px_4px_rgba(34,193,230,0.5)] cursor-pointer text-white py-2 rounded-xl bg-gradient-to-b from-[#4E59FA] to-[#24DBFE]"
            >
              Got it, Thanks!
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        center
        classNames={{ modal: "rounded-lg" }}
      >
        <div>
          <div className="font-semibold text-[20px]">Wallet Confirmation</div>
          {/* <Calendar
            minDate={addDays(new Date(), 4)}
            date={date}
            onChange={(e) => setDate(e)}
          /> */}
          <p className="font-semibold">
            By verifying your wallet, you agree to our Terms of service.
          </p>
          <div className="max-w-[500px] max-h-[140px] overflow-auto scrollbarwidth">
            <br />
            <ul style={{ listStyleType: "disc" }} className="ml-6 space-y-1">
              <li>
                I understand DeFi is a new phenomenon, and understand and
                undertake any technological and market risks associated with it.
              </li>
              <li>
                I am aware that virtual assets may be subject to extreme
                volatility and may in part of fully lose their value in future.
              </li>
              <li>
                I confirm that I am not a person or company who is a resident
                of, or is located, incorporated or has a registered agent in,
                the United States or a restricted location*.
              </li>
              <li>
                I will not in the future access this website while located in
                the United States or a restricted location*.
              </li>
              <li>
                I confirm that I am not using, and will not in the future use, a
                VPN to mask my physical location from a restricted location*.
              </li>
              <li>
                I am aware of the early liquidity campaign and wish to proceed
                to partake should I deposit liquidity.
              </li>
            </ul>
            <br /> I am aware restricted locations include: USA, Afghanistan,
            Algeria, Andorra, Bangladesh, Belarus, Bolivia, Burma (Myanmar),
            Burundi, Congo, Democratic Republic of Congo, Gaza Strip, Guinea,
            Guinea-Bissau, Iran, Iraq, North Korea, Kosovo, Kyrgyzstan (Kyrgyz
            Republic), Lebanon, Liberia, Libya, Palestine, Russia, Ukraine -
            Zaporizhzhia Region, Ukraine - Kherson Region, Somalia, South Sudan,
            Syria, Zimbabwe
          </div>
          <hr />

          <div className="mt-4 w-full">
            <PurpleButton text="Accept" onClick={() => setShowModal(false)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

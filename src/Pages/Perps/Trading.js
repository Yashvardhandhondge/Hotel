import UAE from "../../assets/images/Perps/UAE.png";
import { Chart } from "./Chart";
import {
  SelectionGroup,
  SelectionItem,
} from "../../Components/Selection/Selection";
import {
  ArrowToDownHeader,
  ArrowToLeft,
  CloseIcon,
  LightIcon,
  NibiruIcon,
  NUSDIcon,
} from "../../AssetComponents/Images";
import InputSlider from "react-input-slider";
import { PureComponent, useEffect, useState } from "react";
import { BlackButton } from "../../Components/Buttons/BlackButton";
import Modal from "react-responsive-modal";
import { PurpleButton } from "../../Components/Buttons/PurpleButton";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Toggle } from "../../Components/Toggle/Toggle";
import { GreenButton } from "../../Components/Buttons/GreenButton";
import { useNavigate } from "react-router-dom";
import {
  executeContract,
  queryContract,
} from "../../Components/functions/Contract";
import { Testnet } from "@nibiruchain/nibijs";
import { useDispatch, useSelector } from "react-redux";
import TradingViewWidget from "./TradingView/TradingViewWidget";
import axios from "axios";

export const Trading = () => {
  const [leverage, setLeverage] = useState(3);
  const [amount, setAmount] = useState(100);
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const diff = useSelector((state) => state.time.diffToUTC);

  const [tab, setTab] = useState(0);
  const [longShort, setLongShort] = useState(0);
  const [list, setList] = useState(0);
  const dispatch = useDispatch();
  const [modalFlag, setModalFlag] = useState(0);
  const account = useSelector((state) => state.auth.account);
  const open_price = useSelector((state) => state.perps.crypto.btc);
  const [leverage_value, setLeverageValue] = useState(1.1);
  const [tp, setTp] = useState(100000);
  const [sl, setSl] = useState(80000);
  // Your label values
  const labels = [1, 2, 5, 10, 25, 50, 100];

  // Mapping values to slider values
  const logScale = (val) => Math.log(val);
  const revLogScale = (val) => Math.exp(val);
  const handleChange = (val) => {
    const newValue = revLogScale(val).toFixed(1);
    setLeverageValue(newValue);
  };

  const [trades, setTrades] = useState([]);

  const getMarkets = async () => {
    const message = {
      get_trades: {
        trader: account,
      },
    };
    const res = await queryContract(
      process.env.REACT_APP_PERP_SMART_CONTRACT,
      message,
      Testnet(1).endptTm
    );
    console.log(res);
    setTrades(res);
  };

  const getOis = async () => {
    const message = {
      get_borrowing_pair_oi: {
        collateral_index: 1,
        market_index: 0,
      },
    };

    const res = await queryContract(
      process.env.REACT_APP_PERP_SMART_CONTRACT,
      message,
      Testnet(1).endptTm
    );

    console.log(res);
  };

  const handleOpenTrade = async () => {
    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );

    const testnet = Testnet(1);
    const message = {
      open_trade: {
        market_index: "MarketIndex(0)",
        leverage: leverage_value.toString(),
        long: true,
        collateral_index: "TokenIndex(1)",
        trade_type: "trade",
        open_price: open_price.toString(),
        tp: tp.toString(),
        sl: sl.toString(),
        slippage_p: "1",
      },

      // add_minter: {
      //   address: process.env.REACT_APP_VAULT_SMART_CONTRACT,
      // },

      // deposit: {},

      // update_expiration_time: {
      //   expiration_time: 864000,
      // },
      // set_price: {
      //   token_id: 1,
      //   price_usd: open_price.toString(),
      // },
    };

    const res = await executeContract(
      null,
      null,
      currentTime,
      testnet.chainId,
      testnet.endptTm,
      process.env.REACT_APP_PERP_SMART_CONTRACT,
      // process.env.REACT_APP_ORACLE_SMART_CONTRACT,
      // process.env.REACT_APP_VAULT_TOKEN_MINTER_SMART_CONTRACT,
      // process.env.REACT_APP_VAULT_SMART_CONTRACT,
      dispatch,
      null,
      null,
      message,
      account,
      "leap"
      // [
      //   {
      //     amount: amount,
      //     denom:
      //       "tf/nibi13vuql6pp0m84nl73aya4hnnwyj896hthkjkwe8crcl023qd2nzgqcmqhlj/utestate",
      //   },
      // ]
    );
    await getMarkets();
  };

  const handleCloseTrade = async (tradeIndex) => {
    const currentTime = new Date(
      (Math.floor(new Date().getTime() / 1000) + diff) * 1000
    );

    const testnet = Testnet(1);
    const message = {
      close_trade_market: {
        trade_index: tradeIndex,
      },
    };

    // const message = {
    //   update_open_limit_order: {
    //     trade_index: tradeIndex,
    //     price: "95000",
    //     tp: "98000",
    //     sl: "90000",
    //     slippage_p: "2",
    //   },
    // };

    const res = await executeContract(
      null,
      null,
      currentTime,
      testnet.chainId,
      testnet.endptTm,
      process.env.REACT_APP_PERP_SMART_CONTRACT,
      dispatch,
      null,
      null,
      message,
      account,
      "leap"
    );
  };

  useEffect(() => {
    if (account) {
      getMarkets();
      getOis();
    }
  }, [account]);

  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-auto">
      <div className="flex gap-[20px] w-[80vw] mx-auto my-[20px]">
        <div className="w-[calc(80vw-300px)] h-max">
          <div
            onClick={() => navigate(-1)}
            className="w-full cursor-pointer flex gap-2 rounded-[8px] px-2 py-3 hover:bg-[#f6f6f6] bg-white shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
          >
            <ArrowToLeft />
            <div>Back to Market Page</div>
          </div>

          <div className="w-full bg-white mt-3 p-[16px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            {/* <div className="flex items-center gap-[4px]">
              <img alt="" src={UAE} />
              <div className="w-[4px] rounded-full h-[4px] bg-[#aaaaaa]" />
              <div>UAE</div>
            </div> */}
            <div className="flex items-center gap-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2523_812)">
                  <path
                    d="M21.6628 13.6653C20.1957 19.5643 14.2203 23.1403 8.33665 21.6732C2.45296 20.2061 -1.13838 14.2307 0.328719 8.34706C1.79582 2.44809 7.7712 -1.12797 13.6549 0.339133C19.5539 1.79095 23.1299 7.76633 21.6628 13.6653Z"
                    fill="#F7931A"
                  />
                  <path
                    d="M15.8402 9.43212C16.0542 7.96501 14.9386 7.18562 13.4256 6.65074L13.9146 4.66404L12.7073 4.35839L12.2336 6.28396C11.9127 6.20755 11.5917 6.13114 11.2708 6.05473L11.7598 4.11387L10.5525 3.80823L10.0635 5.79493C9.8037 5.7338 9.54389 5.67267 9.29938 5.61154L7.63361 5.19892L7.31268 6.48263C7.31268 6.48263 8.21433 6.6813 8.18377 6.69658C8.6728 6.81884 8.7645 7.13977 8.74922 7.39957L8.18377 9.66135C8.21433 9.67663 8.26018 9.67663 8.30603 9.7072C8.26018 9.69191 8.22962 9.69192 8.18377 9.67663L7.38909 12.8401C7.32796 12.9929 7.17514 13.2068 6.83893 13.1304C6.85421 13.1457 5.96784 12.9165 5.96784 12.9165L5.37183 14.2919L6.9459 14.6892C7.23627 14.7656 7.52663 14.8421 7.80171 14.9185L7.2974 16.9204L8.5047 17.2261L8.99373 15.2394C9.32994 15.3311 9.63559 15.4075 9.95652 15.4839L9.46748 17.4553L10.6748 17.761L11.1791 15.759C13.2422 16.141 14.7857 15.9882 15.4429 14.1238C15.9625 12.6261 15.4123 11.755 14.3273 11.1896C15.0914 11.0215 15.6874 10.5019 15.8402 9.43212ZM13.0894 13.2985C12.7226 14.7962 10.1858 13.9862 9.37579 13.7876L10.0329 11.1285C10.8582 11.3271 13.4714 11.7397 13.0894 13.2985ZM13.4562 9.41683C13.12 10.777 11.011 10.0893 10.3386 9.92115L10.9346 7.50654C11.6223 7.67465 13.8229 7.99558 13.4562 9.41683Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2523_812">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="font-semibold">BTC</div>
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.58284 10.733C5.40654 13.4994 6.31838 14.8826 7.92229 14.8923C9.5262 14.9019 10.4749 13.4998 12.3722 10.6955C12.9606 9.82575 13.511 8.9534 14.0404 8.03968C15.6054 5.3387 16.3879 3.98821 15.6445 2.53308C14.901 1.07796 13.4077 0.926696 10.4211 0.624164C8.82597 0.462591 7.28873 0.458708 5.69645 0.612514C2.6629 0.90554 1.14612 1.05205 0.393564 2.49316C-0.358996 3.93427 0.430516 5.33917 2.00954 8.14897C2.5129 9.04468 3.02978 9.89409 3.58284 10.733Z"
                  fill="#5B1DEE"
                />
                <path
                  d="M3.58284 10.733C5.40654 13.4994 6.31838 14.8826 7.92229 14.8923C9.5262 14.9019 10.4749 13.4998 12.3722 10.6955C12.9606 9.82575 13.511 8.9534 14.0404 8.03968C15.6054 5.3387 16.3879 3.98821 15.6445 2.53308C14.901 1.07796 13.4077 0.926696 10.4211 0.624164C8.82597 0.462591 7.28873 0.458708 5.69645 0.612514C2.6629 0.90554 1.14612 1.05205 0.393564 2.49316C-0.358996 3.93427 0.430516 5.33917 2.00954 8.14897C2.5129 9.04468 3.02978 9.89409 3.58284 10.733Z"
                  fill="url(#paint0_linear_2635_6766)"
                  fill-opacity="0.18"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2635_6766"
                    x1="8"
                    y1="16.5"
                    x2="8"
                    y2="6.16667"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" />
                    <stop offset="1" stop-color="white" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex gap-[20px]">
              <table className="w-full">
                <tr className="w-full text-[#8A8A8A] text-[14px]">
                  <td>MARKET PRICE</td>
                  <td>OPEN INTEREST</td>
                  <td>MARKET SKEW</td>
                  <td>ID FUNDING RATE/VELOCITY</td>
                  <td>24H Change</td>
                  <td>24H High</td>
                  <td>24H Low</td>
                </tr>
                <tr className="">
                  <td>
                    <div className="flex items-center gap-1">
                      <div className="text-[#5DBE89]">${open_price}</div>
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.577 8.60812L10.7437 18.7118"
                          stroke="#5DBE89"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.1026 14.3001L16.5775 8.60836"
                          stroke="#5DBE89"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.8848 10.1333L16.5765 8.6082"
                          stroke="#5DBE89"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <div className="text-[#5DBE89]">4.75 %</div>
                    </div>
                  </td>
                  <td>$26.64M</td>
                  <td className="">
                    <span className="text-[#5DBE89]">50.3%</span>
                    <span className="mx-1 text-[#8A8A8A]">/</span>
                    <span className="text-[#EB4245]">49.7%</span>
                  </td>
                  <td>0.0763% / 0.0294%</td>
                  <td>
                    <span className="text-[#EB4245]">-9.7%</span>
                  </td>
                  <td>
                    <span>13.43</span>
                  </td>
                  <td>
                    <span>12.24</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div className="mt-4 bg-white w-full p-[10px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <div className="w-full flex justify-end">
              {/* <SelectionGroup
                className="px-[6px] w-max py-[4px] gap-[8px] flex items-center rounded-[14px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
              >
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[10px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">Week</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => {}}
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[100px] flex justify-center"
                    >
                      <div className="text-[#959595]">Week</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[10px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">Month</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => {}}
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[100px] flex justify-center"
                    >
                      <div className="text-[#959595]">Month</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[10px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">3 Month</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => {}}
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[100px] flex justify-center"
                    >
                      <div className="text-[#959595]">3 Month</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[10px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">6 Month</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => {}}
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[100px] flex justify-center"
                    >
                      <div className="text-[#959595]">6 Month</div>
                    </div>
                  }
                />
              </SelectionGroup> */}
            </div>
            {/* <Chart /> */}
            <TradingViewWidget />
          </div>

          <div className="mt-4 bg-white w-full p-[10px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <div className="w-full flex justify-between items-center">
              <SelectionGroup
                className="px-[6px] w-max flex py-[4px] gap-[8px] items-center rounded-[8px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                defaultItem={list}
              >
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[8px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">Trades</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => setList(0)}
                      className="cursor-pointer hover:bg-white rounded-[8px] w-[100px] flex justify-center"
                    >
                      <div className="text-[#959595]">Trades</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[8px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">Orders</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => setList(1)}
                      className="cursor-pointer hover:bg-white rounded-[8px] w-[100px] flex justify-center"
                    >
                      <div className="text-[#959595]">Orders</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[8px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">History</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => setList(2)}
                      className="cursor-pointer hover:bg-white rounded-[8px] w-[100px] flex justify-center"
                    >
                      <div className="text-[#959595]">History</div>
                    </div>
                  }
                />
              </SelectionGroup>
              {list === 0 && (
                <div className="flex gap-[10px]">
                  <div>
                    <div className="text-[12px] text-[#a6a6a6]">Collateral</div>
                    <div className="text-[12px]">$318</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-[#a6a6a6]">
                      Unrealized PnL
                    </div>
                    <div className="text-[12px] text-[#5DBE89]">
                      $10.44 (+1.45)
                    </div>
                  </div>
                </div>
              )}
            </div>
            <hr className="mt-3" />
            {list === 0 && (
              <table>
                <tr className="w-full h-[40px]">
                  <td className="w-[12.5%]">Pair</td>
                  <td className="w-[12.5%]">Size</td>
                  <td className="w-[12.5%]">Collateral</td>
                  <td className="w-[12.5%]">Open Price</td>
                  <td className="w-[20%]">Current/Liq.Price</td>
                  <td className="w-[12.5%]">SL/TP</td>
                  <td className="w-[12.5%]">uPnL</td>
                  <td className="w-[5%]">Actions</td>
                </tr>

                {trades?.map((trade) => {
                  if (trade.is_open)
                    return (
                      <tr
                        // onClick={() => {
                        //   setModalFlag(1);
                        //   setShowModal(true);
                        // }}
                        className="hover:bg-[#f0f0f0] cursor-pointer w-full font-normal border-t-[1px]"
                      >
                        <td>BTC/USD</td>
                        <td>
                          <div>
                            <div className="text-[12px] text-[#a6a6a6]">
                              {Number(trade.collateral_amount) / 1000000} USDC
                            </div>
                            <div className="text-[12px]">
                              {(
                                Number(trade.collateral_amount) /
                                1000000 /
                                trade.open_price
                              ).toFixed(7)}{" "}
                              BTC
                            </div>
                          </div>
                        </td>
                        <td>
                          {Number(trade.collateral_amount) / 1000000} USDC
                        </td>
                        <td>{trade.open_price}</td>
                        <td>
                          <div>
                            <div className="text-[12px] text-[#a6a6a6]">
                              {open_price}
                            </div>
                            <div className="text-[12px]">326</div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="text-[12px] text-[#a6a6a6]">
                              {trade.sl}
                            </div>
                            <div className="text-[12px]">{trade.tp}</div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="text-[12px] text-[#EB4245]">
                              -50 USDC
                            </div>
                            <div className="text-[12px] text-[#EB4245]">
                              (-10.5%)
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            onClick={() => {
                              handleCloseTrade(trade.user_trade_index);
                            }}
                          >
                            Close
                          </div>
                        </td>
                      </tr>
                    );
                })}
              </table>
            )}
            {list === 1 && (
              <table>
                <tr className="w-full h-[40px]">
                  <td className="w-[10%]">Type</td>
                  <td className="w-[10%]">Pair</td>
                  <td className="w-[10%]">Size</td>
                  <td className="w-[10%]">Leverage</td>
                  <td className="w-[10%]">Collateral</td>
                  <td className="w-[10%]">Trigger Price</td>
                  <td className="w-[10%]">Execution Price</td>
                  <td className="w-[10%]">Max Spread</td>
                  <td className="w-[10%]">SL/TP</td>
                  <td className="w-[10%]">Close</td>
                </tr>
                <tr
                  onClick={() => {
                    setModalFlag(2);
                    setShowModal(true);
                  }}
                  className="hover:bg-[#f0f0f0] cursor-pointer w-full font-normal border-t-[1px]"
                >
                  <td className="text-[#EB4245]">LIMIT</td>
                  <td>ESTATE/USDC</td>
                  <td>
                    <div>
                      <div className="text-[12px] text-[#a6a6a6]">300 USDC</div>
                      <div className="text-[12px]">0.45 ESTATE</div>
                    </div>
                  </td>
                  <td>2x</td>
                  <td>100 USDC</td>
                  <td>344</td>
                  <td>650</td>
                  <td>1%</td>
                  <td>
                    <div>
                      <div className="text-[12px] text-[#a6a6a6]">SL: None</div>
                      <div className="text-[12px]">TP: None</div>
                    </div>
                  </td>
                  <td>
                    <CloseIcon />
                  </td>
                </tr>
              </table>
            )}

            {list === 2 && (
              <table className="w-full">
                <tr className="w-full h-[40px]">
                  <td className="w-[10%]">Date</td>
                  <td className="w-[10%]">Pair</td>
                  <td className="w-[10%]">Type</td>
                  <td className="w-[10%]">Price</td>
                  <td className="w-[10%]">Lev</td>
                  <td className="w-[10%]">Coll</td>
                  <td className="w-[10%]">Size</td>
                  <td className="w-[10%]">PnL</td>
                  <td className="w-[10%]">%</td>
                </tr>
                <tr
                  onClick={() => {
                    setModalFlag(3);
                    setShowModal(true);
                  }}
                  className="hover:bg-[#f0f0f0] cursor-pointer w-full font-normal border-t-[1px]"
                >
                  <td>
                    <div className="flex items-center gap-[10px]">
                      <div>07/19</div>
                      <div className="text-[#a6a6a6] text-[12px]">07/19</div>
                    </div>
                  </td>
                  <td>ESTATE/USDC</td>
                  <td className="text-[#EB4245]">MARKET</td>
                  <td>657</td>
                  <td>2</td>
                  <td>200</td>
                  <td>400 USDC</td>
                  <td className="text-[#EB4245]">-100 USDC</td>
                  <td className="text-[#EB4245]">-5.8%</td>
                </tr>
              </table>
            )}
            {/* <>
            
            <div className="w-full justify-between items-center flex">
              <SelectionGroup
                className="px-[6px] w-max py-[4px] gap-[8px] flex items-center rounded-[14px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
                //   defaultItem={current}
                // SelectedItemMask={maskString}
              >
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[10px] w-[160px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">
                        Financial Details
                      </div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => {}}
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[160px] flex justify-center"
                    >
                      <div className="text-[#959595]">Financial Details</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[10px] w-[150px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">
                        Market Details
                      </div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => {}}
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[150px] flex justify-center"
                    >
                      <div className="text-[#959595]">Market Details</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[10px] w-[140px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">
                        Specifications
                      </div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div
                      onClick={() => {}}
                      className="cursor-pointer hover:bg-white rounded-[10px] w-[140px] flex justify-center"
                    >
                      <div className="text-[#959595]">Specifications</div>
                    </div>
                  }
                />
              </SelectionGroup>
              <div className="shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)] cursor-pointer hover:bg-white rounded-[10px] w-[120px] py-[4px] flex justify-center">
                <div className="text-[#959595]">Trades</div>
              </div>
            </div>
            <div className="flex gap-[4px] mt-4">
              <div className="text-[20px] font-semibold">Financials</div>
              <div className="border-dashed border-b-[1px] w-full h-4"></div>
            </div>
            <div className="grid grid-cols-2 gap-x-[20px] gap-y-[4px]">
              <div className="flex justify-between">
                <div className="text-[#959595]">Price Definition</div>
                <div>Median Price / sqft</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#959595]">52w Hi</div>
                <div>$934.57</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#959595]">24 Change</div>
                <div className="text-[#5DBE89]">+$0.49(0.05%)</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#959595]">52w Lo</div>
                <div>$825.25</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#959595]">Sharpe Ratio</div>
                <div>1.2442</div>
              </div>
              <div className="flex justify-between">
                <div className="text-[#959595]">Annual Volatility</div>
                <div>3.74%</div>
              </div>
            </div>
            <div className="flex gap-[4px] mt-4">
              <div className="text-[20px] font-semibold whitespace-nowrap">
                Markets Sentiment
              </div>
              <div className="border-dashed border-b-[1px] w-full h-4"></div>
            </div>
            <p>
              Majority money in this pool is{" "}
              <span className="text-[#5DBE89]">Long.</span>
            </p>
            <div className="mt-1 grid grid-cols-2 gap-x-[10px] gap-y-[10px]">
              <div className="rounded-[4px] w-full h-[20px] bg-[#5DBE89]"></div>
              <div className="rounded-[4px] w-full h-[20px] bg-[#EB4245]"></div>
            </div>
            <div className="mt-1 flex justify-between w-full">
              <div className="text-[#5DBE89]">Long Open Interest</div>
              <div className="text-[#EB4245]">Short Open Interest</div>
            </div>
            <div className="mt-1 flex justify-between w-full">
              <div className="flex items-center">
                <p>$13.38M</p>
                <div className="w-[4px] rounded-full h-[4px] bg-[#aaaaaa] mx-1" />
                <p>5.23%</p>
              </div>
              <div className="flex items-center">
                <p>$13.38M</p>
                <div className="w-[4px] rounded-full h-[4px] bg-[#aaaaaa] mx-1" />
                <p>5.23%</p>
              </div>
            </div>
            <div className="mt-1 flex justify-between w-full">
              <div className="">$12.06M</div>
              <div className="">$1.38M</div>
            </div>
            <div className="flex gap-[4px] mt-4">
              <div className="text-[20px] font-semibold whitespace-nowrap">
                Funding Rate
              </div>
              <div className="border-dashed border-b-[1px] w-full h-4"></div>
            </div>
            <p>
              The funding rate determines whether you{" "}
              <span className="text-[#EB4245]">lose</span> or{" "}
              <span className="text-[#5DBE89]">gain</span> funding on an open
              position based on your position’s direction. A positive rate
              result in Longs paying Shorts and a negative rate results in
              Shorts paying Longs.
            </p>

            <div className="flex gap-[20px] items-start mt-3">
              <div>
                <div className="border-dashed border-b-[1px] text-[#8A8A8A]">
                  Live Rate (1D)
                </div>
                <div className="text-[20px] font-semibold">0.0764%</div>
              </div>
              <div>
                <div className="border-dashed border-b-[1px] text-[#8A8A8A]">
                  1hr
                </div>
                <div className="text-[20px] font-semibold">0.0764%</div>
              </div>
              <div>
                <div className="border-dashed border-b-[1px] text-[#8A8A8A]">
                  8hr
                </div>
                <div className="text-[20px] font-semibold">0.0764%</div>
              </div>
              <div>
                <div className="border-dashed border-b-[1px] text-[#8A8A8A]">
                  1yr
                </div>
                <div className="text-[20px] font-semibold">0.0764%</div>
              </div>
            </div></> */}
          </div>

          {/* <div className="mt-4 bg-white w-full p-[10px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
            <div className="w-full flex justify-between items-center">
              <div className="text-[20px]">Public Bets</div>
              <SelectionGroup className="px-[6px] w-max flex py-[4px] gap-[8px] items-center rounded-[8px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[8px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">Live Bets</div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div className="cursor-pointer hover:bg-white rounded-[8px] w-[100px] flex justify-center">
                      <div className="text-[#959595]">Live Bets</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[8px] w-[160px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">
                        ROI Calculator
                      </div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div className="cursor-pointer hover:bg-white rounded-[8px] w-[160px] flex justify-center">
                      <div className="text-[#959595]">ROI Calculator</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[8px] w-[180px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">
                        Price Formulation
                      </div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div className="cursor-pointer hover:bg-white rounded-[8px] w-[180px] flex justify-center">
                      <div className="text-[#959595]">Price Formulation</div>
                    </div>
                  }
                />
                <SelectionItem
                  SelectedItem={
                    <div className="cursor-pointer bg-white rounded-[8px] w-[140px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                      <div className="text-black font-semibold">
                        Leaderboard
                      </div>
                      <LightIcon />
                    </div>
                  }
                  UnselectedItem={
                    <div className="cursor-pointer hover:bg-white rounded-[8px] w-[140px] flex justify-center">
                      <div className="text-[#959595]">Leaderboard</div>
                    </div>
                  }
                />
              </SelectionGroup>
            </div>
            <hr className="mt-3" />
            <table className="w-full">
              <tr className="w-full h-[40px] text-[14px]">
                <td>Player</td>
                <td>Bet</td>
                <td>Entry Price</td>
                <td>Wager</td>
                <td>Bust Price</td>
                <td>Multiplier</td>
                <td>Exit Price</td>
                <td>P&L</td>
                <td>ROI</td>
                <td>Actions</td>
              </tr>
              <tr className="hover:bg-[#f0f0f0] h-[40px] cursor-pointer w-full font-normal border-t-[1px]">
                <td>galatea</td>
                <td>
                  <div className="flex items-center gap-1">
                    <img src={UAE} />
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.2999 1.05005L1.3999 10.95"
                        stroke="#38A569"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.3501 1L11.3001 1.049L11.3501 8"
                        stroke="#38A569"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </td>
                <td>881.09</td>
                <td>0.48</td>
                <td>880.14</td>
                <td>x70.60</td>
                <td>0.01176480</td>
                <td>
                  <span className="text-[#38A569]">$108.31</span>
                </td>
                <td>
                  <span className="text-[#38A569]">$108.31</span>
                </td>
                <td>
                  <span className="font-medium">Details</span>
                </td>
              </tr>
            </table>
          </div> */}
        </div>
        <div className="space-y-[10px] bg-white w-[380px] p-[10px] rounded-[8px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
          <SelectionGroup
            className="px-[6px] w-full grid grid-cols-3 py-[4px] gap-[8px] items-center rounded-[8px] bg-[#f6f6f6] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]"
            defaultItem={longShort}
          >
            <SelectionItem
              SelectedItem={
                <div className="cursor-pointer items-center bg-white rounded-[8px] w-full flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.9585 1.375L1.7085 9.625"
                      stroke="#38A569"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.16699 1.33331L9.95866 1.37415L10.0003 7.16665"
                      stroke="#38A569"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="text-black font-semibold">Long</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setLongShort(0)}
                  className="cursor-pointer items-center gap-2 hover:bg-white rounded-[8px] w-full flex justify-center"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.9585 1.375L1.7085 9.625"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.16699 1.33331L9.95866 1.37415L10.0003 7.16665"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="text-[#959595]">Long</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="cursor-pointer items-center bg-white rounded-[8px] w-full flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.7915 9.625L1.5415 1.375"
                      stroke="#DB1F22"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.79128 3.73083V9.625L3.89795 9.62417"
                      stroke="#DB1F22"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div className="text-black font-semibold">Short</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setLongShort(1)}
                  className="cursor-pointer items-center gap-2 hover:bg-white rounded-[8px] w-full flex justify-center"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.7915 9.625L1.5415 1.375"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.79128 3.73083V9.625L3.89795 9.62417"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="text-[#959595]">Short</div>
                </div>
              }
            />
            <SelectionItem
              SelectedItem={
                <div className="cursor-pointer items-center bg-white rounded-[8px] w-full flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5859 6.49419L13.0001 4.08085L10.5859 1.66669"
                      stroke="#5b1dee"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.33398 4.08335H13.0007"
                      stroke="#5b1dee"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.74815 8.50586L1.33398 10.9192L3.74815 13.3334"
                      stroke="#5b1dee"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.0007 10.9167H1.33398"
                      stroke="#5b1dee"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="text-black font-semibold">Swap</div>
                  <LightIcon />
                </div>
              }
              UnselectedItem={
                <div
                  onClick={() => setLongShort(2)}
                  className="cursor-pointer items-center gap-2 hover:bg-white rounded-[8px] w-full flex justify-center"
                >
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5859 6.49419L13.0001 4.08085L10.5859 1.66669"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.33398 4.08335H13.0007"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.74815 8.50586L1.33398 10.9192L3.74815 13.3334"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.0007 10.9167H1.33398"
                      stroke="#959595"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <div className="text-[#959595]">Swap</div>
                </div>
              }
            />
          </SelectionGroup>
          <div className="flex items-center justify-between">
            <SelectionGroup
              className="px-[12px] flex py-[4px] gap-[20px] items-center"
              defaultItem={tab}
            >
              <SelectionItem
                SelectedItem={
                  <div
                  // className="cursor-pointer bg-white rounded-[0px] w-full flex justify-center gap-[10px]"
                  >
                    <div className="text-black font-semibold">Market</div>
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => setTab(0)}
                    // className="cursor-pointer hover:bg-white rounded-[0px] w-full flex justify-center"
                  >
                    <div className="text-[#959595]">Market</div>
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div
                  // className="cursor-pointer bg-white rounded-[0px] w-full flex justify-center gap-[10px]"
                  >
                    <div className="text-black font-semibold">Limit</div>
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => setTab(1)}
                    // className="cursor-pointer hover:bg-white rounded-[0px] w-full flex justify-center"
                  >
                    <div className="text-[#959595]">Limit</div>
                  </div>
                }
              />
            </SelectionGroup>
            <div>
              <svg
                className="cursor-pointer"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.9993 6.74998C9.25762 6.74998 8.5326 6.96991 7.91592 7.38196C7.29923 7.79402 6.81858 8.37969 6.53476 9.06491C6.25093 9.75014 6.17666 10.5041 6.32136 11.2316C6.46605 11.959 6.82321 12.6272 7.34765 13.1516C7.8721 13.6761 8.54029 14.0332 9.26772 14.1779C9.99514 14.3226 10.7491 14.2484 11.4344 13.9645C12.1196 13.6807 12.7053 13.2 13.1173 12.5834C13.5294 11.9667 13.7493 11.2417 13.7493 10.5C13.7483 9.50573 13.3529 8.5525 12.6498 7.84947C11.9468 7.14643 10.9935 6.75101 9.9993 6.74998ZM9.9993 13C9.50485 13 9.0215 12.8534 8.61038 12.5786C8.19926 12.3039 7.87882 11.9135 7.6896 11.4567C7.50039 10.9999 7.45088 10.4972 7.54734 10.0122C7.6438 9.5273 7.88191 9.08184 8.23154 8.73221C8.58117 8.38258 9.02663 8.14447 9.51158 8.04801C9.99653 7.95155 10.4992 8.00106 10.956 8.19028C11.4128 8.3795 11.8033 8.69993 12.078 9.11105C12.3527 9.52217 12.4993 10.0055 12.4993 10.5C12.4993 11.163 12.2359 11.7989 11.7671 12.2677C11.2982 12.7366 10.6623 13 9.9993 13ZM16.8743 10.6687C16.8774 10.5562 16.8774 10.4437 16.8743 10.3312L18.0399 8.87498C18.101 8.79852 18.1434 8.70877 18.1634 8.61297C18.1835 8.51716 18.1808 8.41798 18.1556 8.32341C17.9645 7.60513 17.6786 6.91548 17.3056 6.27263C17.2567 6.1885 17.1889 6.11694 17.1075 6.06364C17.0261 6.01034 16.9334 5.97677 16.8368 5.9656L14.9837 5.75935C14.9066 5.6781 14.8285 5.59998 14.7493 5.52498L14.5306 3.66716C14.5193 3.57045 14.4856 3.47771 14.4322 3.39633C14.3787 3.31494 14.307 3.24717 14.2227 3.19841C13.5796 2.82603 12.8901 2.54047 12.172 2.34919C12.0773 2.32403 11.9781 2.32146 11.8823 2.34168C11.7865 2.3619 11.6968 2.40435 11.6204 2.4656L10.1681 3.62497C10.0556 3.62497 9.94305 3.62497 9.83055 3.62497L8.3743 2.46169C8.29784 2.40057 8.2081 2.35827 8.11229 2.33819C8.01649 2.3181 7.91731 2.3208 7.82274 2.34607C7.10458 2.5375 6.41497 2.82332 5.77196 3.19607C5.68783 3.24492 5.61627 3.31273 5.56297 3.39411C5.50967 3.47548 5.47609 3.56818 5.46493 3.66482L5.25868 5.52107C5.17743 5.59867 5.0993 5.6768 5.0243 5.75544L3.16649 5.96872C3.06978 5.97998 2.97704 6.01367 2.89566 6.06711C2.81427 6.12055 2.7465 6.19227 2.69774 6.27654C2.32536 6.91963 2.0398 7.60923 1.84852 8.32732C1.82336 8.42195 1.82079 8.52116 1.84101 8.61697C1.86123 8.71277 1.90368 8.80249 1.96493 8.87888L3.1243 10.3312C3.1243 10.4437 3.1243 10.5562 3.1243 10.6687L1.96102 12.125C1.8999 12.2014 1.8576 12.2912 1.83752 12.387C1.81743 12.4828 1.82013 12.582 1.8454 12.6765C2.03648 13.3948 2.32233 14.0845 2.6954 14.7273C2.74425 14.8114 2.81206 14.883 2.89344 14.9363C2.97481 14.9896 3.06751 15.0232 3.16415 15.0344L5.01727 15.2406C5.09488 15.3219 5.173 15.4 5.25165 15.475L5.46805 17.3328C5.47931 17.4295 5.51299 17.5222 5.56644 17.6036C5.61988 17.685 5.69159 17.7528 5.77587 17.8015C6.41896 18.1739 7.10855 18.4595 7.82665 18.6508C7.92128 18.6759 8.02049 18.6785 8.1163 18.6583C8.2121 18.6381 8.30182 18.5956 8.37821 18.5344L9.83055 17.375C9.94305 17.3781 10.0556 17.3781 10.1681 17.375L11.6243 18.5406C11.7008 18.6017 11.7905 18.644 11.8863 18.6641C11.9821 18.6842 12.0813 18.6815 12.1759 18.6562C12.8941 18.4651 13.5838 18.1793 14.2266 17.8062C14.3108 17.7574 14.3823 17.6896 14.4356 17.6082C14.4889 17.5268 14.5225 17.4341 14.5337 17.3375L14.7399 15.4844C14.8212 15.4073 14.8993 15.3291 14.9743 15.25L16.8321 15.0312C16.9288 15.02 17.0216 14.9863 17.103 14.9328C17.1843 14.8794 17.2521 14.8077 17.3009 14.7234C17.6733 14.0803 17.9588 13.3907 18.1501 12.6726C18.1752 12.578 18.1778 12.4788 18.1576 12.383C18.1374 12.2872 18.0949 12.1975 18.0337 12.1211L16.8743 10.6687ZM15.6165 10.1609C15.6298 10.3868 15.6298 10.6132 15.6165 10.839C15.6072 10.9937 15.6556 11.1462 15.7524 11.2672L16.861 12.6523C16.7338 13.0566 16.5709 13.4488 16.3743 13.8242L14.6087 14.0242C14.4549 14.0413 14.313 14.1148 14.2102 14.2304C14.0599 14.3996 13.8997 14.5597 13.7306 14.7101C13.6149 14.8128 13.5414 14.9548 13.5243 15.1086L13.3282 16.8726C12.9528 17.0694 12.5606 17.2322 12.1563 17.3594L10.7704 16.2508C10.6595 16.1621 10.5217 16.1139 10.3798 16.114H10.3423C10.1164 16.1273 9.88999 16.1273 9.66415 16.114C9.50952 16.1047 9.35695 16.1532 9.23602 16.25L7.84696 17.3594C7.44269 17.2321 7.05052 17.0693 6.67508 16.8726L6.47508 15.1094C6.45802 14.9556 6.38453 14.8136 6.26884 14.7109C6.0997 14.5605 5.93953 14.4004 5.78915 14.2312C5.68644 14.1155 5.54447 14.042 5.39071 14.025L3.62665 13.8281C3.42992 13.4527 3.26704 13.0605 3.13993 12.6562L4.24852 11.2703C4.34532 11.1494 4.39377 10.9968 4.38446 10.8422C4.37118 10.6163 4.37118 10.3899 4.38446 10.164C4.39377 10.0094 4.34532 9.85684 4.24852 9.73591L3.13993 8.34763C3.26714 7.94336 3.43002 7.55119 3.62665 7.17576L5.38993 6.97576C5.54369 6.95869 5.68566 6.8852 5.78837 6.76951C5.93875 6.60037 6.09892 6.4402 6.26805 6.28982C6.38421 6.18704 6.458 6.04475 6.47508 5.8906L6.67118 4.12732C7.04657 3.93059 7.43875 3.76771 7.84305 3.6406L9.22899 4.74919C9.34992 4.84599 9.50249 4.89444 9.65712 4.88513C9.88296 4.87185 10.1094 4.87185 10.3352 4.88513C10.4899 4.89444 10.6424 4.84599 10.7634 4.74919L12.1516 3.6406C12.5559 3.76781 12.9481 3.93069 13.3235 4.12732L13.5235 5.8906C13.5406 6.04436 13.6141 6.18633 13.7298 6.28904C13.8989 6.43942 14.0591 6.59959 14.2095 6.76872C14.3122 6.88442 14.4541 6.95791 14.6079 6.97498L16.372 7.17107C16.5687 7.54646 16.7316 7.93864 16.8587 8.34294L15.7501 9.72888C15.6524 9.85083 15.6039 10.005 15.6141 10.1609H15.6165Z"
                  fill="#959595"
                />
              </svg>
            </div>
          </div>

          {(longShort === 0 || longShort === 1) && (
            <>
              <div className="w-full flex flex-col items-center">
                <div className="w-full p-[12px] border-[2px] rounded-[8px] bg-[#F6F6F6]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#5b1dee]">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3 10.5001H2C1.724 10.5001 1.5 10.2761 1.5 10.0001V7.00006C1.5 6.72406 1.724 6.50006 2 6.50006H3C3.276 6.50006 3.5 6.72406 3.5 7.00006V10.0001C3.5 10.2761 3.276 10.5001 3 10.5001Z"
                            fill="white"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.50049 8.5H7.66699C7.88349 8.5 8.09399 8.43 8.26699 8.3L9.47499 7.394C9.77649 7.168 10.1985 7.198 10.465 7.4645C10.761 7.7605 10.761 8.24 10.465 8.5355L9.42849 9.572C9.14949 9.851 8.79349 10.0415 8.40649 10.119L6.94149 10.412C6.65099 10.47 6.35149 10.463 6.06399 10.391L4.73899 10.06C4.58049 10.02 4.41799 10 4.25449 10H3.50049"
                            fill="white"
                          />
                          <path
                            d="M6.50049 8.5H7.66699C7.88349 8.5 8.09399 8.43 8.26699 8.3L9.47499 7.394C9.77649 7.168 10.1985 7.198 10.465 7.4645C10.761 7.7605 10.761 8.24 10.465 8.5355L9.42849 9.572C9.14949 9.851 8.79349 10.0415 8.40649 10.119L6.94149 10.412C6.65099 10.47 6.35149 10.463 6.06399 10.391L4.73899 10.06C4.58049 10.02 4.41799 10 4.25449 10H3.50049M3.50049 9.95588V9.00001V7.74728L4.2001 7.20001H4.8001L6.45273 8.5"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.00049 7.74256C8.00049 8.16106 7.66149 8.50006 7.24299 8.50006H6.28099L4.8001 9.60004H3.6001L3.50049 7.50006L4.40899 6.89456C4.79449 6.63706 5.24799 6.50006 5.71149 6.50006C5.90349 6.50006 6.09449 6.52356 6.28099 6.57006L7.42699 6.85656C7.76399 6.94056 8.00049 7.24356 8.00049 7.59106V7.74256Z"
                            fill="white"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.3155 2.1875C7.269 1.905 7.14 1.6335 6.922 1.4155C6.368 0.8615 5.4695 0.8615 4.9155 1.4155C4.3615 1.9695 4.3615 2.868 4.9155 3.422C5.2605 3.767 5.7385 3.8965 6.184 3.812"
                            fill="white"
                          />
                          <path
                            d="M7.3155 2.1875C7.269 1.905 7.14 1.6335 6.922 1.4155C6.368 0.8615 5.4695 0.8615 4.9155 1.4155C4.3615 1.9695 4.3615 2.868 4.9155 3.422C5.2605 3.767 5.7385 3.8965 6.184 3.812L7.3155 2.1875Z"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.58401 2.5776C9.13816 3.13176 9.13816 4.03022 8.58401 4.58437C8.02985 5.13853 7.13139 5.13853 6.57724 4.58437C6.02308 4.03022 6.02308 3.13176 6.57724 2.5776C7.13139 2.02345 8.02985 2.02345 8.58401 2.5776Z"
                            fill="white"
                          />
                          <path
                            d="M8.58401 2.5776C9.13816 3.13176 9.13816 4.03022 8.58401 4.58437C8.02985 5.13853 7.13139 5.13853 6.57724 4.58437C6.02308 4.03022 6.02308 3.13176 6.57724 2.5776C7.13139 2.02345 8.02985 2.02345 8.58401 2.5776"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="text-[18px]">Stake</div>
                      <div className="text-[#5A5A5A] font-normal text-[10px]">
                        Pay : $2756.43
                      </div>
                    </div>

                    <div className="py-[2px] px-[6px] bg-white border-[2px] rounded-[8px]">
                      <div className="text-[14px]">Get collateral</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      className="text-[20px] outline-none w-[200px]"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex gap-1">
                      <NUSDIcon />
                      <div>USDC</div>
                      <ArrowToDownHeader />
                    </div>
                  </div>
                </div>
                {/* <div className="border-[2px] p-2 w-max rounded-full bg-white mt-[-16px] z-10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.58284 16.233C9.40654 18.9994 10.3184 20.3826 11.9223 20.3923C13.5262 20.4019 14.4749 18.9998 16.3722 16.1955C16.9606 15.3258 17.511 14.4534 18.0404 13.5397C19.6054 10.8387 20.3879 9.48821 19.6445 8.03308C18.901 6.57796 17.4077 6.4267 14.4211 6.12416C12.826 5.96259 11.2887 5.95871 9.69645 6.11251C6.6629 6.40554 5.14612 6.55205 4.39356 7.99316C3.641 9.43427 4.43052 10.8392 6.00954 13.649C6.5129 14.5447 7.02978 15.3941 7.58284 16.233Z"
                      fill="#5B1DEE"
                    />
                    <path
                      d="M7.58284 16.233C9.40654 18.9994 10.3184 20.3826 11.9223 20.3923C13.5262 20.4019 14.4749 18.9998 16.3722 16.1955C16.9606 15.3258 17.511 14.4534 18.0404 13.5397C19.6054 10.8387 20.3879 9.48821 19.6445 8.03308C18.901 6.57796 17.4077 6.4267 14.4211 6.12416C12.826 5.96259 11.2887 5.95871 9.69645 6.11251C6.6629 6.40554 5.14612 6.55205 4.39356 7.99316C3.641 9.43427 4.43052 10.8392 6.00954 13.649C6.5129 14.5447 7.02978 15.3941 7.58284 16.233Z"
                      fill="url(#paint0_linear_2615_14727)"
                      fill-opacity="0.18"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2615_14727"
                        x1="12"
                        y1="22"
                        x2="12"
                        y2="11.6667"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div> */}
                {/* <div className="w-full p-[12px] border-[2px] rounded-[8px] bg-[#F6F6F6] mt-[-16px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#5b1dee]">
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_d_2615_14715)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 9.5H2C1.4475 9.5 1 9.0525 1 8.5V3.5C1 2.9475 1.4475 2.5 2 2.5H10C10.5525 2.5 11 2.9475 11 3.5V8.5C11 9.0525 10.5525 9.5 10 9.5Z"
                              fill="white"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 9.5H2C1.4475 9.5 1 9.0525 1 8.5V3.5C1 2.9475 1.4475 2.5 2 2.5H10C10.5525 2.5 11 2.9475 11 3.5V8.5C11 9.0525 10.5525 9.5 10 9.5Z"
                              stroke="#323232"
                              stroke-width="0.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.88388 5.11612C7.37204 5.60427 7.37204 6.39573 6.88388 6.88388C6.39573 7.37204 5.60427 7.37204 5.11612 6.88388C4.62796 6.39573 4.62796 5.60427 5.11612 5.11612C5.60427 4.62796 6.39573 4.62796 6.88388 5.11612Z"
                            fill="white"
                          />
                          <path
                            d="M6.88388 5.11612C7.37204 5.60427 7.37204 6.39573 6.88388 6.88388C6.39573 7.37204 5.60427 7.37204 5.11612 6.88388C4.62796 6.39573 4.62796 5.60427 5.11612 5.11612C5.60427 4.62796 6.39573 4.62796 6.88388 5.11612"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.9995 5.8125C8.896 5.813 8.8125 5.897 8.8125 6.0005C8.8125 6.104 8.8965 6.188 9 6.1875C9.1035 6.1875 9.1875 6.1035 9.1875 6C9.1875 5.8965 9.1035 5.8125 8.9995 5.8125Z"
                            fill="white"
                          />
                          <path
                            d="M8.9995 5.8125C8.896 5.813 8.8125 5.897 8.8125 6.0005C8.8125 6.104 8.8965 6.188 9 6.1875C9.1035 6.1875 9.1875 6.1035 9.1875 6C9.1875 5.8965 9.1035 5.8125 8.9995 5.8125"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.9995 5.8125C2.896 5.813 2.8125 5.897 2.8125 6.0005C2.8125 6.104 2.8965 6.188 3 6.1875C3.1035 6.1875 3.1875 6.1035 3.1875 6C3.1875 5.8965 3.1035 5.8125 2.9995 5.8125Z"
                            fill="white"
                          />
                          <path
                            d="M2.9995 5.8125C2.896 5.813 2.8125 5.897 2.8125 6.0005C2.8125 6.104 2.8965 6.188 3 6.1875C3.1035 6.1875 3.1875 6.1035 3.1875 6C3.1875 5.8965 3.1035 5.8125 2.9995 5.8125"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <filter
                              id="filter0_d_2615_14715"
                              x="0.600098"
                              y="2.09998"
                              width="11.7998"
                              height="8.80005"
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
                                values="0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2615_14715"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2615_14715"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                      <div className="text-[18px]">Total Value</div>
                      <div className="text-[#5A5A5A] font-normal text-[10px]">
                        Long : $3452.44
                      </div>
                    </div>

                    <div className="text-[10px] flex gap-1">
                      <div className="text-[#5a5a5a]">Leverage :</div>
                      <div>10.00 x</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[20px]">500</div>
                    <div className="flex gap-1 items-center">
                      <img alt="" src={UAE} />

                      <div>Dubai</div>
                      <ArrowToDownHeader />
                    </div>
                  </div>
                </div>
                <div className="w-full p-[12px] border-[2px] rounded-[8px] bg-[#F6F6F6] mt-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#5b1dee]">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2 4H10C10.5525 4 11 4.4475 11 5V10C11 10.5525 10.5525 11 10 11H2C1.4475 11 1 10.5525 1 10V5C1 4.4475 1.4475 4 2 4Z"
                            fill="white"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.88388 6.61612C7.37204 7.10427 7.37204 7.89573 6.88388 8.38388C6.39573 8.87204 5.60427 8.87204 5.11612 8.38388C4.62796 7.89573 4.62796 7.10427 5.11612 6.61612C5.60427 6.12796 6.39573 6.12796 6.88388 6.61612Z"
                            fill="white"
                          />
                          <path
                            d="M6.88388 6.61612C7.37204 7.10427 7.37204 7.89573 6.88388 8.38388C6.39573 8.87204 5.60427 8.87204 5.11612 8.38388C4.62796 7.89573 4.62796 7.10427 5.11612 6.61612C5.60427 6.12796 6.39573 6.12796 6.88388 6.61612"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9 8.75V6.25V8.75Z"
                            fill="white"
                          />
                          <path
                            d="M9 8.75V6.25"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3 8.75V6.25V8.75Z"
                            fill="white"
                          />
                          <path
                            d="M3 8.75V6.25"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 2.5H2"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.5 1H2.5"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="text-[18px]">Price</div>
                      <div className="text-[#5A5A5A] font-normal text-[10px]">
                        Long : $3452.44
                      </div>
                    </div>

                    <div className="text-[14px] flex gap-1">
                      <div className="text-[#5a5a5a]">Mark : $0.72941</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[20px]">500</div>
                    <div className="flex gap-1 items-center">
                      <NUSDIcon />

                      <div>USDC</div>
                      <ArrowToDownHeader />
                    </div>
                  </div>
                </div> */}
              </div>
              {/* <div className="w-full p-[16px] border-[1px] rounded-[4px]">
                <div className="mb-4">Payout Multiplier</div>

                <div className="w-full flex gap-4 items-center">
                  <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div>x</div>
                    <input
                      className="outline-none w-full text-[#5a5a5a] font-normal"
                      value={value}
                      placeholder="Profit"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                  <div className="text-[14px]">
                    <div className="w-max">Bust Price:</div>
                    <div className="text-[#5A5A5A] font-normal">57,901.34</div>
                  </div>
                </div>
              </div> */}
              <div className="w-full p-[16px] border-[1px] rounded-[4px]">
                <div>Leverage</div>

                <div className="mb-7 mt-2 px-2">
                  <Slider
                    min={logScale(labels[0])}
                    max={logScale(labels[labels.length - 1])}
                    value={logScale(leverage_value)}
                    onChange={handleChange}
                    marks={labels.reduce((acc, label) => {
                      acc[logScale(label)] = label.toString() + "x"; // Set mark labels
                      return acc;
                    }, {})}
                    step={0.1}
                    dotStyle={{
                      width: "2px",
                      height: "14px",
                      translate: "0px 4px",
                      background: "#E3E3E3",
                      borderColor: "#E3E3E3",
                    }}
                    styles={{
                      handle: {
                        width: "24px",
                        height: "24px",
                        borderRadius: "8px",
                        borderColor: "#D5D5D5",
                        background: "#E3E3E3",
                        boxShadow: "none",
                        translate: "0px -4px",
                      },
                      rail: {
                        background: "#F6F6F6",
                      },
                      track: {
                        background: "#e3e3e3",
                      },
                    }}
                  />
                </div>
                <div className="w-full flex gap-4 items-center">
                  <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div>x</div>
                    <input
                      className="outline-none w-full text-[#5a5a5a] font-normal"
                      value={leverage_value}
                      placeholder="Profit"
                      onChange={(e) => setLeverageValue(e.target.value)}
                    />
                  </div>
                  {/* <div className="text-[14px]">
                    <div className="w-max">Bust Price:</div>
                    <div className="text-[#5A5A5A] font-normal">57,901.34</div>
                  </div> */}
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="text-[14px]">Manual TP/SL</div>
                <Toggle status={true} />
              </div>
              <div>
                <div className="font-semibold">Take Profit</div>
                <div className="w-full grid grid-cols-2 mt-2 gap-2">
                  <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <input
                      className="outline-none w-full text-[#5a5a5a] font-normal"
                      placeholder="Price"
                      value={tp}
                      onChange={(e) => setTp(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div className="text-[#38A569]">+$</div>
                    <input
                      className="outline-none w-full text-[#5a5a5a] font-normal"
                      placeholder="Profit"
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold">Stop Loss</div>
                <div className="w-full grid grid-cols-2 mt-2 gap-2">
                  <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <input
                      className="outline-none w-full text-[#5a5a5a] font-normal"
                      placeholder="Price"
                      value={sl}
                      onChange={(e) => setSl(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 bg-white px-[12px] w-full py-[8px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div className="text-[#DB1F22]">-$</div>
                    <input
                      className="outline-none w-full text-[#5a5a5a] font-normal"
                      placeholder="Loss"
                    />
                  </div>
                </div>
              </div>
              <GreenButton
                text="Market Long"
                onClick={() => handleOpenTrade()}
              />
              <div className="w-full text-[12px] space-y-[6px]">
                <div className="w-full justify-between flex">
                  <span>ESTATE/USD</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Est. Execution Price</span>
                  <span>678.48</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Avg.Spread</span>
                  <span>0.00%</span>
                </div>
                <div className="w-full justify-between flex items-center">
                  <span className="text-[#959595]">Max Slippage</span>
                  <div className="flex items-end bg-white px-[8px] w-[60px] py-[2px] border-[0.5px]">
                    <input
                      className="outline-none w-full"
                      value={leverage}
                      onChange={(e) => setLeverage(e.target.value)}
                    />
                    <span className="text-[10px]">%</span>
                  </div>
                </div>
                <hr />

                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Notional Value</span>
                  <span>233 USDC</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Position Size</span>
                  <span>0.34 ESTATE</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Fees</span>
                  <span>3.0 USDC</span>
                </div>
                <hr />

                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Lig. Price</span>
                  <span>628</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Est. Borrowing Fee / H</span>
                  <span>0 USDC</span>
                </div>
              </div>
            </>
          )}
          {longShort === 2 && (
            <>
              <div>Review Swap</div>
              <div className="w-full flex flex-col items-center">
                <div className="w-full p-[12px] border-[2px] rounded-[8px] bg-[#F6F6F6]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#5b1dee]">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2 4H10C10.5525 4 11 4.4475 11 5V10C11 10.5525 10.5525 11 10 11H2C1.4475 11 1 10.5525 1 10V5C1 4.4475 1.4475 4 2 4Z"
                            fill="white"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.88388 6.61612C7.37204 7.10427 7.37204 7.89573 6.88388 8.38388C6.39573 8.87204 5.60427 8.87204 5.11612 8.38388C4.62796 7.89573 4.62796 7.10427 5.11612 6.61612C5.60427 6.12796 6.39573 6.12796 6.88388 6.61612Z"
                            fill="white"
                          />
                          <path
                            d="M6.88388 6.61612C7.37204 7.10427 7.37204 7.89573 6.88388 8.38388C6.39573 8.87204 5.60427 8.87204 5.11612 8.38388C4.62796 7.89573 4.62796 7.10427 5.11612 6.61612C5.60427 6.12796 6.39573 6.12796 6.88388 6.61612"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9 8.75V6.25V8.75Z"
                            fill="white"
                          />
                          <path
                            d="M9 8.75V6.25"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3 8.75V6.25V8.75Z"
                            fill="white"
                          />
                          <path
                            d="M3 8.75V6.25"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 2.5H2"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.5 1H2.5"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="text-[18px]">Sell</div>
                      <div className="text-[#5A5A5A] font-normal text-[10px]">
                        $10.02
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[20px]">500</div>
                    <div className="flex gap-1 items-center">
                      <NUSDIcon />

                      <div>USDC</div>
                      <ArrowToDownHeader />
                    </div>
                  </div>
                </div>
                <div className="border-[2px] p-2 w-max rounded-full bg-white mt-[-16px] z-10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.58284 16.233C9.40654 18.9994 10.3184 20.3826 11.9223 20.3923C13.5262 20.4019 14.4749 18.9998 16.3722 16.1955C16.9606 15.3258 17.511 14.4534 18.0404 13.5397C19.6054 10.8387 20.3879 9.48821 19.6445 8.03308C18.901 6.57796 17.4077 6.4267 14.4211 6.12416C12.826 5.96259 11.2887 5.95871 9.69645 6.11251C6.6629 6.40554 5.14612 6.55205 4.39356 7.99316C3.641 9.43427 4.43052 10.8392 6.00954 13.649C6.5129 14.5447 7.02978 15.3941 7.58284 16.233Z"
                      fill="#5B1DEE"
                    />
                    <path
                      d="M7.58284 16.233C9.40654 18.9994 10.3184 20.3826 11.9223 20.3923C13.5262 20.4019 14.4749 18.9998 16.3722 16.1955C16.9606 15.3258 17.511 14.4534 18.0404 13.5397C19.6054 10.8387 20.3879 9.48821 19.6445 8.03308C18.901 6.57796 17.4077 6.4267 14.4211 6.12416C12.826 5.96259 11.2887 5.95871 9.69645 6.11251C6.6629 6.40554 5.14612 6.55205 4.39356 7.99316C3.641 9.43427 4.43052 10.8392 6.00954 13.649C6.5129 14.5447 7.02978 15.3941 7.58284 16.233Z"
                      fill="url(#paint0_linear_2615_14727)"
                      fill-opacity="0.18"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2615_14727"
                        x1="12"
                        y1="22"
                        x2="12"
                        y2="11.6667"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="w-full p-[12px] border-[2px] rounded-[8px] bg-[#F6F6F6] mt-[-16px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-full bg-[#5b1dee]">
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_d_2615_14715)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 9.5H2C1.4475 9.5 1 9.0525 1 8.5V3.5C1 2.9475 1.4475 2.5 2 2.5H10C10.5525 2.5 11 2.9475 11 3.5V8.5C11 9.0525 10.5525 9.5 10 9.5Z"
                              fill="white"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10 9.5H2C1.4475 9.5 1 9.0525 1 8.5V3.5C1 2.9475 1.4475 2.5 2 2.5H10C10.5525 2.5 11 2.9475 11 3.5V8.5C11 9.0525 10.5525 9.5 10 9.5Z"
                              stroke="#323232"
                              stroke-width="0.8"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.88388 5.11612C7.37204 5.60427 7.37204 6.39573 6.88388 6.88388C6.39573 7.37204 5.60427 7.37204 5.11612 6.88388C4.62796 6.39573 4.62796 5.60427 5.11612 5.11612C5.60427 4.62796 6.39573 4.62796 6.88388 5.11612Z"
                            fill="white"
                          />
                          <path
                            d="M6.88388 5.11612C7.37204 5.60427 7.37204 6.39573 6.88388 6.88388C6.39573 7.37204 5.60427 7.37204 5.11612 6.88388C4.62796 6.39573 4.62796 5.60427 5.11612 5.11612C5.60427 4.62796 6.39573 4.62796 6.88388 5.11612"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.9995 5.8125C8.896 5.813 8.8125 5.897 8.8125 6.0005C8.8125 6.104 8.8965 6.188 9 6.1875C9.1035 6.1875 9.1875 6.1035 9.1875 6C9.1875 5.8965 9.1035 5.8125 8.9995 5.8125Z"
                            fill="white"
                          />
                          <path
                            d="M8.9995 5.8125C8.896 5.813 8.8125 5.897 8.8125 6.0005C8.8125 6.104 8.8965 6.188 9 6.1875C9.1035 6.1875 9.1875 6.1035 9.1875 6C9.1875 5.8965 9.1035 5.8125 8.9995 5.8125"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.9995 5.8125C2.896 5.813 2.8125 5.897 2.8125 6.0005C2.8125 6.104 2.8965 6.188 3 6.1875C3.1035 6.1875 3.1875 6.1035 3.1875 6C3.1875 5.8965 3.1035 5.8125 2.9995 5.8125Z"
                            fill="white"
                          />
                          <path
                            d="M2.9995 5.8125C2.896 5.813 2.8125 5.897 2.8125 6.0005C2.8125 6.104 2.8965 6.188 3 6.1875C3.1035 6.1875 3.1875 6.1035 3.1875 6C3.1875 5.8965 3.1035 5.8125 2.9995 5.8125"
                            stroke="#323232"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <filter
                              id="filter0_d_2615_14715"
                              x="0.600098"
                              y="2.09998"
                              width="11.7998"
                              height="8.80005"
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
                                values="0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2615_14715"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2615_14715"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                      <div className="text-[18px]">Buy</div>
                      <div className="text-[#5A5A5A] font-normal text-[10px]">
                        $9.96
                      </div>
                      <div className="text-[#A8A8A8] font-normal text-[10px]">
                        (-0.5%)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[20px]">500</div>
                    <div className="flex gap-1 items-center">
                      <NibiruIcon />

                      <div>Nibiru</div>
                      <ArrowToDownHeader />
                    </div>
                  </div>
                </div>
              </div>
              <GreenButton text="Swap" />
              <div className="w-full text-[12px] space-y-[6px]">
                <div className="w-full justify-between flex">
                  <span>NIBI/USD</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Rate</span>
                  <span>1 DUBAI = 0.51279 USDC ($0.512)</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Fee (0.25%)</span>
                  <span>$0.02</span>
                </div>
                <div className="w-full justify-between flex items-center">
                  <span className="text-[#959595]">Network cost</span>
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.0625 4.85375L13.8538 3.64625C13.7599 3.55243 13.6327 3.49972 13.5 3.49972C13.3673 3.49972 13.2401 3.55243 13.1462 3.64625C13.0524 3.74007 12.9997 3.86732 12.9997 4C12.9997 4.13268 13.0524 4.25993 13.1462 4.35375L14.3538 5.5625C14.447 5.65589 14.4996 5.78238 14.5 5.91437V11C14.5 11.1326 14.4473 11.2598 14.3536 11.3536C14.2598 11.4473 14.1326 11.5 14 11.5C13.8674 11.5 13.7402 11.4473 13.6464 11.3536C13.5527 11.2598 13.5 11.1326 13.5 11V8.5C13.5 8.10218 13.342 7.72064 13.0607 7.43934C12.7794 7.15804 12.3978 7 12 7H11V4C11 3.60218 10.842 3.22064 10.5607 2.93934C10.2794 2.65804 9.89782 2.5 9.5 2.5H4.5C4.10218 2.5 3.72064 2.65804 3.43934 2.93934C3.15804 3.22064 3 3.60218 3 4V13.5H2C1.86739 13.5 1.74021 13.5527 1.64645 13.6464C1.55268 13.7402 1.5 13.8674 1.5 14C1.5 14.1326 1.55268 14.2598 1.64645 14.3536C1.74021 14.4473 1.86739 14.5 2 14.5H12C12.1326 14.5 12.2598 14.4473 12.3536 14.3536C12.4473 14.2598 12.5 14.1326 12.5 14C12.5 13.8674 12.4473 13.7402 12.3536 13.6464C12.2598 13.5527 12.1326 13.5 12 13.5H11V8H12C12.1326 8 12.2598 8.05268 12.3536 8.14645C12.4473 8.24021 12.5 8.36739 12.5 8.5V11C12.5 11.3978 12.658 11.7794 12.9393 12.0607C13.2206 12.342 13.6022 12.5 14 12.5C14.3978 12.5 14.7794 12.342 15.0607 12.0607C15.342 11.7794 15.5 11.3978 15.5 11V5.91437C15.5008 5.71745 15.4625 5.52233 15.3874 5.34028C15.3123 5.15824 15.2019 4.99288 15.0625 4.85375ZM4 13.5V4C4 3.86739 4.05268 3.74021 4.14645 3.64645C4.24021 3.55268 4.36739 3.5 4.5 3.5H9.5C9.63261 3.5 9.75979 3.55268 9.85355 3.64645C9.94732 3.74021 10 3.86739 10 4V13.5H4ZM9 7.5C9 7.63261 8.94732 7.75979 8.85355 7.85355C8.75979 7.94732 8.63261 8 8.5 8H5.5C5.36739 8 5.24021 7.94732 5.14645 7.85355C5.05268 7.75979 5 7.63261 5 7.5C5 7.36739 5.05268 7.24021 5.14645 7.14645C5.24021 7.05268 5.36739 7 5.5 7H8.5C8.63261 7 8.75979 7.05268 8.85355 7.14645C8.94732 7.24021 9 7.36739 9 7.5Z"
                        fill="#959595"
                      />
                    </svg>

                    <span>$0.02</span>
                  </div>
                </div>

                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Price impact</span>
                  <span>~0.56%</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Max. slippage</span>
                  <div className="flex gap-1 items-center">
                    <div className="border-[1px] bg-[#F6F6F6] border-[#E3E3E3] rounded-md px-1">
                      <span className="text-[#5A5A5A]">Auto</span>
                    </div>
                    <span>0.5%</span>
                  </div>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Receive at least</span>
                  <span>19.501 DUBAI</span>
                </div>
                <hr />
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Fee (0.25%)</span>
                  <span>$0.02</span>
                </div>
                <div className="w-full justify-between flex">
                  <span className="text-[#959595]">Order routing</span>
                  <span>Uniswap API</span>
                </div>
              </div>

              <PurpleButton text="Finish" />
              <BlackButton text="Explorer Page" />
              <div className="w-full">
                <div className="text-[14px]">Message</div>
                <div className="w-full flex gap-2 items-center mt-2">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="bg-[#5b1dee] rounded-full p-2">
                        <svg
                          className="h-[18px]"
                          width="16"
                          height="25"
                          viewBox="0 0 16 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.30746 0.961816L8.75288 0.318362L8.30746 0L7.86203 0.318362L8.30746 0.961816ZM1.38911 5.90673L0.94368 5.26324L0.0581469 5.89622L0.933916 6.54304L1.38911 5.90673ZM15.2258 5.90673H16V5.49825L15.6712 5.26324L15.2258 5.90673ZM15.2258 16.1262L14.7706 16.7625L16 17.6705V16.1262H15.2258ZM14.6105 19.0932L15.0641 19.7307L15.9296 19.0949L15.0657 18.4568L14.6105 19.0932ZM0.774195 8.87378L1.22938 8.2374L0 7.32936V8.87378H0.774195ZM7.8793 24.0381L7.44189 24.6871L7.89139 25L8.33288 24.6756L7.8793 24.0381ZM0.774195 19.0932H0V19.5079L0.336711 19.7423L0.774195 19.0932ZM7.86203 0.318362L0.94368 5.26324L1.83453 6.55015L8.75288 1.60524L7.86203 0.318362ZM15.6712 5.26324L8.75288 0.318362L7.86203 1.60524L14.7804 6.55015L15.6712 5.26324ZM16 16.1262V5.90673H14.4516V16.1262H16ZM0.933916 6.54304L14.7706 16.7625L15.681 15.4898L1.8443 5.27035L0.933916 6.54304ZM15.0657 18.4568L1.22938 8.2374L0.319005 9.51009L14.1553 19.7295L15.0657 18.4568ZM8.33288 24.6756L15.0641 19.7307L14.1569 18.4557L7.42571 23.4006L8.33288 24.6756ZM0.336711 19.7423L7.44189 24.6871L8.31678 23.389L1.21168 18.4442L0.336711 19.7423ZM0 8.87378V19.0932H1.54839V8.87378H0Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="absolute top-5 right-0 bg-[#38A569] p-[2px] w-max rounded-full">
                        <svg
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.29102 5.08329L4.37435 7.16663L8.12435 3.41663"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="h-[24px] bg-[#E3E3E3] w-[2px]" />

                    <div className="relative">
                      <div className="bg-[#F6F6F6] rounded-full p-2">
                        <svg
                          className="h-[18px]"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.89917 18.1733C8.15583 18.1733 9.98583 16.3433 9.98583 14.0867C9.98583 11.83 8.15667 10 5.89917 10C3.64167 10 1.8125 11.83 1.8125 14.0867"
                            stroke="#A4A4A4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.90185 18.1775C5.28685 18.1775 4.70435 18.0417 4.18102 17.7992L1.66602 18.3333L2.19185 15.8133C1.94768 15.2883 1.81102 14.7033 1.81102 14.0867"
                            stroke="#A4A4A4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.46417 10.0233C5.16583 9.33913 5 8.5933 5 7.8108C5 4.4633 7.99833 1.77747 11.6667 1.77747C15.335 1.77747 18.3333 4.4633 18.3333 7.8108C18.3333 9.78913 17.2817 11.5308 15.6675 12.6291C15.6683 13.2591 15.6667 14.1083 15.6667 15L13.0508 13.7116C12.6033 13.7975 12.1408 13.8441 11.6667 13.8441C11.0775 13.8441 10.5058 13.7741 9.96083 13.6433"
                            stroke="#A4A4A4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="absolute top-5 right-0 bg-[#F8BC30] p-[2px] w-max rounded-full">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.99935 1.25V2.75"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.99935 7.25V8.75"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.34961 2.34998L3.40794 3.40831"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.5918 6.59167L7.65013 7.65001"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1.25 4.99996H2.75"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.25 4.99996H8.75"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.34961 7.65001L3.40794 6.59167"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.5918 3.40831L7.65013 2.34998"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="h-[24px] bg-[#E3E3E3] w-[2px]" />

                    <div>
                      <div className="bg-[#F6F6F6] rounded-full p-2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.418 8.99413L15.8321 6.58079L13.418 4.16663"
                            stroke="#A4A4A4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4.16602 6.58329H15.8327"
                            stroke="#A4A4A4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.58018 11.0057L4.16602 13.4191L6.58018 15.8332"
                            stroke="#A4A4A4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.8327 13.4167H4.16602"
                            stroke="#A4A4A4"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-rows-3 h-[170px]">
                    <div className="flex flex-col justify-center">
                      <div>Approval pending..</div>
                      <div className="text-[#5b1dee] font-normal text-[12px]">
                        Why do I have to approve a token?
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div>Approval pending..</div>
                      <div className="text-[#5b1dee] font-normal text-[12px]">
                        Why are signature required?
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div>Approval pending..</div>
                      <div className="text-[#5b1dee] font-normal text-[12px]">
                        Learn more about swap?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        open={showModal}
        center
        onClose={() => setShowModal()}
        classNames={{
          modal:
            "min-w-[350px] space-y-[10px] h-max rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
        }}
      >
        {modalFlag === 0 && (
          <>
            <div className="w-full text-center font-medium mt-4 text-[20px] flex items-center justify-center gap-[10px]">
              <NUSDIcon />
              <div>ESTATE/USDC</div>
              <div className="text-[12px] p-[4px] rounded-[4px] border-[0.5px] border-[#5DBE89] text-[#5DBE89]">
                LONG
              </div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Collateral</div>
              <div>200 USDC</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Leverage</div>
              <div>2x</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Position Size</div>
              <div>
                <div>200 USDC</div>
                <div className="text-[#a6a6a6]">0.45 ESTATE</div>
              </div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Est. Open Price</div>
              <div>645</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Max Slippage</div>
              <div>1%</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Liq. Price</div>
              <div>357</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Stop Loss</div>
              <div>None</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Take Profit</div>
              <div>700</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Fees</div>
              <div>10 USDC (Min Fee)</div>
            </div>

            <PurpleButton text="Confirm" onClick={() => setShowModal(false)} />
          </>
        )}
        {modalFlag === 1 && (
          <>
            <div className="w-full text-center font-medium mt-4 text-[20px] flex items-center justify-center gap-[10px]">
              <NUSDIcon />
              <div>ESTATE/USDC</div>
              <div className="text-[12px] p-[4px] rounded-[4px] border-[0.5px] border-[#5DBE89] text-[#5DBE89]">
                LONG
              </div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Collateral</div>
              <div>200 USDC</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Leverage</div>
              <div>2x</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Position Size</div>
              <div>
                <div>200 USDC</div>
                <div className="text-[#a6a6a6]">0.45 ESTATE</div>
              </div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Open Price</div>
              <div>645</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Current Price</div>
              <div>653</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Price Change</div>
              <div>2.23%</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Borrowing Fees</div>
              <div>0 USDC</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Closing Fees</div>
              <div>20 USDC</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Unrealized PnL</div>
              <div>10 USDC</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Receive</div>
              <div>10 USDC</div>
            </div>
            <PurpleButton
              text="Close Trade"
              onClick={() => setShowModal(false)}
            />
          </>
        )}
        {modalFlag === 2 && (
          <>
            <div className="w-full text-center font-medium mt-4 text-[20px] flex items-center justify-center gap-[10px]">
              <NUSDIcon />
              <div>ESTATE/USDC</div>
              <div className="text-[12px] p-[4px] rounded-[4px] border-[0.5px] border-[#EB4245] text-[#EB4245]">
                LIMIT SHORT
              </div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Leverage</div>
              <div>2x</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Collateral</div>
              <div>200 USDC</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Position Size</div>
              <div>
                <div>200 USDC</div>
                <div className="text-[#a6a6a6]">0.45 ESTATE</div>
              </div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Trigger Price</div>
              <div>645</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Execution Price</div>
              <div>653</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Max Spread (%)</div>
              <div>2.23</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Stop Loss</div>
              <div>None</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Take Profit</div>
              <div>None</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Opening Fee</div>
              <div>10 USDC</div>
            </div>

            <PurpleButton
              text="Close Order"
              onClick={() => setShowModal(false)}
            />
          </>
        )}
        {modalFlag === 3 && (
          <>
            <div className="mt-8 w-full flex justify-between font-normal">
              <div className="flex items-center gap-[10px]">
                <NUSDIcon />
                <div>ESTATE/USDC</div>
              </div>
              <div className="flex items-center gap-[4px]">
                <span className="text-[12px]">CLOSE @ 234</span>
              </div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Date</div>
              <div>07/19</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Position Size</div>
              <div className="text-[#EB4245]">45 ESTATE</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Leverage</div>
              <div>2x</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>Collateral</div>
              <div>300 USDC</div>
            </div>
            <div className="w-full flex justify-between font-normal">
              <div>PnL</div>
              <div className="text-[#EB4245]">-50 USDC (-5.8%)</div>
            </div>
          </>
        )}
      </Modal>

      <Modal
        open={false}
        center
        // onClose={() => setShowModal()}
        classNames={{
          modal:
            "min-w-[400px] h-max rounded-[8px] border-[1px] border-[#E3E3E3] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]",
        }}
      >
        <div>
          <div className="text-[20px] font-semibold">Trade settings</div>
          <div className="w-full items-center flex justify-between my-4">
            <div className="flex items-center gap-2">
              <div>Slip Tolerance</div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0.25C8.07164 0.25 6.18657 0.821828 4.58319 1.89317C2.97982 2.96451 1.73013 4.48726 0.992179 6.26884C0.254225 8.05042 0.061142 10.0108 0.437348 11.9021C0.813554 13.7934 1.74215 15.5307 3.10571 16.8943C4.46928 18.2579 6.20656 19.1865 8.09787 19.5627C9.98919 19.9389 11.9496 19.7458 13.7312 19.0078C15.5127 18.2699 17.0355 17.0202 18.1068 15.4168C19.1782 13.8134 19.75 11.9284 19.75 10C19.7473 7.41498 18.7192 4.93661 16.8913 3.10872C15.0634 1.28084 12.585 0.25273 10 0.25ZM9.625 4.75C9.84751 4.75 10.065 4.81598 10.25 4.9396C10.435 5.06321 10.5792 5.23891 10.6644 5.44448C10.7495 5.65005 10.7718 5.87625 10.7284 6.09448C10.685 6.31271 10.5778 6.51316 10.4205 6.6705C10.2632 6.82783 10.0627 6.93498 9.84448 6.97838C9.62625 7.02179 9.40005 6.99951 9.19449 6.91436C8.98892 6.82922 8.81322 6.68502 8.6896 6.50002C8.56598 6.31501 8.5 6.0975 8.5 5.875C8.5 5.57663 8.61853 5.29048 8.82951 5.0795C9.04049 4.86853 9.32664 4.75 9.625 4.75ZM10.75 15.25C10.3522 15.25 9.97065 15.092 9.68934 14.8107C9.40804 14.5294 9.25 14.1478 9.25 13.75V10C9.05109 10 8.86033 9.92098 8.71967 9.78033C8.57902 9.63968 8.5 9.44891 8.5 9.25C8.5 9.05109 8.57902 8.86032 8.71967 8.71967C8.86033 8.57902 9.05109 8.5 9.25 8.5C9.64783 8.5 10.0294 8.65804 10.3107 8.93934C10.592 9.22064 10.75 9.60218 10.75 10V13.75C10.9489 13.75 11.1397 13.829 11.2803 13.9697C11.421 14.1103 11.5 14.3011 11.5 14.5C11.5 14.6989 11.421 14.8897 11.2803 15.0303C11.1397 15.171 10.9489 15.25 10.75 15.25Z"
                  fill="#B6B6B6"
                />
              </svg>
            </div>
            <div className="text-[#5b1dee] text-[12px]">
              What are trade settings?
            </div>
          </div>

          <div className="w-full items-center justify-between gap-2 flex mb-4">
            <SelectionGroup
              className="px-[6px] w-max flex py-[4px] gap-[8px] items-center rounded-[8px] bg-[#f6f6f6]"
              defaultItem={list}
            >
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer bg-white rounded-[8px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div className="text-black font-semibold">0.5%</div>
                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => setList(0)}
                    className="cursor-pointer hover:bg-white rounded-[8px] w-[100px] flex justify-center"
                  >
                    <div className="text-[#959595]">0.5%</div>
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer bg-white rounded-[8px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div className="text-black font-semibold">5%</div>
                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => setList(1)}
                    className="cursor-pointer hover:bg-white rounded-[8px] w-[100px] flex justify-center"
                  >
                    <div className="text-[#959595]">5%</div>
                  </div>
                }
              />
              <SelectionItem
                SelectedItem={
                  <div className="cursor-pointer bg-white rounded-[8px] w-[100px] flex justify-center gap-[10px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
                    <div className="text-black font-semibold">10%</div>
                    <LightIcon />
                  </div>
                }
                UnselectedItem={
                  <div
                    onClick={() => setList(2)}
                    className="cursor-pointer hover:bg-white rounded-[8px] w-[100px] flex justify-center"
                  >
                    <div className="text-[#959595]">10%</div>
                  </div>
                }
              />
            </SelectionGroup>
            <div className="flex gap-2 bg-white px-[12px] w-[80px] py-[2px] border-[2px] border-[#E3E3E3] rounded-[12px] shadow-[2px_2px_6px_0px_rgba(187,195,206,0.6),-2px_-2px_6px_0px_rgba(253,255,255,0.8)]">
              <input
                className="outline-none w-full text-[#5a5a5a] font-normal"
                placeholder=""
              />
              <div className="text-[#D5D5D5]">%</div>
            </div>
          </div>
          <PurpleButton text="Save settings" />
        </div>
      </Modal>
    </div>
  );
};

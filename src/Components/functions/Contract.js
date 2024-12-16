import { toast } from "react-toastify";
import { NibiruTxClient, NibiruQuerier } from "@nibiruchain/nibijs";
import {
  setTxConfirmed,
  setTxFailed,
  setTxPending,
} from "../../ReduxSlices/ModalSlice";
import { setTokenUpdate } from "../../ReduxSlices/CommunicationSlice";
import { setEventToEmit } from "../../ReduxSlices/NotificationSlice";
import { api } from "./Api";
import { addToken, getIdFromHash } from "./Functions";

export const executeContract = async (
  emailData,
  funds,
  currentTime,
  chainId,
  endpt,
  contractAddr,
  dispatch,
  token_id,
  receiver,
  CONTRACT_MESSAGE,
  account,
  walletEx,
  tokenToSend
) => {
  try {
    toast.loading("Transaction is pending...");

    dispatch(setTxPending());
    await window[walletEx].enable(chainId);
    const signer = await window[walletEx].getOfflineSigner(chainId);
    const signingClient = await NibiruTxClient.connectWithSigner(endpt, signer);
    let hash;
    if (tokenToSend) {
      const tx = await signingClient.wasmClient.executeMultiple(
        account,
        [
          {
            contractAddress: contractAddr,
            msg: CONTRACT_MESSAGE,
            funds: [
              {
                amount: (
                  Number(tokenToSend[0].amount) *
                  10 ** process.env.REACT_APP_USDC_DECIMALS
                ).toString(),
                denom: tokenToSend[0].denom,
              },
            ],
          },
        ],
        "auto",
        "codedestate"
      );
      hash = tx.transactionHash;
    } else {
      const tx = await signingClient.wasmClient.executeMultiple(
        account,
        [
          // {
          //   contractAddress: process.env.REACT_APP_ORACLE_SMART_CONTRACT,
          //   msg: {
          //     create_token: {
          //       base: "btc",
          //       permission_group: 1,
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_ORACLE_SMART_CONTRACT,
          //   msg: {
          //     create_token: {
          //       base: "eth",
          //       permission_group: 1,
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_ORACLE_SMART_CONTRACT,
          //   msg: {
          //     set_price: {
          //       token_id: 1,
          //       price_usd: "85000",
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_ORACLE_SMART_CONTRACT,
          //   msg: {
          //     set_price: {
          //       token_id: 2,
          //       price_usd: "4500",
          //     },
          //   },
          // },

          // {
          //   contractAddress: process.env.REACT_APP_ORACLE_SMART_CONTRACT,
          //   msg: {
          //     create_token: {
          //       base: "usdt",
          //       permission_group: 1,
          //     },
          //   },
          // },

          // {
          //   contractAddress: process.env.REACT_APP_ORACLE_SMART_CONTRACT,
          //   msg: {
          //     set_price: {
          //       token_id: 3,
          //       price_usd: "1",
          //     },
          //   },
          // },

          {
            contractAddress: contractAddr,
            msg: CONTRACT_MESSAGE,
          },

          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         set_markets: {
          //           markets: {
          //             "MarketIndex(0)": {
          //               base: "TokenIndex(1)",
          //               quote: "TokenIndex(0)",
          //               spread_p: "0",
          //               group_index: "GroupIndex(0)",
          //               fee_index: "FeeIndex(0)",
          //             },
          //             "MarketIndex(1)": {
          //               base: "TokenIndex(3)",
          //               quote: "TokenIndex(0)",
          //               spread_p: "0",
          //               group_index: "GroupIndex(0)",
          //               fee_index: "FeeIndex(0)",
          //             },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         set_groups: {
          //           groups: {
          //             "GroupIndex(0)": {
          //               name: "default",
          //               min_leverage: "1",
          //               max_leverage: "100",
          //             },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_pair_depths: {
          //           pair_depths: {
          //             "MarketIndex(0)": {
          //               one_percent_depth_above_usd: "0",
          //               one_percent_depth_below_usd: "0",
          //               exponent: "1",
          //             },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_borrowing_pair_ois: {
          //           key: ["TokenIndex(1)", "MarketIndex(0)"],
          //           value: {
          //             long: "0",
          //             short: "0",
          //             max: "1000000",
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_borrowing_group_ois: {
          //           key: ["TokenIndex(1)", "GroupIndex(0)"],
          //           value: {
          //             long: "0",
          //             short: "0",
          //             max: "1000000",
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         set_fees: {
          //           fees: {
          //             "FeeIndex(0)": {
          //               open_fee_p: "0.02",
          //               close_fee_p: "0.015",
          //               trigger_order_fee_p: "0.03",
          //               min_position_size_usd: "1",
          //             },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_fee_tiers: {
          //           fee_tiers: [
          //             {
          //               fee_multiplier: "0.975",
          //               points_treshold: "6000000",
          //             },
          //             {
          //               fee_multiplier: "0.95",
          //               points_treshold: "20000000",
          //             },
          //             {
          //               fee_multiplier: "0.925",
          //               points_treshold: "50000000",
          //             },
          //             {
          //               fee_multiplier: "0.9",
          //               points_treshold: "100000000",
          //             },
          //             {
          //               fee_multiplier: "0.85",
          //               points_treshold: "250000000",
          //             },
          //             {
          //               fee_multiplier: "0.8",
          //               points_treshold: "400000000",
          //             },
          //             {
          //               fee_multiplier: "0.7",
          //               points_treshold: "1000000000",
          //             },
          //             {
          //               fee_multiplier: "0.6",
          //               points_treshold: "2000000000",
          //             },
          //           ],
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_collaterals: {
          //           collaterals: {
          //             "TokenIndex(1)": {
          //               name: "utestate",
          //               address: "utestate",
          //               is_active: true,
          //               denom:
          //                 "tf/nibi13vuql6pp0m84nl73aya4hnnwyj896hthkjkwe8crcl023qd2nzgqcmqhlj/utestate",
          //             },
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_trading_activated: {
          //           trading_activated: "activated",
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_borrowing_pairs: {
          //           key: ["TokenIndex(1)", "MarketIndex(0)"],
          //           value: {
          //             fee_per_block: "0.01",
          //             acc_fee_long: "0",
          //             acc_fee_short: "0",
          //             acc_last_updated_block: 0,
          //             fee_exponent: "1",
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_borrowing_groups: {
          //           key: ["TokenIndex(1)", "GroupIndex(0)"],
          //           value: {
          //             fee_per_block: "0.01",
          //             acc_fee_long: "0",
          //             acc_fee_short: "0",
          //             acc_last_updated_block: 0,
          //             fee_exponent: "1",
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_oi_windows_count: {
          //           new_count: 3,
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_oi_windows_duration: {
          //           new_window_duration: "WindowDuration(7200)",
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_staking_address: {
          //           staking_address:
          //             "nibi1pl6r92ncwyqa6s3cdxjzprnsg5snn2mare34f0",
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_vault_closing_fee: {
          //           closing_fee: "0.0069",
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   contractAddress: process.env.REACT_APP_PERP_SMART_CONTRACT,
          //   msg: {
          //     admin: {
          //       msg: {
          //         update_vault_address: {
          //           collateral_index: "TokenIndex(1)",
          //           vault_address: process.env.REACT_APP_VAULT_SMART_CONTRACT,
          //         },
          //       },
          //     },
          //   },
          // },
        ],
        "auto"
      );
      hash = tx.transactionHash;
    }
    dispatch(setTxConfirmed());
    toast.dismiss();
    toast.success("Transaction is confirmed!", {
      autoClose: 1000,
    });
    toast.loading("Updating assets with new data..");
    if (token_id) {
      dispatch(
        setTokenUpdate({
          token_id: token_id,
          contract: contractAddr,
          sender: account,
        })
      );
      if (receiver !== account && hash) {
        dispatch(
          setEventToEmit({
            txHash: hash,
            action: Object.keys(CONTRACT_MESSAGE)[0],
            token_id: token_id,
            receiver: receiver,
            sender: account,
            timeUTC: currentTime,
            funds: funds,
          })
        );
        const res = await api("user/addEventItem", {
          txHash: hash,
          action: Object.keys(CONTRACT_MESSAGE)[0],
          token_id: token_id,
          receiver: receiver,
          sender: account,
          timeUTC: currentTime,
          funds: funds,
          emailData: emailData,
        });
      }
      addToken(account, token_id, endpt, dispatch);
    }
    toast.dismiss();
    toast.success("Assets updated with new data.", {
      autoClose: 2000,
    });

    return hash;
  } catch (error) {
    dispatch(setTxFailed());

    const errorText = error.toString();
    console.log(error.toString());
    toast.dismiss();

    if (errorText.includes("does not exist on chain"))
      toast.error(`Not enough NIBI in Wallet to pay for gas fees`, {
        autoClose: 1000,
      });
    if (errorText.includes("is too short"))
      toast.error(
        `Your requested stay is shorter than the host´s minimum stay`,
        {
          autoClose: 1000,
        }
      );
    else {
      toast.error(
        `Transaction failed with following errors ${error.toString()}`,
        {
          autoClose: 3000,
        }
      );
    }
    return false;
  }
};

export const queryContract = async (contractAddr, CONTRACT_MESSAGE, endpt) => {
  try {
    const querier = await NibiruQuerier.connect(endpt);
    const res = await querier.nibiruExtensions.wasm.queryContractSmart(
      contractAddr,
      CONTRACT_MESSAGE
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const queryBalance = async (account, denom, endpt) => {
  const querier = await NibiruQuerier.connect(endpt);
  const balance = await querier.getBalance(account, denom);
  return balance;
};

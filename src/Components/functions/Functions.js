import { queryContract } from "./Contract";
import { updateNFTStore } from "../../ReduxSlices/NFTSlice";
import { api } from "./Api";
import { createThirdwebClient } from "thirdweb";

export const thiredWebClient = createThirdwebClient({
  clientId: "abdfecae24f5a6170f2a52fa803ca761",
});

export const truncateWalletAddress = (address, forward = 5, backward = 4) => {
  if (address)
    return (
      address.toString().substring(0, forward) +
      "..." +
      address.toString().substring(address.toString().length - backward)
    );
};

export const updateToken = async (data, endpt, dispatch, updateDB) => {
  const res = await queryContract(
    data.contract,
    {
      all_nft_info: {
        token_id: data.token_id,
      },
    },
    endpt
  );

  // if (!res) return;
  // let metaData = {
  //   images: [],
  // };

  // for (let i = 0; i < res.info.extension.image.length; i++) {
  //   metaData.images.push(res.info.extension.image[i].value);
  // }
  // for (let i = 0; i < res.info.extension.attributes.length; i++) {
  //   try {
  //     metaData[res.info.extension.attributes[i].key] = JSON.parse(
  //       res.info.extension.attributes[i].value
  //     );
  //   } catch (error) {
  //     metaData[res.info.extension.attributes[i].key] =
  //       res.info.extension.attributes[i].value;
  //   }
  // }

  const short = await queryContract(
    data.contract,
    {
      nft_info_short_term_rental: {
        token_id: data.token_id,
      },
    },
    endpt
  );
  const rentals = await queryContract(
    data.contract,
    {
      nft_rentals: {
        token_id: data.token_id,
      },
    },
    endpt
  );
  // const long = await queryContract(
  //   data.contract,
  //   {
  //     nft_info_long_term_rental: {
  //       token_id: data.token_id,
  //     },
  //   },
  //   endpt
  // );

  // const sell = await queryContract(
  //   data.contract,
  //   {
  //     nft_info_sell: {
  //       token_id: data.token_id,
  //     },
  //   },
  //   endpt
  // );

  // const bids = await queryContract(
  //   data.contract,
  //   {
  //     nft_bids: {
  //       token_id: data.token_id,
  //     },
  //   },
  //   endpt
  // );

  const metaData = await api("property/getProperty", {
    token_id: data.token_id,
  });
  if (updateDB)
    await api("property/updateProperty", {
      token_id: data.token_id,
      // metaData: metaData?.metaData,
      short: {
        ...short,
        price_per_day:
          short?.price_per_day / 10 ** process.env.REACT_APP_USDC_DECIMALS,
      },
      rentals: rentals,
      access: res?.access,
    });

  dispatch(
    updateNFTStore({
      token_id: data.token_id,
      metaData: metaData?.metaData,
      short: {
        ...short,
        price_per_day:
          short?.price_per_day / 10 ** process.env.REACT_APP_USDC_DECIMALS,
      },
      // long: long,
      // sell: sell,
      rentals: rentals,
      // bids: bids,
      access: res?.access,
    })
  );
};

export const getTokens = async (account, endpt, dispatch) => {
  const tokens = await api("user/getTokens", {
    account: account,
  });
  for (let i = 0; i < tokens.length; i++) {
    await updateToken(
      {
        token_id: tokens[i],
        contract: process.env.REACT_APP_RENTAL_SMART_CONTRACT,
      },
      endpt,
      dispatch
    );
  }
};

export const addToken = async (account, token_id, endpt, dispatch) => {
  const res = await api("user/addTokens", {
    account: account,
    token_id: token_id,
  });
  getTokens(account, endpt, dispatch);
};

export const getProfileFromWallet = async (wallet) => {
  const profile = await api("profile/getProfile", {
    walletAddress: wallet,
  });
  return profile;
};

export const getTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const timeString = hours + ":" + minutes + " " + amOrPm;
  return timeString;
};

export const getDay = (date) => {
  try {
    const monthString = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);

    const day = ("0" + date.getDate()).slice(-2);
    let formattedDate = monthString + " " + day;
    const currentTime = new Date();
    if (
      currentTime.getFullYear() +
        currentTime.getMonth() +
        currentTime.getDate() ===
      date.getFullYear() + date.getMonth() + date.getDate()
    )
      return "Today";

    return formattedDate;
  } catch (error) {
    return null;
  }
};

export const getChatId = async (renter, owner, nftId, mode) => {
  return await api("chat/getChatId", {
    renter: renter,
    owner: owner,
    nftId: nftId,
    mode: mode,
  });
};

export const getIdFromHash = async (hash) => {
  return await api("tx/fetchId", {
    hash: hash,
  });
};

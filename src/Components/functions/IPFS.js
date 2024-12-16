import axios from "axios";
import { toast } from "react-toastify";

export const getMetadata = async (token_uri) => {
  try {
    // if (token_uri === process.env.REACT_APP_PINATA_GATEWAY_2 + "QmZjsexNkk8o2NZgZAFDcibpVPk8hQqVDUy1XTqt45TqQv")
    //   return sampleMetadata;
    const metadata = (await axios.get(token_uri)).data;
    return metadata;
  } catch (error) {
    console.log(error);
  }
};

export const pinMetadata = async (metadata, name, jwt) => {
  toast.loading("Uploading Metadata..");
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      pinataContent: metadata,
      // pinataOptions: { cidVersion: 1 },
      pinataMetadata: { name: `${name}.json` },
    }),
  };

  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      options
    );
    const res = await response.json();
    toast.dismiss();
    toast.success("Metadata uploaded.", { autoClose: 1000 });
    return res.IpfsHash;
  } catch (error) {
    toast.dismiss();
    toast.error(`Uploading failed with following errors ${error.toString()}`, {
      autoClose: 1000,
    });
    console.error(error);
  }
};

export const deletePinsFromIPFS = async (hashesToUnpin, jwt) => {
  if (hashesToUnpin.length) toast.loading("Deleting images..");
  for (let i = 0; i < hashesToUnpin.length; i++) {
    try {
      const res = await axios.delete(
        `https://api.pinata.cloud/pinning/unpin/${hashesToUnpin[i]}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  if (hashesToUnpin.length) {
    toast.dismiss();
    toast.success("Images deleted.", { autoClose: 1000 });
  }
};

export const pinImagesToIPFS = async (images, jwt, gateWay) => {
  if (images.length) toast.loading("Uploading images..");
  const hashes = [];
  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();

    formData.append("file", images[i].file);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // console.log(res.data);
      hashes.push(gateWay + res.data.IpfsHash);
    } catch (error) {
      toast.dismiss();
      toast.error(
        `Uploading failed with following errors ${error.toString()}`,
        {
          autoClose: 1000,
        }
      );
      console.log(error);
    }
  }
  if (images.length) {
    toast.dismiss();
    toast.success("Images uploaded.", { autoClose: 1000 });
  }
  return hashes;
};

import axios from "axios";
import jwt from "jsonwebtoken";

export const setAuthToken = (data) => {
  return (
    "Bearer " +
    jwt.sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    })
  );
};

export const api = async (route, data) => {
  try {
    const res = (
      await axios.post(
        process.env.REACT_APP_BACKEND_SERVER + route,
        {},
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to indicate that the request body is in JSON format
            Authorization: setAuthToken(data),
          },
        }
      )
    ).data;
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

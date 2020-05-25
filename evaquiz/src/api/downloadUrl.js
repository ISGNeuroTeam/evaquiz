import axios from "axios";

export default () => {
  return axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
    responseType: "blob",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept"
    }
  });
};

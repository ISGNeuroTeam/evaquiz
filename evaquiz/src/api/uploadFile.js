import axios from "axios";

export default () => {
  return axios.create({
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept"
    }
  });
};

import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept"
  }
});

instance.interceptors.response.use(undefined, error => {
  if (error.response && error.response.status === 401) {
    window.location.href = `/`;
  }
  return Promise.reject(error.response.data);
});

export default () => {
  return instance;
};

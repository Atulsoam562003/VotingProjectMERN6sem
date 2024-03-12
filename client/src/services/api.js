import axios from "axios";

// Replace 'http://localhost:4000/api' with the actual deployment URL of your backend
const host = "http://localhost:4000/api";

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const call = async (method, path, data) => {
  const response = await axios[method](`${host}/${path}`, data);
  return response.data;
};

export default { call, setToken };

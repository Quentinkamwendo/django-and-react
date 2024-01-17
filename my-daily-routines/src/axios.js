
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "./ContextProvider";
// import { useAuth } from "./ContextProvider";

const axiosClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`
})

axiosClient.interceptors.request.use(config => {
  const { token } = useContext(StateContext);
  config.headers.Authorization = `Bearer ${token}`;
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    config.headers['Content-Type'] = undefined;
  }
  return config;
})
axiosClient.interceptors.response.use(response => {
  return response;
},
  error => {
    if (error.response && error.response.status === 401) {
      const { clearAuthData } = useContext(StateContext);
      clearAuthData()

      const navigate = useNavigate();
      navigate('/login');

      return Promise.reject(error);
      // redirect('/login');
    }
    return Promise.reject(error);
    // throw error;
  }
)

export default axiosClient;

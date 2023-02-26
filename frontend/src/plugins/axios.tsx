import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { getAccessToken } from "./token";

interface AxiosDTO {
  url: string;
  method: Method;
  data?: any;
  headers?: any;
  params?: string;
  isAuthentication?: boolean;
}

const baseUrl = `${process.env.REACT_APP_SERVER_API}`;
export const callAxios = async ({
  url,
  method,
  data,
  headers,
  params,
}: AxiosDTO) => {
  const token = await getAccessToken();
  const getToken = sessionStorage.getItem("accessToken");
  const config: AxiosRequestConfig = {
    method: method || "GET",
    url: `${baseUrl}${url}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token !== null ? `Bearer ${getToken}` : "",
      ...headers,
    },
    data,
    params,
    timeout: 30000,
  };
  return axios(config)
    .then((res: AxiosResponse<any, any>) => res)
    .catch((err) => err);
};

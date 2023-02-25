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

const baseUrl = `${process.env.SERVER_API}`;

export const callAxios = async ({
  url,
  method,
  data,
  headers,
  params,
}: AxiosDTO) => {
  const token = await getAccessToken();
  const config: AxiosRequestConfig = {
    method: method,
    url: `${baseUrl}${url}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token !== null ? `Bearer ${token}` : "",
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

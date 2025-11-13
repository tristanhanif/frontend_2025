import axios, { AxiosInstance } from "axios";
 
export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:7878",
  headers: { "Content-Type": "application/json" },
});

export interface BaseResponse {
  status: string,
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  data: [] | {};
}

export interface BaseResponsePagination {
  status: string,
  message: string,
  pagination: {
    page: number,
    limit: number,
    pageSize: number,
    total: number
  };
}
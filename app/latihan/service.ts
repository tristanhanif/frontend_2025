import { axiosClient } from "@/service/axios";
import { FilterLatihan, ListLatihanResponse } from "./interface";
import { LatihanDetailResponse } from "./interface";
 
export const latihanService = {
  list: async (params: FilterLatihan): Promise<ListLatihanResponse> => {
    return await axiosClient.get("/siswa/list", {params}).then((n) => n.data);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: async (payload: any): Promise<any> => {
    return await axiosClient
      .post("/siswa/create", payload)
      .then((n) => n.data);
  },
  detail: async (id: number): Promise<LatihanDetailResponse> => {
    return await axiosClient.get(`/siswa/detail/${id}`).then((res) => res.data)
  }
};
import { BaseResponse, BaseResponsePagination } from "@/service/axios";

export interface Latihan {
  id: number;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  nisn: string;
  nik: string;
  email: string;
  updated_at: Date;
  alamat: string;
}

export interface ListLatihanResponse extends BaseResponsePagination {
  data: Latihan[];
  page: number;
  meta: {
    total: number,
    page: number,
    limit: number,
    lastPage: number
  }
}

export interface LatihanDetailResponse extends BaseResponse {
  data: Latihan;
}

export interface FilterLatihan {
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  nisn: string;
  nik: string;
  email: string;
  alamat: string;
  keyword?: string;
  page: number;
  limit: number;
}
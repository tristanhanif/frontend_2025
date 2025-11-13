"use client";

import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { FilterLatihan, Latihan } from "./interface";
import { latihanService } from "./service";
import Button from "../component/Button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Drawer from "../component/Drawer";
import InputText from "../component/InputText";

// const nilaiSiswa = [
//   { id: 1, name: "Andi", score: 85 },
//   { id: 2, name: "Budi", score: 78 },
// ];

export default function LatihanPage() {
  const router = useRouter();

  // Filter untuk menyimpan nilai input yang sedang diketik pengguna.
  // FilterSubmit untuk nilai filter yang benar-benar digunakan saat query dijalankan.
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterLatihan>({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    nisn: "",
    nik: "",
    email: "",
    alamat: "",
    page: 1,
    limit: 4,
  });

  const [filterSubmit, setFilterSubmit] = useState(filter);
  const searchDebounceRef = useRef<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFilter = (e: any) => {
    setFilter((v) => {
      return {
        ...v,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = () => {
    setFilterSubmit({ ...filter, page: 1 });
    setOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setFilterSubmit((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (limit: number) => {
    setFilter((prev) => ({ ...prev, limit: limit, page: 1 }));
    setFilterSubmit((prev) => ({ ...prev, limit: limit, page: 1 }));
  };

  const handleSearchChange = (value: string) => {
    setFilter((prev) => ({ ...prev, nama: value }));
    if (searchDebounceRef.current) {
      window.clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = window.setTimeout(() => {
      setFilterSubmit((prev) => ({ ...prev, nama: value, page: 1 }));
      searchDebounceRef.current = null;
    }, 1500);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchDebounceRef.current) {
        window.clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = null;
      }
      setFilterSubmit((prev) => ({ ...prev, nama: filter.nama, page: 1 }));
    }
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["latihan-list", filterSubmit],
    queryFn: () => latihanService.list(filterSubmit),
  });

  console.log("data", data);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-blue-600 font-medium">Memuat data latihan...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center">
        <p className="text-red-600 font-semibold mb-2">{isError}</p>
        <button
          onClick={() => refetch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📚 Daftar Latihan
      </h1>

      <Drawer title="Filter" isOpen={open} onClose={() => setOpen(false)}>
        <div className="space-y-5">
          <InputText
            name="nama"
            value={filter.nama}
            placeholder="Nama..."
            onChange={handleChangeFilter}
          />

          <InputText
            name="tempat_lahir"
            value={filter.tempat_lahir}
            placeholder="Tempat lahir..."
            onChange={handleChangeFilter}
          />

          <InputText
            type="date"
            name="tanggal_lahir"
            value={filter.tanggal_lahir}
            placeholder="Tanggal lahir..."
            onChange={handleChangeFilter}
          />

          <InputText
            name="nisn"
            value={filter.nisn}
            placeholder="NISN..."
            onChange={handleChangeFilter}
          />

          <InputText
            name="nik"
            value={filter.nik}
            placeholder="NIK..."
            onChange={handleChangeFilter}
          />

          <InputText
            type="email"
            name="email"
            value={filter.email}
            placeholder="Email..."
            onChange={handleChangeFilter}
          />

          <InputText
            name="alamat"
            value={filter.alamat}
            placeholder="Alamat..."
            onChange={handleChangeFilter}
          />
          <div className="flex justify-between">
            {" "}
            <Button
              onClick={handleSubmit}
              title="Submit"
              colorSchema="green"
              height="md"
            />
            <Button title="Reset" colorSchema="red" />
          </div>
        </div>
      </Drawer>
      <div className="grid grid-cols-12 space-y-5">
        <div className="col-span-5">
          <InputText
            placeholder="Cari latihan..."
            value={filter.nama}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e.target.value)
            }
            onKeyDown={handleSearchKeyDown}
            name="search"
          />{" "}
        </div>

        <div className="col-end-12 w-full] ">
          <Button
            onClick={() => setOpen(!open)}
            title="Filter"
            colorSchema="blue"
          />
        </div>
      </div>
      {isFetching ? (
        <div className="text-center py-10 text-gray-600">Memuat data...</div>
      ) : isError ? (
        <div className="text-center text-red-600 py-10">Gagal memuat data.</div>
      ) : (
        <>
          <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  #
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Nama
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Tempat Lahir
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Tanggal Lahir
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  NISN
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  NIK
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Alamat
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Diperbarui
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.data?.map((item: any, i: number) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {item.nama}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {item.tempat_lahir}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {item.tanggal_lahir}
                    </td>
                    <td className="px-4 py-2 text-gray-700">{item.nisn}</td>
                    <td className="px-4 py-2 text-gray-700">{item.nik}</td>
                    <td className="px-4 py-2 text-gray-700">{item.email}</td>
                    <td className="px-4 py-2 text-gray-700">{item.alamat}</td>
                    <td className="px-4 py-2 text-gray-500 text-sm">
                      {new Date(item.updated_at).toLocaleString("id-ID")}
                    </td>{" "}
                    <td className="px-4 py-2">
                      <Button
                        colorSchema="blue"
                        title="Detail"
                        onClick={() => router.push(`latihan/${item.id}/detail`)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-5">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={filterSubmit.limit}
              onChange={(e) => {
                handleLimitChange(Number(e.target.value));
              }}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <div className="flex items-center">
              <button
                className="border rounded-full h-8 w-8 bg-blue-400 text-white hover:bg-blue-500 disabled:opacity-50"
                onClick={() => handlePageChange(filterSubmit.page - 1)}
                disabled={filterSubmit.page === 1}
              >
                ←
              </button>

              <p className="text-gray-600 whitespace-nowrap border p-2 rounded-lg mx-5">
                Halaman {filterSubmit.page} dari {data?.meta.lastPage || 1}
              </p>

              <button
                className="border rounded-full h-8 w-8 bg-blue-400 text-white hover:bg-blue-500 disabled:opacity-50"
                onClick={() => handlePageChange(filterSubmit.page + 1)}
                disabled={filterSubmit.page === data?.meta.lastPage}
              >
                →
              </button>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Latihan } from "./interface";
import { latihanService } from "./service";
import Button from "../component/Button";
import { useRouter } from "next/navigation";

export default function LatihanPage() {
  const [data, setData] = useState<Latihan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [refetch, setRefetch] = useState(false);

  const nilaiSiswa = [
    {
      id: 1,
      name: "matematika",
      nilai: 10,
    },
    {
      id: 2,
      name: "b.inggris",
      nilai: 10,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await latihanService.list();

        setData(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Gagal memuat data latihan 😢");
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan!",
          text: "Tidak dapat memuat data dari server.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-blue-600 font-medium">Memuat data latihan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center">
        <p className="text-red-600 font-semibold mb-2">{error}</p>
        <button
          onClick={() => setRefetch(!refetch)}
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

      {nilaiSiswa.map((item, i) => (
        <tr
          key={item.id}
          className={`${
            i % 2 === 0 ? "bg-white" : "bg-gray-50"
          } hover:bg-blue-50 transition-colors`}
        >
          <td className="px-4 py-2">{i + 1}</td>
          <td className="px-4 py-2 font-medium text-gray-700">{item.name}</td>
          <td className="px-4 py-2 text-gray-700">{item.nilai}</td>
        </tr>
      ))}

      {data.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada data latihan.</p>
      ) : (
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
                Diupdate
              </th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={item.id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {item.nama}
                </td>
                <td className="px-4 py-2 text-gray-700">{item.tempat_lahir}</td>
                <td className="px-4 py-2 text-gray-700">
                  {item.tanggal_lahir}
                </td>
                <td className="px-4 py-2 text-gray-700">{item.nisn}</td>
                <td className="px-4 py-2 text-gray-700">{item.nik}</td>
                <td className="px-4 py-2 text-gray-700">{item.email}</td>
                <td className="px-4 py-2 text-gray-700">{item.alamat}</td>
                <td className="px-4 py-2 text-gray-700">{}</td>
                <td className="px-4 py-2 text-gray-500 text-sm">
                  {new Date(item.updated_at).toLocaleString("id-ID")}
                </td>
                <td>
                  <Button
                    colorSchema="blue"
                    title="detail"
                    onClick={() => {
                      router.push(`/latihan/${item.id}/detail`);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

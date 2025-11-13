"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { latihanService } from "@/app/latihan/service";
import Button from "@/app/component/Button"; // pastikan path sesuai
import { Latihan } from "@/app/latihan/interface";

export default function LatihanDetailPage() {
  const { id } = useParams(); // menangkap parameter id dari URL
  const router = useRouter();

  const [data, setData] = useState<Latihan | null>(null); // untuk menyimpan data dari backend
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await latihanService.detail(String(id));

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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-blue-600 font-medium">
          Memuat data detail latihan...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center">
        <p className="text-red-600 font-semibold mb-2">
          {error ?? "Data tidak ditemukan 😢"}
        </p>
        <Button
          title="Kembali"
          colorSchema="blue"
          onClick={() => router.push("/latihan")}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📋 Detail Latihan
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nama</p>
            <p className="font-medium text-gray-800">{data.nama}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tempat, Tanggal Lahir</p>
            <p className="font-medium text-gray-800">
              {data.tempat_lahir ?? "-"},{" "}
              {data.tanggal_lahir
                ? new Date(data.tanggal_lahir).toLocaleDateString("id-ID")
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">NISN</p>
            <p className="font-medium text-gray-800">{data.nisn ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">NIK</p>
            <p className="font-medium text-gray-800">{data.nik ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{data.email ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Alamat</p>
            <p className="font-medium text-gray-800">{data.alamat ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Diupdate</p>
            <p className="font-medium text-gray-800">
              {data.updated_at
                ? new Date(data.updated_at).toLocaleString("id-ID")
                : "-"}
            </p>
          </div>
        </div>{" "}
      </div>

      <div className="mt-6">
        <Button
          title="Kembali ke Daftar"
          colorSchema="blue"
          onClick={() => router.push("/latihan")}
        />
      </div>
    </div>
  );
}

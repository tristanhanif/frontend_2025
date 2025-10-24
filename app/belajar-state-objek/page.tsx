"use client";
import { useState } from "react";
import InputText from "../component/InputText";
import Label from "../component/Label";

interface profile {
  nama: string;
  email: string;
  password: string;
  umur: number | null;
  isLulus: boolean;
}

export default function BelajarStateObjek() {
  const [profile, setProfile] = useState<profile>({
    nama: "ihsan",
    email: "ihsan@gmail.com",
    password: "12345678",
    umur: 28,
    isLulus: false,
  });
  return (
    <>
      <h1 className="font-bold text-lg">Belajar State Objek</h1>

      <Card value={profile.nama} label="Nama:" />
      <Card value={profile.email} label="Email:" />
      <Card value={profile.password} label="Password:" />
      <Card value={profile.umur} label="Umur:" />
      <Card
        value={profile.isLulus ? "Lulus" : "Belum lulus"}
        label="Keterangan:"
      />

      <Label title="Nama" htmlFor="nama" />
      <InputText
        value={profile.nama}
        id="nama"
        onChange={(e) => {
          setProfile((prevProfile) => {
            return {
              ...prevProfile,
              nama: e.target.value,
            };
          });
        }}
      />

      <Label title="Email" htmlFor="email" />
      <InputText
        value={profile.email}
        id="email"
        onChange={(e) => {
          setProfile((prevEmail) => {
            return {
              ...prevEmail,
              nama: e.target.value,
            };
          });
        }}
      />
    </>
  );
}

function Card({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-5 w-[60%] m-3">
      <h2 className="font-bold text-red-700">{label}</h2>
      <h2 className="text-gray-600 uppercase">{value}</h2>
    </div>
  );
}

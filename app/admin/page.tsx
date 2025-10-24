"use client";

import { useRouter } from "next/navigation";
import Button from "../component/Button";
import { AppContext } from "../component/AppContext";
import { useContext, useEffect } from "react";
import AppTheme from "../component/AppTheme";

export default function Page() {
  const appContext = useContext(AppContext);
  const { logout, isAuth, nama } = appContext;
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  return (
    <AppTheme title="SMK MQ">
      <div className="mt-6">
        <h1 className="text-3xl mb-2">Selamat Datang {nama?.toUpperCase()}</h1>
        <p className="mb-6">Halaman Admin</p>

        <Button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          title="Logout"
          colorSchema="red"
        />
      </div>
    </AppTheme>
  );
}

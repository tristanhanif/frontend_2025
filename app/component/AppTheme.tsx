"use client";
import { ReactNode, useContext } from "react";
import { AppContext } from "./AppContext";
import clsx from "clsx";

interface ThemeProps {
  title: string;
  children: ReactNode;
}

const AppTheme: React.FC<ThemeProps> = ({ title, children }) => {
  const appContext = useContext(AppContext);
  const { theme, username, nama } = appContext;

  return (
    <>
      {/* HEADER */}
      <header
        className={clsx(
          "w-full h-[80px] flex items-center justify-between px-8 font-semibold relative uppercase shadow-md",
          {
            "bg-[#F52D2D] text-white": theme === "light",
            "bg-blue-500 text-white": theme === "dark",
          }
        )}
      >
        {/* Kiri */}
        <h1 className="text-2xl tracking-wide">{title}</h1>

        {/* Kanan */}
        {nama && username && (
          <div className="absolute right-8 top-4 text-right">
            <p className="font-semibold text-lg leading-tight">{nama}</p>
            <p className="text-sm opacity-80 mt-3">@{username}</p>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main
        className={clsx(
          "min-h-screen w-full p-6",
          {
            "bg-gray-100 text-black": theme === "light",
            "bg-gray-900 text-white": theme === "dark",
          }
        )}
      >
        {children}
      </main>
    </>
  );
};

export default AppTheme;

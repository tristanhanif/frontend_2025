"use client";

import { createContext, ReactNode, useState } from "react";

interface AppContextType {
    theme: string;
    toogleTheme: () => void;
    isAuth: boolean;
    username: string;
    nama: string;
    login: (user: string, namaLengkap: string) => void;
    logout: () => void;
}

export const AppContext = createContext<AppContextType>({
    theme: "light",
    toogleTheme: () => {},
    isAuth: false,
    username: "",
    nama: "",
    login: () => {},
    logout: () => {},
});

export default function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<string>("light");
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [nama, setNama] = useState<string>("");

    const toogleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const login = (user: string, namaLengkap: string) => {
        setIsAuth(true);
        setUsername(user);
        setNama(namaLengkap);
    };

    const logout = () => {
        setIsAuth(false);
        setUsername("");
        setNama("");
    };

    return (
        <AppContext.Provider
            value={{
                theme,
                toogleTheme,
                isAuth,
                username,
                nama,
                login,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
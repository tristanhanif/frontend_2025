"use client";

import { useRouter } from "next/navigation";
import Button from "../component/Button";
import { AppContext } from "../component/AppContext";
import { useContext, useState } from "react";
import Label from "../component/Label";
import InputText from "../component/InputText";

export default function Page() {
    const appContext = useContext(AppContext);
    const { login } = appContext;
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [nama, setNama] = useState("");

    return (
        <div className="px-96 flex-col items-center justify-center mt-64">
            <h1>Halaman Login</h1>

            <div className="mt-4">
                <Label title="Username" color="blue" />
                <InputText
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
            </div>

            <div className="mt-4 mb-5">
                <Label title="Nama" color="blue" />
                <InputText
                    value={nama}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNama(e.target.value)}
                />
            </div>

            <Button
                onClick={() => {
                    login(username, nama);
                    router.push("/admin");
                }}
                title="Login"
                colorSchema="blue"
            />
        </div>
    );
}
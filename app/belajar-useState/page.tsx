"use client";

import { useEffect, useState } from "react";
import InputText from "../component/InputText";
import Link from "next/link";

export default function Page() {
  const [count, setCount] = useState(0);
  let [text, setText] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("berjalan");
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  //   useEffect(() => {
  //     console.log("berjalan");
  //     setCount((c) => c + 1)
  //   }, [text]);

  return (
    <>
    <Link href={"/belajar-state"}>pindah</Link>
      <div className="flex items-center justify-center w-full h-screen">
        <h2 className="text-4xl">{text}</h2>
        <h4 className="text-4xl">{count}</h4>
        <InputText
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </>
  );
}

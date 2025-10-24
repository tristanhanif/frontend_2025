"use client";

import { useState } from "react";
import Button from "../component/Button";
import clsx from "clsx";

// ini function updater

export default function BelajarState() {
  let [count, setCount] = useState<number>(0);
  let [text, setText] = useState<string>("");
  let [isOn, setIsOn] = useState<boolean>(false);

  return (
    <>
      <h1> siap belajar state </h1>
      <div
        className={clsx(
          "border mt-5 border-red-500 rounded-full flex justify-center items-center mt-6 mb-6",
          {
            "bg-red-500": isOn === true,
            "bg-black": isOn === false,
          }
        )}
      ></div>
      <div className="border border-red-500 rounded-full flex justify-center items-center mt-6 mb-6">
        ini count : {count}
      </div>
      <div className="border mb-6 h-36 border-red-500 rounded-full flex justify-center items-center">
        ini input text yang telah di update: {text}
      </div>

      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setCount(count + 1);
        }}
      />

      <div className="flex-col items-center justify-center flex gap-8 mt-4">
        <Button
          onClick={() => {
            setIsOn(!isOn);
          }}
          title="Mati/nyala"
          colorSchema="red"
          variant="solid"
          width="md"
        />

        <Button
          onClick={() => {
            setCount(count + 1);
            setIsOn(true);
          }}
          title="Tambah"
          colorSchema="green"
          variant="outline"
          width="md"
        />
        <Button
          onClick={() => {
            setCount(count - 1);
            setIsOn(false);
          }}
          title="kurang"
          colorSchema="green"
          variant="outline"
          width="md"
        />
      </div>
    </>
  );
}

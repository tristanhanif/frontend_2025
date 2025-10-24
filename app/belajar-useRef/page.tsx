// "use client"
// import { useRef } from "react"
// import Button from "../component/Button";

// export default function Page() {
//     const refBelajar = useRef<HTMLDivElement>(null);
//     return(
//         <>
//         <h1 className="flex justify-center text-3xl font-bold mb-3">Halaman belajar useRef!</h1>
//         <div onMouseEnter={() => {
//             console.log("re", refBelajar.current);
//             if(refBelajar.current) {
//                 refBelajar.current.classList.remove("bg-red-500")
//                 refBelajar.current.classList.add("bg-yellow-500")
//                 refBelajar.current.innerText = "Belajar useRef"
//             }
//             console.log("oke")
//         }} onMouseLeave={() => {
//             if(refBelajar.current) {
//                 refBelajar.current.classList.remove("bg-yellow-500")
//                 refBelajar.current.classList.add("bg-red-500")
//                 refBelajar.current.innerText = ""
//             }
//             console.log("keluar")
//         }} ref={refBelajar} className="bg-red-500 border h-20 w-full"></div>

//         <Button title="Ubah" colorSchema="blue" onClick={() => {
//             if(refBelajar.current) {
//                 const node = document.createElement("div");
//                 node.className = "text-white w-3 p-3 border rounded-full p-2 bg-blue-200";
//                 const textNode = document.createTextNode("Water");
//                 node.appendChild(textNode);
//                 refBelajar.current.appendChild(node);
//             }
//         }}/>
//         </>
//     )
// }

"use client";
import { useRef } from "react";
import Button from "../component/Button";
import InputText from "../component/InputText";
 
const Home = () => {
  const targetAbout = useRef<HTMLDivElement>(null);
  const targetHome = useRef<HTMLDivElement>(null);
  const targetContent = useRef<HTMLDivElement>(null);
 
  const scrollToHome = () => {
    console.log("content", targetHome);
    if (targetHome.current) {
      targetHome.current.classList.add('text-3xl')
      targetHome.current.scrollIntoView({
        behavior: "smooth",        block: "start",
      });
    }
  };
  const scrollToContent = () => {
    console.log("content", targetContent);
    if (targetContent.current) {
      targetContent.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
 
  const scrollToAbout = () => {
    console.log("content", targetAbout);
    if (targetAbout.current) {
      const node = document.createElement("div");
      node.className ="text-white bg-red-500 p-2"
      const textnode = document.createTextNode("Water");
      node.appendChild(textnode);
      targetAbout.current.appendChild(node);
 
      targetAbout.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
 
  return (
    <section className="h-screen w-screen">
      <nav className="h-[50px]">
        <Button
          onClick={scrollToHome}
          colorSchema="blue"
          variant="solid"
          title="Home"
        />
        <Button
          onClick={scrollToContent}
          colorSchema="red"
          variant="solid"
          title="Content"
        />
        <Button
          onClick={scrollToAbout}
          colorSchema="green"
          variant="solid"
          title="About"
        />
      </nav>
      <section className="h-[90%] overflow-auto">
        <div
          ref={targetHome}
          className="min-h-screen bg-red-500 flex items-center justify-center"
        >
          <h1 className="text-white">Home </h1>
        </div>
        <div
          ref={targetContent}
          className="min-h-screen bg-blue-500 flex items-center justify-center"
        >
          <h1 className="text-white">Content </h1>
        </div>
        <div
          ref={targetAbout}
          className="min-h-screen bg-yellow-500 flex items-center justify-center"
        >
          <h1 className="text-white">About </h1>
        </div>
      </section>
    </section>
  );
};
 
export default Home;
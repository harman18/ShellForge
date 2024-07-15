"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { SocketConnection } from "./connection";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [soc, socketCheck] = useState(false);
 useEffect(()=>{
  const socket = SocketConnection();
  socket.onopen = () => {
    socket.send(JSON.stringify({message:"Opened Client Side Connection !! From Client "}));
    socketCheck(true);
  };
  // return () => socket.close();
 }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container h-full w-full">
          <Navbar>
            {(soc) && children}
          </Navbar>
        </div>
      </body>
    </html>
  );
}

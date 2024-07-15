"use client";

import { Terminal } from "@xterm/xterm";
// import 'xterm/css/xterm.css'
import React, { useEffect, useRef } from "react";
import * as cowsay from "cowsay";
// import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import '@xterm/xterm/css/xterm.css';
import { SocketConnection } from "../connection";

const Initialize = () => {
  const data = "Welcome to the SourceForge \nWhere coding meets convenience, online..";
  return `\"Designed and Developed by \@{Harmanjot Singh\}\" \n${cowsay.say({
    text: data,
    f: 'turtle'
  })}`
}

export default function Termux() {
  var socket = useRef<WebSocket>(SocketConnection());
  var data = useRef<null | HTMLDivElement>(null);
  // var term = useRef<Terminal>(null);
  var terminalName = useRef("\r\n(Shell Forge)$:- ");
  useEffect(() => {
    var term = new Terminal({ convertEol: true, cursorBlink: true });
    var cur_line = "";
    // term.loadAddon(new WebLinksAddon());
    if (data.current){
      term.open(data.current);
    }
    term.write(Initialize());
    term.write(`\r\n ${terminalName.current}`);
    // Marking the issue with val.domEvenet moduel
    term.onKey((val) => {
      console.log("Key pressed");
      switch (val.domEvent.keyCode) {
        case 13:
          console.log("EnterPressed");
          socket.current.send(JSON.stringify({
            cmd: cur_line
          }));
          cur_line = "";
          socket.current.onmessage = (msg) => {
            let data = JSON.parse(msg.data);
            console.log(data);
            term.write(data);
          };
          term.write(terminalName.current);
          break;
        case 8:
          console.log("backspace pressed");
          if (cur_line) {
            cur_line = cur_line.slice(0, -1);
            term.write("\b \b");
          }
          break;
        default:
          console.log("default hit");
          cur_line += val.key;
          term.write(val.key);
      }
    });
    return () => {
      term.dispose();
    };
  }, []);
  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <div ref={data} style={{ backgroundColor: 'lightblue' }}></div>
    </Box>
  )
};  
"use client";

import { Terminal } from "@xterm/xterm";
// import 'xterm/css/xterm.css'
import React, { useEffect, useRef } from "react";
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import '@xterm/xterm/css/xterm.css';

var TermuxData = () => {
  return (
    <></>
  )
};

export default function Termux() {
  var data = useRef<HTMLElement>(null);
  var term = useRef<Terminal>();
  useEffect(() => {
    term = new Terminal({convertEol: true, cursorBlink: true});
    var cur_line = "";
    // term.loadAddon(new WebLinksAddon());
    term.open(data.current);
    term.write("Web Shell $");
    // term.onData(data => {
    //   handleInput(data);
    // });
    term.onKey((val)=>{
      console.log(val.key);
      if (val.domEvent === "Enter"){
        if (cur_line){
          term.writeln("\r")
        }
      }
      else{
        cur_line += val.key;
        term.write(val.key)
      }
    });
    return () => {
      term.dispose();
    };
  }, []);
  const handleInput = (input)=>{
    // if input
    // term.write(`You Typed: ${input}`)
  }
  return (
    <Box sx={{ display: 'flex', position: 'relative'}}>
      <div ref={data} style={{backgroundColor:'lightblue' }}></div>
    </Box>
  )
};  
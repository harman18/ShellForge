import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();

// HTTP Get connection with Node js
// app.get("/", (req, res) =>{
//   res.send("hello world")
// })

const httpServer = app.listen(8000);

const wssObj = new WebSocketServer({ server: httpServer });
const clients = new Set();

wssObj.on("connection", function connection(wsClient) {
  console.log(wsClient);
  clients.add(wsClient);

  wsClient.on("error", console.error);

  wsClient.on("message", function message(data, isBinary) {
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      wsClient.send(JSON.stringify({ message: "Recieved Data"}));
      if (jsonData.login){
        wsClient.send(JSON.stringify({
          authenticated: true
        }))
      }
      else if (jsonData.cmd){
        wsClient.send(JSON.stringify({
          output : "Output of cmd: "+ jsonData.cmd
        }))
      }
      
    } catch (error) {
      console.error("Error parsing Data", error);
      wsClient.send(JSON.stringify({ error: "Invalid Format for Payload!!" }));
    }
  });
  
  wsClient.on("close", function close() {
    clients.delete(wsClient);
  });
  
  wsClient.send("Hello! Message From Server !!");
});

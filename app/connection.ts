var socket = null;
// let initializsed = false;

export const SocketConnection = () => {
  if (!socket) {
    // initializsed = true;
    socket = new WebSocket("ws://10.66.45.99:8000");
  }
  return socket;
  // const [socket, setSocket] = useState<WebSocket>();
  // const [recData, setRecData] = useState("Connecting to WebSocket");

  // useEffect(() => {
  // socket.onopen = () => {
  //     console.log('Connected');
  //     // setSocket(socket);
  // };
  // socket.onmessage = (event) => {
  //     // setRecData(event.data);
  // };
  // }, []);
};

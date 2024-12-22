import { ChangeEventHandler,  useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {io} from 'socket.io-client';
import {wsServer, wsClient} from '@repo/websockets/commands'

const socket = io('http://localhost:5000');

function App() {
  const [count, setCount] = useState(0)
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    // Listen for messages from the server
    socket.on(wsServer.CHAT_MESSAGE, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  }
  const sendMessage = useCallback(() => {
    socket.emit(wsClient.CHAT_MESSAGE, inputValue);
    setInputValue("")
  },[inputValue]);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <input type="text" onChange={handleInput} value={inputValue}/>
        <button onClick={sendMessage}>send</button>
      </div>
      <ul>
      {messages.map((msg, idx) => <li key={`${msg}_${idx}`}>{msg}</li>)}</ul>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

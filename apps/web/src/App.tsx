import { useState, useEffect, useCallback, MouseEventHandler, ChangeEventHandler } from 'react'
import './App.css'
import {wsClient} from '../../../packages/socket-events/dist/commands'

const socket = new WebSocket("ws://localhost:9001")


function App() {
  const [log, setLog] = useState<string[]>([])
  const [text, setText] = useState<string>("");
  useEffect(() => {

    // Connection opened
    const onOpen = (_event: Event) => {
      socket.send("Connection established")
    }
    const onMessage = ((event: any) => {
      setLog((state) => state.concat(JSON.stringify(event?.data)));
      console.log('Message from server', event?.data)
    })
    socket.addEventListener("open", onOpen);

    // Listen for messages
    socket.addEventListener("message", onMessage);
    return () => {
      socket.removeEventListener('open', onOpen)
      socket.removeEventListener('message', onMessage)
    }
  }, [])
  const handleSend: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    socket.send(JSON.stringify(wsClient.LOG_ME(text)))
  }, [text])
  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setText(event.target.value);
  },[])
  return (
    <>
      <div>
        <input type="text" value={text} onChange={handleInput}/>
        <button onClick={handleSend}>handleSend</button>
        <ul>{log.map((entry: string, i) => <li key={`${entry}_${i}`}>{entry}</li>)}</ul>
       </div>
    </>
  )
}

export default App

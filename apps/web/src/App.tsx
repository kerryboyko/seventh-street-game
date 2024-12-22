import {  useCallback, useEffect, useState } from 'react'
import './App.css'
import {io} from 'socket.io-client';
import {Switch, Route, useLocation} from 'wouter'
import {wsServer, wsClient} from '@repo/websockets/commands'
import GamePage from './pages/GamePage';

const socket = io('http://localhost:5000');

function App() {
  const [loading, setLoading] = useState<string>("IDLE")
  const [, navigate] = useLocation();

  useEffect(() => {
    // Listen for messages from the server
    socket.on(wsServer.NEW_GAME_CREATED, (gameId) => {
      console.log(`new game created ${gameId}`)
      setLoading('DONE')
      navigate(`/game/${gameId}`)
    });
    socket.on(wsServer.LOG_ME, (message) => {
      console.log(`Message: ${message}`)
    })

    // Clean up on component unmount
    return () => {
      console.log('disconnecting');
      socket.disconnect();
    };
  }, []);

  const handleCreateNewGame = useCallback(() => {
    setLoading("LOADING")
    socket.emit(wsClient.CREATE_NEW_GAME);
  },[]);
  return (
    <>
    <Switch>
      <Route path="/game/:gameId">
        {(params) => <GamePage gameId={params.gameId}/>}
      </Route>
      <Route path="/">
      <div>
        
      <h1>Seventh Street</h1>
      <h2>The Real-Estate Trading Game Of Deception and Deduction</h2>
        {loading === 'LOADING' 
        ? <div>Loading</div> 
        : <button onClick={handleCreateNewGame}>
          Create New Game
        </button>}
    </div>
      </Route>
    </Switch>

    </>
  )
}

export default App

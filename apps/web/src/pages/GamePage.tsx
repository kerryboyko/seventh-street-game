
import {io} from 'socket.io-client';
import {wsServer, wsClient} from '@repo/websockets/commands'

const socket = io('http://localhost:5000');

function GamePage({gameId}: {gameId: string}) {
  return (
    <>
      <div>
      GamePage: {gameId}
    </div>
    </>
  )
}

export default GamePage

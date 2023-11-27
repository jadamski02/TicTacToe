import React, { useState } from 'react'
import Board from './Board';

function Game({ channel }) {

    const [playerJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

    const [result, setResult] = useState({winner: "none", state: "none"});

    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    })

    if(!playerJoined) {
        return <div>Waiting for other players to join...</div>
    }

  return (
    <div className='gameContainer'>
        <Board result={result} setResult={setResult}/>
        {/* {CHAT} */}
        {/* {LEAVE GAME} */}
    </div>
  )
}

export default Game
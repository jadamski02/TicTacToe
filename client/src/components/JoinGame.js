import React, { useState } from 'react'
import { useChatContext, Channel } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import Game from './Game';

function JoinGame() {
  const [rivalName, setRivalName] = useState('');
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const cookies = new Cookies();
  const username = cookies.get("username");
  const createChannel = async () => {
    const response = await client.queryUsers({name: {$eq: rivalName}});

    if(response.users.length === 0) {
      alert("Pokój nie został odnaleziony");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id]
    });

    await newChannel.watch()
    setChannel(newChannel);
  };
  return (
    <>
    {channel ? 
    (
    <Channel channel={channel}>
      <Game channel={channel} />
    </Channel>

    ) : (
    <div className='joinGame'>
    <h2>Witaj {username}!</h2>
    <h4>Stwórz grę</h4>
    <input 
    placeholder='Wpisz nazwę przeciwnika...'
    onChange={(event) => {
      setRivalName(event.target.value);
      }}>
      </input>
      <button onClick={createChannel}>Rozpocznij/Dołącz do gry</button>
  </div>
    )}
    </>
  );
}

export default JoinGame;
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login({ setIsAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const cookies = new Cookies();
    const login = () => {
      axios.post("http://localhost:5000/login", {
        username,
        password,
      }).then((res) => {
          const { firstName, lastName, username, token, userId } = res.data;
          cookies.set("token", token);
          cookies.set("firstName", firstName);
          cookies.set("lastName", lastName);
          cookies.set("userId", userId);
          cookies.set("username", username);
          setIsAuth(true);
      });
  };
  return (
    <div className="login">
        <label>Zaloguj się</label>

        <input placeholder='Login' 
        onChange={(event) => {
            setUsername(event.target.value);
        }} />

        <input placeholder='Hasło' 
        type="password" 
        onChange={(event) => {
            setPassword(event.target.value);
        }} />
  

        <button className='button' onClick={login}>Zaloguj się</button>
    </div>
  );
}

export default Login
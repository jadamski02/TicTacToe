import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

function SignUp({ setIsAuth }) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    const signUp = () => {
        axios.post("http://localhost:5000/signUp", user).then((res) => {
            const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
        })
    }
  return (
    <div className="signUp">
        <label>Zarejestruj się</label>

        <input placeholder='Imię' onChange={(event) => {
            setUser({...user, firstName: event.target.value})
        }} />

        <input placeholder='Nazwisko' onChange={(event) => {
            setUser({...user, lastName: event.target.value})
        }}
         />

        <input placeholder='Login' onChange={(event) => {
            setUser({...user, username: event.target.value})
        }} />

        <input placeholder='Hasło' type="password" onChange={(event) => {
            setUser({...user, password: event.target.value})
        }} />

        <button className='button' onClick={signUp}>Zarejestruj się</button>
    </div>
  )
}

export default SignUp
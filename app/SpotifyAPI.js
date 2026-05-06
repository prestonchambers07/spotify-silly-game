import React, { useEffect, useState } from 'react';

const clientID = '1f03dcd0b682463cbbeef1c4455a7f13';
const redirectURI = 'http://127.0.0.1:3000/callback'; 
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = ['user-read-private', 'user-read-email'];

const API = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if there is a token in the URL hash (Implicit Grant style)
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
        window.location.hash = "";
        window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const login = () => {
    window.location.href = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=${scopes.join('%20')}`;
  };

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!token ? (
        <button onClick={login}>Login to Spotify</button>
      ) : (
        <div>
          <p>Authenticated!</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default API;
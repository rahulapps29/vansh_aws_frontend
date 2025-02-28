import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      exchangeCodeForToken(authCode);
      window.history.replaceState({}, document.title, "/"); // Clean URL
    }
  }, []);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/auth/callback?code=${code}`,
        { withCredentials: true }
      );
      setToken(response.data.access_token);
      localStorage.setItem("amazon_access_token", response.data.access_token);
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/login";
  };

  return (
    <div>
      <h1>Amazon API Demo</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with Amazon</button>
      ) : (
        <p>Logged in! Access Token stored.</p>
      )}
    </div>
  );
}

export default App;

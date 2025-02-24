import React, { useState } from 'react';

function App() {
    const [username, setUsername] = useState("");

    const registerPasskey = async () => {
        const response = await fetch("http://localhost:3000/auth/register-challenge", {
            method: "POST",
            body: JSON.stringify({ username }),
            headers: { "Content-Type": "application/json" },
        });
        const challengeData = await response.json();
        const credential = await navigator.credentials.create({ publicKey: challengeData });
        await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            body: JSON.stringify({ username, credential }),
            headers: { "Content-Type": "application/json" },
        });
        alert("Passkey registrada!");
    };

    const loginWithPasskey = async () => {
        const response = await fetch("http://localhost:3000/auth/login-challenge", {
            method: "POST",
            body: JSON.stringify({ username }),
            headers: { "Content-Type": "application/json" },
        });
        const challengeData = await response.json();
        const credential = await navigator.credentials.get({ publicKey: challengeData });
        await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, credential }),
            headers: { "Content-Type": "application/json" },
        });
        alert("Login realizado!");
    };

    return (
        <div>
            <h2>Autenticação com Passkeys</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu usuário" />
            <button onClick={registerPasskey}>Registrar Passkey</button>
            <button onClick={loginWithPasskey}>Login com Passkey</button>
        </div>
    );
}

export default App;

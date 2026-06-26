import { useState } from "react";
import { Link } from "react-router-dom";
import { api, setToken } from "../api/api.js";
import "../css/Auth.css";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password
                })
            });

            setToken(response.token);
            window.location.href = "/game";
        } catch (err) {
            setError(err.message || "Login fallito.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>EGO</h1>
                <h2>Login</h2>

                {error && (
                    <div className="auth-error">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Entra nel gioco
                    </button>
                </form>

                <p className="auth-switch">
                    Non hai ancora un account?{" "}
                    <Link to="/register">
                        Registrati
                    </Link>
                </p>
            </div>
        </div>
    );
}
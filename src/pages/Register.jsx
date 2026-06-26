import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import "../css/Auth.css";

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password
                })
            });

            navigate("/");
        } catch (err) {
            setError(err.message || "Registrazione fallita.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>EGO</h1>
                <h2>Registrazione</h2>

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
                        Crea account
                    </button>
                </form>

                <p className="auth-switch">
                    Sei già registrato?{" "}
                    <Link to="/">
                        Fai il login
                    </Link>
                </p>
            </div>
        </div>
    );
}
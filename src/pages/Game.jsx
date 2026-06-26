import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api, logout, isAuthenticated } from "../api/api.js";
import "../css/Game.css";

export default function Game() {
    const navigate = useNavigate();
    const outputRef = useRef(null);

    const [command, setCommand] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomImage, setRoomImage] = useState("/img/foresta.png");

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop =
                outputRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const loadInitialState = async () => {
            try {
                const data = await api("/api/game/status");

                if (data.message) {
                    setMessages([data.message]);
                }

                if (data.currentRoom?.imgUrl) {
                    setRoomImage(data.currentRoom.imgUrl);
                }
            } catch (error) {
                setMessages([
                    "Unable to load game state."
                ]);
            }
        };

        if (isAuthenticated()) {
            loadInitialState();
        }
    }, []);

    const handleCommand = async (e) => {
        e.preventDefault();

        const trimmed = command.trim();

        if (!trimmed) {
            return;
        }

        try {
            const data = await api("/api/game/command", {
                method: "POST",
                body: JSON.stringify({
                    command: trimmed
                })
            });

            const newMessages = [
                `> ${trimmed}`
            ];

            if (data.message) {
                newMessages.push(data.message);
            }

            setMessages((prev) => [
                ...prev,
                ...newMessages
            ]);

            if (data.currentRoom?.imgUrl) {
                setRoomImage(data.currentRoom.imgUrl);
            }

            setCommand("");
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                `> ${trimmed}`,
                `Error: ${error.message}`
            ]);
        }
    };

    return (
        <div className="game-page">
            <header className="game-header">
                <h1>EGO</h1>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>
            </header>

            <main className="game-layout">
                <section className="room-panel">
                    <img
                        src={roomImage}
                        alt="Current room"
                        className="room-image"
                    />
                </section>

                <section className="terminal-panel">
                    <div
                        className="terminal-output"
                        ref={outputRef}
                    >
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>

                    <form
                        className="command-form"
                        onSubmit={handleCommand}
                    >
                        <span className="prompt">
                            &gt;
                        </span>

                        <input
                            className="command-input"
                            type="text"
                            value={command}
                            onChange={(e) =>
                                setCommand(
                                    e.target.value
                                )
                            }
                            autoFocus
                            autoComplete="off"
                            spellCheck="false"
                        />

                        <button
                            className="send-btn"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
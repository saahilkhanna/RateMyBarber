import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authStates, withAuth } from "./auth";
import Loader from "./Loader";
import { signInWithEmailPassword, signInWithGoogle } from "../utils/firebase";
import "../components/login.css";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailPassword(email, password);
        } catch (error) {
            setError("Incorrect email/password.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setError("Error signing in with Google.");
        }
    };

    if (props.authState === authStates.INITIAL_VALUE) {
        return <Loader />;
    }

    if (props.authState === authStates.LOGGED_IN) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}
                <button type="submit" className="login-button">Login</button>

                <button type="button" onClick={handleGoogleLogin} className="google-button">
                    Login with Google
                </button>

                <p className="signup-prompt">Don't have an account?</p>
                <Link to="/signup" className="signup-link">Sign up</Link>
            </form>
        </div>
    );
};

export default withAuth(Login);

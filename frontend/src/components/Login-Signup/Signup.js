import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authStates, withAuth } from "../auth/auth";
import Loader from "../Loader/Loader";
import { signUpWithEmailPassword, signInWithGoogle } from "../../utils/firebase";
import "./Signup.css";  // Ensure this path is correct

const Signup = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== retypePassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            await signUpWithEmailPassword(email, password, name);
        } catch (error) {
            setError("Error signing up: " + error.message);
        }
    };

    const handleGoogleSignup = async () => {
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
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                <h2>Sign Up</h2>

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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

                <input
                    type="password"
                    placeholder="Retype Password"
                    name="retypePassword"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}
                <button type="submit" className="signup-button">Sign Up</button>

                <button type="button" onClick={handleGoogleSignup} className="google-button">
                    Sign up with Google
                </button>

                <p className="login-prompt">Already a member?</p>
                <Link to="/login" className="login-link">Login</Link>
            </form>
        </div>
    );
};

export default withAuth(Signup);

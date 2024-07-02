import React from 'react';
import { Link } from 'react-router-dom';
import { authStates, withAuth } from './auth';
import { signOut } from '../utils/firebase';
import './Navbar.css';

class Navbar extends React.Component {
    handleSignOut = () => {
        signOut()
            .then(() => console.log("Signed Out"))
            .catch((e) => console.log("Error signing out", e));
    };

    render() {
        if (this.props.authState === authStates.INITIAL_VALUE) {
            return null; // Or a loader if you prefer
        }

        return (
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">Rate My Barber</Link>
                </div>
                <div className="navbar-links">
                    {this.props.authState === authStates.LOGGED_IN ? (
                        <div className="navbar-user">
                            <img src={this.props.user.photoURL} alt="User" className="navbar-user-pic" />
                            <span className="navbar-user-name">Hey, {this.props.user.displayName}</span>
                            <button onClick={this.handleSignOut} className="navbar-signout-button">Sign Out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </div>
            </nav>
        );
    }
}

export default withAuth(Navbar);

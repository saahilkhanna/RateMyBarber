import React from "react";
import { auth } from '../firebaseConfig';

export const authStates = {
    INITIAL_VALUE: "unknown",
    LOGGED_IN: "logged_in",
    LOGGED_OUT: "logged_out",
};

export function withAuth(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                user: undefined,
                authState: authStates.INITIAL_VALUE,
            };

            this.unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    this.setState({
                        user: user,
                        authState: authStates.LOGGED_IN,
                    });
                } else {
                    this.setState({
                        user: null,
                        authState: authStates.LOGGED_OUT,
                    });
                }
            });
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    authState={this.state.authState}
                    user={this.state.user}
                    {...this.props}
                />
            );
        }
    };
}

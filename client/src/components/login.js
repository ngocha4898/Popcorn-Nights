import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutButton from "./logout";
import Profile from "./profile";


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <Profile/>
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <LogoutButton/>
        </>
    )
};

export default LoginButton;
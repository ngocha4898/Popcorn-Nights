import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutButton from "./logout";
import Profile from "./profile";
import styled from "styled-components";


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Wrapper>
            {/* <Profile/> */}
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <LogoutButton/>
        </Wrapper>
    )
};

export default LoginButton;

const Wrapper = styled.div`
button{
    position: absolute;
    left: 42%;
    top: 40%;
    border-style: none;
    width: 300px;
    height: 50px;
    border-radius: 20px;
}
`
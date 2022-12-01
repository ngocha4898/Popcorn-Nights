import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { GiExitDoor } from "react-icons/gi";
import styled from "styled-components";

const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <Wrapper>
        <GiExitDoor className="button" onClick={() => logout()}/>
        </Wrapper>    
    );
};

export default LogoutButton;

const Wrapper = styled.div`
.button{
    position: relative;
    float: right;
    top: -215px;
    font-size:35px;
    text-decoration: none;
    color: white;
    left:-30px;
}
`
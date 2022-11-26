import { NavLink } from "react-router-dom";
import LogoutButton from "./logout";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./profile";
import SearchBar from "./SearchBar";

const NavBar = () => {
    const { user } = useAuth0();

    return (
        <Wrapper>
            <div> 
                <NavItem to ="/"> <img className="home" src="https://i.pinimg.com/736x/c3/38/f5/c338f52826e44e0be91b677bc476671d--popcorn-theme-popcorn-bags.jpg"/> </NavItem>
                {/* <NavItem className="logout" to="/logout"> <LogoutButton/> </NavItem> */}
                <NavItem to="/profile"> <img className="ava" src={user?.picture}/> </NavItem>

            </div>
        </Wrapper>
    )
}

export default NavBar;
const Wrapper = styled.div`
    background-color: none;
    height: 20%;
    width: 100%;
`
const NavItem = styled(NavLink)`
.home{
    max-width: 2%;
}
.ava{
    max-width: 2%;
    border-radius: 50px;
}

`;
import { NavLink } from "react-router-dom";
import LogoutButton from "./logout";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { GiExitDoor } from "react-icons/gi";
import SearchBar from "./SearchBar";

const NavBar = () => {
    const { user } = useAuth0();

    return (
        <Wrapper>
            <div className="navbar"> 
                <NavItem to ="/"> <img className="home" src="https://i.pinimg.com/736x/c3/38/f5/c338f52826e44e0be91b677bc476671d--popcorn-theme-popcorn-bags.jpg"/> </NavItem>
                <SearchBar className="searchbar float-left"/>
                <NavItem className="float-right" to="/profile"> <img className="ava" src={user?.picture}/> </NavItem>
                <NavItem className="logout float-right" to="/logout"> <LogoutButton/> </NavItem>

            </div>
        </Wrapper>
    )
}

export default NavBar;
const Wrapper = styled.div`    
    background-color: none;
    height: 100px;
    width: 100%;
*{position:relative}
.navbar{
    height: 10px;
}
`
const NavItem = styled(NavLink)`
text-decoration: none;
.home{
    max-width: 2.5%;
    position: relative;
    top: 10px;
    left: 1.5%;
}
.ava{
    max-width: 2%;
    border-radius: 50px;
    float: right;
    top: 20px;
    right: 5%;
}

`;
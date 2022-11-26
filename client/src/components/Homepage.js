import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./logout";
import SearchBar from "./SearchBar";
const moment = require('moment');

const Homepage = () => {

    const [state,setState] = useState (null);
    const navigate = useNavigate()
    const page = Math.floor(Math.random() * 10+1)
    useEffect (() => {
    fetch(`/api/?page=${page}`)
        .then(res => res.json())    
        .then((data) => {setState(data);})    
        .catch((error) => {console.log(error)})    
},[]);

    return (
        <StyledHome>
        {/* <SearchBar/>  */}
        <div>
        {
            !state
            ? <h1> Loading... </h1>
            : state?.data?.results?.map (element => {
                return (
                    <Wrapper>
                    <div onClick={()=> navigate(`/Movie/${element.id}`)}>
                    <img src={"https://image.tmdb.org/t/p/original"+element.poster_path}/>
                    <p> {element.original_title}</p>
                    <p className="year"> {moment(element.release_date).format('LL')}</p>
                    </div>
                    </Wrapper>
                )
            })
        }
        </div>
        </StyledHome>
    )
    
    
}

export default Homepage;
const StyledHome = styled.div`
`
const Wrapper = styled.div`
position: relative;
display: inline-block;
padding: 0% 2% 0% 2%;
left: 4.5%;
p{
    text-align: center;
    margin-top: -1px;
    color: white;
}
img{
    width: 250px;
}
.year{
    position: relative;
    margin-top: -15px;
}


`
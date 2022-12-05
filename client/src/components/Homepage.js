import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoutButton from "./logout";
import SearchBar from "./SearchBar";
const moment = require('moment');

const Homepage = () => {

    const [state,setState] = useState (null);
    const navigate = useNavigate()
    const page = Math.floor(Math.random() * 5+1)
    useEffect (() => {
    //fetching movies
    fetch(`/api/?page=${page}`)
        .then(res => res.json())    
        .then((data) => {setState(data);})    
        .catch((error) => {console.log(error)})    
},[]);

    return (
        <StyledHome>

        <div>
        {
            !state
            ? <h1> Loading... </h1>
            : state?.data?.results?.map (element => {
                return (
                    <Wrapper>
                    <div className="singleMovie" onClick={()=> navigate(`/Movie/${element.id}`)}>
                    <img src={"https://image.tmdb.org/t/p/original"+element.poster_path}/>
                    <p className="title"> {element.original_title}</p>
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
padding: 0% 2% 2% 1%;
justify-content: space-between;
justify-content: center;
left: 7%;
width: 250px;
height: 450px;

p{
    text-align: center;
    margin-top: 4px;
    color: white;
    max-width: 250px;
}
.title{
    font-weight: bolder;
    font-size: 20px;
}
img{
    width: 250px;
    height: 400px;
}
.year{
    position: relative;
    margin-top: -14px;
    font-style: italic;
    font-size: 15px;
}
.singleMovie:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease;
}
.singleMovie {
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 400px;
    align-items: center;
    justify-content: space-between;
    img {
        border-radius: 10px;
    }
}


`
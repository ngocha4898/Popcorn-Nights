import {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useParams} from "react-router-dom";
import {FiStar} from "react-icons/fi";
import styled from "styled-components";

const sendRequest= (link, movie_id, user_id,rate,request) =>{

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
    "movie_id": movie_id,
    "user_id": user_id,
    "rate":rate
    });
    
    let requestOptions = {
    method: request,
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
        fetch(link, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

const Star = ({movie_id}) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [rate, setRate] = useState (null)
    const [hover,setHover] = useState (null)
    // const movie_id = useParams().MovieId

    //check if user already rate a movie
    useEffect (() => {
        fetch(`/get-rate/?user_id=${user?.sub}&movie_id=${movie_id}`)
            .then(res => res.json())    
            .then((data) => {
                setRate (data.data.rate)
            })    
            .catch((error) => {console.log(error)})    
        },[user?.sub,movie_id,rate]);
    //-----------------------------------------------------

    return (
        <Wrapper>
        <FiStar className={(hover>=1 || rate >=1)?"yellow": ""} onClick={()=> 
            {
                setHover(1)
                if (rate)
                        {
                            sendRequest("/update-rate",movie_id,user?.sub,1,"PATCH")
                        }
                        else 
                        {
                            sendRequest("/add-rate",movie_id,user?.sub,1,"POST")
                        }
            }
            }/>
        <FiStar className={(hover>=2 || rate >=2) ?"yellow": ""} onClick={()=> 
            {
                setHover(2)
                if (rate)
                        {
                            sendRequest("/update-rate",movie_id,user?.sub,2,"PATCH")
                        }
                        else 
                        {
                            sendRequest("/add-rate",movie_id,user?.sub,2,"POST")
                        }
            }}/>
        <FiStar className={(hover>=3 || rate >=3)?"yellow": ""} onClick={()=> 
            {
                setHover(3)
                if (rate)
                        {
                            sendRequest("/update-rate",movie_id,user?.sub,3,"PATCH")
                        }
                        else 
                        {
                            sendRequest("/add-rate",movie_id,user?.sub,3,"POST")
                        }
            }}/>
        <FiStar className={(hover>=4 || rate >=4)?"yellow": ""} onClick={()=> 
            {
                setHover(4)
                if (rate)
                        {
                            sendRequest("/update-rate",movie_id,user?.sub,4,"PATCH")
                        }
                        else 
                        {
                            sendRequest("/add-rate",movie_id,user?.sub,4,"POST")
                        }
            }}/>
        <FiStar className={(hover>=5 || rate >=5)?"yellow": ""} onClick={()=> 
            {
                setHover(5)
                if (rate)
                        {
                            sendRequest("/update-rate",movie_id,user?.sub,5,"PATCH")
                        }
                        else 
                        {
                            sendRequest("/add-rate",movie_id,user?.sub,5,"POST")
                        }
            }}/>
        </Wrapper>
    )
}

export default Star;

const Wrapper = styled.div`
.yellow{
    fill: yellow;
    color: yellow;
}
`
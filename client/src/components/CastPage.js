import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useParams} from "react-router-dom";


const CastPage = () => {
    let today = new Date();
    const person_id = useParams().CastId
    const [cast,setCast] = useState (null); 
    //getting cast's information
    useEffect (() => {
    fetch(`/Cast/${person_id}`)
        .then(res => res.json())    
        .then((data) => {setCast(data);})    
        .catch((error) => {console.log(error)})    
},[person_id]);
return (
    <>
        {
            !cast
            ?<></>
            :
            <Wrapper>
                <img src={"https://image.tmdb.org/t/p/original"+cast.data.profile_path}/>
                <div className="personal-info">
                <h2> Personal Info </h2> 
                    <p> <p className="subtitle">Known for:</p> {cast.data.known_for_department}</p>
                    <p><p className="subtitle">Popularity:</p> {cast.data.popularity}</p> 
                    <p><p className="subtitle"> Gender:</p> {(cast.data.gender==1)?"Female":"Male"}</p>
                    <p className="subtitle"> Birthday:</p> 
                        {   
                            //condition whether the actor has their birthday information in the database or not            
                            cast.data.birthday
                            ?<p className="inline">{cast.data.birthday} ({today.getFullYear()-cast.data.birthday.substring(0,4)+ " years old"})</p>
                            :"" 
                        }
                    
                    <p><p className="subtitle"> Place of birth:</p> {cast.data.place_of_birth}</p>
                    <p><p className="subtitle"> Also Known As:</p> {cast?.data?.also_known_as?.map(element=>{
                        return (
                            <p className="known-for"> {element}, </p>
                        )
                    })} </p>
                </div>
                <div className="cast-info">
                    <h1> {cast.data.name} </h1>
                    <p> <h2>Biography</h2> {cast.data.biography?cast.data.biography:`We don't have a biography for ${cast.data.name}.`}</p>
                </div>
            </Wrapper>
        }
    </>
)
}

export default CastPage;

const Wrapper = styled.div`
    background-color:rgba(255,255,255,.8);
    border-radius:1em;
    box-shadow:0 0 .25em rgba(0,0,0,.25);
    width: 80%;
    position: relative;
    left: 10%;
    height: 800px;
    padding: 10px 0px 10px 0px;
.inline{
    display: inline;
}
.personal-info{
    position: relative;
    left: 10%;
    top: 5%;
    width: 25%;
}
.subtitle{
    display: inline;
    font-weight: bolder;
}
img{
    width: 20%;
    position:relative;
    left: 10%;
    top: 5%;
}
.cast-info{
    display: inline-block;
    width: 50%;
    position: absolute;
    left: 40%;
    top:3.5%;
}
.known-for{
    display: inline;
}

`
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useParams} from "react-router-dom";


const CastPage = () => {
    let today = new Date();
    const person_id = useParams().CastId
    const [cast,setCast] = useState (null);
    const navigate = useNavigate()
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
            :<>
                <img src={"https://image.tmdb.org/t/p/original"+cast.data.profile_path}/>
                <p> {cast.data.name} </p>
                <p> Biography: {cast.data.biography?cast.data.biography:`We don't have a biography for ${cast.data.name}.`}</p>
                <p> Personal Info </p> 
                <p> Known for: {cast.data.known_for_department}</p>
                <p>Popularity: {cast.data.popularity}</p> 
                <p> Gender: {(cast.data.gender==1)?"Female":"Male"}</p>
                <p> Birthday: {cast.data.birthday} ({today.getFullYear()-cast.data.birthday.substring(0,4)} years old) </p>
                <p> Place of birth: {cast.data.place_of_birth}</p>
                <p> Also Known As: {cast?.data?.also_known_as?.map(element=>{
                    return (
                        <p> {element} </p>
                    )
                })} </p>
            </>
        }
    </>
)
}

export default CastPage;
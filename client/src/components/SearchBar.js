import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const SearchBar = () => {
    const [input,setInput] = useState (null);
    const [search,setSearch] = useState (null);
    const navigate = useNavigate()
    //fetching movies' data to return appropriate results as the users type in the search bar
    useEffect (() => {
    fetch(`/search?text=${input}`)
        .then(res => res.json())    
        .then((data) => {setSearch(data.data);})    
        .catch((error) => {console.log(error)})    
},[input]);
    return(
        <Wrapper>
        <input type="text" onChange={(e)=> console.log(setInput(e.target.value))}/>
        <div class="autocom-box">
            {!(search&&input)
                ? <></>
                :search?.results?.map(Element=>{
                    return(
                    <p onClick={()=> navigate(`/Movie/${Element.id}`)}>
                        {Element.original_title}
                    </p>
                    )
                })
            }
        </div>
        </Wrapper>
        )
}

export default SearchBar;
const Wrapper = styled.div`
position: relative;
display: inline-block;
margin-bottom:10%;
input{
    width: 675px;
    height: 20px;
    position: relative;
    left: 75%;
    background-color: white;
    border: 1mm;
    border-radius: 5px;
    text-align: center;
}
img{
    width: 150px;
}
.autocom-box {
    position: absolute;
    left: 75.5%;
    top:115%;
    background-color: grey;
    width: 675px;
    z-index: 1;
    border-radius: 2px;
}
p{
    text-align: center;
}


`
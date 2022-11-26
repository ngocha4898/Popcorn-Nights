import { BrowserRouter, Routes, Route } from "react-router-dom";
import CastPage from "./CastPage";
import GlobalStyles from "./GlobalStyles";
import Homepage from "./Homepage";
import LoginButton from "./login";
import LogoutButton from "./logout";
import MoviePage from "./MoviePage";
import NavBar from "./NavBar";
import Profile from "./profile";

const App=() => {
    return (
            <BrowserRouter>
                <>
                <GlobalStyles/>
                    <Routes>
                        <Route path="/login" element={<LoginButton/>}/>
                        <Route path="/" element={
                                <>
                                    <NavBar/>
                                    <Homepage/>
                                </>}/>
                        <Route path="/Movie/:MovieId" element={
                                <>
                                    <NavBar/>
                                    <MoviePage/>
                                </>}/>
                        <Route path="/Cast/:CastId" element={
                                <>
                                    <NavBar/>
                                    <CastPage/>
                                </>}/>
                        <Route path="/profile" element={<>
                        <NavBar/>
                        <Profile/>
                        </>} />
                        <Route path="" element={<h1>404: Oops!</h1>} />
                    </Routes>
                </>
            </BrowserRouter>
    );
}

export default App;

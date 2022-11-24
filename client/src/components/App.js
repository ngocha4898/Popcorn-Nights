import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";

const App=() => {
    return (
            <BrowserRouter>
                <>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route path="" element={<h1>404: Oops!</h1>} />
                    </Routes>
                </>
            </BrowserRouter>
    );
}

export default App;

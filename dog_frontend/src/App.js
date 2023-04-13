import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import Update from "./Update";
import Read from "./Read";
import CreateDog from './CreateDog';




function App(){
    
    return(
        <BrowserRouter>
        <Routes>
        <Route path ='/' element ={<Home />}></Route>
        <Route path ='/update/:id' element ={<Update />}></Route>
        <Route path ='/read/:id' element ={<Read />}></Route>
        <Route path ='/CreateDog/' element ={<CreateDog />}></Route>



        </Routes>
        </BrowserRouter>
    )

}

export default App
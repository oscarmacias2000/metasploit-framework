import App from "./App";
import Modules from "./modules";
import Login from "./Login";
import { Route } from "react-router";
import { Routes } from "react-router";


export default function Home (){
    return (
      <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/modules" element={<Modules/>}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
    );
}


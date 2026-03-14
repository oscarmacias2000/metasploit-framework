import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import '../src/modules.css';
import Footer from "./Footer";


export default function Modules() {
     const [modules, setModules] =useState([]);
     const [error, setError] =useState(null);
    
   useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await fetch("http://localhost:3000/modules");
        if (!res.ok) throw new Error("Error en la respuesta del servidor!");
        const data = await res.json();
        setModules(data);
      } catch (err) {
        setError("Error al obtener módulos: " + err.message);
      }
    };
    fetchModules();
  }, []); // Se ejecuta solo al montar el componente

    
     return(
       <div style={{ padding: "20px", textAlign: "center", color: 'black',fontFamily: "Arial, sans-serif", backgroundColor: "#f0f0f0", color: "#333", padding: "20px", minHeight: "100vh", }}>
      <h1>Lista de Módulos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Plataforma</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.namemodule}</td>
              <td>{m.type}</td>
              <td>{m.plataform}</td>
            </tr>
          ))}
        </tbody>
      </table>
         <h1>Lista de Módulos/windows/http</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Plataforma</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
            <h1>Lista de Módulos/windows/MSFConsole::html</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Plataforma</th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
      <Footer />
    </div>
     )
}
  
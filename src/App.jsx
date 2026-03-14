import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "./Footer";

function App() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    namemodule: "",
    type: "",
    plataform: "",
    description: ""
  });

   
      const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5173/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Módulo agregado con éxito");
        setFormData({ namemodule: "", type: "", plataform: "", description: ""});
         navigate("/modules")
      } else {
        alert("Error al agregar el módulo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };



  useEffect(() => {
    fetch("http://localhost:3000/modules")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          setModules(data);
        }
      });
  }, []);

   const getOut = async () => {
        try {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }catch (error) {
          console.error("Error fetching modules:", error);
        }
      }; 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveModule = async () => {
      try {
         await fetch("http://localhost:3000/modules", {
          method: "POST",
          headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    window.location.reload();
      }catch (error) {
        console.error("Error saving module:", error);
      }
  };

  return (
    <div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#f0f0f0", color: "#333", padding: "20px", minHeight: "100vh", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", width: "100%"}}>
         <img src="./src/assets/PostgresSQL.svg" alt="Metasploit Logo" width="200" />
         <h1>Gestor de Módulos Metasploit</h1>

         <h2>Agregar módulo</h2>

      <form onSubmit={handleSubmit}>
      <input name="namemodule" type="text" placeholder="Nombre del módulo" value={formData.namemodule}  onChange={handleChange}/>
      <input name="type" type="text" placeholder="Tipo (exploit, auxiliary)"value={formData.type} onChange={handleChange}/>
      <input name="plataform" type="text"  placeholder="Plataforma" value={formData.plataform} onChange={handleChange}/>
      <input name="description" type="text" placeholder="Descripción"value={formData.description} onChange={handleChange}/>

      <button onClick={saveModule}>Guardar</button>
      <button onClick={getOut}>salir</button>
      </form>


      <footer><Footer/></footer>
    </div>
  );
}

export default App;
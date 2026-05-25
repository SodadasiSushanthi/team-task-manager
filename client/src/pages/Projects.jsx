import { useEffect, useState } from "react";
import API from "../api/axios";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const createProject = async () => {

    try {

      await API.post("/projects", {
        title,
        description
      });

      setTitle("");

      setDescription("");

      fetchProjects();

      alert("Project Created Successfully");

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProjects();

  }, []);

  return (

    <div style={{ padding:"30px" }}>

      <h1>Projects</h1>

      {user?.role === "admin" && (

        <div style={{
          display:"flex",
          gap:"10px",
          marginBottom:"20px",
          flexWrap:"wrap"
        }}>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{
              padding:"10px"
            }}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            style={{
              padding:"10px"
            }}
          />

          <button
            onClick={createProject}
            style={{
              padding:"10px 20px",
              background:"#2563eb",
              color:"white",
              border:"none",
              cursor:"pointer",
              borderRadius:"5px"
            }}
          >
            Create
          </button>

        </div>

      )}

      <div>

        {projects.map((project)=>(

          <div
            key={project._id}
            style={{
              background:"#1e293b",
              color:"white",
              padding:"20px",
              marginBottom:"15px",
              borderRadius:"10px"
            }}
          >

            <h3>{project.title}</h3>

            <p>{project.description}</p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Projects;
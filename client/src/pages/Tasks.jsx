import { useEffect, useState } from "react";
import API from "../api/axios";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [projectId, setProjectId] = useState("");

  const [userId, setUserId] = useState("");

  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [dueDate, setDueDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchUsers = async () => {

    try {

      const res = await API.get("/auth/users");

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const createTask = async () => {

    try {

      await API.post("/tasks", {
        title,
        description,
        project: projectId,
        assignedTo: userId,
        dueDate
      });

      setTitle("");

      setDescription("");

      setProjectId("");

      setUserId("");

      setDueDate("");

      fetchTasks();

      alert("Task Created Successfully");

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/tasks/${id}`, {
        status
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTasks();

    fetchProjects();

    fetchUsers();

  }, []);

  const filteredTasks = tasks.filter((task)=>

    task.title.toLowerCase().includes(
      search.toLowerCase()
    )

  );

  return (

    <div style={{
      padding:"30px",
      background:"#0f172a",
      minHeight:"100vh",
      color:"white"
    }}>

      <h1 style={{
        marginBottom:"20px"
      }}>
        Tasks
      </h1>

      {user?.role === "admin" && (

        <div style={{
          display:"flex",
          flexDirection:"column",
          gap:"12px",
          width:"400px",
          marginBottom:"30px",
          background:"#1e293b",
          padding:"20px",
          borderRadius:"10px"
        }}>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{
              padding:"12px",
              borderRadius:"5px",
              border:"none"
            }}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            style={{
              padding:"12px",
              borderRadius:"5px",
              border:"none"
            }}
          />

          <select
            value={projectId}
            onChange={(e)=>setProjectId(e.target.value)}
            style={{
              padding:"12px",
              borderRadius:"5px"
            }}
          >

            <option value="">
              Select Project
            </option>

            {projects.map((project)=>(

              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>

            ))}

          </select>

          <select
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}
            style={{
              padding:"12px",
              borderRadius:"5px"
            }}
          >

            <option value="">
              Select Team Member
            </option>

            {users.map((member)=>(

              <option
                key={member._id}
                value={member._id}
              >
                {member.name}
              </option>

            ))}

          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e)=>setDueDate(e.target.value)}
            style={{
              padding:"12px",
              borderRadius:"5px",
              border:"none"
            }}
          />

          <button
            onClick={createTask}
            style={{
              padding:"12px",
              background:"#2563eb",
              color:"white",
              border:"none",
              borderRadius:"5px",
              cursor:"pointer"
            }}
          >
            Create Task
          </button>

        </div>

      )}

      <input
        type="text"
        placeholder="Search Tasks"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          padding:"12px",
          width:"300px",
          marginBottom:"25px",
          borderRadius:"5px",
          border:"none"
        }}
      />

      {loading && (

        <h3>
          Loading Tasks...
        </h3>

      )}

      {!loading && filteredTasks.length === 0 && (

        <h3>
          No Tasks Found
        </h3>

      )}

      <div>

        {filteredTasks.map((task)=>(

          <div
            key={task._id}
            style={{
              background:"#1e293b",
              padding:"20px",
              marginBottom:"20px",
              borderRadius:"10px"
            }}
          >

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
              Status:
              {" "}
              {task.status}
            </p>

            <p>
              Assigned To:
              {" "}
              {task.assignedTo?.name}
            </p>

            <p>
              Due Date:
              {" "}
              {task.dueDate
                ? new Date(task.dueDate)
                    .toLocaleDateString()
                : "No Due Date"}
            </p>

            {user?.role === "admin" && (

              <button
                onClick={()=>
                  updateStatus(
                    task._id,
                    "Completed"
                  )
                }
                style={{
                  padding:"10px",
                  background:"#22c55e",
                  color:"white",
                  border:"none",
                  borderRadius:"5px",
                  cursor:"pointer",
                  marginTop:"10px"
                }}
              >
                Mark Completed
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default Tasks;
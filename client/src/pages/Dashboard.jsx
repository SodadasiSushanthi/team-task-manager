import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchDashboardData = async () => {

    try {

      const projectRes = await API.get("/projects");

      const taskRes = await API.get("/tasks");

      setProjects(projectRes.data);

      setTasks(taskRes.data);

    } catch(error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const completedTasks = tasks.filter(

    (task)=>task.status === "Completed"

  );

  const overdueTasks = tasks.filter((task)=>

    task.dueDate &&

    new Date(task.dueDate) < new Date() &&

    task.status !== "Completed"

  );

  return (

    <div style={{
      padding:"30px",
      background:"#020617",
      minHeight:"100vh",
      color:"white"
    }}>

      <h1 style={{
        marginBottom:"10px",
        fontSize:"35px"
      }}>
        Welcome {user?.name}
      </h1>

      <p style={{
        color:"#94a3b8",
        marginBottom:"40px"
      }}>
        Team Management Dashboard
      </p>

      <div style={{
        display:"flex",
        gap:"25px",
        flexWrap:"wrap"
      }}>

        <div style={{
          background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
          padding:"35px",
          borderRadius:"15px",
          width:"250px",
          boxShadow:"0px 4px 15px rgba(0,0,0,0.3)"
        }}>

          <h2>Total Projects</h2>

          <h1 style={{
            fontSize:"45px"
          }}>
            {projects.length}
          </h1>

        </div>

        <div style={{
          background:"linear-gradient(135deg,#7c3aed,#6d28d9)",
          padding:"35px",
          borderRadius:"15px",
          width:"250px",
          boxShadow:"0px 4px 15px rgba(0,0,0,0.3)"
        }}>

          <h2>Total Tasks</h2>

          <h1 style={{
            fontSize:"45px"
          }}>
            {tasks.length}
          </h1>

        </div>

        <div style={{
          background:"linear-gradient(135deg,#16a34a,#15803d)",
          padding:"35px",
          borderRadius:"15px",
          width:"250px",
          boxShadow:"0px 4px 15px rgba(0,0,0,0.3)"
        }}>

          <h2>Completed Tasks</h2>

          <h1 style={{
            fontSize:"45px"
          }}>
            {completedTasks.length}
          </h1>

        </div>

        <div style={{
          background:"linear-gradient(135deg,#dc2626,#b91c1c)",
          padding:"35px",
          borderRadius:"15px",
          width:"250px",
          boxShadow:"0px 4px 15px rgba(0,0,0,0.3)"
        }}>

          <h2>Overdue Tasks</h2>

          <h1 style={{
            fontSize:"45px"
          }}>
            {overdueTasks.length}
          </h1>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
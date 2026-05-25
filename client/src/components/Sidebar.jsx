import { Link } from "react-router-dom";

function Sidebar() {

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <div style={{
      width:"240px",
      background:"#0f172a",
      minHeight:"100vh",
      padding:"25px",
      color:"white",
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      position:"sticky",
      top:"0"
    }}>

      <div>

        <h1 style={{
          marginBottom:"40px",
          fontSize:"28px"
        }}>
          Team Manager
        </h1>

        <div style={{
          display:"flex",
          flexDirection:"column",
          gap:"20px"
        }}>

          <Link
            to="/dashboard"
            style={{
              color:"white",
              textDecoration:"none",
              fontSize:"18px"
            }}
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            style={{
              color:"white",
              textDecoration:"none",
              fontSize:"18px"
            }}
          >
            Projects
          </Link>

          <Link
            to="/tasks"
            style={{
              color:"white",
              textDecoration:"none",
              fontSize:"18px"
            }}
          >
            Tasks
          </Link>

          <Link
            to="/team"
            style={{
              color:"white",
              textDecoration:"none",
              fontSize:"18px"
            }}
          >
            Team
          </Link>

        </div>

      </div>

      <button
        onClick={logout}
        style={{
          padding:"12px",
          background:"#ef4444",
          color:"white",
          border:"none",
          borderRadius:"8px",
          cursor:"pointer",
          fontSize:"16px"
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Sidebar;
import { useEffect, useState } from "react";
import API from "../api/axios";

function Team() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    try {

      const res = await API.get("/auth/users");

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <div style={{ padding:"30px" }}>

      <h1>Team Members</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3, 1fr)",
        gap:"20px",
        marginTop:"30px"
      }}>

        {users.map((user)=>(

          <div
            key={user._id}
            style={{
              background:"#1e293b",
              color:"white",
              padding:"20px",
              borderRadius:"10px"
            }}
          >

            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <p>Role: {user.role}</p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Team;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch(error) {

      alert("Invalid Credentials");

      console.log(error);

    }

  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#0f172a"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          background:"#1e293b",
          padding:"40px",
          borderRadius:"12px",
          width:"350px"
        }}
      >

        <h1 style={{
          color:"white",
          marginBottom:"20px"
        }}>
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"15px"
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"15px"
          }}
        />

        <button
          type="submit"
          style={{
            width:"100%",
            padding:"12px",
            background:"#2563eb",
            color:"white",
            border:"none",
            cursor:"pointer"
          }}
        >
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;
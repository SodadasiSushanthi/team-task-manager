import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";

import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ children }) {

  return (

    <div style={{
      display:"flex"
    }}>

      <Sidebar />

      <div style={{
        flex:1,
        display:"flex",
        flexDirection:"column",
        minHeight:"100vh"
      }}>

        <div style={{
          flex:1
        }}>

          {children}

        </div>

        <Footer />

      </div>

    </div>

  );

}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Layout>

                <Dashboard />

              </Layout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>

              <Layout>

                <Projects />

              </Layout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>

              <Layout>

                <Tasks />

              </Layout>

            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>

              <Layout>

                <Team />

              </Layout>

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
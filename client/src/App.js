import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Register from "./components/Register";
import { useAppContext } from "./context/appContext";
// import {
//   AllJobs,
//   Profile,
//   SharedLayout,
//   Stats,
//   AddJob,
// } from './pages/dashboard'

function App() {
  const { user, logoutUser } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "10vh",
                  fontSize: 32,
                  color: "#49e1f5",
                }}
              >
                <div style={{ alignSelf: "flex-end" }}>
                  <button
                    onClick={() => logoutUser()}
                    className="member-btn"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Log Out
                  </button>
                </div>
                <p style={{ marginBottom: 0, color:"green" }}>
                  {" "}
                  welcome . You're now logged in
                </p>
                <p style={{ margin: "10px 0" }}>Name : {user?.name} </p>
                <p style={{ margin: "10px 0" }}>DOB : {user?.dob}</p>
                <p style={{ margin: "10px 0" }}>Age :&nbsp;
                  {new Date().getFullYear() - new Date(user?.dob).getFullYear()}
                </p>
                <p style={{ margin: "10px 0" }}>Mobile : {user?.mobile}</p>
                <p style={{ margin: "10px 0" }}>Gender : {user?.gender}</p>
                <p style={{ margin: "10px 0" }}>Email : {user?.email}</p>
              </div>
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

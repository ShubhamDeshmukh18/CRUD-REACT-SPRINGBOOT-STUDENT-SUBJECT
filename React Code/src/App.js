import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import SubjectHome from "./pages/SubjectHome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import AddSubject from "./users/AddSubject";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import EditSubject from "./users/EditSubject";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/subjecthome" element={<SubjectHome />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/addsubject" element={<AddSubject />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/editsubject/:id" element={<EditSubject />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

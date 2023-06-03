import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditSubject() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [subject, setSubject] = useState({
    name: "",
    code: "",
    type: ""
  });

  const { name, code, type } = subject;

  const onInputChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSubject();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/subject/${id}`, subject);
    navigate("/subjecthome");
  };

  const loadSubject = async () => {
    const result = await axios.get(`http://localhost:8080/subject/${id}`);
    setSubject(result.data);
  };

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Update Subject</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Subject Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Subject name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Subject Code
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Subject Code"
                name="code"
                value={code}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Subject Type
              </label>
              <select
                className="form-control"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Select an option</option>
                <option value="TH">Theory</option>
                <option value="PR">Practical</option>
              </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/subjecthome">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

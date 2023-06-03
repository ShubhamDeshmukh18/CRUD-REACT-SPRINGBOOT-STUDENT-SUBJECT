import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [subjects, setSubjects] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const result = await axios.get("http://localhost:8080/subjects");
    setSubjects(result.data);
  };

  const deleteSubject = async (id) => {
    await axios.delete(`http://localhost:8080/subject/${id}`);
    loadSubjects();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Sr.N</th>
              <th scope="col">Subject Name</th>
              <th scope="col">Subject Code</th>
              <th scope="col">Subject Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.id}>
                <th scope="row">{index + 1}</th>
                <td>{subject.name}</td>
                <td>{subject.code}</td>
                <td>{subject.type}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editsubject/${subject.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteSubject(subject.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

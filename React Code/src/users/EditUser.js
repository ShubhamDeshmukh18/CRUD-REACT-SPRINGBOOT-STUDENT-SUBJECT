import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [birthdate, setBirthdate] = useState(null);
  const handleDateChange = (date) => {
    setBirthdate(date);
  };

  const [user, setUser] = useState({
    name: "",
    address: "",
    subject: "",
    education: "",
    birthdate: "",
    mobileNumber: ""
  });

  const { name, address, education, subject, mobileNumber } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, {
      ...user,
      birthdate: birthdate.toISOString(),
    });

    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
    setBirthdate(new Date(result.data.birthdate));
  };

  const subjectOptions = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
    // Add more options as needed
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label">
                Date Of Birth
              </label>
              <DatePicker
                className="form-control"
                selected={birthdate}
                onChange={handleDateChange}
                placeholderText="Select your Date of Birth"
                name="birthdate"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Address"
                name="address"
                value={address}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your Mobile Number"
                name="mobileNumber"
                value={mobileNumber}
                onChange={onInputChange}
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <select
                className="form-control"
                name="subject"
                value={subject}
                onChange={onInputChange}
              >
                <option value="">Select a subject</option>
                {subjectOptions.map((subjectOption) => (
                  <option key={subjectOption.id} value={subjectOption.name}>
                    {subjectOption.name}
                  </option>
                ))}
              </select>
            </div> */}
             <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <select
                className="form-control"
                name="subject"
                value={user.subject} // Changed from "user.subjectName" to "user.subject"
                onChange={onInputChange} // Update the event handler
              >
                <option value="">Select a subject</option>
                {subjectOptions.map((subjectOption) => (
                  <option key={subjectOption.id} value={subjectOption.name}> {/* Changed value to subjectOption.name */}
                    {subjectOption.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="education" className="form-label">
                Educational Details
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Educational Details"
                name="education"
                value={education}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

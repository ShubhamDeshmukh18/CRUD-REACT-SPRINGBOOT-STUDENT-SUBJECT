

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { isValid } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function AddUser() {
  let navigate = useNavigate();

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [birthdate, setBirthdate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [user, setUser] = useState({
    name: "",
    address: "",
    subject: "", // Changed from "subjectName" to "subject"
    education: "",
    mobileNumber: "",
    birthdate: "",
  });
  const [mobileNumberError, setMobileNumberError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/subjects");
        setSubjectOptions(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleDateChange = (date) => {
    setBirthdate(date);
    if (!isValid(date)) {
      setDateError("Invalid date");
    } else {
      setDateError("");
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "mobileNumber") {
      const mobileNumberRegex = /^[0-9]{10}$/;
      if (!mobileNumberRegex.test(value)) {
        setMobileNumberError("Mobile number should be 10 digits and numbers only");
      } else {
        setMobileNumberError("");
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (dateError || mobileNumberError) {
      return; // Don't submit the form if there are validation errors
    }

    await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={user.name}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label">
                Date of Birth
              </label>
              <DatePicker
                className="form-control"
                selected={birthdate}
                onChange={handleDateChange}
                placeholderText="Select your Date of Birth"
                name="birthdate"
                dateFormat="yyyy-MM-dd"
              />
              {dateError && <div className="text-danger">{dateError}</div>}
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
                value={user.address}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Mobile Number"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={onInputChange}
              />
              {mobileNumberError && <div className="text-danger">{mobileNumberError}</div>}
            </div>

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
                placeholder="Add your Educational Details"
                name="education"
                value={user.education}
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

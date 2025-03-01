import React, { useState, useEffect } from "react";
import './Styles.css';

const Hr = () => {
  const [candidatedata, setCandidatedata] = useState([]);
  const [recruiter, setRecruiter] = useState(["", "", ""]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/recruiter-assignments");
      const data = await response.json();
      setCandidatedata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRecruiter = async () => {
    if (!selectedCandidate) {
      alert("Please select a candidate first!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/assign-recruiters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate_id: selectedCandidate.id, recruiters: recruiter }),
      });

      if (response.ok) {
        alert("Recruiters assigned successfully!");
        getData();
        setSelectedCandidate(null);
        setRecruiter(["", "", ""]);
      } else {
        alert("Failed to assign recruiters.");
      }
    } catch (error) {
      console.error("Error assigning recruiters:", error);
    }
  };

  return (
    <div className="container">
      <h2>Candidate Data</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>File</th>
            <th>Assigned Recruiters</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidatedata.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>
                <a href={`http://localhost:5000/uploads/${candidate.file}`} target="_blank" rel="noopener noreferrer">
                  {candidate.file}
                </a>
              </td>
              <td>
                {candidate.recruiters.filter((r) => r).length > 0 ? candidate.recruiters.join(", ") : "No recruiters assigned"}
              </td>
              <td>{candidate.comments || "No Comments"}</td>
              <td>
                <button className="btn-assign" onClick={() => setSelectedCandidate(candidate)}>Assign Recruiters</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCandidate && (
        <div className="modal">
          <h2>Assign Recruiters for {selectedCandidate.name}</h2>
          <input type="text" placeholder="Recruiter 1" onChange={(e) => setRecruiter([e.target.value, recruiter[1], recruiter[2]])} />
          <input type="text" placeholder="Recruiter 2" onChange={(e) => setRecruiter([recruiter[0], e.target.value, recruiter[2]])} />
          <input type="text" placeholder="Recruiter 3" onChange={(e) => setRecruiter([recruiter[0], recruiter[1], e.target.value])} />
          <button className="btn-save" onClick={handleRecruiter}>Assign</button>
        </div>
      )}
    </div>
  );
};

export default Hr;

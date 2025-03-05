import React, { useState, useEffect } from "react";
import "./Styles.css";

const Hr = () => {
  const [candidatedata, setCandidatedata] = useState([]);
  const [recruiter, setRecruiter] = useState(["", "", ""]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/recruiter-assignments");
      const data = await response.json();

      const updatedData = data.map((candidate) => ({
        ...candidate,
        recruiters: candidate.recruiters.filter((r) => r), // Remove null values
      }));

      setCandidatedata(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRecruiter = async () => {
    if (!selectedCandidate) {
      alert("Please select a candidate first!");
      return;
    }

    if (selectedCandidate.recruiters.length > 0) {
      alert("Recruiters are already assigned!");
      return;
    }

    const assignedRecruiters = recruiter.filter((r) => r.trim() !== "");

    if (assignedRecruiters.length === 0) {
      alert("Please enter at least one recruiter!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/assign-recruiters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidate_id: selectedCandidate.id,
          recruiters: assignedRecruiters,
        }),
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
                {candidate.recruiters.length > 0 ? candidate.recruiters.join(", ") : "No recruiters assigned"}
              </td>
              <td>
                <button
                  className="btn-assign"
                  onClick={() => {
                    if (candidate.recruiters.length > 0) {
                      alert("Recruiters are already assigned!");
                      return;
                    }
                    setSelectedCandidate(candidate);
                    setRecruiter(["", "", ""]);
                  }}
                >
                  Assign Recruiters
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCandidate && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedCandidate(null)}></div>
          <div className="modal">
            <button className="close-btn" onClick={() => setSelectedCandidate(null)}>&times;</button>
            <h2>Assign Recruiters for {selectedCandidate.name}</h2>
            <input type="text" placeholder="Recruiter 1" value={recruiter[0]} onChange={(e) => setRecruiter((prev) => [e.target.value, prev[1], prev[2]])} />
            <input type="text" placeholder="Recruiter 2" value={recruiter[1]} onChange={(e) => setRecruiter((prev) => [prev[0], e.target.value, prev[2]])} />
            <input type="text" placeholder="Recruiter 3" value={recruiter[2]} onChange={(e) => setRecruiter((prev) => [prev[0], prev[1], e.target.value])} />
            <button className="btn-save" onClick={handleRecruiter}>Assign</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Hr;

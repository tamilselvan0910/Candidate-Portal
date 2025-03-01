import React, { useState, useEffect } from "react";
import "./Recruiter.css";

const Recruiter = () => {
  const [candidates, setCandidates] = useState([]);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:5000/recruiter-assignments");
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const getRecruiterComment = (comments, recruiter) => {
    if (!comments) return "";
    const commentList = comments.split(", ").map((c) => c.split(": "));
    const commentObj = Object.fromEntries(commentList);
    return commentObj[recruiter] || "";
  };

  const saveComment = async (candidateId, index) => {
    if (!selectedRecruiter) {
      alert("Please select a recruiter.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const confirmSave = window.confirm("Are you sure you want to update this comment?");
    if (!confirmSave) return;

    try {
      const commentList = candidates[index].comments
        ? candidates[index].comments.split(", ").map((c) => c.split(": "))
        : [];
      const commentObj = Object.fromEntries(commentList);

      // Update or add new comment
      commentObj[selectedRecruiter] = newComment;

      // Convert back to string format
      const updatedComments = Object.entries(commentObj)
        .map(([recruiter, comment]) => `${recruiter}: ${comment}`)
        .join(", ");

      const response = await fetch("http://localhost:5000/add-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate_id: candidateId, comment: updatedComments }),
      });

      if (response.ok) {
        alert("Comment updated successfully!");
        setEditCommentIndex(null);
        setNewComment("");
        fetchCandidates(); // Refresh data
      } else {
        alert("Failed to update comment.");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="recruiter-panel">
      <h2>Recruiter Panel</h2>
      <table className="recruiter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>File</th>
            <th>Recruiters</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>
                <a href={`http://localhost:5000/uploads/${candidate.file}`} target="_blank" rel="noopener noreferrer">
                  {candidate.file}
                </a>
              </td>
              <td>
                {candidate.recruiters.length > 0 ? (
                  candidate.recruiters.join(", ")
                ) : (
                  <span className="no-recruiters">No recruiters assigned</span>
                )}
              </td>
              <td>
                {editCommentIndex === index ? (
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="comment-input"
                  />
                ) : (
                  <p className="comment-text">{candidate.comments || "No comments yet"}</p>
                )}
              </td>
              <td>
                {editCommentIndex === index ? (
                  <>
                    <select
                      onChange={(e) => {
                        setSelectedRecruiter(e.target.value);
                        setNewComment(getRecruiterComment(candidate.comments, e.target.value));
                      }}
                      value={selectedRecruiter}
                      className="recruiter-dropdown"
                    >
                      <option value="">Select Recruiter</option>
                      {candidate.recruiters.map((rec, idx) => (
                        <option key={idx} value={rec}>
                          {rec}
                        </option>
                      ))}
                    </select>
                    <button className="save-btn" onClick={() => saveComment(candidate.id, index)}>
                      Save
                    </button>
                  </>
                ) : (
                  <button className="comment-btn" onClick={() => setEditCommentIndex(index)}>
                    Comment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recruiter;

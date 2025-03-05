from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

# MySQL Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="recruitment_db"
)
cursor = db.cursor(dictionary=True)

# Upload Folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# ---------------------- API: Upload Candidate Data ----------------------
@app.route("/upload", methods=["POST"])
def upload_candidate():
    name = request.form.get("name")
    file = request.files.get("file")

    if not name or not file:
        return jsonify({"error": "Name and file are required"}), 400

    filename = file.filename
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    cursor.execute("INSERT INTO candidates (name, file) VALUES (%s, %s)", (name, filename))
    db.commit()

    return jsonify({"message": "Candidate uploaded successfully!"})


# ---------------------- API: Fetch All Candidates ----------------------
@app.route("/candidates", methods=["GET"])
def get_candidates():
    cursor.execute("SELECT * FROM candidates")
    return jsonify(cursor.fetchall())


# ---------------------- API: Assign Recruiters to a Candidate ----------------------
@app.route("/assign-recruiters", methods=["POST"])
def assign_recruiters():
    data = request.json
    candidate_id = data.get("candidate_id")
    recruiters = data.get("recruiters", [])

    if not candidate_id or len(recruiters) == 0:
        return jsonify({"error": "Candidate ID and at least 1 recruiter are required"}), 400

    # Fill missing recruiters with None
    recruiters += [None] * (3 - len(recruiters))

    # Check if recruiters are already assigned
    cursor.execute("SELECT * FROM recruiter_assignments WHERE candidate_id = %s", (candidate_id,))
    existing_assignment = cursor.fetchone()

    if existing_assignment:
        # If recruiters exist, update them
        sql = """
            UPDATE recruiter_assignments 
            SET recruiter1 = %s, recruiter2 = %s, recruiter3 = %s 
            WHERE candidate_id = %s
        """
        cursor.execute(sql, (*recruiters, candidate_id))
    else:
        # Otherwise, insert new record
        sql = """
            INSERT INTO recruiter_assignments (candidate_id, recruiter1, recruiter2, recruiter3)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (candidate_id, *recruiters))

    db.commit()
    return jsonify({"message": "Recruiters assigned successfully!"})



# ---------------------- API: Fetch Candidates with Recruiters ----------------------
@app.route("/recruiter-assignments", methods=["GET"])
def get_recruiter_assignments():
    cursor.execute("""
        SELECT c.id, c.name, c.file, r.recruiter1, r.recruiter2, r.recruiter3, r.comments
        FROM candidates c
        LEFT JOIN recruiter_assignments r ON c.id = r.candidate_id
    """)
    return jsonify([
        {
            "id": row["id"],
            "name": row["name"],
            "file": row["file"],
            "recruiters": [row["recruiter1"], row["recruiter2"], row["recruiter3"]],
            "comments": row["comments"] or ""
        }
        for row in cursor.fetchall()
    ])


# ---------------------- API: Add Comments to a Candidate ----------------------
@app.route("/add-comment", methods=["POST"])
def add_comment():
    data = request.json
    candidate_id = data.get("candidate_id")
    comment = data.get("comment")

    if not candidate_id or not comment:
        return jsonify({"error": "Candidate ID and comment are required"}), 400

    cursor.execute("UPDATE recruiter_assignments SET comments = %s WHERE candidate_id = %s", (comment, candidate_id))
    db.commit()

    return jsonify({"message": "Comment added successfully!"})


# ---------------------- API: Serve Uploaded Files ----------------------
@app.route("/uploads/<filename>", methods=["GET"])
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
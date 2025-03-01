# Candidate-Portal

## 📌 Overview
The **Candidate Portal** is a web-based platform that allows candidates to upload their resumes, HR to manage applications, and recruiters to handle assignments. The system is built using **React.js** for the frontend, **Flask (Python)** for the backend, and **MySQL** as the database.

---

## 🏗️ Project Structure
```
assessment_last
  ├── candidate_portal  # Frontend (React.js)
      ├── node_modules
      ├── public
      ├── src
        ├── assets
        ├── App.css
        ├── App.jsx
        ├── Candidate.css
        ├── Candidate.jsx
        ├── Hr.jsx
        ├── index.css
        ├── main.jsx
        ├── Recruiter.css
        ├── Recruiter.jsx
        ├── Styles.css
      ├── .gitignore
      ├── .eslint.config.js
      ├── index.html
      ├── package-lock.json
      ├── package.json
      ├── README.md
      ├── vite.config.js
  ├── database  # MySQL database script
      ├── recruitment_db.sql
  ├── server.py  # Backend (Flask)
  ├── README.md
```

---

## 🚀 Installation Guide
Follow these steps to set up the project on your local machine.

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/tamilselvan0910/Candidate-Portal.git
cd Candidate-Portal
```

### 2️⃣ Setup the MySQL Database
#### 🔹 Open MySQL and create the database:
```sql
CREATE DATABASE recruitment_db;
```

#### 🔹 Import the database schema:
```sh
mysql -u root -p recruitment_db < database/recruitment_db.sql
```

#### 🔹 Verify the tables are created:
```sql
USE recruitment_db;
SHOW TABLES;
```

---

### 3️⃣ Start the Backend (Flask API)
#### 🔹 Install dependencies:
```sh
pip install flask flask-cors mysql-connector-python
```

#### 🔹 Run the server:
```sh
python server.py
```

> The Flask server should now be running on **http://localhost:5000**

---

### 4️⃣ Start the Frontend (React.js)
#### 🔹 Navigate to the frontend folder:
```sh
cd candidate_portal
```

#### 🔹 Install dependencies:
```sh
npm install
```

#### 🔹 Run the React app:
```sh
npm run dev
```

> The React application should now be running on **http://localhost:5173**

---

## 📌 API Endpoints
### 🔹 Upload Candidate Data
**Endpoint:** `POST /upload`
- **Description:** Uploads candidate name and file.
- **Request Body:** `multipart/form-data`
- **Response:** `JSON`

### 🔹 Get All Candidates
**Endpoint:** `GET /candidates`
- **Description:** Fetches all candidates from the database.
- **Response:** `JSON`

### 🔹 Assign Recruiters
**Endpoint:** `POST /assign`
- **Description:** Assigns recruiters to a candidate.
- **Request Body:** `{ candidate_id, recruiter1, recruiter2, recruiter3, comments }`
- **Response:** `JSON`

---

## 📌 Technologies Used
- **Frontend:** React.js, Vite, Bootstrap
- **Backend:** Flask (Python)
- **Database:** MySQL

---

## 🛠️ Troubleshooting
### 🔹 Error: "Module not found"
Run `npm install` again inside `candidate_portal`.

### 🔹 Flask server crashes on startup
Check if MySQL is running and the database exists using:
```sql
SHOW DATABASES;
```

---

## 🎯 Contributing
Feel free to **fork** the repository and submit pull requests for improvements.

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## ✨ Author
**Tamilselvan P**
- [GitHub](https://github.com/tamilselvan0910)
- [LinkedIn](https://www.linkedin.com/in/tamilselvan-p-39b43b200/)


# Candidate Portal - Assessment Project

This project is a **Candidate Portal** built with React (frontend) and Python Flask (backend), with MySQL as the database. This is an assessment project for interview purposes.

## 📂 Project Structure
```
assessment_last
  ├── candidate_portal (Frontend - React)
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
  ├── server.py (Backend - Flask)
  ├── database.sql (MySQL Database Schema)
```

---

## 🚀 How to Set Up and Run

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/tamilselvan0910/Candidate-Portal.git
cd Candidate-Portal
```

### 2️⃣ Set Up the Database (MySQL)
#### a) Open MySQL and create the database
```sql
CREATE DATABASE recruitment_db;
USE recruitment_db;
```
#### b) Import the database schema
```sh
mysql -u root -p recruitment_db < database.sql
```

### 3️⃣ Run the Backend (Flask)
#### a) Install dependencies
```sh
pip install flask flask-cors mysql-connector-python
```
#### b) Start the Flask server
```sh
python server.py
```

### 4️⃣ Run the Frontend (React)
#### a) Navigate to frontend directory
```sh
cd candidate_portal
```
#### b) Install dependencies
```sh
npm install
```
#### c) Start the frontend server
```sh
npm run dev
```

---

## 🔥 Features
✅ Candidate can upload files
✅ HR Panel for candidate management
✅ Recruiter Panel for reviewing applications
✅ MySQL database for storing candidate data

---

## ⚠️ Disclaimer
This project is developed for **interview assessment purposes only**. No licensing is required.

---

## 🤝 Contributing
Since this is an assessment project, contributions are **not required**.

---

## 🛠️ Troubleshooting
- If you face MySQL connection issues, check **server.py** and update `mysql.connector.connect` with your credentials.
- Ensure MySQL is running and the `recruitment_db` is properly created.
- If any package is missing, reinstall dependencies using `npm install` or `pip install`.

Happy coding! 🚀

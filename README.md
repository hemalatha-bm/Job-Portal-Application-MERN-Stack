**Job Portal Application (MERN Stack)**

The Job Portal Application is a full-stack, role-based web application developed using the MERN stack. It simulates a real-world recruitment platform where job seekers can search and apply for jobs, while administrators can manage job postings and track applicants securely.

This project focuses on secure authentication, scalable backend design, and user-friendly frontend workflows, reflecting real industry practices.

**Features**
**User (Job Seeker)**

User registration and login with JWT authentication

Browse available job listings

Search and filter jobs by category, company, and location

View detailed job descriptions

Apply for jobs securely

Prevents duplicate job applications

**Admin**

Secure admin login

Create, update, and delete job postings

View all applicants for a job

Track job count and application status

Contact applicants via authenticated communication

**Authentication & Security**

Role-based access control (Admin / User)

JWT-based authentication with cookies

Protected routes for authorized users only

Environment variables secured using .env

Backend validation to ensure data integrity

**System Design & Implementation**

Frontend built using React.js with reusable components and responsive UI

Backend implemented using Node.js and Express.js following REST architecture

MongoDB schemas designed for Users, Jobs, and Applications with one-to-many relationships

Efficient querying and filtering using MongoDB operators

Modular folder structure for scalability and maintainability

**Project Structure**
Job-Portal-Application-MERN-Stack
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── App.js
│   └── package.json
│
├── .gitignore
└── README.md

**Technology Stack**
**Frontend**

React.js

JavaScript

HTML5

CSS3

**Backend**

Node.js

Express.js

**Database**

MongoDB

**Authentication**

JWT (JSON Web Tokens)

Cookies

**Architecture**

MERN Stack

RESTful APIs

Role-Based Access Control (RBAC)

**Installation & Setup**
Prerequisites

Node.js

MongoDB

Git

Steps
# Clone the repository
git clone https://github.com/hemalatha-bm/Job-Portal-Application-MERN-Stack.git

# Navigate to project folder
cd Job-Portal-Application-MERN-Stack

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

Run the Application
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start

**Impact & Learning Outcomes**

Hands-on experience with full-stack MERN development

Strong understanding of secure authentication and authorization

Practical exposure to REST API design

Experience in real-world database modeling

Improved skills in role-based system design

**Future Enhancements**

Resume upload and download feature

Job application status tracking for users

Admin analytics dashboard

Email notifications

Deployment with Docker and CI/CD


**If you like this project, feel free to star the repository!**

🚀 Enmate — Connect. Collaborate. Grow.

Enmate is a social and real-time networking platform built especially for students and developers who want to connect with like-minded people, find teammates, and discover opportunities related to coding events, hackathons, projects, and competitive programming.

The idea behind Enmate is simple:

Make it easier for students to meet the right people and the right opportunities at the right time.

Made by: Adwiteek Samadder
GitHub: @Advtik

✨ What Enmate Offers
🔐 Authentication & Accounts

Secure JWT-based login system

Session handling with protected routes

Each user has a personal account and profile

👤 User Profiles

Custom user profiles with:

Name, bio, city, website

Profile picture

Availability status (available / unavailable)

Edit profile using a clean modal interface

Follow and unfollow other users

📝 Posts & Social Feed

Create posts with text and images

Like and comment on posts

Feed updates dynamically

Designed for sharing ideas, announcements, and event information

🎯 Opportunities Section (Right Sidebar)

A dedicated Opportunities section

Automatically highlights posts related to:

Hackathons

Coding contests

Projects

Competitive programming events

Helps users quickly find opportunities without scrolling through the entire feed

💬 Real-Time Messaging

One-to-one chat system

Instant messaging using Socket.IO

Online user tracking

Persistent conversations stored in the database

🤝 Networking & Team Building

Discover and connect with other users

Find teammates for:

Hackathons

Projects

Competitive programming

Built with student collaboration in mind

🎨 Clean & Modern UI

Responsive design

Dark and light theme support

Smooth transitions and modals

Focused on simplicity and usability

🧠 Who Enmate Is For

Enmate is built primarily for students and developers, especially those who are involved in:

Competitive programming

Hackathons

College projects

Coding contests

Tech communities

If you’re looking to:

Find teammates

Discover coding opportunities

Connect with people who share similar interests

Enmate is made for you.

🏗️ Project Structure

The project follows a clear full-stack separation:

enmate/
├── api/          → Backend
├── frontend/     → Frontend
└── README.md


Each part is developed independently but works together seamlessly.

🖥️ Frontend
Technologies Used

React (Vite)

React Router

SCSS

Axios

@tanstack/react-query

Socket.IO Client

Frontend Responsibilities

User interface and routing

API communication

Authentication handling

Real-time message updates

Profile, feed, and opportunity rendering

Hosting

Deployed on Vercel

⚙️ Backend
Technologies Used

Node.js

Express

PostgreSQL

Socket.IO

JWT Authentication

Multer

Cloudinary

Backend Responsibilities

REST API for users, posts, likes, comments, and follows

Authentication and authorization

Real-time chat handling

File uploads and media management

Database communication and business logic

Hosting

Deployed on Render

🗄️ Database
Technologies Used

PostgreSQL

Neon (serverless PostgreSQL)

Database Design

The database is structured to support:

Users and profiles

Posts, likes, and comments

Follower relationships

Conversations and messages

It is designed to scale while keeping relationships clear and efficient.

🔌 Real-Time System

Built using Socket.IO

Handles:

Live messaging

Online user presence

Instant updates without page refresh

🔐 Security Approach

JWT-based authentication

Protected backend routes

Secure password handling

Controlled API access

🚧 Project Status

Enmate is actively developed and improved.
Future updates may include:

Group chats

Better opportunity filtering

Notifications

Enhanced discovery features

👨‍💻 Author

Adwiteek Samadder
GitHub: @Advtik

⭐ Support

If you like Enmate or find it useful, feel free to star the repository and explore the code.
